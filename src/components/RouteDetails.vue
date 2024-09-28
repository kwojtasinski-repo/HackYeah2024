<template>
  <div
    v-if="mainStore.parsedGpxFile"
    id="routeDetails"
    style="max-width: 386px;"
    :elevation="12">
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
            <v-row>
              <v-col>
                <span>Estimated duration: {{ getEstimatedDuration() }}</span>
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

import { findSpeed, findUserFactor } from '@/use/useUtils';

const getRouteLength = () => {
  if (!mainStore.parsedGpxFile) {
    return 0;
  }

  let distanceTotal = mainStore.parsedGpxFile?.tracks[0]?.distance?.total 
      ?? mainStore.parsedGpxFile?.routes[0]?.distance?.total
      ?? 0;
  mainStore.routeCalculationData.distance = parseInt(distanceTotal / 1000);;
  return parseFloat(distanceTotal / 1000).toFixed(2);
};

const getElevationGain = () => {
  if (!mainStore.parsedGpxFile) {
    return 0;
  }

  let elevationGain = mainStore.parsedGpxFile?.tracks[0]?.elevation?.positive
    ?? mainStore.parsedGpxFile?.routes[0]?.elevation?.positive
    ?? 0;
  mainStore.routeCalculationData.elevationGain = parseInt(elevationGain);
  return parseFloat(elevationGain).toFixed(0);
};

const getEstimatedDuration = () => {
  if (!mainStore.parsedGpxFile) {
    return 0;
  }

  let distance = mainStore.routeCalculationData.distance;

  let bikeSpeed = findSpeed(mainStore.userData.bike);
  let userFactor = findUserFactor(mainStore.userData.level);
  let timeInHours = distance / bikeSpeed * userFactor;
  mainStore.routeCalculationData.estimatedDuration = timeInHours;
  let fullHours = Math.floor(timeInHours);
  let minutes = (timeInHours - fullHours) * 60;
  return fullHours + 'h ' + Math.round(minutes) + 'm';
};
</script>

<style scoped></style>
