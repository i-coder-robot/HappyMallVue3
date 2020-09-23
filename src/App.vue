<template>
  <div id="app">
    <div class="w">
      <router-view />
    </div>
  </div>
</template>

<script>
import Banner from "./views/Banner.vue"
import Category from "./views/Category.vue"
import Order from "./views/Order.vue"
import User from "./views/User.vue"
import Product from './views/Product.vue'
export default {
  name: 'App',
  components: {
    User,
    Product,
    Banner,
    Order,
    Category
  }
}
</script>
