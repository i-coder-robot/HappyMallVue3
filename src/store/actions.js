import axios from "axios";


export default {
  Get_User_List ({commit}, payload) {
    try {
      axios.get("http://localhost:9090/api/user/list").then(res => {
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
  async Delete_User ({commit}, payload) {
    await axios.post("http://localhost:9090/api/user/delete/" + payload).then(res => {
      if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
        commit("Delete_USer")
      } else {
        console.log("删除用户失败")
      }
    })
  },
}
