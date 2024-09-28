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
      <v-col cols="12">
        <!-- Tires component -->
        <TiresInfo />
      </v-col>
      <v-col cols="12">
        <!-- Clothing component -->
        <ClothingInfo />
      </v-col>
      <v-col cols="12">
        <!-- Braking component -->
        <BrakingInfo />
      </v-col>
      <v-col cols="12">
        <!-- Weather component -->
        <WeatherInfo />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BrakingInfo from '@/components/guides/BrakingInfo.vue';
import ClothingInfo from '@/components/guides/ClothingInfo.vue';
import HelmetInfo from '@/components/guides/HelmetInfo.vue';
import LightsInfo from '@/components/guides/LightsInfo.vue';
import TiresInfo from '@/components/guides/TiresInfo.vue';
import WeatherInfo from '@/components/guides/WeatherInfo.vue';

</script>

<style scoped>
.v-row {
  margin-top: 20px;
}
</style>
