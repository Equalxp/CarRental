<template>
  <div class="user-container">
    <Back />
    <p class="payType">
      {{ pay_type == "illegal" ? "违章金额充值" : pay_type == "gilding" ? "押金充值" : "余额充值" }}
    </p>
    <div class="amount-list">
      <div class="item" v-for="item in data" :key="item.id" @click="checkAmount(item)">
        <!-- 点击的某个id = for下的某一个 -->
        <div class="a-wrap" :class="{ current: amount_id == item.id }" :id="item.id">{{ item.amount }}</div>
      </div>
    </div>
    <div class="cars-form-ui">
      <el-form ref="form">
        <el-form-item>
          <el-input v-model.number="amount_number" placeholder="请输入充值金额" v-on:input="inputEnter"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="blank-100"></div>
    <section class="section-mode">
      <header>
        <h4 class="title">支付类型</h4>
      </header>
      <div class="content">
        <ul class="links">
          <li class="">
            <span class="pull-left">微信</span>
            <i class="icon check-round current"></i>
          </li>
          <li>
            <span class="pull-left">支信宝</span>
            <i class="icon check-round"></i>
          </li>
        </ul>
      </div>
    </section>
    <div class="blank-100"></div>
    <el-button type="primary" class="button-block" :disabled="disabled_button" round @click="confirmSubmit">确认充值</el-button>
  </div>
</template>
<script>
import { AmountList, Pay } from "@/api/pay"
export default {
  name: "User",
  components: {},
  data() {
    return {
      data: [],
      // 不同金额的id
      amount_id: "",
      // 金额
      amount: "",
      // 输入的金额
      amount_number: "",
      // 充值类型 违章金额｜押金
      pay_type: this.$route.query.type,
      // disabled_button
      disabled_button: true
    }
  },
  beforeMount() {
    this.getAmountList()
  },
  methods: {
    // 获取充值列表
    getAmountList() {
      AmountList().then(response => {
        this.data = response.data
        // console.log("getAmountList", this.data)
      })
    },
    // 选择金额
    checkAmount(data) {
      this.amount_id = data.id
      this.amount = data.amount
      this.disabled_button = false
    },
    // 确认充值
    confirmSubmit() {
      /**
       * 1、只存在输入金额时，取输入金额
       * 2、只存在选项金额时，取选项金额
       * 3、如果两种都存在时，取选项金额
       */
      let amount = this.amount_number || this.amount
      if (this.amount_number && this.amount) {
        amount = this.amount
      }
      // pay请求
      Pay({ amount: this.amount, type: this.pay_type }).then(response => {
        console.log("paypay", response)
        // 点击支付完成之后会有一个回调
        const order_no = response.data.order_no
        const payUrl = response.data.pay_url
        // if (payUrl) {
        //   // 这个payurl是模拟的假的
        //   window.location.href = payUrl
        //   return false
        // }
        // 存储订单号
        localStorage.setItem("order_no", order_no)
        // 跳转支付
        this.$router.push({
          path: "/payStatus"
        })
      })
    },
    // 输入方法
    inputEnter() {
      const reg = /^[0-9]*$/
      const status = reg.test(this.amount_number)
      // console.log("REG_status", status)
      // true就赋值给false
      this.disabled_button = !status
    }
    /**
     * 支付功能 支付成功后回调地址 回到项目
     */
  }
}
</script>
<style lang="scss">
.section-mode {
  padding-bottom: 30px;
  margin-bottom: 30px;
  header {
    margin-bottom: 20px;
  }
  .title {
    font-size: 14px;
    color: #fff;
    opacity: 0.5;
  }
}
.price {
  color: #fff;
  span {
    font-size: 40px;
    font-family: "bahnschrift";
  }
  em {
    font-size: 18px;
  }
}
.goto {
  display: inline-block;
  height: 36px;
  padding: 0 20px;
  font-size: 18px;
  line-height: 36px;
  border: 2px solid #00a3ff;
  border-radius: 100px;
  color: #00a3ff;
}
.links {
  li {
    display: block;
    height: 20px;
    line-height: 20px;
    position: relative;
    padding: 11px 0;
    color: #fff;
    font-size: 16px;
  }
}
.payType {
  padding: 0px 123px 20px;
  font-size: 22px;
  color: #fff;
}
.amount-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  .item {
    padding: 0 10px;
    margin-bottom: 20px;
    flex: 1;
    @include webkit(box-sizing, border-box);
    width: 33.33333%;
    min-width: 33.33333%;
    max-width: 33.33333%;
    &:hover {
      cursor: pointer;
    }
  }
  .a-wrap {
    height: 48px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    color: #fff;
    font-family: "bahnschrift";
    line-height: 48px;
    font-size: 24px;
    &.current {
      background-color: #00a3ff;
      border: 1px solid #00a3ff;
    }
  }
}
.check-round {
  position: relative;
  float: right;
  width: 18px;
  height: 18px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    left: 3px;
    top: 6px;
    width: 10px;
    height: 4px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    @include webkit(transform, rotate(-45deg));
  }
  &.current {
    border: 1px solid #00a3ff;
    background-color: #00a3ff;
    &::before {
      content: "";
      border-left: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
  }
}
</style>
