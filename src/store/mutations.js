
export default {
  Get_User_List_Mutation (state, entity) {
    state.user_list = entity["data"]
    state.user_total = entity["total"]
    state.user_total_page = entity["totalPage"]
  },
}
