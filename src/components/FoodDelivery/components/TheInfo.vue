<template>
  <section class="the-info">
    <UserStatus />
    <div class="the-info__wrapper">
      <img class="the-info__cancel" src="/proj-assets/food-delivery/img/x--comp.svg" alt="" @click="$store.state.FoodDelivery.isInfo = false">
    </div>
  </section>
</template>

<script>
import UserStatus from './UserStatus.vue'

export default {
  name: 'TheInfo',
  components: {
    UserStatus
  }
}
</script>

<style lang="stylus">
.the-info
  position absolute
  top 0
  left 0
  background-image url(/proj-assets/food-delivery/img/map.jpg)
  background-size cover
  background-position center
  background-repeat no-repeat
  width 100%
  height 100vh
  z-index 999
  &__wrapper
    position absolute
    height 84px
    display flex
    align-items center
    top 0
    right 20px
  &__cancel
    width 20px
    display block
    // padding-top 32px
    // padding-bottom 32px
</style>