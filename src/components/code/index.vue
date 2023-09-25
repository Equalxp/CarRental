<template>
  <el-form-item prop="code" :rules="rules">
    <button type="button" class="button-vcode" :disabled="disabled" @click="handlerCode">{{ button_text }}</button>
    <el-input v-model="code" placeholder="验证码" v-on:input="enterInput"></el-input>
  </el-form-item>
</template>

<script>
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
    handlerCode() {
      this.countDown()
    },
    countDown() {
      let second = 60
      this.button_text = `倒计时${second}秒`
      // 禁用按钮
      this.disabled = true
      this.timer = setInterval(() => {
        second--
        this.button_text = `倒计时${second}秒`
        if (second == 0) {
          // 初始化文本
          this.button_text = `重新获取`
          // 启用按钮
          this.disabled = false
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
