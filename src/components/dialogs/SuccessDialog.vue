<template>
    <v-dialog
        v-model="dialog"
        width="auto">
        <v-card
            max-width="400"
            prepend-icon="mdi-update"
            text="Progress bar test successfully completed"
            title="Test successful">
            <template #actions>
                <v-btn
                    class="ms-auto"
                    text="Ok"
                    @click="closeDialog()" />
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue';
import { useMainStore } from '@/stores/useMainStore';

const store = useMainStore();

const bus = inject('bus');

const dialog = ref(false);

onMounted(() => {
    bus.on('dialog:displaySuccessDialog', () => {
        dialog.value = true;
    });
});

onUnmounted(() => {
    bus.off('dialog:displaySuccessDialog');
});

const closeDialog = () => {
    dialog.value = false;
    store.progressValue = 0;
};
</script>

<style scoped></style>
