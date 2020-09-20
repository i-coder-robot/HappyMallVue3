<template>
  <h1>User</h1>
<!--  <a-button @click="GetUserList" type="primary">获取用户列表</a-button>-->
<!--  <ul>-->
<!--    <li v-for="(item,idx) in users" :key="idx">-->
<!--      {{item.nickName}}&#45;&#45;{{item.mobile}}-->
<!--    </li>-->
<!--  </ul>-->

  <a-table :columns="columns" :data-source="users">
    <a slot="nickName" slot-scope="text">{{ text }}</a>
    <span slot="mobile"><a-icon type="smile-o" /> Name</span>
  </a-table>

</template>

<script>
import {reactive,toRefs,computed,ref,onMounted} from "vue";
import {useStore} from "vuex";

export default {
  name: "User",
  setup () {
    const store = useStore()
    const users = computed(()=>store.state.user_list)

    const state = reactive({
      userList:[{name:"aaa",age:18},{"name":"bbb",age:23}],
      total:888,
    })

    onMounted(()=>{
      GetUserList()
    })
    const columns = ref([
      {
        title: 'nickName',
        dataIndex: 'nickName',
        key: 'nickName',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
            record.name
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
      },
      {
        title: 'mobile',
        dataIndex: 'mobile',
        key: 'mobile',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
            record.age
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            });
          }
        },
      },
    ],)


    function GetUserList(){
      store.dispatch("Get_User_List")
    }

    return {
      ...toRefs(state),
      GetUserList,
      users,
      columns,
    }

  }
}
</script>

<style scoped>

</style>
