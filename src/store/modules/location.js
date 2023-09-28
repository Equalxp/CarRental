const state = {
  selfLocation: true,
  // 停车场ID，
  parking_id: []
}
const mutations = {
  SELF_LOCATION(state) {
    // console.log(111);
    state.selfLocation = !state.selfLocation
  },
  SET_PARKING_ID(state, value) {
    state.parking_id = value;
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