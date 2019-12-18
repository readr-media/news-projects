<template>
  <!-- 
    How to use this component:
    <Square
      :showBorder="true || false"
      :color="'black'"
    />
   -->
  <div
    :class="[
      'square',
      { 'square--with-border': showBorder },
      `square--${color}`
    ]"
  />
</template>

<script>
export default {
  props: {
    showBorder: {
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
  }
}
</script>

<style lang="stylus" scoped>
.square
  d = 20px
  width d
  height d
  &--with-border
    border solid 4px rgba(0, 0, 0, 0.3)
  &--black
    background-color $color-black
  &--white
    background-color #ffffff
  &--blue
    background-color $color-blue
  &--green
    background-color $color-green
  &--orange
    background-color $color-orange
  &--purple
    background-color $color-purple
  &--gray
    background-color $color-gray
</style>