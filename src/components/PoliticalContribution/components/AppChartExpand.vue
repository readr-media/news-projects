<template>
  <section class="expand">
    <div :class="[ 'expand__triangle', `expand__triangle--${showColumn}` ]"></div>
    <div class="expand__close" @click="$emit('closeExpand')"></div>
    <div class="expand__radios">
      <slot name="radios"></slot>
    </div>
    <slot name="chart"></slot>
  </section>
</template>

<script>

export default {
  props: {
    showColumn: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="stylus" scoped>
.expand
  position relative
  width 100%
  // height 500px
  background-color white
  border solid 2px #808080
  padding 40px
  &__triangle
    position absolute
    top -33px
    width 0
    height 0
    border-style solid
    border-width 0 18px 31.2px 18px
    border-color transparent transparent #808080 transparent
    &--1
      left calc(((100% - 26px * 3) / 4 / 2) * 1 - 36px / 2)
    &--2
      left calc(((100% - 26px * 3) / 4 / 2) * 3 + 26px - 36px / 2)
    &--3
      left calc(((100% - 26px * 3) / 4 / 2) * 5 + 26px * 2 - 36px / 2)
    &--4
      left calc(((100% - 26px * 3) / 4 / 2) * 7 + 26px * 3 - 36px / 2)
    &:after
      position absolute
      top 4px
      left -18px
      content ''
      width 0
      height 0
      border-style solid
      border-width 0 18px 31.2px 18px
      border-color transparent transparent white transparent
  &__close
    width 40px
    height 40px
    position absolute
    top 10px
    right 10px
    cursor pointer
    z-index 1000
    &:before
      position absolute
      left 20px
      display inline-block
      content ''
      width 2px
      height 40px
      background-color #808080
      transform rotate(45deg)
    &:after
      position absolute
      left 20px
      display inline-block
      content ''
      width 2px
      height 40px
      background-color #808080
      transform rotate(-45deg)
  &__radios
    & >>> .section-content-explore-radios
      margin 0 0 40px 0
</style>

