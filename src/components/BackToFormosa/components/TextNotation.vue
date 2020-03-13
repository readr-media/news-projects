<template>
  <span class="text-notation">
    <span class="text-notation__icon" @click="toggleText" :class="{ open: isText }" />
    <span class="text-notation__text" v-if="isText">
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  name: 'TextNotation',
  data () {
    return {
      isText: false
    }
  },
  methods: {
    toggleText () {
      this.isText = !this.isText
    } 
  }
}
</script>

<style lang="stylus">
.text-notation
  padding-right 4px
  padding-left 4px
  &__icon
    display inline-block
    width 18px
    height 18px
    box-shadow 0 2px 4px rgba(#000, 0.5)
    background-color #fff
    border-radius 50%
    position relative
    top 2px
    cursor pointer
    user-select none
    &::after
      content ''
      display block
      left 4px
      top 6px
      width 0
      height 0
      border-style solid
      border-width 8px 5px 0 5px
      border-color #a56c6a transparent transparent transparent
      position relative
    &.open::after
      top 4px
      border-width 0 5px 8px 5px
      border-color transparent transparent #a56c6a transparent
  &__text
    display inline-block
    width 100%
    padding 10px 20px
    box-shadow 0 2px 4px rgba(#000, 0.5)
    background-color #fff
    font-size 1.4rem
    line-height 1.4
    margin-top 12px
    margin-bottom 12px
    & a
      color #a56c6a
      font-weight 500
</style>
