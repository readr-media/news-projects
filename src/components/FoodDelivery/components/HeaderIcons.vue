<template>
  <div class="header-icons">
    <img class="header-icons__donate" src="/proj-assets/food-delivery/img/donate.svg" alt="">
    <img class="header-icons__info" src="/proj-assets/food-delivery/img/info.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'HeaderIcons'
}
</script>

<style lang="stylus">
.header-icons
  // position fixed
  position absolute
  // top 30px
  top 0
  right 20px
  height 84px
  display flex
  align-items center
  & img
    cursor pointer
  &__donate
    width 13.4px
    margin-right 20px
  &__info
    width 25px
</style>