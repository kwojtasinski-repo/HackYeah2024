<script setup>
import { useRouter } from 'vue-router';
import { useMainStore } from './stores/useMainStore';
import { parseGPX } from '@we-gold/gpxjs';

const router = useRouter();
const navigateTo = (routeName) => {
  router.push({ name: routeName });
};

const mainStore = useMainStore();
mainStore.veloRoutes.forEach(async (r) => {
  // Dynamically resolve the GPX file path
  const gpxUrl = new URL(`/src/assets/gpx/${r.fileName}`, import.meta.url).href;

  // Fetch the GPX file
  const response = await fetch(gpxUrl);
  const gpxData = await response.text();
  const [parsedFile, error] = parseGPX(gpxData);
  if (error) {
    console.error(error);
    return;
  }

  r.parsedGpxJson = parsedFile.tracks[0];
})
</script>
<script>
export default {
    data: () => ({
      drawer: true
    }),
    watch: {
      group() {
        this.drawer = false
      },
    }
  }
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar :elevation="2">
      <template #prepend>
        <v-icon
          icon="mdi-bike-fast"
          class="ma-lg-4 d-none d-lg-flex" />
      </template>
      <v-app-bar-nav-icon
        variant="text"
        class="d-flex d-lg-none"
        @click.stop="drawer = !drawer" />
      <v-app-bar-title>
        <v-sheet class="d-flex align-center">
          <v-sheet class="text-h4 ma-2 pa-2">
            VeloSafety
          </v-sheet>
          <v-sheet class="text-h6 ma-2 pa-2 me-auto opacity-60">
            DTP Team project
          </v-sheet>
          <v-sheet
            v-if="mainStore.userLoggedIn"
            class="ma-2 pa-2">
              <span>Welcome {{ mainStore.userData.name }}! </span>
              <span class="text-h6 opacity-40">(level: {{ mainStore.userData.level }}, bike: {{ mainStore.userData.bike }})</span>
            </v-sheet>
        </v-sheet>
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
  v-model="drawer"
  class="bg-blue-darken-4">
  <v-list>
    <v-list-item @click="navigateTo('home')">
      <v-icon
  left
  icon="mdi-home-circle"
  class="mr-2" />
      <span>Home</span>
    </v-list-item>
    <v-list-item @click="navigateTo('gpx-parser')">
      <v-icon
  left
  icon="mdi-road-variant"
  class="mr-2" />
      <span>Check route</span>
    </v-list-item>
    <v-list-item @click="navigateTo('velo-routes')">
      <v-icon
  left
  icon="mdi-book-open-blank-variant-outline"
  class="mr-2" />
      <span>Velo routes</span>
    </v-list-item>
    <v-list-item @click="navigateTo('danger-points')">
      <v-icon
  left
  icon="mdi-alert"
  class="mr-2" />
      <span>Danger points</span>
    </v-list-item>
    <v-list-item @click="navigateTo('safety-guide')">
      <v-icon
  left
  icon="mdi-seatbelt"
  class="mr-2" />
      <span>Safety guide</span>
    </v-list-item>
    <v-list-item @click="navigateTo('authors')">
      <v-icon
  left
  icon="mdi-account-group"
  class="mr-2" />
      <span>Authors</span>
    </v-list-item>
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