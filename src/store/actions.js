// import {GetUserListApi} from "../service/userApi";

export default {
  async Get_User_List ({commit}, payload) {
    console.log("Get_User_List actions")
    // try {
    //   await GetUserListApi(payload["current_page"], payload["page_size"]).then(res => {
    //     if (res["entity"]["code"] === 200) {
    //       let entity = res["entity"]
    //       commit("Get_User_List_Mutation", entity)
    //     } else {
    //       console.log("00000000")
    //     }
    //   })
    // } catch (e) {
    //   console.error(e)
    // }
  },
}
