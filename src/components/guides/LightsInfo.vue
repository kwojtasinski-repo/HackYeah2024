<template>
  <div class="horizontal-card">
    <img
      :src="lightsImage"
      alt="Bike lights"
      class="safety-picture">
    <div class="content">
      <div class="name-title">
        Lights
      </div>
      <span class="safety-label">
        Keep your lights on when it's dark or when you're riding on roads with cars. Use both front and back lights, and ensure that they are charged or have fresh batteries before setting off on your journey.
      </span>
    </div>
  </div>
</template>

<script setup>
import lightsImage from '@/assets/images/lights.png';
</script>

<style scoped>
.horizontal-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px; /* Increased padding for a more spacious feel */
  transition: transform 0.2s;
  width: 100%; /* Full width for the card */
  margin-bottom: 20px; /* Add some spacing between cards */
}

.horizontal-card:hover {
  transform: scale(1.05);
}

.safety-picture {
  width: 80px; /* Reduced width for the lights image */
  height: 80px; /* Reduced height for the lights image */
  object-fit: cover;
  border-radius: 50%;
  margin-right: 15px; /* Adjust margin for better spacing */
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name-title {
  font-size: 1.5rem;
  font-weight:bold;
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
  text-align: center;
}
</style>
