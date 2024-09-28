<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const navigateTo = (routeName) => {
  router.push({ name: routeName });
};
</script>

<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar :elevation="2">
            <template #prepend>
                <v-icon
                    icon="mdi-bike-fast"
                    class="ma-lg-4" />
            </template>

            <v-app-bar-title>DTP Team project</v-app-bar-title>
        </v-app-bar>

        <v-navigation-drawer>
            <v-list>
                <v-list-item
                    title="Navigation drawer"
                    @click="navigateTo('home')" />
                <v-list-item
                    title="Gpx Parser"
                    @click="navigateTo('gpx-parser')" />
            </v-list>
        </v-navigation-drawer>

        <v-main
            class="d-flex align-center justify-center ga-4"
            style="min-height: 300px">
            <router-view />
        </v-main>
    </v-layout>
</template>

<style scoped></style>
