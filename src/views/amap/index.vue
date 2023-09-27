<template>
  <div class="amap-wrap">
    <el-amap ref="map" :amap-manager="amapManager" vid="amapContainer" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      <!--覆盖物 - 圆-->
      <el-amap-circle-marker v-for="item in circle" :key="item.id" :center="item.center" :radius="item.radius" :fillColor="item.color" :strokeColor="item.color" :strokeOpacity="item.strokeOpacity" :strokeWeight="item.strokeWeight"></el-amap-circle-marker>
      <!--覆盖物 - 停车场-->
      <el-amap-marker v-for="(item, index) in parking" :key="item.id" :content="item.content" :position="item.position" :offset="item.offset" :vid="index"></el-amap-marker>
      <!--覆盖物 - 停车场车辆 -->
      <el-amap-marker v-for="(item, index) in parking" :extData="item" :events="item.events" :content="item.text" :key="item.id + index" :offset="item.offsetText" :position="item.position" :vid="index"></el-amap-marker>
      <!--覆盖物 - 停车场 - 距离信息-->
      <el-amap-marker v-for="(item, index) in parkingInfo" zInde="10000" :content="item.text" :key="item.id" :offset="item.offset" :position="item.position" :vid="index"></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import { SelfLocation } from "./location"
import { Walking } from "./walking"
// 样式
import StyleCss from "./style"
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
      circle: [],
      // 停车场位置
      parkingData: {},
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
      // 加载之后立即 自身定位
      this._selfLocation()
    },
    // 自身定位
    _selfLocation() {
      SelfLocation({
        map: this.map,
        complete: val => this.selfLocationComplete(val)
      })
    },
    // 自身定位完成的回调
    selfLocationComplete(data) {
      this.self_lng = data.position.lng
      this.self_lat = data.position.lat
      // console.log("selfLocationComplete", this.self_lng, this.self_lat)
      const json = {
        // center: [121.59996, 31.197646],
        center: [0, 0],
        radius: 4,
        color: "#393e43",
        strokeOpacity: 0.2,
        strokeWeight: 30
      }
      json.center = [this.self_lng, this.self_lat]
      this.circle.push(json)
    },
    // 数据存储
    saveData(params) {
      if (this[params.key]) {
        this[params.key] = params.value
      }
    },
    // 处理路线
    handlerWalking(lnglat) {
      // console.log('Walking');
      // 路线规划
      Walking({
        map: this.map,
        position_start: [this.self_lng, this.self_lat],
        position_end: lnglat,
        complete: val => this.handlerWalkingCompelete(val)
      })
    },
    handlerWalkingCompelete(data) {
      // console.log("handlerWalkingCompelete", data)
      // console.log("handlerWalkingCompelete", this.parkingData)
      this.parkingInfo = [
        {
          // 数据处理
          position: this.parkingData.lnglat.split(","),
          text: `<div style='${StyleCss.parkingInfoWrap}'>
                    <span style="${StyleCss.parkingInfoNumber}">${this.parkingData.carsNumber}</span>
                    辆车<span style="${StyleCss.parkingInfoLine}"></span>距离您${data.routes[0].distance}米
                  </div>`,
          offset: [-15, -54]
        }
      ]
    }
  },
  mounted() {},
  props: {
    parking: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    // 监听
    "$store.state.location.selfLocation": {
      handler() {
        console.log("调用selfLocation")
        this._selfLocation()
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
