<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import warnIcon from '@/assets/images/warning-icon.svg';
import { useMainStore } from '@/stores/useMainStore';
const mainStore = useMainStore();

function generatePolylineId() {
  return `polyline-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

const warningIcon = new L.Icon({
  iconUrl: warnIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export default {
  name: 'MapComponent',
  props: {
    center: {
      type: Array,
      default: () => [50.0614, 19.9383],
      validator: (value) => value.length === 2 && value.every(Number.isFinite)
    },
    zoom: {
      type: Number,
      default: 10,
      validator: (value) => value > 0
    },
    mapHeight: {
      type: String,
      default: '500px'
    },
    mapWidth: {
      type: String,
      default: '100%'
    }
  },
  emits: ['reset-map', 'deleted-polyline'],
  data() {
    return {
      map: null,
      polylines: [],
      selectedPolyline: null,
      isPolylineClick: false,
      popupVisible: false,
      warningMarkers: []
    };
  },
  mounted() {
    // Inicjalizacja mapy
    this.map = L.map('map').setView(this.center, this.zoom);

    // Dodanie warstwy OpenStreetMap
    const cyclingLayer = L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
      maxZoom: 22,
      attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>'
    });
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const baseLayers = {
      'OpenStreetMap': osmLayer,
      'Cycling Layer': cyclingLayer
    };

    // Dodanie kontroli warstw do przełączania między warstwami
    L.control.layers(baseLayers).addTo(this.map);

    // Add click event to reset selected polyline on map click
    this.map.on('click', this.resetSelectedPolyline);
    mainStore.dangers.forEach((d) => {
      this.addWarningIcon(d.latitude, d.longitude, d.name, true);
    });
  },
  methods: {
    addPolyline(points, options = { color: 'blue' }) {
      if (this.map) {
        const polylineOptions = {
          ...options,
          weight: 25,
          opacity: 0,
          interactive: true
        };

        const interactivePolyline = L.polyline(points, polylineOptions).addTo(this.map);
        const visiblePolyline = L.polyline(points, { ...options, weight: 4, opacity: 1 }).addTo(this.map);

        const id = generatePolylineId();
        interactivePolyline.on('click', () => this.selectPolyline(id));

        this.polylines.push({ id, interactivePolyline, visiblePolyline });

        this.map.fitBounds(visiblePolyline.getBounds());
        return id;
      } else {
        console.error('Mapa nie została jeszcze zainicjalizowana');
        return null;
      }
    },
    clearMap() {
      this.polylines.forEach((polyline) => {
        this.map.removeLayer(polyline.interactivePolyline);
        this.map.removeLayer(polyline.visiblePolyline);
      });
      this.polylines = [];
      this.selectedPolyline = null;
      this.clearAllWarnings();
      this.$emit('reset-map', null);
    },
    selectPolyline(id) {
      const polylineObj = this.polylines.find((p) => p.id === id);
      if (polylineObj) {
        if (this.selectedPolyline) {
          this.selectedPolyline.visiblePolyline.setStyle({ color: 'blue' });
        }
        this.selectedPolyline = polylineObj;
        this.selectPolyline['previousColor'] = polylineObj.interactivePolyline.options.color;
        polylineObj.visiblePolyline.setStyle({ color: 'red' });
        this.isPolylineClick = true;
      }
    },
    deleteSelectedPolyline() {
      if (this.selectedPolyline) {
        const index = this.polylines.findIndex((p) => p.id === this.selectedPolyline.id);
        if (index !== -1) {
          this.map.removeLayer(this.selectedPolyline.interactivePolyline);
          this.map.removeLayer(this.selectedPolyline.visiblePolyline);
          this.polylines.splice(index, 1);
          const id = this.selectedPolyline.id;
          this.selectedPolyline = null;
          this.$emit('deleted-polyline', id);
        }
      }
    },
    resetSelectedPolyline() {
      if (!this.selectedPolyline) {
        return;
      }

      if (this.isPolylineClick) {
        this.isPolylineClick = false;
        return;
      }

      const color = this.selectPolyline['previousColor'] ?? 'blue';
      this.selectedPolyline.visiblePolyline.setStyle({ color }); // Reset style of the previously selected polyline
      this.selectedPolyline = null; // Clear the selected polyline
    },
    addWarningIcon(lat, lng, message, doNotDelete) {
      const warningMarker = L.marker([lat, lng], { icon: warningIcon }).addTo(this.map);
      warningMarker.bindPopup(message);
      if (doNotDelete) {
        return;
      }
      this.warningMarkers.push(warningMarker);
    },
    clearAllWarnings() {
      // Loop through all the stored warning markers and remove them from the map
      this.warningMarkers.forEach((marker) => {
        this.map.removeLayer(marker);
      });

      // Clear the array after removing the markers
      this.warningMarkers = [];
    },
  }
};
</script>

<template>
  <div class="button-container">
    <v-btn
      v-if="selectedPolyline"
      color="red"
      @click="deleteSelectedPolyline">
      Delete Selected Route
    </v-btn>
  </div>
  <div style="position: relative">
    <div
      id="map"
      class="map"
      :style="{ height: mapHeight, width: mapWidth }" />
  </div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}

.button-container {
  display: flex;
  margin-bottom: 2rem;
}

.warning-icon {
  border: 1px solid black; /* Add border to the icon */
  border-radius: 50%; /* Make the icon circular */
  color: red;
}
</style>
