<script setup>
import { useRouter } from 'vue-router';
import { useMainStore } from './stores/useMainStore';

const router = useRouter();
const navigateTo = (routeName) => {
  router.push({ name: routeName });
};

const mainStore = useMainStore();
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
    },
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
        <v-list-item
          title="Home"
          @click="navigateTo('home')" />
        <v-list-item
          title="Check route"
          @click="navigateTo('gpx-parser')" />
        <v-list-item
          title="Velo routes"
          @click="navigateTo('velo-routes')" />
        <v-list-item
          title="Danger points"
          @click="navigateTo('danger-points')" />
        <v-list-item
          title="Safety guide"
          @click="navigateTo('safety-guide')" />
        <v-list-item
          title="Authors"
          @click="navigateTo('authors')" />
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