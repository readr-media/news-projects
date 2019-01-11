<template>
  <div class="legend">
    <div class="legend__line"></div>
    <p class="legend__keyword" v-text="$route.params.params"></p>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.legend
  display flex
  align-items center
  &__line
    width 20px
    height 2px
    background-color #fad187
  &__keyword
    margin 0 0 0 10px
    font-size 14px
</style>