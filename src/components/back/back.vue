<template>
  <div class="header-back">
    <header class="nav-header">
      <!-- <div class="back" @click="goBack"> -->
      <div class="back">
        <i class="icon"></i>
        <h4 class="title">{{ column }}</h4>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Back",
  props: {
    column: {
      type: String,
      default: ""
    }
  },
  data() {
    return {}
  },
  method: {
    goBack() {
      // this.$router.go(-1)
      console.log("路由回退")
    }
  }
}
</script>

<style lang="scss" scoped>
.header-back {
  position: relative;
  padding-bottom: 147px;
}
.back {
  position: absolute;
  top: 21px;
  left: 0;
  right: 0;
  height: 40px;
  // background-color: #fff;

  .title {
    font-size: 16px;
    margin-left: 33px;
    color: #fff;
  }
  .icon {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0;
    &:before {
      content: "";
      display: block;
      width: 14px;
      height: 14px;
      border-left: 3px solid rgb(35, 171, 224);
      border-top: 3px solid rgb(35, 171, 224);
      @include webkit(transform, rotate(-45deg));
      cursor: pointer;
    }
  }
}
</style>
