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

import { USER_BIKE, USER_LEVEL } from '@/plugins/enums';

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

const getEstimatedDuration = () => {
  if (!mainStore.parsedGpxFile) {
    return 0;
  }

  let distance = mainStore.routeCalculationData.distance;

  let bikeSpeedMap = {
    [USER_BIKE.COMMON]: 10,
    [USER_BIKE.MTB]: 15,
    [USER_BIKE.GRAVEL]: 20,
    [USER_BIKE.ROAD_BIKE]: 30,
  }

  let bikeUserFactor = {
    [USER_LEVEL.BEGINNER]: 1.1,
    [USER_LEVEL.AMATEUR]: 1,
    [USER_LEVEL.PROFESSIONAL]: 0.9,
  }

  let findSpeed = (bikeType) => {
    return bikeSpeedMap[bikeType] || bikeSpeedMap[USER_BIKE.COMMON];
  };

  let findUserFactor = (userLevel) => {
    return bikeUserFactor[userLevel] || bikeUserFactor[USER_LEVEL.AMATEUR];
  };

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
