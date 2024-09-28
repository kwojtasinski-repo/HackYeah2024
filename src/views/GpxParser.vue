<script>
import MapComponent from '@/components/MapComponent.vue';
import { parseGPX } from "@we-gold/gpxjs"

export default {
  components: {
    MapComponent
  },
  data: function() {
    return {
        generatedTracks: [],
        generatedRoutes: [],
    };
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
        return
      }

      const tracksExists = parsedFile?.tracks && parsedFile?.tracks.length > 0;
      const routesExists = parsedFile?.routes && parsedFile?.routes.length > 0;
      if (!tracksExists && !routesExists) {
        return;
      }

      if (tracksExists) {
        const trackPoints = this.generatePoints(parsedFile.tracks[0].points);
        this.cratePointsOnMap(trackPoints, 'track');
      }

      if (routesExists) {
        const routePoints = this.generatePoints(parsedFile.routes[0].points);
        this.cratePointsOnMap(routePoints, 'route');
      }
    },
    cratePointsOnMap(points, kind) {
      if (kind !== 'track' && kind !== 'route') {
        console.error(`Invalid kind: ${kind}. Must be 'track' or 'route'.`);
        return;
      }

      if (!points || !points.length || points.length == 0) {
        return;
      }

      if (kind == 'track') {
        const id = this.$refs.mapComponent.addPolyline(points, { color: 'blue' });
        this.generatedTracks.push(id);
      } else {
        const id = this.$refs.mapComponent.addPolyline(points, { color: 'green' });
        this.generatedRoutes.push(id);
      }
    },
    generatePoints(points) {
      if (!points || !points.length || points.length == 0) {
        return [];
      }

      return points.map((point) => [
        point.latitude,
        point.longitude,
      ]);
    }
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
