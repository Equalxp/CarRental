const state = {
  routerName: ""
}
const getters = {}
const mutations = {
  SET_ROUTER_NAME(state, value) {
    state.routerName = value;
  },
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

