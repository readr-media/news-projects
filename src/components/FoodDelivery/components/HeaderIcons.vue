<template>
  <div class="header-icons">
    <img class="header-icons__enter" src="/proj-assets/food-delivery/img/enter--comp.svg" alt="" @click="showTOC" v-show="isReportContent">
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
      'isReportContent'
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
  & img
    cursor pointer
    vertical-align middle
  &__enter
    width 20px
    transform scaleX(-1)
  &__wrapper
    margin-left auto
    & a
      display inline-block
      margin-right 20px
  &__donate
    // width 13.4px
    width 14.36px
    // margin-right 20px
  &__info
    width 25px
</style>