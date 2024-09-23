<script setup>
import ProgressDisplay from './components/ProgressDisplay.vue';
import SuccessDialog from './components/dialogs/SuccessDialog.vue';

import { runProgressTest } from './use/useUtils';
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
                <v-list-item title="Navigation drawer" />
            </v-list>
        </v-navigation-drawer>

        <v-main
            class="d-flex align-center justify-center ga-4"
            style="min-height: 300px">
            Main Content
            <v-btn
                prepend-icon="mdi-progress-check"
                variant="outlined"
                @click="runProgressTest()">
                Test progress
            </v-btn>
            <ProgressDisplay />
            <SuccessDialog />
        </v-main>
    </v-layout>
</template>

<style scoped></style>
