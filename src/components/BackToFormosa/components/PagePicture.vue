<template>
  <div class="page-picture">
    <picture class="page-picture__person" ref="person">
      <source type="image/png" media="(min-width: 460px) and (max-width: 719.98px)" :srcset="this.imgSrc(`${name}-person-ts.png`)">
      <source type="image/png" media="(min-width: 720px)" :srcset="this.imgSrc(`${name}-person-tl.png`)">
      <img :src="this.imgSrc(`${name}-person-m.png`)" alt="">
    </picture>
    <picture class="page-picture__title" ref="title">
      <source media="(min-width: 460px) and (max-width: 719.98px)" :srcset="this.imgSrc(`${name}-title-ts.svg`)">
      <source media="(min-width: 720px)" :srcset="this.imgSrc(`${name}-title-tl.svg`)">
      <img :src="this.imgSrc(`${name}-title-m.svg`)" alt="">
    </picture>
  </div>
</template>

<script>
export default {
  name: 'PagePicture',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    imgSrc (name) {
      return `/proj-assets/backtoformosa/img/scene3/ending-${name}`
    } 
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.page-picture
  margin-bottom 10px
  @media (min-width $breakpoint-lg)
    position relative
    z-index -1
    margin-bottom 0
  &__person
    animation fade-in-left 0.9s $easeOutSine both paused
  &__title
    position absolute
    width 100%
    top 0
    left 0
    animation fade-in-left 0.9s 0.6s $easeOutSine both paused
  & img
    width 100%
    height auto
  &.later .page-picture
    &__person
      @media (min-width $breakpoint-lg)
        animation fade-in-left 0.9s 0.6s $easeOutSine both paused
    &__title
      @media (min-width $breakpoint-lg)
        animation fade-in-left 0.9s 1.2s $easeOutSine both paused

@keyframes fade-in-left
  0%
    opacity 0
    transform translateX(-40px)
  100%
    opacity 1
    transform translateX(0px)
</style>
