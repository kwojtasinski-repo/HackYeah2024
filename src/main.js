import './assets/main.css';

import { createApp } from 'vue';
import piniaPlugin from './plugins/pinia';
import { busPlugin } from './plugins/bus';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import App from './App.vue';

const app = createApp(App);

app.use(piniaPlugin);
app.use(busPlugin);

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    }
});

app.use(vuetify);

app.mount('#app');
