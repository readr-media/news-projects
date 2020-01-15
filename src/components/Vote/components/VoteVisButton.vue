<template>
  <button :class="[ 'button', { 'button--active': isActive } ]" v-text="text"></button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style lang="stylus" scoped>
.button
  width 500px
  height 60px
  border-radius 8px
  background-color #061c37
  color white
  border 2px solid white
  font-size 30px
  font-weight 300
  cursor pointer
  transition background-color .15s ease-out, color .15s ease-out, font-weight .15s ease-out
  &:focus
    outline none
  &:hover, &--active
    background-color white
    color #061c37
    font-weight 400

@media (max-width 768px)
  .button
    width 100%
    height 40px
    font-size 20px
</style>

