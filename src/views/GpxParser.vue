<script>
import MapComponent from '@/components/MapComponent.vue';
import { parseGPX } from '@we-gold/gpxjs';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Legend,
  Tooltip,
  CategoryScale
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Legend, Tooltip, CategoryScale);

import { useMainStore } from '@/stores/useMainStore';
const mainStore = useMainStore();

import RouteDetails from '@/components/RouteDetails.vue';
import RouteScore from '@/components/RouteScore.vue';

import { showUserDetailsDialog } from '../use/useUtils';

import UserDetailsDialog from '@/components/dialogs/UserDetailsDialog.vue';
import { useRoute } from 'vue-router';
import { getCurrentInstance, onMounted, ref } from 'vue';

function linearInterpolate(data, numPoints) {
  if (!data || data.length === 0 || numPoints <= 0) {
    return [];
  }

  const interpolatedData = [];
  const dataLength = data.length;
  const step = (dataLength - 1) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    let index = i * step;
    if (index > dataLength - 1) index = dataLength - 1;

    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);
    const weight = index - lowerIndex;

    const lowerValue = data[lowerIndex].elevation;
    const upperValue =
      data[upperIndex].elevation !== undefined ? data[upperIndex].elevation : data[dataLength - 1].elevation;
    const newIndex = Math.round(lowerIndex * (1 - weight) + upperIndex * weight);
    const interpolatedValue = lowerValue * (1 - weight) + upperValue * weight;
    interpolatedData.push({ index: newIndex, elevation: interpolatedValue });
  }

  return interpolatedData;
}

