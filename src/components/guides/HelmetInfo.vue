<template>
    <div class="full-width-card">
      <img
        :src="helmetImage"
        alt="Helmet"
        class="safety-picture">
      <div class="content">
        <div class="name-title">
          Helmet
        </div>
        <span class="safety-label">
          Put your helmet on before starting a ride. Ensure that your helmet is properly fitted and fastened. Replace it after any fall that results in an impact on your helmet.
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import helmetImage from '@/assets/images/helmet.png';
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
  