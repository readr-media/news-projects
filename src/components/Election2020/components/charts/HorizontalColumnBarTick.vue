<template>
  <div class="tick" v-text="`${value}%`" />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.tick
  color rgba(0, 0, 0, 0.3)
  font-size 13px
  font-family $font-family-serif
  display flex
  flex-direction column
  justify-content center
  align-items center
  &:after
    content ''
    display block
    width 1px
    height 8px
    background-color rgba(0, 0, 0, 0.3)
    margin 3px 0 0 0

@media (min-width 768px)
  .tick
    font-size 14px
</style>
