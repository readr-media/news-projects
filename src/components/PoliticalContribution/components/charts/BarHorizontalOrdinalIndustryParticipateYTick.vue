<template>
  <div class="bar-horizontal-ordinal-industry-participate-y-tick">
    <div :class="[ 'checked', { 'checked--hide': !isCrony } ]">
      <div class="checked__icon"></div>
    </div>
    <p class="bar-horizontal-ordinal-industry-participate-y-tick__industry-name" v-text="industryName"></p>
  </div>
</template>

<script>
export default {
  props: {
    industryName: {
      type: String,
      required: true,
    },
    isCrony: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style lang="stylus" scoped>
.bar-horizontal-ordinal-industry-participate-y-tick
  display flex
  &__industry-name
    margin 0
    font-size 10px

.checked
  r = 10px
  width r
  height r
  border-radius r
  border 1px solid #9e005d
  margin 0 5px 0 0
  &--hide
    opacity 0
  &__icon
    width 5px
    height 5px
    background-color #9e005d
    transform rotate(45deg)
    clip-path polygon(85% 0, 100% 0, 100% 100%, 43% 100%, 43% 85%, 85% 85%)
    position relative
    top 0px
    right 1px
    margin auto
</style>


