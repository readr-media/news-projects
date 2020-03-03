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
  min-height 100vh
  position relative
  overflow hidden
  &__text
    position absolute
    &--caption
      font-size 2.0rem
      display flex
      flex-direction column
      align-items center
      line-height normal
      // opacity 0
      // transform translateY(-32px)
      & p
        padding 3px 14px
        & + p
          margin-top 16px
      &--light p
        background-color rgba(#fff, 0.7)
      &--dark p
        background-color rgba(#000, 0.7)
        color #fff
    &--single
      font-size 3.0rem
      font-weight 700
      line-height normal
      color #fff
      width 100%
      text-align center
    &--description
      font-size 2.0rem
      color #fff
      & p + p
        // todo ask
        margin-top 16px
  &__picture
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    & img
      width 100%
      height auto
      // height 100%
      // object-fit cover
    &--cover img
      height 100%
      object-fit cover
</style>
