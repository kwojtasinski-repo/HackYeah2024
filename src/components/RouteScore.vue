<template>
  <v-card
    v-if="mainStore.parsedGpxFile"
    class="mx-auto"
    max-width="368">
    <v-card-item title="Route Safety Score">
      <!-- <template #subtitle>
        <v-icon
          class="me-1 pb-1"
          color="error"
          icon="mdi-alert"
          size="18" />

        Route Safety Score
      </template> -->
    </v-card-item>

    <v-card-text class="py-0">
      <v-row
        align="center"
        no-gutters>
        <v-col
          class="text-h2"
          cols="6">
          {{ scoreData.score }}
        </v-col>

        <v-col
          class="text-right"
          cols="6">
          <v-icon
            :color="scoreIconColor()"
            :icon="scoreIcon()"
            size="88" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-expand-transition>
      <div v-if="scoreData.expand">
        
      </div>
    </v-expand-transition>

    <v-divider />

    <v-card-actions>
      <v-btn
        :text="!scoreData.expand ? 'Full Report' : 'Hide Report'"
        @click="scoreData.expand = !scoreData.expand" />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { reactive } from 'vue';
import { useMainStore } from '@/stores/useMainStore';

const mainStore = useMainStore();

const scoreData = reactive({
  expand: false,
  score: 0
});

const scoreIcon = () => {
  if (scoreData.score < 40) {
    return 'mdi-emoticon-happy-outline';
  } else if (scoreData.score < 75) {
    return 'mdi-emoticon-neutral-outline';
  } else {
    return 'mdi-emoticon-dead-outline';
  }
};

const scoreIconColor = () => {
  if (scoreData.score < 40) {
    return 'success';
  } else if (scoreData.score < 75) {
    return 'warning';
  } else {
    return 'error';
  }
};
</script>

<style scoped></style>
