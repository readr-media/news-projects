<template>
  <footer class="the-footer">
    <div class="the-footer__wrapper">
      <img class="the-footer__readr-img" src="/proj-assets/food-delivery/img/readr--comp.svg" alt="">
      <OtherReports class="the-footer__other-reports" />
      <DonateItem class="the-footer__donate"/>
      <SubscrItem />
    </div>
    <img class="the-footer__end-img" src="/proj-assets/food-delivery/img/end--comp.svg" alt="">
    <div class="the-footer__share">
      <img src="/proj-assets/food-delivery/img/share--comp.svg" alt="">
      <p>分享專題</p>
    </div>
  </footer>
</template>

<script>
import OtherReports from './OtherReports.vue'
import DonateItem from './DonateItem.vue'
import SubscrItem from './SubscrItem.vue'

export default {
  name: 'TheFooter',
  components: {
    OtherReports,
    DonateItem,
    SubscrItem
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.the-footer
  background-color #ffdc03
  font-size 1.5rem
  line-height normal
  padding-top 20px
  overflow hidden
  position relative
  // padding-left 40px
  // padding-right 40px
  @media (min-width $mobile)
    padding-top 30px
  &__wrapper
    padding-left 40px
    padding-right 40px
    max-width 600px
    margin-left auto
    margin-right auto
    @media (min-width 680px)
      padding-left 0
      padding-right 0
  &__readr-img
    width 45px
    display block
    // vertical-align middle
    margin-bottom 15px
    margin-left auto
    margin-right auto
    @media (min-width $mobile)
      width 60px
      margin-bottom 20px
  &__end-img
    vertical-align top
    width 100%
  &__other-reports
    margin-bottom 20px
    @media (min-width $mobile)
      margin-bottom 30px
  &__donate
    margin-bottom 20px
    @media (min-width $mobile)
      margin-bottom 30px
  &__share
    position absolute
    bottom 0
    left 50%
    transform translate(-50%, 50%)
    width 200px
    height 200px
    border-radius 50%
    border 3px solid #fff
    background-color #4a4a4a
    display flex
    align-items center
    flex-direction column
    padding-top 20px
    cursor pointer
    @media (min-width $mobile)
      width 300px
      height 300px
      padding-top 32px
    & img
      width 30px
      vertical-align middle
      margin-bottom 4px
      @media (min-width $mobile)
        width 60px
        margin-bottom 10px
    & p
      font-size 1.8rem
      color #fff
      font-weight 500
</style>