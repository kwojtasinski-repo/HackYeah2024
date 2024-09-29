<template>
  <v-container class="my-container">
    <v-row class="mt-6">
      <v-col cols="12">
        <h1>Danger points</h1>
        <h4 class="opacity-80">
          Application imported some dangerous points from the region from "VeloMałopolska - postęp prac/rodzajem
          nawierzchni - mapa główna" map
        </h4>
        <h6>
          Source:
          <a
            target="_blank"
            href="https://www.google.com/maps/d/u/0/viewer?mid=16UMazp6pz-IQxUXpUl1c3suxCMHPcpFE&ll=49.8716080749386%2C20.258997834304044&z=9">
            VeloMałopolska</a>
        </h6>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="700">
          <v-list density="compact">
            <v-list-subheader>Imported risk points:</v-list-subheader>

            <v-list-item
              v-for="(item, i) in mainStore.dangers"
              :key="i"
              :value="item"
              color="primary">
              <template #prepend>
                <v-icon
                  icon="mdi-alert"
                  color="red" />
              </template>

              <v-list-item-title>
                <span class="text-h6">
                  {{ item.name }}
                </span>
                <span class="text-subtitle-2 text-blue-lighten-2">
                  (lat: {{ item.latitude }}, long: {{ item.longitude }})
                </span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useMainStore } from '@/stores/useMainStore';

const mainStore = useMainStore();
</script>

<style scoped></style>
