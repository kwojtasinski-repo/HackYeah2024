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
            selectedPolyline: null,
            resetButtonVisible: false // Kontroluje widoczność przycisku reset
        };
    },
    mounted() {
        // Inicjalizacja mapy
        this.map = L.map('map').setView(this.center, this.zoom);
        
        // Dodanie warstwy OpenStreetMap
        const cyclingLayer = L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
            maxZoom: 22,
            attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>',
        });
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(this.map);

        const baseLayers = {
            "OpenStreetMap": osmLayer,
            "Cycling Layer": cyclingLayer,
        };

        // Dodanie kontroli warstw do przełączania między warstwami
        L.control.layers(baseLayers).addTo(this.map);
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
                this.resetButtonVisible = true; 
                return id;
            } else {
                console.error('Mapa nie została jeszcze zainicjalizowana');
                return null;
            }
        },
        clearMap() {
            this.polylines.forEach((polyline) => {
                this.map.removeLayer(polyline.interactivePolyline);
                this.map.removeLayer(polyline.visiblePolyline);
            });
            this.polylines = [];
            this.selectedPolyline = null; 
            this.resetButtonVisible = false; 
        },
        selectPolyline(id) {
            const polylineObj = this.polylines.find((p) => p.id === id);
            if (polylineObj) {
                if (this.selectedPolyline) {
                    this.selectedPolyline.visiblePolyline.setStyle({ color: 'blue' });
                }
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
        },
        resetMap() {
            this.clearMap(); 
        },
        uploadGPX(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(e.target.result, 'text/xml');
                const points = [];

                const trkpts = xml.getElementsByTagName('trkpt');
                for (let i = 0; i < trkpts.length; i++) {
                    const lat = parseFloat(trkpts[i].getAttribute('lat'));
                    const lon = parseFloat(trkpts[i].getAttribute('lon'));
                    points.push([lat, lon]);
                }

                this.addPolyline(points);
            };
            reader.readAsText(file);
        },

        triggerFileUpload() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.gpx';
            input.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    this.uploadGPX(file);
                }
            };
            input.click();
        }
    }
};
</script>

<template>
    <div style="position: relative;">
        <div
            id="map"
            class="map"
            :style="{ height: mapHeight, width: mapWidth }" />

        <div class="button-container">
            <v-btn
                v-if="resetButtonVisible"
                color="blue"
                @click="resetMap">
                Reset Map
            </v-btn>

            <v-btn
                v-if="selectedPolyline"
                color="red"
                @click="deleteSelectedPolyline">
                Delete Selected Route
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
.map {
    width: 100%;
    height: 100%;
}

.button-container {
    position: absolute;
    top: 10px; 
    right: 10px; 
    display: flex;
    flex-direction: column;
    gap: 10px; 
    z-index: 1000; 
}
</style>
