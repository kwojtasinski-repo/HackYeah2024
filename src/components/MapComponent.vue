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
        polylines: []
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
      }
    },
  };
</script>

<template>
  <div
    id="map"
    class="map"
    :style="{ height: mapHeight, width: mapWidth }" />
</template>
  
<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
  