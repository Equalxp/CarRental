<template>
  <div>
    <section @click="openCarsInfo" class="cars-item">
      <header>
        <h4 class="cars-logo">
          <img src="../../../assets/images/cars-logo.png" alt="" />
          <span class="name">{{ data.carsMode }}</span>
        </h4>
        <p class="cars-attr">
          <span>{{ data.carsAttr | energyType }}</span>
          <span>{{ data.carsAttr | seatNumber }}座</span>
        </p>
      </header>
      <div class="cars-content">
        <div class="info">
          <div>
            <h4 class="cars-number">{{ data.carsNumber }}</h4>
            <div>
              <ul class="cars-electric" :class="data.electric | electricNumber">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p class="km">
                <sub>约</sub>
                <strong>{{ data.countKm }}</strong>
                <sub>KM</sub>
              </p>
            </div>
          </div>
        </div>
        <img src="../../../assets/images/pic001.jpg" alt="" />
      </div>
      <footer>
        <a href="javascript:;" class="park-link"> {{ data.parkingName }} </a>
      </footer>
    </section>
    <!-- 详情 -->
    <section class="cars-item cars-detailed" :style="'height:' + cars_info_height" v-if="cars_info_show">
      <div class="scroll">
        <h4 class="column">
          {{ data.parkingName }}
          <i class="close" @click="closeCarsInfo"></i>
        </h4>
        <header>
          <h4 class="cars-logo">
            <img src="../../../assets/images/cars-logo.png" alt="" />
            <span class="name">Mustang 2020</span>
          </h4>
          <p class="cars-attr">
            <span>{{ data.carsAttr | energyType }}</span>
            <span>{{ data.carsAttr | seatNumber }}座</span>
          </p>
        </header>
        <img src="../../../assets/images/pic001.jpg" alt="" />
        <div class="clearfix">
          <div class="fs-24 pull-left">{{ data.carsNumber }}</div>
          <p class="km pull-right">
            <sub>约</sub>
            <strong>{{ data.countKm }}</strong>
            <sub>KM</sub>
          </p>
        </div>
        <div class="cars-electric-box">
          <div class="p-r">
            <span class="e-high" :style="`width:${Math.round(data.oil / 10) * 10}%`"></span>
            <span class="e-bg"></span>
          </div>
        </div>
        <p class="info color-main text-center">取车约支付12.0元停车费，实际补贴12.0元</p>
        <ul class="cars-type-list">
          <li>
            <h4 class="name">日租车</h4>
            <span class="price">￥300/1天</span>
          </li>
          <li>
            <h4 class="name">日租车</h4>
            <span class="price">￥300/1天</span>
          </li>
          <li>
            <h4 class="name">日租车</h4>
            <span class="price">￥300/1天</span>
          </li>
        </ul>
        <div class="clause-dec">
          <span class="pull-left">参保《全面保障服务》用车更放心</span>
          <i></i>
        </div>
        <a href="javascript: void(0);" class="select-car-btn" @click="confirmCars">预约用车</a>
      </div>
    </section>
  </div>
</template>

<script>
import { getCarsAttrKey } from "@/utils/format"
export default {
  name: "CarsList",
  filters: {
    electricNumber(val) {
      //
      const numebr = Math.round(val / 10)
      return `active-li-${numebr}`
    },
    // 能源类型
    energyType(val) {
      return getCarsAttrKey({
        data: val,
        parerntKey: "basis",
        childKey: "energy_type"
      })
    },
    // 座位
    seatNumber(val) {
      return getCarsAttrKey({
        data: val,
        parerntKey: "car_body",
        childKey: "seat_number"
      })
    }
  },
  data() {
    return {
      cars_info_show: false,
      cars_info_height: 0,
      timer: null
    }
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getCarsInfo() {
      this.openCarsInfo()
    },
    openCarsInfo() {
      // 高度
      const viewHeight = document.documentElement.clientHeight || document.body.clientHeight
      // console.log("viewHeight", viewHeight)
      const height = viewHeight - 145
      this.cars_info_show = true
      // 详情的高度变化
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.cars_info_height = `${height}px`
        clearTimeout(this.timer)
      }, 10)
    },
    closeCarsInfo() {
      this.cars_info_height = "0px"
      this.cars_info_show = false
    },
    // 预约用车
    confirmCars() {}
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
