import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/gpx-parser',
      name: 'gpx-parser',
      component: () => import('@/views/GpxParser.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'home' },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;