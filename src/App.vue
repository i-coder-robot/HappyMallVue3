<template>
  <div id="app">
    <div class="w">
      <router-view />
    </div>
  </div>
</template>

<script>
import Test from './views/Test.vue'
import User from "./views/User.vue"
export default {
  name: 'App',
  components: {
    Test,
    User
  }
}
</script>
