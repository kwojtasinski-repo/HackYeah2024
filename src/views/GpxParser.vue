<script>
import MapComponent from '@/components/MapComponent.vue';
import { parseGPX } from "@we-gold/gpxjs"

export default {
  components: {
    MapComponent
  },
  methods: {
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
      if (error) {
        console.error(error);
      }

      const points = parsedFile.tracks[0].points.map((point) => [
        point.latitude,
        point.longitude,
      ]);

      this.$refs.mapComponent.addPolyline(points, { color: 'blue' });
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
            @change="onFileChange" />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col>
          <MapComponent
            ref="mapComponent" 
            :center="[50.0614, 19.9383]"
            :zoom="10"
            :map-height="'500px'"
            :map-width="'100%'" />
        </v-col>
      </v-row>
    </v-container>
  </template>

<style scoped>
</style>
