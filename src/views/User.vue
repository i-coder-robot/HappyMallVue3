<template>
  <h1>User</h1>
  <a-button @click="GetUserList" type="primary">获取用户列表</a-button>
  <ul>
    <li v-for="(item,idx) in userList" :key="idx">
      {{item.name}}--{{item.age}}
    </li>
  </ul>
</template>

<script>
import {reactive,toRefs} from "vue";

export default {
  name: "User",
  setup () {
    const state = reactive({
      userList:[{name:"aaa",age:18},{"name":"bbb",age:23}],
      total:888,
    })

    function GetUserList(){
      console.log("GetUserList clicked...")

    }

    return {
      ...toRefs(state),
      GetUserList
    }

  }
}
</script>

<style scoped>

</style>
