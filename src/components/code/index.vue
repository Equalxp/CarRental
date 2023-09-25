<template>
  <el-form-item prop="code" :rules="rules">
    <el-button class="button-vcode" :loading="loading" :disabled="disabled" @click="handlerCode">{{ button_text }}</el-button>
    <el-input v-model="code" placeholder="验证码" v-on:input="enterInput"></el-input>
  </el-form-item>
</template>

<script>
import { GetCode } from "@/api/account"
export default {
  name: "Code",
  components: {},
  props: {
    // 得手机号input框验证过了 才有值 再被监听
    username: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 按钮状态
      disabled: true,
      // 按钮文本
      button_text: "获取验证码",
      // 按钮加载状态
      loading: false,
      // 验证码
      code: "",
      // 定时器
      timer: null,
      // 校验规则
      rules: [
        { required: true, message: "验证不能为空", trigger: "blur" },
        { min: 6, max: 6, message: "请输入6位字符的验证码", trigger: "change" }
      ]
    }
  },
  methods: {
    enterInput() {
      this.$emit("update:value", this.code)
    },
    // 获取验证码
    handlerCode() {
      const requestData = {
        username: this.username,
        module: "register"
      }
      this.loading = true
      GetCode(requestData)
        .then(response => {
          console.log("getCode", response)
          this.$message({
            type: "success",
            message: response.message
          })
          this.loading = false
          // 倒计时函数
          this.countDown()
        })
        .catch(error => {
          this.loading = false
        })
    },
    // 验证码倒计时函数
    countDown() {
      let second = 60
      this.button_text = `倒计时${second}秒` // 初始化文本
      // 禁用按钮
      this.disabled = true
      // 倒计时
      this.timer = setInterval(() => {
        // 累减
        second--
        // 再次初始化文本
        this.button_text = `倒计时${second}秒`
        // 为 0 时，清除定时器
        if (second === 0) {
          // 再次初始化文本
          this.button_text = `重新获取`
          // 激活按钮
          this.disabled = false
          // 清除定时器
          clearInterval(this.timer)
        }
      }, 1000)
    }
  },
  watch: {
    // username是props接收的值
    username: {
      handler(newValue, oldValue) {
        this.disabled = newValue ? false : true
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
