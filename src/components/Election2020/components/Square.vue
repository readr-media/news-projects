<template>
  <!-- 
    How to use this component:
    <Square
      :showBorder="true(this will disable animation) || false"
      :shouldAnimate="true || false"
      :color="'black'"
    />
   -->
  <div
    :class="[
      'square',
      { 'square--with-number': isNumberMode },
      { 'square--with-border': isBorderMode },
      { 'square--animate': isAnimateMode },
      `square--${color}`
    ]"
    v-text="numberText"
  />
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: -1
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    shouldAnimate: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'black',
      validator(value) {
        return [
          'black',
          'white',
          'blue',
          'green',
          'orange',
          'purple',
          'gray'
        ].includes(value)
      }
    }
  },
  computed: {
    numberText() {
      return this.isNumberMode ? this.number : ''  
    },
    isNumberMode() {
      return this.number !== -1
    },
    isBorderMode() {
      return !this.isNumberMode && this.showBorder
    },
    isAnimateMode() {
      return !this.isNumberMode && !this.isBorderMode && this.shouldAnimate
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes animate-background {
    0%{background-position:0% 11%}
    50%{background-position:100% 90%}
    100%{background-position:0% 11%}
}

.square
  d = 20px
  width d
  height d
  cursor default
  animation-name animate-background
  animation-duration 0s
  animation-timing-function ease
  animation-iteration-count infinite
  &--with-number
    display flex
    justify-content center
    align-items center
    color rgba(0, 0, 0, 0.1)
    // background-color white
    font-size 13px
  &--with-border
    border solid 4px rgba(0, 0, 0, 0.3)
  &--black
    background-color $color-black
    &.square--with-number
      background none
      background-color white
      border solid 1px rgba(0, 0, 0, 0.1)
  &--white
    background-color #ffffff
    &.square--with-number
      background none
      background-color white
      border solid 1px rgba(0, 0, 0, 0.1)
  &--blue
    background linear-gradient(316deg, $color-blue-light, $color-blue)
    background-size 400% 400%
    &.square--with-border
      background-color $color-blue
    &.square--with-number
      background none
      background-color white
      border solid 1px rgba(0, 0, 0, 0.1)
  &--green
    background linear-gradient(316deg, $color-green-light, $color-green)
    background-size 400% 400%
    &.square--with-border
      background-color $color-green
    &.square--with-number
      background none
      background-color white
      border solid 1px rgba(0, 0, 0, 0.1)
  &--orange
    background linear-gradient(316deg, $color-orange, $color-orange)
    background-size 400% 400%
    &.square--with-border
      background-color $color-orange
    &.square--with-number
      background none
      background-color white
      border solid 1px rgba(0, 0, 0, 0.1)
  &--purple
    background linear-gradient(316deg, $color-purple-light, $color-purple)
    background-size 400% 400%
    &.square--with-border
      background-color $color-purple
    &.square--with-number
      background none
      background-color white
      border solid 1px rgba(0, 0, 0, 0.1)
  &--gray
    background linear-gradient(316deg, $color-gray-light, $color-gray)
    background-size 400% 400%
    &.square--with-border
      background-color $color-gray
    &.square--with-number
      background none
      background-color white
      border solid 1px rgba(0, 0, 0, 0.1)
  &--animate
    animation-duration 4s

@media (min-width 768px)
  .square
    &--with-number
      &:hover
        color rgba(0, 0, 0, 0.3)
        border solid 1px rgba(0, 0, 0, 0.3)
</style>