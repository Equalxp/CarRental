<template>
  <div>
    <!-- 地图 -->
    <Map ref="map" :parking="parking" @callbackComponent="callbackComponent"></Map>
    <!-- dom渲染操作 -->
    <Cars ref="cars"></Cars>
    <!-- 导航 -->
    <NavBar></NavBar>
    <!-- 会员 -->
    <div id="children-view" :class="{ open: show }">
      <router-view />
    </div>
    <!-- login -->
    <LoginVue></LoginVue>
    <!-- 当前的订单使用车辆 -->
    <div class="cars_activation" v-if="cars_active_data && cars_active_data.order_no">
      <router-link :to="{ path: '/orderDetailed', query: { order_no: cars_active_data.order_no } }" class="color-white">正在使用的车辆</router-link>
    </div>
    <div class="button-groure" v-if="cars_active_data && cars_active_data.order_no">
      <div v-if="cars_active_data.order_status == 'RETURN'">
        停车场的ID：
        <el-button size="mini" v-for="item in parkingIdItem" :key="item" @click="parking_id = item" :type="parking_id == item ? 'primary' : ''">{{ item }}</el-button>
      </div>
      <el-button type="primary" size="small" @click="carsGet" v-if="cars_active_data.order_status == 'WAIT'">取车</el-button>
      <el-button type="primary" size="small" @click="carsReturns" v-if="cars_active_data.order_status == 'RETURN'">还车</el-button>
      <el-button type="primary" size="small" @click="carsCancel" v-if="cars_active_data.order_status == 'WAIT'">取消</el-button>
    </div>
  </div>
</template>

<script>
import Map from "../amap/index.vue"
import Cars from "../cars/index.vue"
import NavBar from "@c/navbar"
import LoginVue from "./login.vue"
import { Parking } from "@/api/parking"
import { GetCarsActivation, CarsGet, CarsReturn, CarsCancel, CarsReturns } from "@/api/order"
export default {
  name: "Index",
  components: {
    Map,
    Cars,
    NavBar,
    LoginVue
  },
  data() {
    return {
      parking: [],
      // 获取是字符串 转为json对象 用key取value
      cars_active_data: JSON.parse(localStorage.getItem("cars_active")),
      // 停车场id
      parking_id: ""
    }
  },
  beforeMount() {
    !this.order_no && this.getCarsActivation()
  },
  computed: {
    show() {
      // 非Index页面都会打开user
      const router = this.$route
      return router.name === "Index" ? false : true
    },
    parkingIdItem() {
      return this.$store.state.location.parking_id
    }
  },

  methods: {
    callbackComponent(params) {
      params.function && this[params.function](params.data)
    },
    // 地图回调
    loadMap() {
      // console.log(111);
      this.getParking()
    },
    // 获取停车场数据
    getParking() {
      Parking().then(response => {
        const data = response.data.data
        // console.log("getParking", data)
        data.forEach(item => {
          item.position = item.lnglat.split(",")
          item.content = "<img src='" + require("@/assets/images/parking_location_img.png") + "' />"
          item.offset = [-35, -60]
          item.offsetText = [-30, -55]
          // 可以停放的车辆
          item.text = `<div style="width: 60px; font-size: 20px; color: #fff; text-align: center;line-height: 50px; height: 60px;">${item.carsNumber}</div>`
          item.events = {
            click: val => {
              // 点击后 标记要"请求停车场"
              this.$store.commit("app/SET_CARS_LIST_REQUEST", true)
              // 路线规划
              this.walking(val)
              // 那停车场的id去请求
              this.getCarsList(val)
            }
          }
        })
        // 传参数
        this.parking = data
        // 获取停车场id
        const parkingId = data.map(item => item.id)
        this.$store.commit("location/SET_PARKING_ID", parkingId)
        console.log("parkingID", parkingId)
      })
    },
    walking(val) {
      // console.log("extDa ta", val.target.getExtData())
      const data = val.target.getExtData()
      this.$refs.map.saveData({
        key: "parkingData",
        value: data
      })
      // 直接传递经纬度
      this.$refs.map.handlerWalking(data.lnglat.split(","))
    },
    getCarsList(e) {
      const data = e.target.getExtData()
      // 父组件调用子组件方法
      this.$refs.cars && this.$refs.cars.getCarsList(data.id)
      // console.log("getCarsList", data)
    },
    // 获取正在使用的车辆
    getCarsActivation() {
      GetCarsActivation().then(response => {
        // console.log("GetCarsActivation", response)
        const data = response.data
        if (data) {
          // 1.先查找缓存 2.没有就请求
          this.cars_active_data = data
          // 存储的时候用字符串存储
          localStorage.setItem("cars_active", JSON.stringify(data))
        }
      })
    },
    // 取车
    carsGet() {
      CarsGet({ order_no: this.cars_active_data.order_no, cars_id: this.cars_active_data.cars_id }).then(response => {
        const data = response.data
        if (data && data.order_status) {
          this.$set(this.cars_active_data, "order_status", data.order_status)
          localStorage.setItem("cars_active", JSON.stringify(this.cars_active_data))
        }
      })
    },
    // 还车
    carsReturns() {
      CarsReturns({
        // 订单id 车id 停车场id
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id,
        parking_id: this.parking_id
      }).then(response => {
        this.$message({
          message: response.message,
          type: "success"
        })
        this.cars_active_data = null
        localStorage.removeItem("cars_active")
      })
    },
    // 取消
    carsCancel() {
      CarsCancel({ order_no: this.cars_active_data.order_no, cars_id: this.cars_active_data.cars_id }).then(response => {
        this.$message({
          message: response.message,
          type: "success"
        })
        this.cars_active_data = null
        localStorage.removeItem("cars_active")
      })
    }
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
.cars_activation {
  position: fixed;
  left: 20px;
  top: 20px;
  border-radius: 100px;
  padding: 10px 20px;
  font-size: 12px;
  background-color: green;
  color: #fff;
}
.button-groure {
  position: fixed;
  left: 20px;
  top: 60px;
}
</style>
