<template>
  <h1>Vue3.0新特性</h1>
  <div>{{ state.randomNum }}</div>
  <div>{{ randomNum2 }}</div>
  <div>跳槽以后的薪水--{{ double }}</div>
  <button @click="jump">跳槽加薪</button>
</template>

<script>
import {reactive, ref, computed,watch,watchEffect} from "vue";

export default {
  name: "Test001",
  setup() {
    //vue3.0的入口函数,beforeCreate之前出发的,触发时机很靠前的
    //响应式数据
    const state = reactive({
      randomNum: 0,
      name: "老王"
    })

    // 上面的模板里state,每次写都会很麻烦
    // ref登场，它也是做响应式数据的
    const randomNum2 = ref(0)
    const salary = ref(2200)
    const double = computed(() => {
      return salary.value * 2
    })
    function rand() {
      return Math.random() * 10 + 1
    }
    function addSalary(){
      salary.value = salary.value + salary.value*0.1
    }

    function jump(){
      addSalary()
    }

    setTimeout(() => {
      state.randomNum = parseInt(rand(), 10)
      randomNum2.value = parseInt(rand(), 10)
    }, 1000)

    // 为什么是randomNum2.value而不是randomNum2
    // JS里如果是randomNum2按值传递，如果是对象，按引用传递，所以这里用randomNum2.value

    setTimeout(() => {
      addSalary()
      if (salary.value>10000){
        stop()
      }
    },1000)

    // const stop = watchEffect(()=>{
    //   console.log(salary.value)
    // })

    const stop = watchEffect(async (cancel)=>{
      console.log(salary.value)
      await new Promise(function (resolve,reject){
        console.log(salary.value)
        resolve()
      })

      cancel(()=>{
        console.log("cancel")
      })
    })
    //生命周期，看网页
    return {
      state,
      randomNum2,
      double,
      jump
    }
  }
}
</script>

<style scoped>

</style>