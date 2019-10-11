<template>
  <section class="cover">
    <div class="cover__img"></div>
    <header class="cover__header">
      <h1>通往悲劇之路：<br>南方澳跨港大橋如何坍塌</h1>
      <p>透過 3D 圖解全面還原事發過程，帶你暸解悲劇背後系統性的問題。</p>
    </header>
  </section>
</template>

<script>
export default {
  name: 'TheCover'
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.cover
  height 100vh
  position relative
  // margin-bottom 30px
  &__img
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-image url(/proj-assets/nanfangao-bridge/img/cover-desktop-large.jpg)
    background-position center
    background-size cover
    background-repeat no-repeat
    z-index -1
    // @media (min-width 460px) and (max-width 719.98px)
    //   background-image url(/proj-assets/nanfangao-bridge/img/cover-tablet-small.jpg)
    // @media (min-width 720px) and (max-width 999.98px)
    //   background-image url(/proj-assets/nanfangao-bridge/img/cover-tablet-large.jpg)
    // @media (min-width 1000px) and (max-width 1599.98px)
    //   background-image url(/proj-assets/nanfangao-bridge/img/cover-desktop-small.jpg)
    // @media (min-width 1600px)
    //   background-image url(/proj-assets/nanfangao-bridge/img/cover-desktop-large.jpg)
    &:after
      content ''
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background-color rgba(0, 0, 0, 0.1)
  &__header
    position relative
    text-align center
    font-family $font-serif
    top 50%
    transform translateY(-50%)
    // text-shadow 0 2px 1px rgba(0, 0, 0, 0.5)
    text-shadow 1px 1px 2px #000000
    color #fff
    & h1
      font-size 4.2rem
      font-weight 900
      line-height 1.38
      @media (min-width $desktop-breakpoint)
        font-size 7.2rem
      &:after
        content ''
        display block
        width 110px
        height 1px
        box-shadow 0 2px 1px 0 rgba(0, 0, 0, 0.5)
        background-color #fff
        margin 20px auto
        @media (min-width $desktop-breakpoint)
          margin-top 30px
          margin-bottom 30px
          width 200px
    & p
      font-size 1.8rem
      font-weight 600
      line-height 1.89
      padding-right 15px
      padding-left 15px
      margin-right auto
      margin-left auto
      max-width 650px
      @media (min-width 680px)
        padding-left 0
        padding-right 0
      @media (min-width $desktop-breakpoint)
        line-height 2
        font-size 2.0rem
</style>