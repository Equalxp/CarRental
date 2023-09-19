<template>
  <div class="amap-wrap">
    <el-amap :amap-manager="amapManager" vid="amapContainer" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      <!--覆盖物 - 圆-->
      <el-amap-circle v-for="item in circle" :key="item.id" :center="item.center" :radius="item.radius" :fillColor="item.color" :strokeColor="item.color" :strokeOpacity="item.strokeOpacity" :strokeWeight="item.strokeWeight"></el-amap-circle>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap"
let amapManager = new AMapManager()
export default {
  name: "Amap",
  data() {
    const _this = this
    return {
      map: null,
      amapManager,
      center: [121.59996, 31.197646],
      zoom: 18,
      // self position
      self_lng: "",
      self_lat: "",
      events: {
        init(o) {
          // 实例化基于高德sdk
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap()
          })
        }
      },
      // 自身定位
      circle: [
        {
          center: [121.59996, 31.197646],
          radius: 4,
          color: "#393e43",
          strokeOpacity: "0.2",
          strokeWeight: "30"
        }
      ],
      // 停车场位置
      parkingData: {},
      // 停车场信息
      parkingInfo: []
    }
  },
  methods: {
    initMap() {
      // 返回地图实例
      this.map = amapManager.getMap()
      // 地图初始化完成回调
      this.$emit("callbackComponent", {
        // 带出去func
        function: "loadMap"
      })
      // // // 自身定位
      // // this.selfLocation()
      // // 浏览器定位
      
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.amap-wrap {
  height: 100vh;
}
</style>
