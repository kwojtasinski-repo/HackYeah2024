<script setup>
import ProgressDisplay from '../components/ProgressDisplay.vue';
import SuccessDialog from '../components/dialogs/SuccessDialog.vue';

import { runProgressTest } from '../use/useUtils';
</script>

<template>
    Main Content
    <v-btn
        prepend-icon="mdi-progress-check"
        variant="outlined"
        @click="runProgressTest()">
        Test progress
    </v-btn>
    <ProgressDisplay />
    <SuccessDialog />
</template>