import axios from "axios";


export default {
  Get_User_List ({commit}, payload) {
    try {
      let url = `http://localhost:9090/api/user/list?Page=${payload["Page"]}&PageSize=${payload["PageSize"]}`
      axios.get(url).then(res => {
        if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
          let entity = res["data"]["entity"]
          commit("Get_User_List_Mutation", entity)
        } else {
          console.log("00000000")
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  async Get_User_Info({commit},userId){
    try{
      let url = `http://localhost:9090/api/user/info/${userId}`
      await axios.get(url).then(res=>{
        if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
          let entity = res["data"]["entity"]
          commit("Get_User_Info_Mutation", entity)
        } else {
          console.log("00000000")
        }
      })
    }catch (e){
      console.error(e)
    }
  },
  async Delete_User ({commit}, userId) {
    await axios.post("http://localhost:9090/api/user/delete/" + userId).then(res => {
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Delete_USer")
      } else {
        console.log("删除用户失败")
      }
    })
  },
  async Update_User({commit},payload){
    await axios.post("http://localhost:9090/api/user/edit",payload).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Edit_USer")
      } else {
        console.log("更新用户失败")
      }
    })
  },
  async Get_Product_List({commit},payload){
    let url = `http://localhost:9090/api/product/list?Page=${payload["Page"]}&PageSize=${payload["PageSize"]}`
    await axios.get(url).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        let entity = res["data"]["entity"]
        commit("Get_Product_List_Mutation", entity)
      } else {
        console.log("00000000")
      }
    })
  },
  async Get_Product_Info({commit},productId){
    try{
      let url = `http://localhost:9090/api/product/info/${productId}`
      console.log(url)
      await axios.get(url).then(res=>{
        if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
          let entity = res["data"]["entity"]
          console.log(entity)
          commit("Get_Product_Info_Mutation", entity)
        } else {
          console.log("00000000")
        }
      })
    }catch (e){
      console.error(e)
    }
  },
  async Update_Product({commit},payload){
    console.log("Update_Product")
    console.log(payload)
    await axios.post("http://localhost:9090/api/product/edit",payload).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Edit_USer")
      } else {
        console.log("更新商品失败")
      }
    })
  },
  async Delete_Product ({commit}, productId) {
    await axios.post("http://localhost:9090/api/product/delete/" + productId).then(res => {
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Delete_Product")
      } else {
        console.log("删除商品失败")
      }
    })
  },
  async ADD_Banner({commit},payload){
    let url = "http://localhost:9090/api/banner/add"
    await axios.post(url,payload).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        let entity = res["data"]["entity"]
        commit("ADD_Banner_Mutation", entity)
      } else {
        console.log("00000000")
      }
    })
  },
  async Get_Banner_List({commit},payload){
    let url = `http://localhost:9090/api/banner/list?Page=${payload["Page"]}&PageSize=${payload["PageSize"]}`
    await axios.get(url).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        let entity = res["data"]["entity"]
        commit("Get_Banner_List_Mutation", entity)
      } else {
        console.log("00000000")
      }
    })
  },
  async Get_Banner_Info({commit},bannerId){
    try{
      let url = `http://localhost:9090/api/banner/info/${bannerId}`
      await axios.get(url).then(res=>{
        if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
          let entity = res["data"]["entity"]
          console.log(entity)
          commit("Get_Banner_Info_Mutation", entity)
        } else {
          console.log("00000000")
        }
      })
    }catch (e){
      console.error(e)
    }
  },
  async Update_Banner({commit},payload){
    await axios.post("http://localhost:9090/api/banner/edit",payload).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Edit_USer")
      } else {
        console.log("更新商品失败")
      }
    })
  },
  async Delete_Banner ({commit}, bannerId) {
    const url ="http://localhost:9090/api/banner/delete/" + bannerId
    console.log(url)
    await axios.post(url).then(res => {
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Delete_Banner")
      } else {
        console.log("删除商品失败")
      }
    })
  },
  async Get_Order_List({commit},payload){
    let url = `http://localhost:9090/api/order/list?Page=${payload["Page"]}&PageSize=${payload["PageSize"]}`
    console.log(url)
    await axios.get(url).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        let entity = res["data"]["entity"]
        commit("Get_Order_List_Mutation", entity)
      } else {
        console.log("00000000")
      }
    })
  },
  async Get_Order_Info({commit},bannerId){
    try{
      let url = `http://localhost:9090/api/order/info/${bannerId}`
      await axios.get(url).then(res=>{
        if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
          let entity = res["data"]["entity"]
          console.log(entity)
          commit("Get_Banner_Info_Mutation", entity)
        } else {
          console.log("00000000")
        }
      })
    }catch (e){
      console.error(e)
    }
  },
  async Update_Order({commit},payload){
    await axios.post("http://localhost:9090/api/order/edit",payload).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Edit_USer")
      } else {
        console.log("更新商品失败")
      }
    })
  },
  async Delete_Order ({commit}, bannerId) {
    const url ="http://localhost:9090/api/order/delete/" + bannerId
    console.log(url)
    await axios.post(url).then(res => {
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Delete_Banner")
      } else {
        console.log("删除商品失败")
      }
    })
  },
  async Get_Category_List({commit},payload){
    let url = `http://localhost:9090/api/category/list4backend?Page=${payload["Page"]}&PageSize=${payload["PageSize"]}`
    await axios.get(url).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        let entity = res["data"]["entity"]
        commit("Get_Category_List_Mutation", entity)
      } else {
        console.log("00000000")
      }
    })
  },
  async Get_Category_Info({commit},bannerId){
    try{
      let url = `http://localhost:9090/api/category/info/${bannerId}`
      await axios.get(url).then(res=>{
        if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
          let entity = res["data"]["entity"]
          console.log(entity)
          commit("Get_Category_Info_Mutation", entity)
        } else {
          console.log("00000000")
        }
      })
    }catch (e){
      console.error(e)
    }
  },
  async Update_Category({commit},payload){
    await axios.post("http://localhost:9090/api/category/edit",payload).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Edit_Category")
      } else {
        console.log("更新商品失败")
      }
    })
  },
  async Delete_Category({commit}, categoryId) {
    const url ="http://localhost:9090/api/category/delete/" + categoryId
    console.log(url)
    await axios.post(url).then(res => {
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Delete_Category")
      } else {
        console.log("删除分类失败")
      }
    })
  },
}
