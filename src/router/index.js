import {createRouter, createWebHistory} from 'vue-router'

import User from "../views/User.vue"
import Product from "../views/Product.vue"
import Banner from "../views/Banner.vue";
import Order from "../views/Order.vue";
import Category from "../views/Category.vue";


const routeHistory = createWebHistory()

const router = createRouter({
  history:routeHistory,
  routes:[
    {
      path: '/',
      component: User
    },{
      path: '/product',
      component: Product
    },{
      path:"/banner",
      component: Banner
    },{
      path:"/order",
      component:Order
    },{
      path:"/Category",
      component:Category
  }
    ]
})

export default router
