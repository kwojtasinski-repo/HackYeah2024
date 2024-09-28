<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Helmet component -->
        <HelmetInfo />
      </v-col>
      <v-col cols="12">
        <!-- Lights component -->
        <LightsInfo />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import HelmetInfo from '@/components/guides/HelmetInfo.vue';
import LightsInfo from '@/components/guides/LightsInfo.vue';
</script>

<style scoped>
.v-row {
  margin-top: 20px; /* Add some top margin to the row */
}
</style>
