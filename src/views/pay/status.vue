<template>
  <div class="user-container">
    <Back column="安全设置" />
    <div class="text-center color-white lh-40">
      <h4><strong>订单号</strong></h4>
      <p>a2121fads34fas31fa</p>
    </div>
    <div class="blank-40"></div>
    <div>
      <el-button type="warning" round class="button-block" @click="gotoPay"><strong>去支付</strong></el-button>
    </div>
    <div class="blank-20"></div>
    <div>
      <el-button type="primary" round class="button-block" @click="overPay"><strong>完成支付</strong></el-button>
    </div>
  </div>
</template>
<script>
import { OrderStatus } from "@/api/order"
export default {
  name: "PayStatus",
  components: {},
  data() {
    return {
      timer: null
    }
  },
  beforeMount() {
    // 查看订单状态
    this.getOrderStatus()
    this.setInter()
  },
  methods: {
    setInter() {
      this.timer = setInterval(() => {
        this.getOrderStatus()
      }, 3000)
    },
    // 1
    async getOrderStatus() {
      // 等待返回结果status
      const status = await this.orderStatus()
    },
    // 2 返回status
    orderStatus() {
      const order_no = localStorage.getItem("order_no")
      return OrderStatus({ order_no }).then(response => {
        const status = response.data.status
        return status
      })
    },
    // 3
    async gotoPay() {
      // 去拿status
      const status = await this.orderStatus()
      // 跳转去结果页面
      this.toResult(status)
    },
    // 完成支付
    async overPay() {
      const status = await this.orderStatus()
      this.toResult(status)
    },
    toResult(status) {
      if (status == "success") {
        clearInterval(this.timer)
        this.$router.replace({
          name: "PayResult",
          query: {
            status
          }
        })
      }
      if (status == "fail") {
      }
    }
  }
}
</script>
<style lang="scss"></style>
