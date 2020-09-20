import axios from "axios";


export default {
  Get_User_List ({commit},payload) {
    console.log(payload)
    try {
      axios.get("http://localhost:9090/api/user/list").then(res => {
        // console.log(res["entity"]["status"])
        if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
          let entity = res["data"]["entity"]
          console.log(entity)
          commit("Get_User_List_Mutation", entity)
        } else {
          console.log("00000000")
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
}
