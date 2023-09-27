<template>
  <div class="cars-wrap" v-if="carsList && carsList.length > 0">
    <div class="cars-swiper-wrap">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="item in carsList" :key="item.id">
          <CarsItem :data="item" />
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>

<script>
// cars item
import CarsItem from "./carsList/index.vue"
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import "swiper/css/swiper.css"
// api
import { GetCarsList } from "@/api/cars"
export default {
  name: "Cars",
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 50,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      carsList: []
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    CarsItem
  },
  methods: {
    // 接口请求
    getCarsList(parkingId) {
      // console.log("parkingId", parkingId)
      GetCarsList({ parkingId }).then(res => {
        // 变量名称一样的
        const data = res.data.data
        data && (this.carsList = data)
        // console.log("GetCarsList", this.carsList)
        // 请求完成之后 还原状态
        this.$store.commit("app/SET_CARS_LIST_REQUEST", false)
      })
    }
  },
  watch: {
    "$store.state.app.isClickCarsList": {
      handler(newValue) {
        if (!newValue) {
          // 清空数据
          this.carsList = []
        }
        this.$store.commit("app/SET_CARS_LIST_STATUS", true)
        // console.log("watch-isClickCarsList", newvalue)
      }
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
