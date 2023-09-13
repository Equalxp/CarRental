<template>
  <div>
    <!-- 地图 -->
    <Map></Map>
    <!-- dom渲染操作 -->
    <!-- <Cars></Cars> -->
    <!-- 导航 -->
    <NavBar></NavBar>
    <!-- 会员 -->
    <div id="children-view" :class="{ open: show }">
      <router-view />
    </div>
    <!-- login -->
  </div>
</template>

<script>
import Map from "../amap/index.vue"
import Cars from "../cars/index.vue"
import NavBar from "@c/navbar"
export default {
  name: "Index",
  components: {
    Map,
    Cars,
    NavBar
  },
  data() {
    return {}
  },
  computed: {
    show() {
      // 非Index页面都会打开user
      const router = this.$route
      return router.name === "Index" ? false : true
    }
  },
  mounted() {
    document.addEventListener("mouseup", e => {
      const userCon = document.getElementById("children-view")
      // 是否包含 点击会员界面的其他地方就push
      if (userCon && !userCon.contains(e.target)) {
        // vue-router 实例上的 push 方法返回的是 promise 对象
        // 传入的参数希望是一个有成功和失败的回调不写报错
        this.$router.push({
          name: "Index"
        },()=>{},()=>{})
      }
    })
  },
  // 监听路由的变化
  watch: {}
}
</script>

<style lang="scss">
#children-view {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -600px;
  z-index: 101;
  width: 418px;
  background-color: #34393f;
  // @include webkit(transition, all .3s ease 0s);
  // @include webkit(box-shadow, -5px 0 38px 0 rgba(0, 0, 0, .4));
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -ms-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  &.open {
    right: 0;
  }
}
</style>
