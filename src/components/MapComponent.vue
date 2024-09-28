<script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  function generatePolylineId() {
    return `polyline-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  export default {
    name: 'MapComponent',
    props: {
      center: {
        type: Array,
        default: () => [50.0614, 19.9383],
        validator: (value) => value.length === 2 && value.every(Number.isFinite),
      },
      zoom: {
        type: Number,
        default: 10,
        validator: (value) => value > 0
      },
      mapHeight: {
        type: String,
        default: '500px',
      },
      mapWidth: {
        type: String,
        default: '100%',
      },
    },
    data() {
      return {
        map: null,
        polylines: [],
        selectedPolyline: null
      };
    },
    mounted() {
      // Initialize the map
      this.map = L.map('map').setView(this.center, this.zoom);
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);
    },
    methods: {
      addPolyline(points, options = { color: 'blue' }) {
        if (this.map) {
          const polyline = L.polyline(points, options).addTo(this.map);
          const id = generatePolylineId();
          polyline.on('click', () => this.selectPolyline(id));
          this.polylines.push({ id, polyline });
          this.map.fitBounds(polyline.getBounds());
          return id;  // Return the unique ID
        } else {
          console.error('Map is not initialized yet');
          return null;
        }
      },
      deletePolyline(index) {
        if (this.polylines[index]) {
          this.map.removeLayer(this.polylines[index]);
          this.polylines.splice(index, 1);
        } else {
          console.error('Polyline not found at index', index);
        }
      },
      clearMap() {
        this.polylines.forEach((polyline) => {
          this.map.removeLayer(polyline);
        });
        this.polylines = [];
      },
      selectPolyline(id) {
        const polylineObj = this.polylines.find(p => p.id === id);
        if (polylineObj) {
          this.selectedPolyline = polylineObj;
          polylineObj.polyline.setStyle({ color: 'red' });  // Highlight selected polyline
        }
      },
      deleteSelectedPolyline() {
        if (this.selectedPolyline) {
          const index = this.polylines.findIndex(p => p.id === this.selectedPolyline.id);
          if (index !== -1) {
            this.map.removeLayer(this.selectedPolyline.polyline);  // Remove from the map
            this.polylines.splice(index, 1);  // Remove from the array
            this.selectedPolyline = null;  // Clear the selection
          }
        }
      }
    },
  };
</script>

<template>
  <div
    id="map"
    class="map"
    :style="{ height: mapHeight, width: mapWidth }" />

  <v-btn
    v-if="selectedPolyline"
    color="red"
    class="mt-2"
    @click="deleteSelectedPolyline">
    Delete Selected Route
  </v-btn>
</template>
  
<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
  