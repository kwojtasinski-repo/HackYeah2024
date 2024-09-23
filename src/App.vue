<script setup>
import { useRouter } from 'vue-router';
import 'leaflet/dist/leaflet.css';

const router = useRouter();
const navigateTo = (routeName) => {
  router.push({ name: routeName });
};
</script>

<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar :elevation="2">
            <template #prepend>
                <v-icon
                    icon="mdi-bike-fast"
                    class="ma-lg-4" />
            </template>

            <v-app-bar-title>DTP Team project</v-app-bar-title>
        </v-app-bar>

        <v-navigation-drawer>
            <v-list>
                <v-list-item @click="navigateTo('home')" title="Navigation drawer" />
                <v-list-item @click="navigateTo('gpx-parser')" title="Gpx Parser" />
            </v-list>
        </v-navigation-drawer>

        <v-main
            class="d-flex align-center justify-center ga-4"
            style="min-height: 300px">
            <router-view />
        </v-main>
    </v-layout>
</template>

<style scoped></style>
