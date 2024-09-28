<template>
  <v-container class="my-container">
    <v-row class="mt-6">
      <v-col cols="12">
        <h1>Velo routes</h1>
        <h4 class="opacity-80">Select one of Velo route and calculate it's safety score especially for You</h4>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="route in mainStore.veloRoutes" :key="route.name" cols="12" md="6">
        <v-card>
          <v-card-title>{{ route.name }}</v-card-title>
          <v-card-subtitle>{{ route.description }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              class="text-none text-subtitle-1"
              color="primary"
              size="small"
              variant="flat">
              Select
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useMainStore } from '@/stores/useMainStore';

const mainStore = useMainStore();
</script>

<style lang="scss" scoped>

</style>