
export default {
  Get_User_List_Mutation (state, entity) {
    state.user_list = entity["data"]
    console.log(state.user_list)
    state.user_total = entity["total"]
    state.user_total_page = entity["totalPage"]
  },
}
