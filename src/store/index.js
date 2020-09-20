import Vuex from 'vuex'
import actions from './actions'
import state from './state'
import mutations from './mutations'
export default Vuex.createStore({
  actions,
  state,
  mutations,
})
