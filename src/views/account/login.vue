<template>
  <div class="user-container">
    <!-- back是全局组件 -->
    <Back column="修改登录密码"></Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <!-- 组件的双向绑定 -->
        <Username :value.sync="form.username" />
        <PasswordVue :passwordConfirm="form.passwordConfirm" :value.sync="form.password" />
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-black">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="text-right">
      <router-link to="/forget" class="color-white opacity-4">忘记密码</router-link>
    </div>
  </div>
</template>

<script>
import Username from "@/components/account/username"
import PasswordVue from "@/components/account/password"
export default {
  name: "Password",
  components: { Username, PasswordVue },
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          alert("submit!")
        } else {
          console.log("error submit!!")
          return false
        }
      })
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss"></style>
