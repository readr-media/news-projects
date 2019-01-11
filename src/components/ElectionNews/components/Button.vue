<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.button
  width 130px
  height 30px
  color #fad187
  border 1px solid currentColor
  display flex
  justify-content center
  align-items center
  font-size 18px
  cursor pointer
</style>