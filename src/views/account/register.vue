<template>
  <div class="user-container">
    <!-- back是全局组件 -->
    <Back column="修改登录密码">
      <template v-slot:navHeaderRight>
        <router-link to="/login" class="color-white opacity-4">登录</router-link>
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <!-- 组件的v-model双向数据绑定  -->
        <Username :value.sync="form.username" />
        <!-- 自身是密码(双向绑定) 接收'确认密码'的值 -->
        <PasswordVue :passwordConfirm="form.passwordConfirm" :value.sync="form.password" />
        <!-- 自身是确认密码 接收'密码'的值 -->
        <PasswordConfirm :password="form.password" :value.sync="form.passwordConfirm" />
        <Code :username="form.username" :value.sync="form.code" />
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
import PasswordConfirm from "@/components/account/passwordConfirm"
import Code from "@/components/code/"
export default {
  name: "Password",
  components: { Username, Code, PasswordVue, PasswordConfirm },
  data() {
    return {
      form: {
        username: "",
        password: "",
        passwordConfirm: "",
        code: ""
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
