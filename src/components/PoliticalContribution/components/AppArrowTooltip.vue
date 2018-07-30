<template>
  <span class="app-aside-nav-tooltip" v-text="hintText"></span>
</template>

<script>
export default {
  props: {
    hintText: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang="stylus" scoped>
.app-aside-nav-tooltip
  width 120px
  background-color #555
  color white
  text-align center
  padding 5px 0
  // border-radius 6px
  // position relative
  &:after
    content ""
    position absolute
    top 50%
    right 100%
    margin-top -5px
    border-width 5px
    border-style solid
    border-color transparent #555 transparent transparent
</style>

