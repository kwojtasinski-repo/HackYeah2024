<template>
  <v-container class="my-container">
    <v-row>
      <v-col cols="12">
        <h1>Safety Guide</h1>
        <h4 class="opacity-80">
Here are some basic safety rules that should apply to all of Your bike rides
</h4>
      </v-col>
      <v-col
v-for="(item, index) in safetyItems"
:key="index"
cols="12">
        <SafetyCard
          :image="item.image"
          :title="item.title"
          :description="item.description" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import SafetyCard from '@/components/guides/SafetyCard.vue';
import helmetImage from '@/assets/images/helmet.png';
import lightsImage from '@/assets/images/lights.png';
import tiresImage from '@/assets/images/tires.png';
import clothingImage from '@/assets/images/clothing.png';
import brakingImage from '@/assets/images/braking.png';
import weatherImage from '@/assets/images/weather.png';

const safetyItems = [
  {
    image: helmetImage,
    title: 'Helmet',
    description: 'Put your helmet on before starting a ride. Ensure that your helmet is properly fitted and fastened. Replace it after any fall that results in an impact on your helmet.'
  },
  {
    image: lightsImage,
    title: 'Lights',
    description: 'Keep your lights on when it\'s dark or when you\'re riding on roads with cars. Use both front and back lights, and ensure that they are charged or have fresh batteries before setting off on your journey.'
  },
  {
    image: tiresImage,
    title: 'Tires',
    description: 'Ensure that your bike tires are suitable for your specific bike model and regularly check the air pressure. Maintain the recommended pressure to avoid issues caused by under-inflation or over-inflation.'
  },
  {
    image: clothingImage,
    title: 'Clothing',
    description: 'Wear bright and reflective clothing to increase your visibility, especially in low-light conditions. Dress appropriately for the weather and avoid loose clothing that could get caught in the bike’s gears.'
  },
  {
    image: brakingImage,
    title: 'Braking',
    description: 'Always check your brakes before each ride to make sure they\'re working properly. Learn to use both front and rear brakes effectively to control your speed and avoid skidding.'
  },
  {
    image: weatherImage,
    title: 'Weather conditions',
    description: 'Always check the weather forecast before heading out. Rain, snow, or wet roads can make surfaces slippery, increasing the risk of losing control.'
  }
];
</script>

<style scoped>
.v-row {
  margin-top: 20px;
}
</style>
