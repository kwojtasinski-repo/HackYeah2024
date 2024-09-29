<template>
  <v-container
    v-if="mainStore.userLoggedIn"
    class="my-container">
    <v-row class="mt-6">
      <v-col cols="12">
        <h1>Velo routes</h1>
        <h4 class="opacity-80">
          Select one of Velo route and calculate it's safety score especially for You
        </h4>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="route in mainStore.veloRoutes"
        :key="route.name"
        cols="12"
        md="6">
        <v-card>
          <v-card-title>{{ route.name }}</v-card-title>
          <v-card-subtitle>{{ route.description }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              class="text-none text-subtitle-1"
              color="primary"
              size="small"
              variant="flat"
              @click="navigateTo('gpx-parser', route.name)">
              Select
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container
    v-else
    class="my-container">
    <v-row>
      <v-col>
        <v-alert
          value="true"
          type="info"
          dismissible>
          You need to introduce Yourself for proper calculations.
        </v-alert>
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-12">
      <v-btn
        color="primary"
        @click="showUserDetailsDialog('velo-routes')">
        Introduce Yourself
      </v-btn>
    </div>
  </v-container>
  <UserDetailsDialog />
</template>

<script setup>
import UserDetailsDialog from '../components/dialogs/UserDetailsDialog.vue';
import { showUserDetailsDialog } from '@/use/useUtils';
import { useMainStore } from '@/stores/useMainStore';
import { useRouter } from 'vue-router';

const mainStore = useMainStore();
const router = useRouter();
const navigateTo = (routeName, name) => {
  const index = mainStore.veloRoutes.findIndex(v => v.name === name);
  router.push({ name: routeName, query: { fileIndex: index } });
};

</script>

<style lang="scss" scoped>

</style>