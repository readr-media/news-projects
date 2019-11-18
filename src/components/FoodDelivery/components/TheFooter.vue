<template>
  <footer class="the-footer">
    <div class="the-footer__wrapper">
      <img class="the-footer__readr-img" src="/proj-assets/food-delivery/img/readr--comp.svg" alt="">
      <OtherReports class="the-footer__other-reports" />
      <DonateItem class="the-footer__donate"/>
      <SubscrItem />
    </div>
    <img class="the-footer__end-img" src="/proj-assets/food-delivery/img/end--comp.svg" alt="">
    <div class="the-footer__share" @click="isShareIcon = !isShareIcon">
      <img src="/proj-assets/food-delivery/img/share--comp.svg" alt="">
      <p v-if="!isShareIcon">分享專題</p>
      <!-- <template v-else> -->
      <!-- <a href="#" target="_blank" :class="['copylink', { show: isShareIcon }]"></a> -->
      <a :href="`https://line.me/R/msg/text/?${shareLink}`" target="_blank" :class="[ 'fb', { show: isShareIcon } ]"></a>
      <a :href="`https://www.facebook.com/share.php?u=${shareLink}`" target="_blank" :class="[ 'line', { show: isShareIcon } ]"></a>
      <!-- </template> -->
    </div>
  </footer>
</template>

<script>
import OtherReports from './OtherReports.vue'
import DonateItem from './DonateItem.vue'
import SubscrItem from './SubscrItem.vue'
import { READR_SITE_URL } from 'src/constants'

export default {
  name: 'TheFooter',
  // props: [ 'shareUrl' ],
  components: {
    OtherReports,
    DonateItem,
    SubscrItem
  },
  data () {
    return {
      isShareIcon: false
    }
  },
  computed: {
    shareLink () {
      return `${READR_SITE_URL}food-delivery`
    }
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
    & a
      width 30px
      height 30px
      position absolute
      background-size 30px
      background-position center
      // 20 + (29.39 - 30) / 2
      top 19.7px
      opacity 0
      visibility hidden
      // todo transition
      transition all 0.4s
      @media (min-width $mobile)
        // 32 + (58.8 - 30) / 2
        top 46.4px
      &.show
        opacity 1
        visibility visible
      // &.copylink
      //   background-image url(/proj-assets/food-delivery/img/icon/share-copylink--comp.svg)
      //   // 29.39 + 5 + (20 - 19.7)
      //   &.show
      //     transform translate(-40px, 34.69px)
      &.fb
        background-image url(/proj-assets/food-delivery/img/icon/share-fb--comp.svg)
        &.show
          // 29.39 + 5 + (20 - 19.7)
          // transform translateY(34.69px)
          transform translate(-20px, 34.69px)
          @media (min-width $mobile)
            transform translate(-20px, 49.4px)
      &.line
        background-image url(/proj-assets/food-delivery/img/icon/share-line--comp.svg)
        &.show
          // transform translate(40px, 34.69px)
          transform translate(20px, 34.69px)
          @media (min-width $mobile)
            // (58.8 - (58.8 - 30) / 2) + 5
            transform translate(20px, 49.4px)
</style>