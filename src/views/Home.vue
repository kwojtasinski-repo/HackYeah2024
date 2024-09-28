<script setup>
// import ProgressDisplay from '../components/ProgressDisplay.vue';
// import SuccessDialog from '../components/dialogs/SuccessDialog.vue';
import UserDetailsDialog from "@/components/dialogs/UserDetailsDialog.vue";

// import { runProgressTest } from '../use/useUtils';

import { showUserDetailsDialog } from "../use/useUtils";
import { onMounted } from "vue";
import { USER_LEVEL, USER_BIKE } from '../plugins/enums.js';

import { useMainStore } from "../stores/useMainStore";

const mainStore = useMainStore();

onMounted(() => {
  mainStore.userLoggedIn = false;
  mainStore.userData = {
    name: "Bike rider",
    level: USER_LEVEL.BEGINNER,
    bike: USER_BIKE.COMMON
}
});
</script>

<template>
  <v-container class="my-container">
    <div class="text-h3 pa-md-4">Welcome in VeloSafety application!</div>
    <p class="text-left pa-md-4">
      We are happy to introduce you to our application which main goal is to advice You in the means of safe bike riding.
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
        @click="showUserDetailsDialog()">
        Start
      </v-btn>
    </div>
    <!-- Main Content
    <v-btn
      prepend-icon="mdi-progress-check"
      variant="outlined"
      @click="runProgressTest()">
      Test progress
    </v-btn>
    <ProgressDisplay />
    <SuccessDialog /> -->
    <UserDetailsDialog />
  </v-container>
</template>

<style scoped>

</style>
