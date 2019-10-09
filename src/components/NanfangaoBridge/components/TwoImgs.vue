<template>
  <figure class="two-imgs">
    <img loading="lazy" :src="src1" alt="">
    <figcaption>
      <slot></slot>
    </figcaption>
    <img loading="lazy" :src="src2" alt="">
  </figure>
</template>

<script>
export default {
  name: 'TwoImgs',
  props: [ 'src1', 'src2' ]
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.two-imgs
  display flex
  flex-wrap wrap
  max-width 1440px
  margin 30px auto
  align-items center
  & img
    width 100%
    @media (min-width $desktop-breakpoint)
      width 50%
  & figcaption
    font-size 1.4rem
    line-height 1.7
    color #666
    width 90%
    padding-top 30px
    padding-bottom 30px
    margin-right auto
    margin-left auto
    max-width 1152px
    @media (min-width $desktop-breakpoint)
      order 1
      width 80%
      padding-top 10px
      padding-bottom 0
</style>