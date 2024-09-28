<template>
  <div
    v-if="mainStore.parsedGpxFile"
    id="routeDetails">
    <v-row>
      <v-col>
        <v-card>
          <template #title>
            <span class="font-weight-black">Route Details</span>
          </template>
          <v-card-text>
            <v-row>
              <v-col>
                <span>Route Length: {{ getRouteLength() }} km</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span>Elevation up: {{ getElevationGain() }} m</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/useMainStore';

const mainStore = useMainStore();

const getRouteLength = () => {
  if (!mainStore.parsedGpxFile) {
    return 0;
  }

  let distanceTotal = mainStore.parsedGpxFile.tracks[0].distance.total;
  mainStore.routeCalculationData.distance = parseInt(distanceTotal / 1000);;
  return parseFloat(distanceTotal / 1000).toFixed(2);
};

const getElevationGain = () => {
  if (!mainStore.parsedGpxFile) {
    return 0;
  }

  let elevationGain = mainStore.parsedGpxFile.tracks[0].elevation.positive;
  mainStore.routeCalculationData.elevationGain = parseInt(elevationGain);
  return parseFloat(elevationGain).toFixed(0);
};
</script>

<style scoped></style>
