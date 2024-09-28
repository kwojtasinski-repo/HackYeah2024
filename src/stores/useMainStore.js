import { defineStore, acceptHMRUpdate } from 'pinia';
import { USER_LEVEL, USER_BIKE } from '../plugins/enums.js';

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        appVersion: '1.0.0',
        progressValue: 0,
        parsedGpxFile: null,
        routeCalculationData: {
            distance: 0,
            duration: 0,
            elevationGain: 0
        },
        userLoggedIn: false,
        userData: {
            name: "Bike rider",
            level: USER_LEVEL.BEGINNER,
            bike: USER_BIKE.COMMON
        }
    })
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
