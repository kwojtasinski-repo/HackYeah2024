<template>
  <v-card
    v-if="mainStore.parsedGpxFile"
    class="mx-auto"
    max-width="368"
    :elevation="12">
    <v-card-item title="Route Safety Score">
      <!-- <template #subtitle>
        <v-icon
          class="me-1 pb-1"
          color="error"
          icon="mdi-alert"
          size="18" />

        Route Safety Score
      </template> -->
    </v-card-item>

    <v-card-text class="py-0">
      <v-row
        align="center"
        no-gutters>
        <v-col
          class="text-h2"
          cols="6">
          {{ scoreInfo }}
        </v-col>

        <v-col
          class="text-right"
          cols="6">
          <v-icon
            :color="scoreIconColor()"
            :icon="scoreIcon()"
            size="88" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-expand-transition>
      <div
        v-if="scoreData.expand"
        class="pa-4 bg-indigo-darken-4">
        <v-row>
          <v-col class="text-right">Distance score:</v-col>
          <v-col>{{ getDistanceScore() }}</v-col>
        </v-row>
        <v-row>
          <v-col class="text-right">Elevation score:</v-col>
          <v-col>{{ getElevationGainScore() }}</v-col>
        </v-row>
        <v-row>
          <v-col class="text-right">Estimated duration score:</v-col>
          <v-col>{{ getEstimatedDurationScore() }}</v-col>
        </v-row>
      </div>
    </v-expand-transition>

    <v-divider />

    <v-card-actions>
      <v-btn
        :text="!scoreData.expand ? 'Full Report' : 'Hide Report'"
        @click="scoreData.expand = !scoreData.expand" />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useMainStore } from '@/stores/useMainStore';

const mainStore = useMainStore();

import { findSpeed, findUserFactor } from '@/use/useUtils';

const scoreData = reactive({
  expand: false,
  score: 0
});

const scoreIcon = () => {
  if (scoreData.score < 40) {
    return 'mdi-emoticon-happy-outline';
  } else if (scoreData.score < 75) {
    return 'mdi-emoticon-neutral-outline';
  } else {
    return 'mdi-emoticon-dead-outline';
  }
};

const scoreIconColor = () => {
  if (scoreData.score < 40) {
    return 'success';
  } else if (scoreData.score < 75) {
    return 'warning';
  } else {
    return 'error';
  }
};

const scoreInfo = computed(() => {
  return getDistanceScore() + getElevationGainScore() + getEstimatedDurationScore();
});

const getDistanceScore = () => {
  let distance = mainStore.routeCalculationData.distance;

  let bikeSpeed = findSpeed(mainStore.userData.bike);
  let userFactor = findUserFactor(mainStore.userData.level);

  let distanceScore = 0;
  let maxPoints = 20;

  distanceScore = (distance / 10);
  if (distanceScore > maxPoints) {
    distanceScore = maxPoints;
  }

  return Math.floor(distanceScore);
};

const getElevationGainScore = () => {
  let elevation = mainStore.routeCalculationData.elevationGain;

  let elevationScore = 0;
  let maxPoints = 20;

  elevationScore = (elevation / 50);
  if (elevationScore > maxPoints) {
    elevationScore = maxPoints;
  }

  return Math.floor(elevationScore);
};

const getEstimatedDurationScore = () => {
  let timeInHours = mainStore.routeCalculationData.estimatedDuration * 60;

  let durationScore = 0;
  let maxPoints = 20;

  durationScore = (timeInHours / 10);
  if (durationScore > maxPoints) {
    durationScore = maxPoints;
  }

  return Math.floor(durationScore);
};
</script>

<style scoped></style>
