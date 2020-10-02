<template>
  <h1>订单列表</h1>
  <a-table :columns="columns" :data-source="orders" :pagination="paginationProps">
    <template v-slot:nickName="{ text }">
      {{ text }}
    </template>
    <template v-slot:mobile="{ text }">
      {{ text }}
    </template>
    <template v-slot:totalPrice="{ text }">
      {{ text }}
    </template>
    <template v-slot:payStatus="{ text }">
      {{ text }}
    </template>
    <template v-slot:action="{ text, record }">
      <span>
        <a @click="EditOrder(record)">编辑</a>
        <a-divider type="vertical"/>
        <span v-if="record.isDeleted">
          <a @click="DeleteOrder(record)">恢复</a>
        </span>
        <span v-else>
          <a @click="DeleteOrder(record)">删除</a>
        </span>

      </span>
    </template>
    <template #expandedRowRender="{ record }">
      <p class="hiddenContent">
        <span class="title">订单ID:</span>{{ record.orderId }}
      </p>
      <p class="hiddenContent">
        <span class="title">支付类型:</span>{{ record.payType}}
      </p>
      <p class="hiddenContent">
        <span class="title">支付时间:</span>{{ record.payTime }}
      </p>
      <p class="hiddenContent">
        <span class="title">订单状态:</span>{{ record.orderStatus }}
      </p>
      <p class="hiddenContent">
        <span class="title">收获地址:</span>{{ record.userAddress }}
      </p>
      <p class="hiddenContent">
        <span class="title">留言:</span>{{ record.extraInfo }}
      </p>
    </template>
  </a-table>
  <template>
    <div>
      <a-button type="primary" @click="showOrderModal">
      </a-button>
      <a-modal
          title="修改商品信息"
          v-model:visible="order_visible"
          :confirm-loading="confirmOrderLoading"
          @ok="handleOrderOk"
      >
        <p>
          <a-input v-model:value="nickName" placeholder="请输入用户昵称"/>
          <br/><br/>
          <a-input v-model:value="mobile" placeholder="请输入手机号码"/>
          <br/><br/>
          <a-input v-model:value="userAddress" placeholder="请输入收货地址"/>
          <br/><br/>
        </p>
      </a-modal>
    </div>
  </template>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

export default {
name: "Order",
  setup () {
    const columns = ref(
        [
          {
            title: '用户昵称',
            dataIndex: 'nickName',
            key: 'nickName',
          },
          {
            title: '手机号码',
            dataIndex: 'mobile',
            key: 'mobile',
          },
          {
            title: '商品总价',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
          },
          {
            title: '支付状态',
            key: 'payStatus',
            dataIndex: 'payStatus',
          },
          {
            title: '操作',
            key: 'action',
            slots: {customRender: 'action'},
          },
        ]
    )
    let orderId=ref("")
    let nickName = ref("")
    let mobile = ref("")
    let userAddress = ref("")
    let totalPrice = ref("")
    let payStatus = ref("")
    let confirmOrderLoading = ref(false)
    let currentOrder = ref(1)
    let order_visible = ref(false)
    const page_size = ref(10)
    const orders = computed(() => store.state.order_list)
    const orderTotal = computed(() => store.state.order_total)
    const orderInfo = computed(() => store.state.order_info)

    const store = useStore()

    onMounted(() => {
      GetOrderList(currentOrder.value, page_size.value)
    })

    function GetOrderList (page, size) {
      let p = {"Page": page, "PageSize": size}
      store.dispatch("Get_Order_List", p)
    }

    const paginationProps = ref({
      pageSize: page_size.value,
      page: currentOrder.value,
      onChange: (page) => handleProductTableChange(page),
      total: orderTotal,
    })

    function handleProductTableChange (idx) {
      currentOrder.value = idx
      GetOrderList(idx, page_size.value)
    }

    async function DeleteOrder (record) {
      let orderId = record.orderId
      await store.dispatch("Delete_Order", orderId)
      GetOrderList(currentOrder.value, page_size.value)
    }

    function showOrderModal () {
      order_visible.value = true;
    }

    async function EditProduct (record) {
      console.log('EditProduct')
      orderId = record.orderId
      nickName = record.nickName
      mobile = record.mobile
      totalPrice = record.totalPrice
      payStatus = record.payStatus
      await store.dispatch("Get_Order_Info", orderId)
      showOrderModal()
    }

    async function handleOrderOk (e) {
      await UpdateOrder()
      confirmOrderLoading.value = true;
      setTimeout(() => {
        order_visible.value = false;
        confirmOrderLoading.value = false;
      }, 2000);
      GetOrderList(currentOrder.value, page_size.value)
    }

    function EditOrder (record) {
      console.log('EditOrder')
      orderId.value = record.orderId
      nickName.value = record.nickName
      mobile.value = record.mobile
      userAddress.value = record.userAddress
      showOrderModal()
    }

    async function UpdateOrder() {
      let param = {
        "orderId": orderId.value,
        "nickName": nickName.value,
        "mobile": mobile.value,
        "userAddress": userAddress.value,
      }
      console.log(param)
      await store.dispatch("Update_Order", param)
    }

    return {
      orders,
      orderInfo,
      columns,
      paginationProps,
      DeleteOrder,
      showOrderModal,
      confirmOrderLoading,
      handleOrderOk,
      EditOrder,
      order_visible,
      orderId,
      nickName,
      mobile,
      userAddress,
      totalPrice,
      payStatus,
    }
  }
}
</script>

<style scoped>

</style>
