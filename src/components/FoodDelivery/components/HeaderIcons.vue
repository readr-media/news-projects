<template>
  <div class="header-icons">
    <img class="header-icons__enter" src="/proj-assets/food-delivery/img/enter--comp.svg" alt="" @click="showTOC" v-show="isMounted && isReportContent && $store.state.viewport[0] <= 767.98">
    <div class="header-icons__wrapper">
      <a href="https://www.readr.tw/donate" target="_blank"><img class="header-icons__donate" src="/proj-assets/food-delivery/img/donate--comp.svg" alt=""></a>
      <img class="header-icons__info" src="/proj-assets/food-delivery/img/info--comp.svg" alt="" @click="toggleInfo(true)">
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('FoodDelivery')

export default {
  name: 'HeaderIcons',
  computed: {
    ...mapState([
      'isReportContent',
      'isMounted'
    ])
  },
  methods: {
    ...mapMutations([
      'toggleInfo',
      'toggleReportContent'
    ]),
    showTOC () {
      this.toggleReportContent(false)
      this.$router.push('/project/food-delivery').catch((err) => {})
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.header-icons
  position fixed
  top 0
  height 84px
  display flex
  align-items center
  // justify-content space-between
  z-index 99
  width 100%
  padding-left 20px
  padding-right 20px
  box-sizing border-box
  user-select none
  max-width 800px
  @media (min-width $mobile)
    height 120px
    padding-left 40px
    padding-right 40px
  & img
    cursor pointer
    vertical-align middle
  &__enter
    width 20px
    transform scaleX(-1)
    @media (min-width $mobile)
      width 26px
    // @media (min-width $tablet)
    //   display none
  &__wrapper
    margin-left auto
    & a
      display inline-block
      margin-right 20px
      @media (min-width $mobile)
        margin-right 40px
  &__donate
    // width 13.4px
    width 14.36px
    // margin-right 20px
    @media (min-width $mobile)
      width 22.96px
  &__info
    width 25px
    @media (min-width $mobile)
      width 40px
</style>