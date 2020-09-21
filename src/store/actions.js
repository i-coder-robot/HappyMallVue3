import axios from "axios";


export default {
  Get_User_List ({commit}, payload) {
    try {
      let url = `http://localhost:9090/api/user/list?Page=${payload["Page"]}&PageSize=${payload["PageSize"]}`
      console.log(url)
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
      console.log(url)
      await axios.get(url).then(res=>{
        if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
          let entity = res["data"]["entity"]
          console.log(entity)
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
        console.log("删除用户失败")
      }
    })
  },
  async Get_Product_List({commit},payload){
    let url = `http://localhost:9090/api/product/list?Page=${payload["Page"]}&PageSize=${payload["PageSize"]}`
    await axios.get(url).then(res=>{
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        let entity = res["data"]["entity"]
        console.log(entity)
        commit("Get_Product_List_Mutation", entity)
      } else {
        console.log("00000000")
      }
    })
  },
  async Delete_Product ({commit}, productId) {
    await axios.post("http://localhost:9090/api/product/delete/" + productId).then(res => {
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Delete_Product")
      } else {
        console.log("删除用户失败")
      }
    })
  },
}
