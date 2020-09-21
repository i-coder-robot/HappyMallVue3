<template>
  <h1>用户列表</h1>
  <!--  <a-button @click="GetUserList" type="primary">获取用户列表</a-button>-->
  <!--  <ul>-->
  <!--    <li v-for="(item,idx) in users" :key="idx">-->
  <!--      {{item.nickName}}&#45;&#45;{{item.mobile}}-->
  <!--    </li>-->
  <!--  </ul>-->
  <div class="page_width">
    <a-table :columns="columns" :data-source="users" :pagination="paginationProps">
      <template v-slot:action="{ text, record }">
      <span>
        <a @click="EditUser(record)">编辑</a>
        <span v-if="record.isDeleted">
          <a-divider type="vertical"/>
          <a @click="DeleteUser(record)">复活</a>
        </span>
        <span v-else>
          <a-divider type="vertical"/>
          <a @click="DeleteUser(record)">删除</a>
        </span>
      </span>
      </template>
    </a-table>
    <template>
      <div>
        <a-button type="primary" @click="showModal">

        </a-button>
        <a-modal
            title="修改用户信息"
            v-model:visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
        >
          <p>
            <a-input v-model:value="userInfo.nickName" placeholder="请输入昵称" /><br/><br/>
            <a-input v-model:value="userInfo.mobile" placeholder="请输入手机号码" /><br/><br/>
            <a-input v-model:value="userInfo.address" placeholder="请输入收获地址" /><br/><br/>
          </p>
        </a-modal>
      </div>
    </template>
  </div>
</template>

<script>
import {reactive, toRefs, computed, ref, onMounted} from "vue";
import {useStore} from "vuex";
import {message} from 'ant-design-vue';

export default {
  name: "User",
  setup () {
    const columns = ref([
      {
        title: '用户昵称',
        dataIndex: 'nickName',
        key: 'nickName',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
      },{
        title: '收货地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        slots: {customRender: 'action'},
      },
    ],)
    let current = ref(1)
    const page_size = ref(10)
    let visible = ref(false)
    let confirmLoading = ref(false)
    let nickName = ref("")
    let mobile = ref("")
    let address = ref("")
    let userId = ref("")
    const store = useStore()
    const users = computed(() => store.state.user_list)
    const userInfo = computed(()=>store.state.user_info)
    const userTotal = computed(() => store.state.user_total)
    const user_deleted = computed(()=>store.state.user_deleted)
    const state = reactive({
      userList: [{name: "aaa", age: 18}, {"name": "bbb", age: 23}],
      total: 888,
    })

    const paginationProps = ref({
      pageSize: page_size.value,
      page: current.value,
      onChange: (page) => handleUserTableChange(page),
      total: userTotal,
    })

    onMounted(() => {
      console.log("onMounted")
      console.log(page_size.value)
      GetUserList(1, page_size.value)
    })



    function handleUserTableChange (idx) {
      console.log(idx)
      current.value=idx
      GetUserList(idx,page_size.value)
    }

    function showModal () {
      visible.value = true;
    }

    function handleOk (e) {
      let nickNameVal = nickName.value
      let mobileVal = mobile.value
      let addressVal = address.value
      UpdateUser(nickNameVal,mobileVal,addressVal)
      confirmLoading = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 2000);
    }

    function GetUserList (page, size) {
      const p = {"Page": page, "PageSize": size}
      store.dispatch("Get_User_List", p)
    }

    async function EditUser (record) {
      userId=record.userId
      await store.dispatch("Get_User_Info",userId)
      showModal()
    }

    function DeleteUser (record) {
      store.dispatch("Delete_User",record.userId).then(res=>{
        if (user_deleted){
          message.info("操作成功")
          GetUserList(current,page_size.value)
        }
      })

    }

    async function UpdateUser (nickName,mobile,address) {
      let payload = {"UserId":userId,"NickName": nickName, "Mobile": mobile, "Address": address}
      let res = await store.dispatch("Update_User",payload)
      GetUserList(current,page_size)
    }

    return {
      ...toRefs(state),
      users,
      userInfo,
      columns,
      visible,
      nickName,
      mobile,
      address,
      confirmLoading,
      paginationProps,
      handleUserTableChange,
      current,
      EditUser,
      DeleteUser,
      UpdateUser,
      showModal,
      handleOk
    }

  }
}
</script>

<style scoped>
.page_width {
  width: 80%;
  margin: 0 auto;
}
</style>
