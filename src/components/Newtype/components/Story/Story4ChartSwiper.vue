<template>
  <span class="story4chart-container">
    <span class="story4chart-title">台北市到校伴讀服務需求成長</span>
    <!-- desktop chart -->
    <img class="webchart" src="/proj-assets/newtype/images/story4/chart/web.png" alt="">
    <!-- mobile swiper -->
    <span v-swiper:mySwiper="swiperOption">
      <span class="swiper-wrapper">
        <span class="swiper-slide" v-for="banner in 4">
          <img :src="`/proj-assets/newtype/images/story4/chart/phone${banner}.png`" alt="">
        </span>
      </span>
      <span class="swiper-pagination"></span>
    </span>
    <span class="swiper-description">台北市教育局、民政局、賽珍珠基金會合作推出在校伴學服務，提供外語通譯人員（包含越南、英文、泰文、印尼語）陪伴銜轉學生一起到學校上課。</span>
    <span class="swiper-description">資料來源：賽珍珠基金會</span>
  </span>
</template>

<script>
import Vue from 'vue'
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}

export default {
  data () {
    return {
      banners: [ '/1.jpg', '/2.jpg', '/3.jpg' ],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPerView: 1,
        centeredSlides: true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../node_modules/swiper/dist/css/swiper.css'
span
  display block

.story4chart-container
  display flex
  flex-direction column
  justify-content center
  align-items center
  .story4chart-title
    margin 1em 0 1.5em 0
  .webchart
    width 100%
  .swiper-container
    display none
  .swiper-description
    font-size .75em
    margin 1.5em 0 1em 0
    &:last-of-type
      margin 1em 0 1.5em 0

@media (max-width: 767px)
  .story4chart-container
    .webchart
      display none
    .swiper-container
      display initial
      width calc(100vw - 4em)
      .swiper-wrapper
        // height 600px
        height calc(auto + 100px)
        width calc(100vw - 4em)
        display flex
        justify-content center
        align-items center
        .swiper-slide
          text-align center
          display flex
          justify-content center
          align-items center
          transform translateX(calc((100vw - 4em) * 1.5))
          img
            width calc(100vw - 4em)
            height calc(auto + 100px)
      .swiper-pagination
        bottom 0
    .swiper-description
      font-size .75em
      margin .5rem 0
      &:last-of-type
        margin .5em 0 1em 0
</style>

