<template>
  <a-table :columns="columns" :data-source="products" :pagination="paginationProps">
    <template v-slot:productName="{ text }">
      {{ text }}
    </template>
    <template v-slot:originalPrice="{ text }">
      {{ text }}
    </template>
    <template v-slot:sellingPrice="{ text }">
      {{ text }}
    </template>
    <template v-slot:stockNum="{ text }">
      {{ text }}
    </template>
    <template v-slot:action="{ text, record }">
      <span>
        <a>编辑</a>
        <a-divider type="vertical"/>
        <span v-if="record.isDeleted">
          <a @click="DeleteProduct(record)">上架</a>
        </span>
        <span v-else>
          <a @click="DeleteProduct(record)">删除</a>
        </span>

      </span>
    </template>
    <template #expandedRowRender="{ record }">
      <p class="hiddenContent">
        <span class="title">商品ID:</span>{{ record.productId }}
      </p>
      <p class="hiddenContent">
        <span class="title">商品简介:</span>{{ record.productIntro == "" ? "无": record.productIntro}}
      </p>
      <p class="hiddenContent">
        <span class="title">商品分类:</span>{{ record.categoryId }}
      </p>
      <p class="hiddenContent">
        <span class="title">商品封面:</span>{{ record.productCoverImg }}
      </p>
      <p class="hiddenContent">
        <span class="title">商品录播图:</span>{{ record.productBanner }}
      </p>
      <p class="hiddenContent">
        <span class="title">商品Tag:</span>{{ record.tag }}
      </p>
      <p class="hiddenContent">
        <span class="title">商品销售状态:</span>{{ record.sellStatus == 0 ? "销售中":"停止销售" }}
      </p>
      <p class="hiddenContent">
        <span class="title">商品详细内容:</span>{{ record.productDetailContent }}
      </p>
    </template>
  </a-table>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'

export default {
  name: "Product",
  setup () {
    const columns = ref(
        [
          {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
            slots: {title: 'customTitle', customRender: 'productName'},
          },
          {
            title: '原始价格',
            dataIndex: 'originalPrice',
            key: 'originalPrice',
          },
          {
            title: '销售价格',
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
          },
          {
            title: '库存',
            key: 'stockNum',
            dataIndex: 'stockNum',
            slots: {customRender: 'stockNum'},
          },
          {
            title: '操作',
            key: 'action',
            slots: {customRender: 'action'},
          },
        ]
    )
    let current = ref(1)
    const page_size = ref(10)
    const products = computed(() => store.state.product_list)
    const productTotal = computed(() => store.state.product_total)
    const store = useStore()
    onMounted(() => {
      GetProductList(current.value, page_size.value)
    })

    function GetProductList (page, size) {
      let p = {"Page": page, "PageSize": size}
      store.dispatch("Get_Product_List", p)
    }

    const paginationProps = ref({
      pageSize: page_size.value,
      page: current.value,
      onChange: (page) => handleProductTableChange(page),
      total: productTotal,
    })

    function handleProductTableChange (idx) {
      current.value = idx
      GetProductList(idx, page_size.value)
    }

    async function DeleteProduct(record) {
      let productId = record.productId
      await store.dispatch("Delete_Product",productId)
      GetProductList(current.value,page_size.value)
    }

    return {
      products,
      columns,
      paginationProps,
      DeleteProduct,
    }
  }
}
</script>

<style scoped>
.title{
  padding-right: 20px;
}
hiddenContent {
  margin-left: 0;
  margin-bottom: 5px;
}
</style>
