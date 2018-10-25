<template>
  <div :class="[ 'message', `message--${character}` ]">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: String,
      required: true,
      validator (value) {
        return [ 'driver', 'checker', 'scheduler', 'yilan' ].indexOf(value) !== -1 
      }
    },
    message: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="stylus" scoped>
.message
  padding 10px
  background-color white
  max-width 50%
  overflow-wrap break-word
  text-align justify
  line-height 1.5
  font-size 20px
  &--driver
    border 2px solid #466ba0
    position relative
    &:after
      content ''
      position absolute
      top calc(20px - 6px)
      left -10px
      width 0
      height 0
      border-style solid
      border-width 5px 10px 5px 0
      border-color transparent #466ba0 transparent transparent
  &--checker
    border 2px solid #a55d5d
    position relative
    &:after
      content ''
      position absolute
      top calc(20px - 6px)
      right -10px
      width 0
      height 0
      border-style solid
      border-width 5px 0 5px 10px
      border-color transparent transparent transparent #a55d5d
  &--scheduler
    border 2px solid #89b287
    position relative
    &:after
      content ''
      position absolute
      top calc(20px - 6px)
      right -10px
      width 0
      height 0
      border-style solid
      border-width 5px 0 5px 10px
      border-color transparent transparent transparent #89b287
  &--yilan
    border 2px solid black
    position relative
    &:after
      content ''
      position absolute
      top calc(20px - 6px)
      right -10px
      width 0
      height 0
      border-style solid
      border-width 5px 0 5px 10px
      border-color transparent transparent transparent black
</style>

