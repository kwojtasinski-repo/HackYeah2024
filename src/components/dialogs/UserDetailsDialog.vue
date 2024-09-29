<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    width="40%"
    min-width="350px"
    persistent>
    <v-card>
      <v-toolbar title="Introduce Yourself" />

      <v-card-text class="pa-12">
      <v-text-field
        v-model="selectedUserName"
        label="Your Name"
        outlined
        required />
        <v-radio-group v-model="selectedUserLevel" column>
          <v-label>Choose Your experience level:</v-label>
          <v-radio
            v-for="level in USER_LEVEL"
            :key="level"
            :label="level"
            :value="level" />
        </v-radio-group>

        <v-radio-group v-model="selectedUserBike" column>
          <v-label>Choose Your bike:</v-label>
          <v-radio
            v-for="level in USER_BIKE"
            :key="level"
            :label="level"
            :value="level" />
        </v-radio-group>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn
          class="text-none text-subtitle-1"
          color="primary"
          variant="flat"
          text="Check Your route!"
          @click="saveDialog()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue';
import { useMainStore } from '@/stores/useMainStore';

const mainStore = useMainStore();

import { USER_LEVEL, USER_BIKE } from '@/plugins/enums';

const bus = inject('bus');

const showDialog = ref(false);
const selectedUserName = ref(mainStore.userData.name);
const selectedUserLevel = ref(mainStore.userData.level);
const selectedUserBike = ref(mainStore.userData.bike);

import { useRouter } from 'vue-router';

const router = useRouter();
const navigateTo = (routeName) => {
  router.push({ name: routeName });
};

onMounted(() => {
  bus.on('dialog:displayUserDetailsDialog', () => {
    showDialog.value = true;
  });
});

onUnmounted(() => {
  bus.off('dialog:displayUserDetailsDialog');
});

const saveDialog = () => {
  navigateTo('gpx-parser');
  showDialog.value = false;
  mainStore.userLoggedIn = true;
  mainStore.userData = {
    name: selectedUserName.value,
    level: selectedUserLevel.value,
    bike: selectedUserBike.value
  };
};
</script>

<style scoped></style>
