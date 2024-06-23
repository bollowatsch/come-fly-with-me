import { createRouter, createWebHistory } from 'vue-router';

import TripResult from '@/result/TripResult.vue';

const routes = [
    {
        path: '/result/:id',
        name: 'TripResult',
        component: TripResult,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;