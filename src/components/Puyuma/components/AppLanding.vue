<template>
  <section class="landing">
    <div class="landing__readr-logo-container readr-logo-container">
      <img
        class="readr-logo-container__logo-img"
        src="/proj-assets/logo_readr_with_text.png"
        alt=""
        @click.stop="linkTo(`https://${READR_DOMAIN_PROD}`)"
        ga-on="click"
        ga-event-category="Logo"
        ga-event-action="clickReadrLogoLanding"
      >
      <img
        class="readr-logo-container__share-img"
        src="/proj-assets/puyuma/share-desktop.png"
        alt=""
        @click="share"
        ga-on="click"
        ga-event-category="share"
        ga-event-action="shareToFBLanding"
      >
    </div>
    <div class="landing__title">
      <p>關鍵<span>43</span>分鐘</p>
      <p>圖解對話紀錄</p>
      <p class="more">&lt; 繼續閱讀 &gt;</p>
    </div>
    <div class="landing__credits">
      <img
        src="/proj-assets/logo_mm_white.png"
        alt=""
        @click.stop="linkTo(`https://${MM_DOMAIN}`)"
        ga-on="click"
        ga-event-category="Logo"
        ga-event-action="clickMMLogoLanding"
      >
      <p>網頁：熊凱文</p>
      <p>設計：陳怡蒨、許玲瑋</p>
      <p>2018/10/26</p>
    </div>
  </section>
</template>

<script>
import { READR_DOMAIN_PROD, MM_DOMAIN, } from 'src/constants'

export default {
  data () {
    return {
      READR_DOMAIN_PROD,
      MM_DOMAIN
    }
  },
  methods: {
    linkTo (url) {
      window.open(url)
    },
    share () {
      window.open(`https://www.facebook.com/share.php?u=https://${READR_DOMAIN_PROD}${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.landing
  width 100vw
  height 100vh
  background-color rgba(0, 0, 0, 0.85)
  position fixed
  top 0
  left 0
  z-index 3
  padding 51px 0 96px 0
  display flex
  flex-direction column
  justify-content space-between
  &__title
    display flex
    flex-direction column
    align-items center
    color white
    font-size 40px
    font-weight 600
    p
      margin 5px 0 !important
      span
        font-size 1.5em
        margin 0 5px
        color #d0021b
    .more
      font-size 14px
      margin 15px 0 !important
  &__credits
    display flex
    flex-direction column
    align-items center
    color white
    img
      width 30px
      height 30px
      margin 0 0 10px 0
      cursor pointer
    p
      margin 2px 0 !important
      font-size 14px

.readr-logo-container
  display flex
  justify-content center
  &__logo-img
    height 46.5px
    cursor pointer
  &__share-img
    display none

@media (min-width 1023px)
  .landing
    padding 20vh 0 10vh 0
    &__title
      font-size 70px
      p
        margin 5px 0 !important
        span
          font-size 1.5em
      .more
        font-size 24px
    &__credits
      img
        width 40px
        height 40px
      p
        margin 5px 0 !important
        font-size 18px

  .readr-logo-container
    position fixed
    top 0px
    left 0
    width 100%
    justify-content space-between
    align-items center
    padding 32px 44px 0 44px
    &__logo-img
      height 70px
      cursor pointer
    &__share-img
      display initial
      height 40px
      cursor pointer
</style>

