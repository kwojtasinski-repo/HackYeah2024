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
            :color="scoreIconColor(scoreInfo)"
            :icon="scoreIcon(scoreInfo)"
            size="88" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-expand-transition>
      <div
        v-if="scoreData.expand"
        class="pa-4 bg-indigo-darken-4">
        <v-row>
          <v-col class="text-right"> Distance score: </v-col>
          <v-col>{{ getDistanceScore() }}</v-col>
        </v-row>
        <v-row>
          <v-col class="text-right"> Elevation score: </v-col>
          <v-col>{{ getElevationGainScore() }}</v-col>
        </v-row>
        <v-row>
          <v-col class="text-right"> Estimated duration score: </v-col>
          <v-col>{{ getEstimatedDurationScore() }}</v-col>
        </v-row>
      </div>
    </v-expand-transition>

    <v-divider />

    <v-table v-if="!scoreData.calculatingSurfaces && scoreData.surfaceTypes.length > 0">
      <thead>
        <tr class="font-weight-bold">
          <th class="text-left text-purple-lighten-1">Surface type</th>
          <th class="text-left text-purple-lighten-1">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in scoreData.surfaceTypes"
          :key="item">
          <td>{{ item.type }}</td>
          <td>{{ item.percentage }}%</td>
        </tr>
      </tbody>
    </v-table>
    <v-card
      v-else
        text="Please wait for API response..."
        title="Getting surface info" />

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
  score: 0,
  coordinates: [],
  calculatingSurfaces: false,
  surfaceTypes: []
});

const scoreIcon = (score) => {
  if (score < 40) {
    return 'mdi-emoticon-happy-outline';
  } else if (score < 75) {
    return 'mdi-emoticon-neutral-outline';
  } else {
    return 'mdi-emoticon-dead-outline';
  }
};

const scoreIconColor = (score) => {
  if (score < 40) {
    return 'success';
  } else if (score < 75) {
    return 'warning';
  } else {
    return 'error';
  }
};

const scoreInfo = computed(() => {
  getSurfaceData();
  return getDistanceScore() + getElevationGainScore() + getEstimatedDurationScore();
});

const getDistanceScore = () => {
  let distance = mainStore.routeCalculationData.distance;

  let bikeSpeed = findSpeed(mainStore.userData.bike);
  let userFactor = findUserFactor(mainStore.userData.level);

  let distanceScore = 0;
  let maxPoints = 20;

  distanceScore = distance / 10;
  if (distanceScore > maxPoints) {
    distanceScore = maxPoints;
  }

  return Math.floor(distanceScore);
};

const getElevationGainScore = () => {
  let elevation = mainStore.routeCalculationData.elevationGain;

  let elevationScore = 0;
  let maxPoints = 20;

  elevationScore = elevation / 50;
  if (elevationScore > maxPoints) {
    elevationScore = maxPoints;
  }

  return Math.floor(elevationScore);
};

const getEstimatedDurationScore = () => {
  let timeInHours = mainStore.routeCalculationData.estimatedDuration * 60;

  let durationScore = 0;
  let maxPoints = 20;

  durationScore = timeInHours / 10;
  if (durationScore > maxPoints) {
    durationScore = maxPoints;
  }

  return Math.floor(durationScore);
};

const getSurfaceData = () => {
  const referencePoints =
    mainStore.parsedGpxFile.tracks[0].points.length > 5
      ? mainStore.parsedGpxFile.tracks[0].points
      : mainStore.parsedGpxFile.routes[0].points;

  console.log(referencePoints);

  for (let i = 0; i < referencePoints.length; i++) {
    const lat = referencePoints[i].latitude;
    const lon = referencePoints[i].longitude;
    scoreData.coordinates.push({ lat: parseFloat(lat), lon: parseFloat(lon) });
  }

  scoreData.calculatingSurfaces = true;
  getSurfaceTypesFromGPX()
    .then((surfaceTypes) => {
      console.log('Surface Types along the track:');
      console.table(surfaceTypes);
      scoreData.calculatingSurfaces = false;

      const totalSurfaces = surfaceTypes.length;
      const surfaceTypeCounts = surfaceTypes.reduce((acc, { surfaceType }) => {
        acc[surfaceType] = (acc[surfaceType] || 0) + 1;
        return acc;
      }, {});

      for (const [type, count] of Object.entries(surfaceTypeCounts)) {
        const percentage = ((count / totalSurfaces) * 100).toFixed(2);
        scoreData.surfaceTypes.push({
          type: type,
          count: count,
          percentage: percentage
        });
      }
    })
    .catch((error) => {
      console.error('Error processing track file:', error);
      scoreData.calculatingSurfaces = false;
    });
};

// Function to construct Overpass API query for a given coordinate
function constructOverpassQuery(lat, lon) {
  return `
    [out:json];
    way(around:20,${lat},${lon})["highway"];
    out tags;
  `;
}

// Function to fetch road data from Overpass API
async function fetchRoadData(lat, lon) {
  const query = constructOverpassQuery(lat, lon);
  const url = 'https://overpass-api.de/api/interpreter';
  const params = new URLSearchParams();
  params.append('data', query);

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${lat}, ${lon}:`, error);
    return null;
  }
}

// Function to process Overpass API response and extract surface type
function extractSurfaceType(overpassData) {
  if (overpassData && overpassData.elements && overpassData.elements.length > 0) {
    for (const element of overpassData.elements) {
      const tags = element.tags;
      if (tags && tags.surface) {
        return tags.surface;
      }
    }
    // If no surface tag is found, return the highway type
    return overpassData.elements[0].tags.highway || 'Unknown';
  }
  return 'No Data';
}

// Main function to process GPX file and get surface types
async function getSurfaceTypesFromGPX() {
  const surfaceTypes = [];

  // Limit the number of queries to avoid overloading the API
  const sampleInterval = 10; // Adjust this value as needed
  for (let i = 0; i < scoreData.coordinates.length; i += sampleInterval) {
    const { lat, lon } = scoreData.coordinates[i];
    const overpassData = await fetchRoadData(lat, lon);
    const surfaceType = extractSurfaceType(overpassData);
    surfaceTypes.push({
      lat,
      lon,
      surfaceType
    });

    // Optional: Add a delay between requests
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return surfaceTypes;
}
</script>

<style scoped></style>
