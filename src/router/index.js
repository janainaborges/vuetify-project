import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages';

import Checkout from '../components/Checkout.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/checkout/:offerCode', 
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/order-confirmation',
    name: 'OrderConfirmation',
    component: () => import('@/components/OrderConfirmation.vue')
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
