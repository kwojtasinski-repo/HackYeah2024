import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue';
import GpxParser from './views/GpxParser.vue';
import VeloRoutes from './views/VeloRoutes.vue';
import DangerPoints from './views/DangerPoints.vue';
import Authors from './views/Authors.vue';
import SafetyGuide from './views/SafetyGuide.vue';

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/gpx-parser',
      name: 'gpx-parser',
      component: GpxParser,
    },
    {
      path: '/velo-routes',
      name: 'velo-routes',
      component: VeloRoutes,
    },
    {
      path: '/danger-points',
      name: 'danger-points',
      component: DangerPoints,
    },
    {
      path: '/authors',
      name: 'authors',
      component: Authors,
    },
    {
      path: '/safety-guide',
      name: 'safety-guide',
      component: SafetyGuide,
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'home' },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;