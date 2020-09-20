import axios from "axios";


export default {
  Get_User_List ({commit}, payload) {
    console.log("Get_User_List actions")
    try {
      axios.get("http://localhost:9090/api/user/info/0cf259b7-12de-4d7a-9176-99e3239683e3").then(res => {
        // console.log(res["entity"]["status"])
        if (res["status"] === 200 && res["data"]["entity"]["code"] === 200) {
          let entity = res["data"]["entity"]["data"]
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
