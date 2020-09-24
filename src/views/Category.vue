<template>
  <div class="page_width">

    <a-table :columns="columns" :data-source="categories" :pagination="paginationProps">
      <template v-slot:action="{ text, record }">
      <span>
        <a @click="EditCategory(record)">编辑</a>
        <span v-if="record.isDeleted">
          <a-divider type="vertical"/>
          <a @click="DeleteCategory(record)">上架</a>
        </span>
        <span v-else>
          <a-divider type="vertical"/>
          <a @click="DeleteCategory(record)">删除</a>
        </span>
      </span>
      </template>
    </a-table>
    <template>
      <div>
        <a-button type="primary" @click="showCategoryModal">
        </a-button>
        <a-modal
            title="修改用户信息"
            v-model:visible="category_visible"
            :confirm-loading="confirmCategoryLoading"
            @ok="handleBannerOk"
        >
          <p>
            <a-input v-model:value="C1Name" placeholder="一级分类名称"/>
            <br/><br/>
            <a-input v-model:value="C1Order" placeholder="一级分类排序"/>
            <br/><br/>
            <a-input v-model:value="C2Name" placeholder="二级分类名称"/>
            <br/><br/>
            <a-input v-model:value="C2Order" placeholder="二级分类排序"/>
            <br/><br/>
            <a-input v-model:value="C3Name" placeholder="三级分类名称"/>
            <br/><br/>
            <a-input v-model:value="C3Order" placeholder="三级分类排序"/>
            <br/><br/>
          </p>
        </a-modal>
      </div>
    </template>
  </div>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Category",
  setup () {
    const columns = ref(
        [
          {
            title: '一级分类名称',
            dataIndex: 'C1Name',
            key: 'C1Name',
          },
          {
            title: '一级分类描述',
            dataIndex: 'C1Desc',
            key: 'C1Desc',
          },
          {
            title: '一级分类排序',
            dataIndex: 'C1Order',
            key: 'C1Order',
          },
          {
            title: '二级分类名称',
            dataIndex: 'C2Name',
            key: 'C2Name',
          },
          {
            title: '二级分类排序',
            dataIndex: 'C2Order',
            key: 'C2Order',
          },
          {
            title: '三级分类名称',
            dataIndex: 'C3Name',
            key: 'C3Name',
          },
          {
            title: '三级分类排序',
            dataIndex: 'C3Order',
            key: 'C3Order',
          },
          {
            title: '操作',
            key: 'action',
            slots: {customRender: 'action'},
          },
        ]
    )
    let bannerId = ref("")
    let url = ref("")
    let redirectUrl = ref("")
    let order = ref("")
    let confirmCategoryLoading = ref(false)
    let currentBanner = ref(1)
    let category_visible = ref(false)
    const page_size = ref(10)
    const categories = computed(() => store.state.category_list)
    const bannerTotal = computed(() => store.state.category_total)
    const bannerInfo = computed(() => store.state.category_info)

    let C1CategoryID = ref("")
    let C1Name = ref("")
    let C1Desc = ref("")
    let C1Order = ref(0)
    let C2CategoryID = ref("")
    let C2Name = ref("")
    let C2Order = ref(0)
    let C3CategoryID = ref("")
    let C3Name = ref("")
    let C3Order = ref(0)

    const store = useStore()

    onMounted(() => {
      GetCategoryList(currentBanner.value, page_size.value)
    })

    function GetCategoryList (page, size) {
      let p = {"Page": page, "PageSize": size}
      store.dispatch("Get_Category_List", p)
    }

    const paginationProps = ref({
      pageSize: page_size.value,
      page: currentBanner.value,
      onChange: (page) => handleBannerTableChange(page),
      total: bannerTotal,
    })

    function handleBannerTableChange (idx) {
      currentBanner.value = idx
      GetCategoryList(idx, page_size.value)
    }

    async function DeleteCategory (record) {
      let bannerId = record.bannerId
      await store.dispatch("Delete_Banner", bannerId)
      GetCategoryList(currentBanner.value, page_size.value)
    }

    function showCategoryModal () {
      category_visible.value = true;
    }

    async function AddBanner () {
      showCategoryModal()
    }

    async function EditCategory (record) {
      console.log('EditProduct')
      console.log(record.value)
      C1Name.value = record.C1Name
      C1Desc.value = record.url
      C1Order.value = record.C1Order
      C2Name.value=record.C2Name
      C2Order.value = record.C2Order
      C3Name.value = record.C3Name
      C3Order.value = record.C3Order
      showCategoryModal()
    }

    async function handleBannerOk (e) {
      await UpdateBanner()
      confirmCategoryLoading.value = true;
      setTimeout(() => {
        category_visible.value = false;
        confirmCategoryLoading.value = false;
      }, 2000);
      await GetCategoryList(currentBanner.value, page_size.value)
    }

    async function UpdateBanner () {
      let param = {
        "bannerId": bannerId.value,
        "url": url.value,
        "redirectUrl": redirectUrl.value,
        "order": parseInt(order.value),
      }
      console.log(param)
      await store.dispatch("Update_Category", param)
    }

    return {
      categories,
      bannerInfo,
      columns,
      paginationProps,
      DeleteCategory,
      showCategoryModal,
      confirmCategoryLoading,
      handleBannerOk,
      EditCategory,
      category_visible,
      bannerId,
      url,
      redirectUrl,
      order,
      C1CategoryID,
      C1Name,
      C1Desc,
      C1Order,
      C2CategoryID,
      C2Name,
      C2Order,
      C3CategoryID,
      C3Name,
      C3Order,
    }
  }
}
</script>

<style scoped>

</style>
