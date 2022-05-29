import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/products/add',
    name: 'add-product',
    component: () => import('../views/AddProductView.vue')
  },
  {
    path: '/products/edit',
    name: 'edit-product',
    component: () => import('../views/EditProductView.vue')
  },
  {
    path: '/collection/manage',
    name: 'manage-collection',
    component: () => import('../views/ManageCollectionView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
