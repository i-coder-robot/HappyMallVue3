import {createRouter, createWebHistory} from 'vue-router'
// import Category from "../views/Category.vue";
import User from "../views/User.vue"
// import Product from "../views/Product.vue"
// import Order from "../views/Order.vue"
// import Banner from "../views/Banner.vue"
// import Layout from "../views/Layout.vue"

const routeHistory = createWebHistory()

const router = createRouter({
  history:routeHistory,
  routes:[
    {
      path: '/',
      component: User
    }
    ]
})

export default router
