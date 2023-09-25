const state = {
  // 是否点击车辆列表
  isClickCarsList: true,
  // 是否请求车辆列表 区分停车场和其他
  isRequestCarsList: false
}
const mutations = {
  SET_CARS_LIST_STATUS(state, value) {
    // console.log('SET_CARS_LIST_STATUS', value);
    state.isClickCarsList = value
  },
  SET_CARS_LIST_REQUEST(state, value) {
    // console.log('SET_CARS_LIST_REQUEST', value);
    state.isRequestCarsList = value
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