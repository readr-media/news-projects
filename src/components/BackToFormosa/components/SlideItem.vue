<template>
  <!-- <div class="slide-item" :style="{ height: `${this.$store.state.viewport[ 1 ]}px` }"> -->
  <div class="slide-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SlideItem'
}
</script>

<style lang="stylus">
.slide-item
  // width 100%
  height 100vh
  position relative
  overflow hidden
  &__text
    position absolute
    font-size 2.0rem
    display flex
    flex-direction column
    align-items center
    opacity 0
    transform translateY(-32px)
    & p
      background-color rgba(#fff, 0.7)
      padding 3px 14px
      line-height normal
      & + p
        margin-top 16px
    &.dark p
      background-color rgba(#000, 0.7)
      color #fff
  &__img
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    & img
      width 100%
      height 100%
      object-fit cover
</style>