export default {
  components: {
    MapComponent,
    RouteDetails,
    RouteScore,
    UserDetailsDialog
  },
  setup() {
    const route = useRoute(); // Access route to get query parameters
    const fileIndex = ref(null); // Declare fileIndex as a reactive variable

    const fileIndexParam = route.query?.fileIndex; // Get query parameter

    // Using lifecycle hook to react after the component is mounted
    onMounted(() => {
      if (fileIndexParam) {
        // Update the fileIndex value
        fileIndex.value = fileIndexParam;
        if (!fileIndexParam) {
          return;
        }

        const veloRoute = mainStore.veloRoutes[fileIndexParam];
        if (!veloRoute) {
          return;
        }
        mainStore.selectedVeloRoute = fileIndexParam;
      }
    });

    return {
      fileIndex // Return the reactive variable to use in the template
    };
  },
  data: function () {
    return {
      fileInput: null,
      elevationChart: null,
      tracks: []
    };
  },
  mounted: () => {
    const instance = getCurrentInstance();
    if (mainStore.selectedVeloRoute) {
      const veloRoute = mainStore.veloRoutes[mainStore.selectedVeloRoute];
      const trackPoints = veloRoute.parsedGpxJson.points ?? [];
      mainStore.parsedGpxFile = { tracks: [ veloRoute.parsedGpxJson], routes: [] };
      instance.ctx.cratePointsOnMap(instance.ctx.generatePoints(veloRoute.parsedGpxJson.points ?? []), 'track');
      instance.ctx.generateElevationChart(trackPoints, null, 'Track and Route');
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const gpxText = e.target.result;
          this.$refs.mapComponent.clearMap();
          this.parseGpx(gpxText);

          this.fileInput = null;
        };
        reader.readAsText(file);
      }
    },
    parseGpx(gpxText) {
      const [parsedFile, error] = parseGPX(gpxText);
      if (error) {
        console.error(error);
        return;
      }

      mainStore.parsedGpxFile = parsedFile;

      const tracksExists = parsedFile?.tracks && parsedFile?.tracks.length > 0;
      const routesExists = parsedFile?.routes && parsedFile?.routes.length > 0;
      if (!tracksExists && !routesExists) {
        return;
      }

      const trackPoints = tracksExists ? this.generatePoints(parsedFile.tracks[0].points) : [];
      const routePoints = routesExists ? this.generatePoints(parsedFile.routes[0].points) : [];

      if (trackPoints.length) {
        this.cratePointsOnMap(trackPoints, 'track');
      }

      if (routePoints.length) {
        this.cratePointsOnMap(routePoints, 'route');
      }

      // Generate combined elevation chart for both track and route
      const trackElevationData = tracksExists ? parsedFile.tracks[0].points : [];
      const routeElevationData = routesExists ? parsedFile.routes[0].points : [];
      this.generateElevationChart(trackElevationData, routeElevationData, 'Track and Route');
      const referencePoints =
        tracksExists && parsedFile.tracks[0].points.length > 5
          ? parsedFile.tracks[0].points
          : parsedFile.routes[0].points;
      if (referencePoints.length < 5) {
        return;
      }

      const firstPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(
        firstPoint.latitude,
        firstPoint.longitude,
        mainStore.track.dangerPointsNames[Math.floor(Math.random() * mainStore.track.dangerPointsNames.length)]
      );
      const secondPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(
        secondPoint.latitude,
        secondPoint.longitude,
        mainStore.track.dangerPointsNames[Math.floor(Math.random() * mainStore.track.dangerPointsNames.length)]
      );
      const thirdPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(
        thirdPoint.latitude,
        thirdPoint.longitude,
        mainStore.track.dangerPointsNames[Math.floor(Math.random() * mainStore.track.dangerPointsNames.length)]
      );
      const fourthPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(
        fourthPoint.latitude,
        fourthPoint.longitude,
        mainStore.track.dangerPointsNames[Math.floor(Math.random() * mainStore.track.dangerPointsNames.length)]
      );
      const fithPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(
        fithPoint.latitude,
        fithPoint.longitude,
        mainStore.track.dangerPointsNames[Math.floor(Math.random() * mainStore.track.dangerPointsNames.length)]
      );
    },
    cratePointsOnMap(points, kind) {
      if (kind !== 'track' && kind !== 'route') {
        console.error(`Invalid kind: ${kind}. Must be 'track' or 'route'.`);
        return;
      }

      if (!points || !points.length) {
        return;
      }

      if (kind === 'track') {
        this.tracks.push({
          id: this.$refs.mapComponent.addPolyline(points, { color: 'rgb(0, 0, 128)' }),
          category: 'track'
        });
      } else {
        this.tracks.push({
          id: this.$refs.mapComponent.addPolyline(points, { color: 'rgb(0, 100, 0)' }),
          category: 'route'
        });
      }
    },
    generatePoints(points) {
      if (!points || !points.length) {
        return [];
      }

      return points.map((point) => [point.latitude, point.longitude]);
    },
    generateElevationChart(trackPoints, routePoints, title) {
      const trackElevation = linearInterpolate(
        trackPoints.map((point, index) => ({ index, elevation: point.elevation ?? 0 })),
        100
      );
      const routeElevation = linearInterpolate(
        routePoints?.map((point, index) => ({ index, elevation: point.elevation ?? 0 })),
        100
      ) ?? [];

      const trackLabels = trackElevation.map((trackPoint, _) => {
        const cumulativeDistance = mainStore.parsedGpxFile.tracks[0].distance.cumulative[trackPoint.index];
        return Math.round(cumulativeDistance).toLocaleString('pl-PL') + 'm';
      });
      const routeLabels = routeElevation.map((routePoint, _) => {
        const cumulativeDistance = mainStore.parsedGpxFile.routes[0].distance.cumulative[routePoint.index];
        return Math.round(cumulativeDistance).toLocaleString('pl-PL') + 'm';
      });
      const ctx = document.getElementById('elevationChart').getContext('2d');
      if (this.elevationChart) {
        this.elevationChart.destroy(); // Destroy the previous chart if exists
      }

      // Create new Chart instance
      this.elevationChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: trackLabels.length > routeLabels.length ? trackLabels : routeLabels,
          datasets: [
            {
              id: this.tracks.find((t) => t.category === 'track')?.id ?? 0,
              label: 'Track Elevation',
              data: trackElevation.map((point) => point.elevation),
              borderColor: 'rgb(65, 105, 225)',
              tension: 0.1,
              fill: false,
              backgroundColor: 'rgba(65, 105, 225, 0.2)',
              borderWidth: 2
            },
            {
              id: this.tracks.find((t) => t.category === 'route')?.id ?? 0,
              label: 'Route Elevation',
              data: routeElevation.map((point) => point.elevation),
              borderColor: 'rgb(0, 100, 0)',
              tension: 0.1,
              fill: false,
              backgroundColor: 'rgba(0, 128, 0, 0.5)',
              borderWidth: 2
            }
          ]
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: 'white' // X-axis labels color for dark mode
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)' // X-axis grid lines color for dark mode
              }
            },
            y: {
              ticks: {
                color: 'white' // Y-axis labels color for dark mode
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)' // Y-axis grid lines color for dark mode
              },
              beginAtZero: true,
              title: {
                display: true,
                text: 'Elevation (meters)'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: `${title} Elevation Profile`
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: 'white' // Legend text color for dark mode
              }
            },
            tooltip: {
              enabled: true,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: 'white',
              bodyColor: 'white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              borderWidth: 1,
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label || '';
                  const value = context.raw;
                  return `${label}: ${value.toFixed(2)} m`;
                },
                title: function (tooltipItems) {
                  const pointIndex = tooltipItems[0].dataIndex;
                  return `Point ${pointIndex + 1}`;
                }
              }
            }
          },
          layout: {
            padding: {
              top: 10,
              left: 10,
              right: 10,
              bottom: 10
            }
          }
        }
      });
    },
    handleResetMap() {
      if (!this.elevationChart) {
        return;
      }

      this.elevationChart.destroy();
      this.elevationChart = null;
      this.tracks = [];
      mainStore.parsedGpxFile = null;
    },
    handleDeletePolyline(id) {
      const hasMultipleDatasets =
        this.elevationChart && this.elevationChart.data?.datasets?.filter((d) => d.data.length > 0).length > 1;
      if (!this.elevationChart || !hasMultipleDatasets) {
        this.handleResetMap();
        return;
      }

      const datasetIndex = this.elevationChart.data.datasets.findIndex((d) => d.id === id);
      if (datasetIndex === -1) {
        return;
      }

      this.elevationChart.data.datasets.splice(datasetIndex, 1);
      this.updateChartSafely();
      const trackIndex = this.tracks.findIndex((t) => t.id === id);
      if (trackIndex === -1) {
        return;
      }

      this.tracks.splice(trackIndex, 1);
    },
    updateChartSafely() {
      // Create a copy of the current datasets and options
      const datasets = [...this.elevationChart.data.datasets];
      const chartOptions = { ...this.elevationChart.config };

      // Destroy the old chart before creating a new one
      this.elevationChart.destroy();

      // Create a new Chart instance
      const ctx = document.getElementById('elevationChart').getContext('2d');
      this.elevationChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.getUpdatedLabels(datasets),
          datasets: datasets
        },
        options: chartOptions
      });
    },
    getUpdatedLabels(datasets) {
      // Generate labels based on the remaining datasets
      // Assuming the first dataset's length can determine the labels
      return datasets.length > 0 ? Array.from({ length: datasets[0].data.length }, (_, i) => `Point ${i + 1}`) : [];
    },
    showGpxParser() {
      return mainStore.userLoggedIn;
    },
    showLoginDialog() {
      showUserDetailsDialog();
    },
    getPolylines() {
      return this.$refs?.mapComponent?.getPolylines() ?? [];
    },
    clearMap() {
      this.$refs?.mapComponent?.clearMap();
    }
  }
};
</script>

