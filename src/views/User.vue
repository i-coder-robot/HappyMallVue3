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
<!--        <a @click="GetDetail(record)">查看</a>-->
        <!--        <a-divider type="vertical"/>-->
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
            title="修改密码"
            v-model:visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
        >
          <p>
            <a-input-password v-model:pwd="value" placeholder="请输入密码" />
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
      },
      {
        title: 'Action',
        key: 'action',
        slots: {customRender: 'action'},
      },
    ],)
    const current = ref(1)
    const page_size = ref(10)
    let visible = ref(false)
    const confirmLoading = ref(false)
    let pwd = ref("")
    const store = useStore()
    const users = computed(() => store.state.user_list)
    const userTotal = computed(() => store.state.user_total)
    const user_deleted = computed(()=>store.state.user_deleted)
    const state = reactive({
      userList: [{name: "aaa", age: 18}, {"name": "bbb", age: 23}],
      total: 888,
    })

    const paginationProps = ref({
      pageSize: page_size,
      page: current.value,
      onChange: (page) => handleUserTableChange(page),
      total: userTotal.value,
    })

    onMounted(() => {
      GetUserList(1, page_size)
    })

    function GetDetail (record) {
      console.log("GetDetail...")
      console.log(record)
      console.log(record.userId)
    }

    function handleUserTableChange (idx) {
      console.log(idx)
      GetUserList(idx, page_size)
    }

    function showModal () {

      visible.value = true;
    }

    function handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    }

    function GetUserList (page, page_size) {
      const p = {"page": page, "page_size": page_size}
      store.dispatch("Get_User_List", p)
    }

    function EditUser (record) {
      console.log("EditUser....")
      showModal()
    }

    function DeleteUser (record) {
      console.log("DeleteUser....")
      store.dispatch("Delete_User",record.userId).then(res=>{
        console.log(res)
        if (user_deleted){
          message.info("操作成功")
          GetUserList(current,page_size)
        }
      })

    }

    function UpdateUser (record) {

    }

    return {
      ...toRefs(state),
      users,
      columns,
      visible,
      pwd,
      confirmLoading,
      paginationProps,
      handleUserTableChange,
      current,
      GetDetail,
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
