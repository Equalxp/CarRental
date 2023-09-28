import Vue from "vue";
// 高德离线地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
Vue.config.productionTip = false
// 开发环境
window._AMapSecurityConfig = {
  securityJsCode: 'e6d108dc58d3e8cdd41541fea4d5b24a',
}
VueAMap.initAMapApiLoader({
  // 高德key
  key: 'ace3fb54b84765e4619fe5d7fcfd8554', // 自己到官网申请，我随便写的
  // 插件集合 （插件按需引入）
  plugin: ["AMap.Geolocation", "AMap.Walking"],
  v: '1.4.15', // 我也不知道为什么要写这个，不写项目会报错，而且我随便写的，跟我下载的版本对应不了
  uiVersion: '1.0.11' // ui版本号，也是需要写
})