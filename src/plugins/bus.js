import mitt from 'mitt';

export const bus = mitt();

export const busPlugin = {
    install(app) {
        //app.config.globalProperties.$bus = bus;
        app.provide('bus', bus);
    }
};