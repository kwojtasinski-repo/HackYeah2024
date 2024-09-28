<template>
  <div class="full-width-card">
    <img
      :src="tiresImage"
      alt="Bike tires"
      class="safety-picture">
    <div class="content">
      <div class="name-title">
Tires
</div>
      <span class="safety-label">
        Ensure that your bike tires are suitable for your specific bike model and regularly check the air pressure.
        Maintain the recommended pressure to avoid issues caused by under-inflation or over-inflation, as both can
        affect your ride's safety and performance.
      </span>
    </div>
  </div>
</template>

<script setup>
import tiresImage from '@/assets/images/tires.png';
</script>

<style scoped>
.full-width-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px; 
  transition: transform 0.2s;
  width: 100%;
  margin-bottom: 20px; 
}

.full-width-card:hover {
  transform: scale(1.05);
}

.safety-picture {
  width: 80px; 
  height: 80px; 
  object-fit: cover;
  border-radius: 50%;
  margin-right: 15px; 
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1; 
}

.name-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(90deg, #1976d2, #03a9f4);
  padding: 5px 10px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-bottom: 10px;
}

.safety-label {
  font-size: 1.3rem;
  color: #1976d2;
  text-align: left; 
}
</style>
