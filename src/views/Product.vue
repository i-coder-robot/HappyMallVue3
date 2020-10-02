<template>
  <h1>商品列表</h1>
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
        <a @click="EditProduct(record)">编辑</a>
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
        <span class="title">商品简介:</span>{{ record.productIntro == "" ? "无" : record.productIntro }}
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
        <span class="title">商品销售状态:</span>{{ record.sellStatus == 0 ? "销售中" : "停止销售" }}
      </p>
      <p class="hiddenContent">
        <span class="title">商品详细内容:</span>{{ record.productDetailContent }}
      </p>
    </template>
  </a-table>
  <template>
    <div>
      <a-button type="primary" @click="showProductModal">

      </a-button>
      <a-modal
          title="修改商品信息"
          v-model:visible="product_visible"
          :confirm-loading="confirmProductLoading"
          @ok="handleProductOk"
      >
        <p>
          <a-input v-model:value="productInfo.productName" placeholder="请输入商品名称"/>
          <br/><br/>
          <a-input v-model:value="productInfo.originalPrice" placeholder="请输入原始价格"/>
          <br/><br/>
          <a-input v-model:value="productInfo.sellingPrice" placeholder="请输入销售价格"/>
          <br/><br/>
          <a-input v-model:value="productInfo.stockNum" placeholder="请输入库存"/>
          <br/><br/>
        </p>
      </a-modal>
    </div>
  </template>
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
    let productId=ref("")
    let productName = ref("")
    let originalPrice = ref("")
    let sellingPrice = ref("")
    let stockNum = ref("")
    let confirmProductLoading = ref(false)
    let currentProduct = ref(1)
    let product_visible = ref(false)
    const page_size = ref(10)
    const products = computed(() => store.state.product_list)
    const productTotal = computed(() => store.state.product_total)
    const productInfo = computed(() => store.state.product_info)

    const store = useStore()

    onMounted(() => {
      GetProductList(currentProduct.value, page_size.value)
    })

    function GetProductList (page, size) {
      let p = {"Page": page, "PageSize": size}
      store.dispatch("Get_Product_List", p)
    }

    const paginationProps = ref({
      pageSize: page_size.value,
      page: currentProduct.value,
      onChange: (page) => handleProductTableChange(page),
      total: productTotal,
    })

    function handleProductTableChange (idx) {
      currentProduct.value = idx
      GetProductList(idx, page_size.value)
    }

    async function DeleteProduct (record) {
      let productId = record.productId
      await store.dispatch("Delete_Product", productId)
      GetProductList(currentProduct.value, page_size.value)
    }

    function showProductModal () {
      product_visible.value = true;
    }

    async function EditProduct (record) {
      console.log('EditProduct')
      productId = record.productId
      productName = record.productName
      originalPrice = record.originalPrice
      sellingPrice = record.sellingPrice
      stockNum = record.stockNum
      await store.dispatch("Get_Product_Info", productId)
      showProductModal()
    }

    async function handleProductOk (e) {
      await UpdateProduct()
      confirmProductLoading.value = true;
      setTimeout(() => {
        product_visible.value = false;
        confirmProductLoading.value = false;
      }, 2000);
      GetProductList(currentProduct.value, page_size.value)
    }

    async function UpdateProduct() {
      let p = productInfo.value
      let param = {
        "ProductId": p.productId,
        "ProductName": p.productName,
        "OriginalPrice": parseInt(p.originalPrice),
        "SellingPrice": parseInt(p.sellingPrice),
        "StockNum": parseInt(p.stockNum)
      }
      console.log(p)
      await store.dispatch("Update_Product", param)
    }

    return {
      products,
      productInfo,
      columns,
      paginationProps,
      DeleteProduct,
      showProductModal,
      confirmProductLoading,
      handleProductOk,
      EditProduct,
      product_visible,
      productId,
      productName,
      originalPrice,
      sellingPrice,
      stockNum,
    }
  }
}
</script>

<style scoped>
.page_width {
  width: 80%;
  margin: 0 auto;
}
.title {
  padding-right: 20px;
}

hiddenContent {
  margin-left: 0;
  margin-bottom: 5px;
}
</style>
