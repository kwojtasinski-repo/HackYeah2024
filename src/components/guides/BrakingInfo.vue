<template>
    <div class="full-width-card">
      <img
        :src="brakingImage"
        alt="Braking"
        class="safety-picture">
      <div class="content">
        <div class="name-title">
          Braking
        </div>
        <span class="safety-label">
            Always check your brakes before each ride to make sure they're working properly. Learn to use both front and rear brakes effectively to control your speed and avoid skidding or flipping over the handlebars during sudden stops.
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import brakingImage from '@/assets/images/braking.png';
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
  