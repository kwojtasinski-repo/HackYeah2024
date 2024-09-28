<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function generatePolylineId() {
    return `polyline-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export default {
    name: 'MapComponent',
    props: {
        center: {
            type: Array,
            default: () => [50.0614, 19.9383],
            validator: (value) => value.length === 2 && value.every(Number.isFinite)
        },
        zoom: {
            type: Number,
            default: 10,
            validator: (value) => value > 0
        },
        mapHeight: {
            type: String,
            default: '500px'
        },
        mapWidth: {
            type: String,
            default: '100%'
        }
    },
    data() {
        return {
            map: null,
            polylines: [],
            selectedPolyline: null
        };
    },
    mounted() {
        // Initialize the map
        this.map = L.map('map').setView(this.center, this.zoom);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(this.map);
    },
    methods: {
        addPolyline(points, options = { color: 'blue' }) {
            if (this.map) {
                const polylineOptions = {
                    ...options,
                    weight: 25,
                    opacity: 0,
                    interactive: true
                };

                const interactivePolyline = L.polyline(points, polylineOptions).addTo(this.map);
                const visiblePolyline = L.polyline(points, { ...options, weight: 4, opacity: 1 }).addTo(this.map);

                const id = generatePolylineId();
                interactivePolyline.on('click', () => this.selectPolyline(id));

                this.polylines.push({ id, interactivePolyline, visiblePolyline });

                this.map.fitBounds(visiblePolyline.getBounds());
                return id;
            } else {
                console.error('Map is not initialized yet');
                return null;
            }
        },
        deletePolyline(index) {
            if (this.polylines[index]) {
                this.map.removeLayer(this.polylines[index].interactivePolyline);
                this.map.removeLayer(this.polylines[index].visiblePolyline);
                this.polylines.splice(index, 1);
            } else {
                console.error('Polyline not found at index', index);
            }
        },
        clearMap() {
            this.polylines.forEach((polyline) => {
                this.map.removeLayer(polyline.interactivePolyline);
                this.map.removeLayer(polyline.visiblePolyline);
            });
            this.polylines = [];
        },
        selectPolyline(id) {
            const polylineObj = this.polylines.find((p) => p.id === id);
            if (polylineObj) {
                this.selectedPolyline = polylineObj;
                polylineObj.visiblePolyline.setStyle({ color: 'red' });
            }
        },
        deleteSelectedPolyline() {
            if (this.selectedPolyline) {
                const index = this.polylines.findIndex((p) => p.id === this.selectedPolyline.id);
                if (index !== -1) {
                    this.map.removeLayer(this.selectedPolyline.interactivePolyline);
                    this.map.removeLayer(this.selectedPolyline.visiblePolyline);
                    this.polylines.splice(index, 1);
                    this.selectedPolyline = null;
                }
            }
        }
    }
};
</script>

<template>
    <div
        id="map"
        class="map"
        :style="{ height: mapHeight, width: mapWidth }" />

    <v-btn
        v-if="selectedPolyline"
        color="red"
        class="mt-2"
        @click="deleteSelectedPolyline">
        Delete Selected Route
    </v-btn>
</template>

<style scoped>
.map {
    width: 100%;
    height: 100%;
}
</style>
