<template>
  <!-- <figure class="two-imgs">
    <img loading="lazy" :src="prefixSrc1" alt="">
    <figcaption>
      <slot></slot>
    </figcaption>
    <img loading="lazy" :src="prefixSrc2" alt="">
  </figure> -->
  <section class="two-imgs">
    <picture>
      <source media="(min-width: 992px)" :srcset="`${prefixSrc1}-desktop-large.jpg`">
      <img loading="lazy" :src="`${prefixSrc1}-desktop-small.jpg`" alt="">
    </picture>
    <p><slot></slot></p>
    <picture>
      <source media="(min-width: 992px)" :srcset="`${prefixSrc2}-desktop-large.jpg`">
      <img loading="lazy" :src="`${prefixSrc2}-desktop-small.jpg`" alt="">
    </picture>
  </section>
</template>

<script>
export default {
  name: 'TwoImgs',
  props: [ 'prefixSrc1', 'prefixSrc2' ]
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
  & picture
    width 100%
    @media (min-width $desktop-breakpoint)
      width 50%
  & img
    width 100%
    vertical-align middle
  //   @media (min-width $desktop-breakpoint)
  //     width 50%
  & p
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
  // & figcaption
  //   font-size 1.4rem
  //   line-height 1.7
  //   color #666
  //   width 90%
  //   padding-top 30px
  //   padding-bottom 30px
  //   margin-right auto
  //   margin-left auto
  //   max-width 1152px
  //   @media (min-width $desktop-breakpoint)
  //     order 1
  //     width 80%
  //     padding-top 10px
  //     padding-bottom 0
</style>