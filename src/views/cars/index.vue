<template>
  <div class="index-wrap">
    <section class="cars-item">
      <header>
        <h4 class="cars-logo">
          <img src="../../assets/images/cars-logo.png" alt="" />
          <span class="name">Mustang 2020</span>
        </h4>
        <p class="cars-attr">新能源汽车 5座</p>
      </header>
      <div class="cars-content">
        <div class="info">
          <div>
            <h4 class="cars-number">湘 912299</h4>
            <div>
              <ul class="cars-electric active-li-9">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p class="km">
                <sub>约</sub>
                <strong>900</strong>
                <sub>KM</sub>
              </p>
            </div>
          </div>
        </div>
        <img src="../../assets/images/pic001.jpg" alt="" />
      </div>
      <footer>
        <a href="javascript:;" class="park-link">
          xxx停车场
        </a>
      </footer>
    </section>
    <span @click="user">汽车列表</span>
  </div>
</template>

<script>
export default {
  name: "Cars",
  data() {
    return {}
  },
  methods: {
    user() {
      this.$router.push({
        name: "User"
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
