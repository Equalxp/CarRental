<template>
  <div class="amap-wrap">
    <el-amap ref="map" :amap-manager="amapManager" vid="amapContainer" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      <!--覆盖物 - 圆-->
      <el-amap-circle-marker v-for="item in circle" :key="item.id" :center="item.center" :radius="item.radius" :fillColor="item.color" :strokeColor="item.color" :strokeOpacity="item.strokeOpacity" :strokeWeight="item.strokeWeight"></el-amap-circle-marker>
      <!--覆盖物 - 停车场-->
      <el-amap-marker v-for="(item, index) in parking" :key="item.id" :content="item.content" :position="item.position" :offset="item.offset" :vid="index"></el-amap-marker>
      <!--覆盖物 - 停车场车辆 -->
      <el-amap-marker v-for="(item, index) in parkingCarsNumber" :content="item.text" :key="item.id + 1" :offset="item.offsetText" :position="item.position" :vid="index"></el-amap-marker>
      <!--覆盖物 - 停车场 - 距离信息-->
    </el-amap>
  </div>
</template>

<script>
import { SelfLocation } from "./location"
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
          // center: [121.59996, 31.197646],
          center: [0, 0],
          radius: 4,
          color: "#393e43",
          strokeOpacity: 0.2,
          strokeWeight: 30
        }
      ],
      // 停车场位置
      parking: [],
      //
      parkingCarsNumber: [],
      // 停车场信息
      parkingInfo: []
    }
  },
  methods: {
    // 初始化地图
    initMap() {
      // 返回地图实例
      this.map = amapManager.getMap()
      // 地图初始化完成回调
      this.$emit("callbackComponent", {
        // 带出去func
        function: "loadMap"
      })
      // 自身定位
      this.selfLocation()
    },
    // 自身定位
    selfLocation() {
      SelfLocation({
        map: this.map,
        complete: val => this.selfLocationComplete(val)
      })
    },
    selfLocationComplete(data) {
      const lng = data.position.lng
      const lat = data.position.lat
      console.log(lng, lat)
      this.circle[0].center = [lng, lat]
    },
    parkingData(data) {
      console.log(data)
      this.parking = data
      this.parkingCarsNumber = data
    }
  },
  mounted() {},
  props: {
    // parking: {
    //   type: Array,
    //   default: () => []
    // }
  },
  watch: {
    "$store.state.location.selfLocation": {
      handler() {
        console.log("调用selfLocation")
        this.selfLocation()
      }
    }
  }
}
</script>

<style lang="scss">
.amap-wrap {
  height: 100vh;
}
</style>
