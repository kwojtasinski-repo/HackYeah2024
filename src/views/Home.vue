<script setup>
// import ProgressDisplay from '../components/ProgressDisplay.vue';
// import SuccessDialog from '../components/dialogs/SuccessDialog.vue';
import UserDetailsDialog from '@/components/dialogs/UserDetailsDialog.vue';

// import { runProgressTest } from '../use/useUtils';

import { showUserDetailsDialog } from '../use/useUtils';
import { onMounted } from 'vue';
import { USER_LEVEL, USER_BIKE } from '../plugins/enums.js';

import { useMainStore } from '../stores/useMainStore';

const mainStore = useMainStore();

import TrailblazingCyclists from '@/assets/images/TrailblazingCyclists.jpeg';

onMounted(() => {
  mainStore.userLoggedIn = false;
  mainStore.userData = {
    name: 'Bike rider',
    level: USER_LEVEL.BEGINNER,
    bike: USER_BIKE.COMMON
  };
});
</script>

<template>
  <v-container class="my-container">
    <v-row>
      <v-col cols="10">
        <div class="text-h3 pa-md-4">
Welcome in VeloSafety application!
</div>
        <p class="text-left pa-md-4">
          We are happy to introduce you to our application which main goal is to advice You in the means of safe bike
          riding.
        </p>

        <p class="text-left pa-md-4">
          VeloSafety application will try to calculate how Your route or some famous velo routes are safe for You.
        </p>

        <p class="text-left pa-md-4">
Let give it a try! Please use the button below to start :)
</p>

        <div class="d-flex justify-center">
          <v-btn
            color="primary"
            @click="showUserDetailsDialog('gpx-parser')">
            Start
          </v-btn>
        </div>
      </v-col>
      <v-col
        cols="2"
        class="d-flex align-center">
        <img
          :src="TrailblazingCyclists"
          class="float-right logoImg"
          alt="Bike trail ride">
      </v-col>
    </v-row>

    <UserDetailsDialog />
  </v-container>
</template>

<style scoped>
.logoImg {
  width: 100%;
}
</style>
