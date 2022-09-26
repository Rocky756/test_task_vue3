import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ListProducts from '../views/ListProducts.vue';
import Product from '../views/Product.vue';
import ProductForm from '../views/ProductForm.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: ListProducts,
  },
  {
    path: '/add',
    name: 'add',
    component: ProductForm,
  },
  {
    path: '/updateproduct/:id',
    name: 'update',
    component: ProductForm,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
