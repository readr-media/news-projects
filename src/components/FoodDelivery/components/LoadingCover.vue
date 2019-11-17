<template>
  <section class="loading-cover">
    <div class="loading-cover__wrapper">
      <h1>記者來當外送員：<br>開箱美食外送秘辛！</h1>
      <div class="loading-cover__progress">
        <div class="inner-bar"></div>
      </div>
    </div>
    <!-- <img src="/proj-assets/food-delivery/img/cover.jpg" alt=""> -->
  </section>
</template>

<script>
export default {
  name: 'LoadingCover'
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.loading-cover
  background-image url(/proj-assets/food-delivery/img/cover.jpg)
  background-size cover
  background-position center top
  background-repeat no-repeat
  height 100vh
  position relative
  &__wrapper
    position absolute
    background-color #000
    padding 11px 14px 14px 14px
    text-align center
    width 100%
    bottom 6.52%
    max-width 680px
    left 50%
    transform translateX(-50%)
    @media (min-width $tablet)
      padding 18px 45px 20px 45px
      bottom 11.39%
  & h1
    font-size 3.0rem
    font-weight 700
    line-height 1.2
    color #fff
    margin-bottom 16px
    @media (min-width $tablet)
      font-size 5.0rem
      line-height 1.36
      margin-bottom 25px
  &__progress
    border-radius 6px
    border 1px solid #ffdc03
    padding 4px 5px
    & .inner-bar
      height 4px
      border-radius 6px
      background-color #ffdc03
      // width 100%
</style>