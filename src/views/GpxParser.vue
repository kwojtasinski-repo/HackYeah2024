<script>
import MapComponent from '@/components/MapComponent.vue';
import { parseGPX } from "@we-gold/gpxjs";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Legend, Tooltip, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Legend, Tooltip, CategoryScale);

import { useMainStore } from '@/stores/useMainStore';
const mainStore = useMainStore();

import RouteDetails from '@/components/RouteDetails.vue';

function linearInterpolate(data, numPoints) {
  if (!data || data.length === 0) {
    return [];
  }

  const interpolatedData = [];
  const step = (data.length - 1) / (numPoints - 1);
  
  for (let i = 0; i < numPoints; i++) {
    const index = i * step;
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);

    if (lowerIndex === upperIndex) {
      interpolatedData.push(data[lowerIndex]);
    } else {
      const weight = index - lowerIndex;
      const interpolatedValue = data[lowerIndex] * (1 - weight) + data[upperIndex] * weight;
      interpolatedData.push(interpolatedValue);
    }
  }
  return interpolatedData;
}

export default {
  components: {
    MapComponent,
    RouteDetails
  },
  data: function () {
    return {
      fileInput: null,
      elevationChart: null,
      tracks: []
    };
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
      const referencePoints = tracksExists && parsedFile.tracks[0].points.length > 5 
        ? parsedFile.tracks[0].points
        : parsedFile.routes[0].points;
      if (referencePoints.length < 5) {
        return;
      }

      const firstPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(firstPoint.latitude, firstPoint.longitude, mainStore.track.dangerPoints[Math.floor(Math.random() * mainStore.track.dangerPoints.length)]);
      const secondPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(secondPoint.latitude, secondPoint.longitude, mainStore.track.dangerPoints[Math.floor(Math.random() * mainStore.track.dangerPoints.length)]);
      const thirdPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(thirdPoint.latitude, thirdPoint.longitude, mainStore.track.dangerPoints[Math.floor(Math.random() * mainStore.track.dangerPoints.length)]);
      const fourthPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(fourthPoint.latitude, fourthPoint.longitude, mainStore.track.dangerPoints[Math.floor(Math.random() * mainStore.track.dangerPoints.length)]);
      const fifthPoint = referencePoints[Math.floor(Math.random() * referencePoints.length)];
      this.$refs.mapComponent.addWarningIcon(fifthPoint.latitude, fifthPoint.longitude, mainStore.track.dangerPoints[Math.floor(Math.random() * mainStore.track.dangerPoints.length)]);
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
        this.tracks.push({ id: this.$refs.mapComponent.addPolyline(points, { color: 'rgb(0, 0, 128)' }), category: 'track' });
      } else {
        this.tracks.push({ id: this.$refs.mapComponent.addPolyline(points, { color: 'rgb(0, 100, 0)' }), category: 'route' });
      }
    },
    generatePoints(points) {
      if (!points || !points.length) {
        return [];
      }

      return points.map((point) => [point.latitude, point.longitude]);
    },
    generateElevationChart(trackPoints, routePoints, title) {
      const trackElevation = linearInterpolate(trackPoints.map(point => point.elevation || 0), 100);
      const routeElevation = linearInterpolate(routePoints.map(point => point.elevation || 0), 100);

      const trackLabels = trackElevation.map((_, index) => `Track Point ${index + 1}`);
      const routeLabels = routeElevation.map((_, index) => `Route Point ${index + 1}`);

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
              id: this.tracks.find(t => t.category === 'track')?.id ?? 0,
              label: 'Track Elevation',
              data: trackElevation,
              borderColor: 'rgb(65, 105, 225)',
              tension: 0.1,
              fill: false,
              backgroundColor: 'rgba(65, 105, 225, 0.2)',
              borderWidth: 2
            },
            {
              id: this.tracks.find(t => t.category === 'route')?.id ?? 0,
              label: 'Route Elevation',
              data: routeElevation,
              borderColor: 'rgb(0, 100, 0)',
              tension: 0.1,
              fill: false,
              backgroundColor: 'rgba(0, 128, 0, 0.5)',
              borderWidth: 2
            },
          ],
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
                text: 'Elevation (meters)',
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: `${title} Elevation Profile`,
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
                label: function(context) {
                  const label = context.dataset.label || '';
                  const value = context.raw;
                  return `${label}: ${value.toFixed(2)} m`;
                },
                title: function(tooltipItems) {
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
        },
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
      const hasMultipleDatasets = this.elevationChart && 
      this.elevationChart.data?.datasets?.filter(d => d.data.length > 0).length > 1;
      if (!this.elevationChart || !hasMultipleDatasets) {
        this.handleResetMap();
        return;
      }
      
      const datasetIndex = this.elevationChart.data.datasets.findIndex(d => d.id === id);
      if (datasetIndex === -1) {
        return;
      }

      this.elevationChart.data.datasets.splice(datasetIndex, 1);
      this.updateChartSafely();
      const trackIndex = this.tracks.findIndex(t => t.id === id);
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
        options: chartOptions,
      });
    },
    getUpdatedLabels(datasets) {
      // Generate labels based on the remaining datasets
      // Assuming the first dataset's length can determine the labels
      return datasets.length > 0 ? Array.from({ length: datasets[0].data.length }, (_, i) => `Point ${i + 1}`) : [];
    },

  },
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-file-input
          v-model="fileInput" 
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
          :map-width="'100%'"
          @deleted-polyline="handleDeletePolyline"
          @reset-map="handleResetMap" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <canvas id="elevationChart" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <RouteDetails />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
