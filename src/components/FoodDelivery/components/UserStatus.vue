<template>
  <div class="the-user">
    <div v-html="status" class="the-user__status"></div>
    <img src="/proj-assets/food-delivery/img/driver.png" alt="">
    <!-- <div v-html="status" class="op0"></div> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('FoodDelivery')

export default {
  name: 'UserStatus',
  computed: {
    ...mapState([
      'reportIds'
    ]),
    status () {
      return `
        <p>您有 <span>${this.reportIds.length}</span> 個訂單</p>
        <p>前往取餐</p>
      `
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.the-user
  display flex
  align-items center
  justify-content center
  position relative
  // padding-top 17px
  // padding-bottom 17px
  height 84px
  // max-width 276px
  // ((50 / 2) + 24 + 88) * 2
  max-width 274px
  margin-left auto
  margin-right auto
  @media (min-width $mobile)
    height 120px
    // ((70 / 2) + 24 + 113) * 2
    max-width 344px
  &__status
    position absolute
    color #fff
    text-align right
    font-size 1.4rem
    line-height normal
    left 0
    max-width 88px
    @media (min-width $mobile)
      font-size 1.8rem
      max-width 113px
    & span
      color #ffdc03
  & img
    // position absolute
    width 50px
    border-radius 50%
    @media (min-width $mobile)
      width 70px
</style>