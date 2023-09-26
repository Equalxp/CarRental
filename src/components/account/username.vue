<template>
  <!-- v-on:input监听input事件 -->
  <el-form-item prop="username" :rules="[{ validator: validateUsername, trigger: 'change' }]">
    <el-input v-model="username" :placeholder="placeholder" v-on:input="enterInput" minlength="6" maxlength="11"></el-input>
  </el-form-item>
</template>

<script>
import { validate_phone } from "@/utils/validate"
export default {
  name: "Username",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "手机号"
    }
  },
  data() {
    return {
      username: ""
    }
  },
  methods: {
    validateUsername(rule, value, callback) {
      if (!this.username || this.username == "") {
        return callback(new Error("手机号不能为空"))
      } else if (!validate_phone(this.username)) {
        return callback(new Error("手机号格式不正确"))
      } else {
        callback()
      }
    },
    // input值改变就会触发这个函数
    enterInput() {
      // 1.验证
      const valiStatus = validate_phone(this.username)
      let value = valiStatus ? this.username : ""
      // 验证通过之后就会把这个input框的值传出去
      this.$emit("update:value", value)
    }
  }
}
</script>
<style lang="scss" scoped></style>
