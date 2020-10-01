import {createRouter, createWebHistory} from 'vue-router'

import User from "../views/User.vue"
import Product from "../views/Product.vue"
import Banner from "../views/Banner.vue";
import Order from "../views/Order.vue";
import Category from "../views/Category.vue";
import Test001 from "../views/Test001.vue"


const routeHistory = createWebHistory()

const router = createRouter({
  history:routeHistory,
  routes:[
    {
      path: '/',
      component: User
    },{
      path: '/test001',
      component: Test001
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
      path:"/category",
      component:Category
  }
    ]
})

export default router
