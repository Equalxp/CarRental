<template>
  <!-- 验证 自定义检验规则 -->
  <el-form-item prop="password" :rules="[{ validator: validatePassword, trigger: 'change' }]">
    <!-- password双向绑定 -->
    <el-input v-model="password" :placeholder="placeholder" v-on:input="enterInput"></el-input>
  </el-form-item>
</template>

<script>
import { validate_password } from "@/utils/validate"
export default {
  name: "Password",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "密码"
    },
    // 确认密码的值
    passwordConfirm: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      password: ""
    }
  },
  methods: {
    validatePassword(rule, value, callback) {
      // 校验规则
      if (!this.password || this.password == "") {
        return callback(new Error("密码不能为空"))
      } else if (!validate_password(this.password)) {
        return callback(new Error("密码为6~20的英文和数字组合"))
      } else if (this.passwordConfirm && this.password != this.passwordConfirm) {
        return callback(new Error("两次密码不一致"))
      } else {
        callback()
      }
    },
    enterInput() {
      // 通过验证 得到input框的值
      const valiStatus = validate_password(this.password)
      let value = valiStatus ? this.password : ""
      // 组件的双向绑定 通过验证后将input框值穿给父组件
      // 父组件传来是value
      this.$emit("update:value", value)
    }
  },
  watch: {
    passwordConfirm: {
      handler(newValue, oldValue) {
        // this.validatePassword()  // 当做是一个 BUG 的存在，后续会解决此问题。
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
