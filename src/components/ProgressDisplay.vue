<template>
    <v-progress-linear
        color="light-blue"
        height="10"
        :model-value="store.progressValue"
        striped />
</template>

<script setup>
import { useMainStore } from '@/stores/useMainStore';

const store = useMainStore();
</script>

<style lang="scss" scoped></style>
