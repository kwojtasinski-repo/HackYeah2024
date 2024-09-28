<template>
  <v-container class="my-container">
    <v-row
      justify="center"
      align="center"
      no-gutters>
      <v-col
        v-for="(person, index) in people"
        :key="index"
        cols="auto"
        class="name-card">
        <div class="card">
          <div class="name-title">
            {{ person.name }}
          </div>
          <img
            :src="person.image"
            alt="Profile Picture"
            class="profile-image">
          <span class="developer-label">Developer</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import izaImage from '@/assets/images/iza.png';
import piotrImage from '@/assets/images/piotrek.png';
import kamilImage from '@/assets/images/kamil.png';

const people = [
  { name: 'Iza', image: izaImage },
  { name: 'Piotr', image: piotrImage },
  { name: 'Kamil', image: kamilImage }
];
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.my-container {
  background-color: #1A237E;
  min-height: 100vh;
  padding: 20px;
}

.name-card {
  margin: 10px;
}

.card {
  width: 300px;
  height: 400px;
  transition: transform 0.2s;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .card:hover {
    transform: scale(1.05);
  }

  .name-title {
    display: block;
    text-align: center;
    font-size: 2rem;
    color: #fff;
    background: linear-gradient(90deg, #1976d2, #03a9f4);
    padding: 5px 10px;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition:
      background 0.3s,
      transform 0.3s;
  }

  .name-title:hover {
    background: linear-gradient(90deg, #03a9f4, #1976d2);
    transform: scale(1.1);
  }

  .developer-label {
    display: block; 
    text-align: center; 
    font-size: 1.5rem; 
    color: #1976d2;
    margin: 10px 0; 
  }

  .profile-image {
    width: 150px; 
    height: 150px; 
    object-fit: cover; 
    border-radius: 50%;
    margin: 0 auto 10px; 
  }
}
</style>
