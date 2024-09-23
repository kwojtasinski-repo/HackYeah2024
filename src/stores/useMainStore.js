import { defineStore, acceptHMRUpdate } from 'pinia';

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        appVersion: '0.0.1',
        progressValue: 0
    })
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
