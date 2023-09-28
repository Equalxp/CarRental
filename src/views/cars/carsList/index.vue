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
            <span class="name">{{ data.carsMode }}</span>
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
          <!-- id进行匹配 -->
          <li v-for="item in leaseListData" :class="{ current: leaseId == item.carsLeaseTypeId }" :key="item.carsLeaseTypeId" @click="selectLeaseType(item)">
            <h4 class="name">{{ item.carsLeaseTypeName }}</h4>
            <span class="price">￥{{ item.price }}</span>
          </li>
        </ul>
        <div class="clause-dec">
          <span class="pull-left">参保《全面保障服务》用车更放心</span>
          <i></i>
        </div>
      </div>
      <a href="javascript: void(0);" class="select-car-btn" @click="confirmCars">预约用车</a>
    </section>
  </div>
</template>

<script>
import { getCarsAttrKey } from "@/utils/format"
// API
import { GetLeaseList, ConfirmCars } from "@/api/cars"
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
      timer: null,
      // 租赁类型列表
      leaseListData: [],
      // 租赁ID
      leaseId: "",
      // token
      token: this.$store.state.account.token,
      // 检验提示
      message_item: this.$store.state.config.message_item,
      // 临时使用
      backup_key: "",
      // 用户审核
      arr: ["check_real_name", "check_cars", "gilding", "illegalAmount"]
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
      // 请求接口
      this.getLaseList()
    },
    // 获取租赁列表
    getLaseList() {
      if (this.leaseListData && this.leaseListData.length > 0) {
        return false
      }
      // 发请求得到租赁类型
      GetLeaseList({ carsId: this.data.id }).then(response => {
        const dataItem = response.data
        if (dataItem) {
          this.leaseListData = dataItem.data
        }
      })
    },
    // 选择租赁类型
    selectLeaseType(data) {
      // console.log('selectLeaseType',data)
      // 租赁id
      this.leaseId = data.carsLeaseTypeId
    },
    closeCarsInfo() {
      this.cars_info_height = "0px"
      this.cars_info_show = false
    },
    // 预约用车
    confirmCars() {
      // 判断用户是登录
      if (!this.token) {
        this.$message({
          message: "请先登录",
          type: "error"
        })
        this.$router.push({
          name: "Login"
        })
        return false
      }
      // 是否选择租车类型
      if (!this.leaseId) {
        this.$message({
          message: "请选择租车类型",
          type: "error"
        })
        return false
      }
      const requestData = {
        cars_id: this.data.id,
        // 需要选择点击
        cars_lease_type_id: this.leaseId
      }
      // 发请求预约用车
      ConfirmCars(requestData).then(res => {
        const data = res.data
        // 会返回没有通过的if的key值 :[check_real_name]
        const key = Object.keys(data)
        if (key && key.length > 0) {
          // 临时存储
          this.backup_key = key[0]
          // 实名认证 驾驶证 押金 违约金
          if (this.arr.includes(key[0])) {
            let message = ""
            let msg = this.message_item[key[0]].msg
            msg && (message = msg)
            // 弹窗提示
            this.$confirm(message, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              // 进行路由跳转
              let router = this.message_item[this.backup_key].router
              console.log("confirm", this.message_item[this.backup_key])
              if (router) {
                this.$router.push({
                  // 跳转路由
                  name: router,
                  query: {
                    // type为携带的参数
                    type: this.message_item[this.backup_key].type
                  }
                })
              }
              this.$message({
                message: res.message,
                type: "success"
              })
            })
          } else {
            // 已经预订其他车辆
            this.$message({
              message: this.message_item[this.backup_key].msg,
              type: "error"
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
