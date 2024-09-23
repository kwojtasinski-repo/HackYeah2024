<script>
import L from 'leaflet';
import { parseGPX } from "@we-gold/gpxjs"

export default {
  data() {
    return {
      map: null,
      gpxData: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([50.0614, 19.9383], 10); // Default coordinates (e.g. Kraków)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const gpxText = e.target.result;
          this.parseGpx(gpxText);
        };
        reader.readAsText(file);
      }
    },
    parseGpx(gpxText) {
        const [parsedFile, error] = parseGPX(gpxText);

      const points = parsedFile.tracks[0].points.map((point) => [
        point.latitude,
        point.longitude,
      ]);

      // Add polyline to the map
      const polyline = L.polyline(points, { color: 'blue' }).addTo(this.map);
      this.map.fitBounds(polyline.getBounds());
    },
  },
};
</script>

<template>
    <v-container>
      <v-row>
        <v-col>
          <v-file-input
            label="Upload GPX File"
            accept=".gpx"
            @change="onFileChange"
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col>
          <div id="map" style="height: 500px; width: 100%;"></div>
        </v-col>
      </v-row>
    </v-container>
  </template>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
