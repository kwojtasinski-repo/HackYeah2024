<template>
  <v-container class="my-container">
    <v-row
      justify="center"
      align="stretch"
      no-gutters>
      <v-col
        v-for="(person, index) in people"
        :key="index"
        cols="4"
        class="name-card">
        <div class="card">
          <div class="name-title">
            {{ person.name }}
          </div>
          <img
            :src="person.image"
            alt="Profile Picture"
            class="profile-image" />
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
/* Ustawienie stylów dla całej strony */
body {
  margin: 0; /* Usuń domyślne marginesy */
  padding: 0; /* Usuń domyślne paddingi */
  height: 100vh; /* Ustal wysokość na 100% widoku */
}

.my-container {
  background-color: #03a9f4;
  min-height: 100vh; /* Ustal minimalną wysokość kontenera na 100vh */
  padding: 20px;
}

.name-card {
  padding: 10px;
}

.card {
  width: 100%; /* Ustalona szerokość dla wszystkich kart */
  height: 400px; /* Ustalona wysokość dla wszystkich kart */
  transition: transform 0.2s;
  background-color: white; /* Ustalenie tła dla kart */
  border-radius: 8px; /* Zaokrąglenie rogów */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Dodanie cienia */
  padding: 10px; /* Padding wewnętrzny dla karty */
  display: flex; /* Użycie flexboxa */
  flex-direction: column; /* Ułożenie elementów w kolumnie */
  justify-content: space-between; /* Rozkład elementów w kolumnie */
}

.card:hover {
  transform: scale(1.05); /* Efekt powiększenia na hover */
}

.name-title {
  display: block; /* Umożliwia umieszczenie etykiety w nowej linii */
  text-align: center; /* Wyśrodkowanie etykiety */
  font-size: 1.5rem; /* Ustalona wielkość czcionki dla tytułu */
  color: #fff; /* Ustalony kolor tekstu dla imienia */
  background: linear-gradient(90deg, #1976d2, #03a9f4); /* Gradient w tle */
  padding: 5px 10px; /* Padding wewnętrzny */
  border-radius: 20px; /* Zaokrąglenie rogów */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Cień */
  transition:
    background 0.3s,
    transform 0.3s; /* Przejrzystość tła i efekt powiększenia */
}

.name-title:hover {
  background: linear-gradient(90deg, #03a9f4, #1976d2); /* Odwrócenie gradientu na hover */
  transform: scale(1.1); /* Efekt powiększenia na hover */
}

.developer-label {
  display: block; /* Umożliwia umieszczenie etykiety w nowej linii */
  text-align: center; /* Wyśrodkowanie etykiety */
  font-size: 1.5rem; /* Ustalona wielkość czcionki dla etykiety */
  color: #1976d2; /* Ustalony kolor tekstu dla etykiety */
  margin: 10px 0; /* Margines górny i dolny dla etykiety */
}

.profile-image {
  width: 150px; /* Ustalona szerokość obrazka */
  height: 150px; /* Ustalona wysokość obrazka */
  object-fit: cover; /* Zachowanie proporcji obrazka */
  border-radius: 50%; /* Ustawia zaokrąglenie obrazka na kształt okręgu */
  margin: 0 auto 10px; /* Wyśrodkowanie obrazka */
}
</style>