<template>
  <v-container
    v-if="showGpxParser()"
    class="my-container">
    <v-row>
      <v-col>
        <v-file-input
          v-if="!fileIndex"
          v-model="fileInput"
          label="Upload GPX File"
          style="margin-left: 0%"
          accept=".gpx"
          @change="onFileChange" />
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn
          v-if="tracks.length > 0 && !fileIndex"
          size="large"
          color="blue"
          @click="clearMap">
          Reset Map
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <MapComponent
          ref="mapComponent"
          :center="[50.0614, 19.9383]"
          :zoom="10"
          :map-height="'500px'"
          :map-width="'100%'"
          :show-delete-button="!fileIndex"
          @deleted-polyline="handleDeletePolyline"
          @reset-map="handleResetMap" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <canvas
          id="elevationChart"
          style="height: 0; background-color: rgba(0, 0, 0, 0.6)" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <RouteDetails />
      </v-col>
      <v-col>
        <RouteScore />
      </v-col>
    </v-row>
  </v-container>
  <v-container
    v-else
    class="my-container">
    <v-row>
      <v-col>
        <v-alert
          value="true"
          type="info"
          dismissible>
          You need to introduce Yourself for proper calculations.
        </v-alert>
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-12">
      <v-btn
        color="primary"
        @click="showLoginDialog()">
        Introduce Yourself
      </v-btn>
    </div>
  </v-container>
  <UserDetailsDialog />
</template>

<style scoped></style>
