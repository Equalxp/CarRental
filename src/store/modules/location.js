const state = {
  selfLocation: true
}
const mutations = {
  SELF_LOCATION(state) {
    // console.log(111);
    state.selfLocation = !state.selfLocation
  }
}
const getters = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}