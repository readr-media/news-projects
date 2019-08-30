<template>
  <section class="cover">
    <video src="/proj-assets/overseastaiwanese/video/cover.mp4"
      :poster="`/proj-assets/overseastaiwanese/img/cover-${isLap ? 'lap' : 'mob'}.png`"
      data-object-fit
      muted autoplay loop playsinline webkit-playsinline
    >
    </video>
    <!-- <img src="/proj-assets/overseastaiwanese/img/title.png" alt="海海人生：回流青年的告白" :class="[ !isLap ? 'big' : '', 'total-center']" > -->
    <img src="/proj-assets/overseastaiwanese/img/title.png" alt="海海人生：回流青年的告白" class="total-center" :style="{ width: isLap ? '41.7%' : '90.6%' }">
  </section>
</template>

<script>
import '../util/objectFitPolyfill.basic.min'

export default {
  name: 'CoverVideo',
  props: ['isLap']
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.cover
  position relative
  width 100%
  height 100vh
  overflow hidden
  & video
    width 100%
    height 100%
    object-fit cover
  // & img
    // position absolute
    // width 90.6%
    // top 50%
    // left 50%
    // transform translate(-50%, -50%)
    // &.big
    //   width 41.7%
    // background-size cover
    // background-position center
    // background-repeat no-repeat
  // &__title
  //   position absolute
  //   width 100%
  //   top 50%
  //   left 50%
  //   transform translate(-50%, -50%)
  //   text-align center
  //   // color #fff
  //   &-sub
  //     font-size 2rem
  //     // line-height 1
  //     margin-bottom 12px
  //     @media (min-width $tab-breakpoint)
  //       font-size 4.0rem
  //       margin-bottom 20px
  //   &-main
  //     font-size 3.6rem
  //     font-weight 500
  //     // line-height 1.22
  //     @media (min-width $tab-breakpoint)
  //       font-size 8.0rem
</style>