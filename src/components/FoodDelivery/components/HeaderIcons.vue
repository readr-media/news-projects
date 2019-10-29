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
  position absolute
  &__donate
    width 13.4px
  &__info
    width 25px
</style>