import { defineStore, acceptHMRUpdate } from 'pinia';
import { USER_LEVEL, USER_BIKE } from '../plugins/enums.js';

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        appVersion: '1.0.0',
        progressValue: 0,
        parsedGpxFile: null,
        routeCalculationData: {
            distance: 0,
            estimatedDuration: 0,
            elevationGain: 0
        },
        userLoggedIn: false,
        userData: {
            name: "Bike rider",
            level: USER_LEVEL.BEGINNER,
            bike: USER_BIKE.COMMON
        },
        track: {
            dangerPointsNames: [
                'Road accidents',
                'Roadworks',
                'Slippery surface',
                'Damaged road surface',
                'Traffic jams and congestion'
            ]
        },
        dangers: [
            { "name": "Detour WTR", "latitude": "50.02325", "longitude": "19.1846567" },
            { "name": "Steps to the levees - Dąbie/Kraków", "latitude": "50.06237", "longitude": "19.98297" },
            { "name": "Bicycle riding prohibited Dąbie", "latitude": "50.0544399", "longitude": "19.9763366" },
            { "name": "Rocky forest path", "latitude": "49.4981617", "longitude": "20.6826467" },
            { "name": "Steep/dirt path - walking the bike required!", "latitude": "49.3406588", "longitude": "20.8718694" },
            { "name": "Dirt passage along Grodzisko Hill", "latitude": "50.0076873", "longitude": "19.7959152" },
            { "name": "Heavy car traffic", "latitude": "50.053575", "longitude": "20.0478226" },
            { "name": "Gravel passage under Kościuszko water station", "latitude": "50.0300961", "longitude": "19.819523" },
            { "name": "Alternative route (Przewóz-Łączany)", "latitude": "50.02893", "longitude": "19.16591" },
            { "name": "Construction of S1", "latitude": "49.959106", "longitude": "19.121768" },
            { "name": "Construction of footbridge Kazimierz - Ludwinów", "latitude": "50.0453754", "longitude": "19.9386715" },
            { "name": "Reconstruction of Jankowice bridge DW781", "latitude": "50.03248", "longitude": "19.4357" },
            { "name": "Construction of railway bridge Nowy Sącz", "latitude": "49.6239277", "longitude": "20.6858996" },
            { "name": "Ferry Siedliszowice - Wietrzychowice", "latitude": "50.197424", "longitude": "20.773816" }
        ],
        veloRoutes: [
            {
                "name": "VeloDunajec",
                "description": "The VeloDunajec route is a 49 km long route that runs along the Dunajec River",
                "fileName": "velo-dunajec_velomapa.gpx",
                "parsedGpxJson": {}
            },
            {
                "name": "VeloWisła",
                "description": "The VeloWisła route is a 50 km long route that runs along the Vistula River",
                "fileName": "velodunajec-szosa-022022.gpx",
                "parsedGpxJson": {}
            },
            {
                "name": "VeloRaba",
                "description": "The VeloRaba route is a 49 km long route that runs along the Raba River",
                "fileName": "Odra-Ride.gpx",
                "parsedGpxJson": {}
            },
        ],
        surfaceCache: []
    })
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
