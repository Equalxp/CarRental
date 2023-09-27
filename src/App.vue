<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "APP",
  mounted() {
    document.addEventListener("mouseup", e => {
      // 获取子视图
      const userCon = document.getElementById("children-view")
      // 获取车辆列表
      const carsSwiper = document.getElementsByClassName("cars-wrap")[0]
      // 车辆列表存在 && 点击的不是列表范围
      if (carsSwiper && !carsSwiper.contains(e.target)) {
        // console.log("carsSwiper")
        // this.$store.commit("SET_CARS_LIST_STATUS", false)
        /**
         * 点击坐标时候 鼠标也是抬起 && 不在车辆列表范围 这时候要发请求
         * 获取数据 但是抬起时 是不在列表范围之内的 使用要隐藏列表
         * 发生冲突
         */
        // 鼠标抬起 是否是停车场请求
        const isRequestCarsList = this.$store.state.app.isRequestCarsList
        if (!isRequestCarsList) {
          // 点击不是要请求停车场数据
          this.$store.commit("app/SET_CARS_LIST_STATUS", false)
        }
      }
      // 是否包含 点击会员界面的其他地方就push
      // userCon存在 && userCon不包含点击的地方
      if (userCon && !userCon.contains(e.target)) {
        const routerName = this.$router.name
        if (routerName == "Index") {
          return false
        }
        this.$router.push(
          {
            name: "Index"
          },
          () => {},
          () => {}
        )
        // vue-router 实例上的 push 方法返回的是 promise 对象
        // 传入的参数希望是一个有成功和失败的回调不写报错
      }
    })
  }
}
</script>
<style lang="scss"></style>
