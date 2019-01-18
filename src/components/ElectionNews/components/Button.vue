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
  color white
  background-color #4a90e2
  border 1px solid #4a90e2
  display flex
  justify-content center
  align-items center
  font-size 18px
  cursor pointer

@media (min-width 1024px)
  .button
    width 200px
    height 60px
    font-size 30px
</style>