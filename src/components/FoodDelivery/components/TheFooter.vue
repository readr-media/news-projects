<template>
  <footer class="the-footer">
    <div class="the-footer__wrapper">
      <img class="the-footer__readr-img" src="/proj-assets/food-delivery/img/icon/readr.svg" alt="" loading="lazy">
      <OtherReports class="the-footer__other-reports" />
      <DonateItem class="the-footer__donate"/>
      <SubscrItem />
    </div>
    <picture class="the-footer__end-img">
      <source type="image/webp" media="(min-width: 460px)" srcset="/proj-assets/food-delivery/img/end-desktop.webp">
      <source type="image/png" media="(min-width: 460px)" srcset="/proj-assets/food-delivery/img/end-desktop.png">
      <source type="image/webp" srcset="/proj-assets/food-delivery/img/end-mobile.webp">
      <img src="/proj-assets/food-delivery/img/end-mobile.png" alt="" loading="lazy">
    </picture>
    <div class="the-footer__share" @click.once="showShareIcon" :class="{ 'can-share': isShareIcon }">
      <img src="/proj-assets/food-delivery/img/icon/share-arrow.svg" alt="" loading="lazy">
      <p v-if="!isShareIcon">分享專題</p>
      <a :href="`https://www.facebook.com/share.php?u=${shareLink}`" target="_blank" class="the-footer__share-item fb"></a>
      <a :href="`https://line.me/R/msg/text/?${shareLink}`" target="_blank" class="the-footer__share-item line"></a>
      <span class="copylink the-footer__share-item" @click="copyLinkToClipboard(shareLink)"></span>
    </div>
  </footer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('FoodDelivery')

import OtherReports from './OtherReports.vue'
import DonateItem from './DonateItem.vue'
import SubscrItem from './SubscrItem.vue'
import { READR_SITE_URL } from 'src/constants'

export default {
  name: 'TheFooter',
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
  },
  methods: {
    ...mapMutations([
      'copyLinkToClipboard'
    ]),
    showShareIcon () {
      this.isShareIcon = true
      window.ga('send', 'event', 'projects', 'click', '文末-分享')
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
    margin-bottom 15px
    margin-left auto
    margin-right auto
    @media (min-width $mobile)
      width 60px
      margin-bottom 20px
  &__end-img
    display block
    & img
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
    user-select none
    cursor pointer
    &:active
      background-color #9b9b9b
    &.can-share
      cursor auto
      & .the-footer__share-item
        opacity 1
        visibility visible
      & .fb
        // 29.39 + 5 + (20 - 19.7)
        transform translate(-40px, 34.69px)
        @media (min-width $mobile)
          transform translate(-50px, 54.4px)
      & .line
        // (58.8 - (58.8 - 30) / 2) + 10
        transform translateY(34.69px)
        @media (min-width $mobile)
          transform translateY(54.4px)
      & .copylink
        // 29.39 + 5 + (20 - 19.7)
        transform translate(40px, 34.69px)
        @media (min-width $mobile)
          transform translate(50px, 54.4px)
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
    &-item
      width 30px
      height 30px
      position absolute
      background-size 30px
      background-position center
      background-repeat no-repeat
      // 20 + (29.39 - 30) / 2
      top 19.7px
      opacity 0
      visibility hidden
      transition all 0.45s $easeOutCubic
      cursor pointer
      @media (min-width $mobile)
        // 32 + (58.8 - 30) / 2
        top 46.4px
      &.fb
        background-image url(/proj-assets/food-delivery/img/icon/share-fb.svg)
      &.line
        background-image url(/proj-assets/food-delivery/img/icon/share-line.svg)
      &.copylink
        background-image url(/proj-assets/food-delivery/img/icon/share-copylink.svg)
</style>