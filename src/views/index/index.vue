<template>
  <div>
    <!-- 地图 -->
    <Map></Map>
    <!-- dom渲染操作 -->
    <Cars></Cars>
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
import NavBar from '@c/navbar'
export default {
  name: "Index",
  components: {
    Map,
    Cars,
    NavBar
  },
  data() {
    return {

    }
  },
  computed: {
    show() {
      const router = this.$route
      console.log(router);
      return router.name === 'Index' ? false : true
    }
  },
  // 监听路由的变化
  watch: {
  }
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
  -webkit-transition: all .3s ease 0s;
  -moz-transition: all .3s ease 0s;
  -ms-transition: all .3s ease 0s;
  -o-transition: all .3s ease 0s;
  transition: all .3s ease 0s;
  &.open {
    right: 0;
  }
}
</style>
