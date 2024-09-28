<script setup>
import { useRouter } from 'vue-router';

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

      <v-app-bar-title>
        <div class="d-flex align-center">
          <span class="text-h4">Velo</span>
          <span class="text-h6 ma-lg-2 opacity-50">DTP Team project</span>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer class="bg-blue-darken-4">
      <v-list>
        <v-list-item
          title="Home"
          @click="navigateTo('home')" />
        <v-list-item
          title="Check route"
          @click="navigateTo('gpx-parser')" />
        <v-list-item
          title="Check Velo routes"
          @click="navigateTo('velo-routes')" />
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
