// API
import { Register, Login } from "@/api/account";
// cookies
import { setToken, setUsername, removeToken, removeUsername, getToken, getUsername } from "@/utils/cookiesCars";
const state = {
  token: "" || getToken(),
  username: "" || getUsername() // 获取数据的来源
}
const getters = {}
const mutations = {
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
}
// 复用性
const actions = {
  registerAction(context, requestData) {
    return new Promise((resolve, reject) => { // 成功：resolve，失败：reject
      Register(requestData).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  },
  loginAction(context, requestData) {
    // 成功：resolve，失败：reject
    return new Promise((resolve, reject) => { 
      Login(requestData).then(response => {
        const data = response.data;
        console.log(data)
        context.commit("SET_TOKEN", data.token);
        context.commit("SET_USERNAME", data.username);
        setToken(data.token);
        setUsername(data.username);
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  },
  // 登出
  logoutAction(context, requestData) {
    return new Promise((resolve, reject) => {
      context.commit("SET_TOKEN", "");
      context.commit("SET_USERNAME", "");
      removeToken();
      removeUsername();
      resolve();
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};