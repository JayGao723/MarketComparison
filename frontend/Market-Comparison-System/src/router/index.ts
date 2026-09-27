import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue') },
    { path: '/compare', name: 'compare', component: () => import('@/views/Compare.vue') },
    { path: '/product/:id', name: 'product', component: () => import('@/views/ProductDetail.vue') },
    { path: '/deals', name: 'deals', component: () => import('@/views/Deals.vue') },
    { path: '/shopping-list', name: 'shopping-list', component: () => import('@/views/ShoppingList.vue') },
    { path: '/basket', name: 'basket', component: () => import('@/views/Basket.vue') },
    { path: '/stores', name: 'stores', component: () => import('@/views/Stores.vue') },
    { path: '/data-info', name: 'data-info', component: () => import('@/views/DataInfo.vue') },
    { path: '/states', name: 'states', component: () => import('@/views/States.vue') },
  ],
})

export default router
