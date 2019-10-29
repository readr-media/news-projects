<template>
  <div class="header-icons-report">
    <img class="header-icons-report__enter" src="/proj-assets/food-delivery/img/enter.svg" alt="">
    <MapMarker num="1" class="marker" />
  </div>
</template>

<script>
import MapMarker from './MapMarker.vue'

export default {
  name: 'HeaderIconsReport',
  components: {
    MapMarker
  }
}
</script>

<style lang="stylus">
.header-icons-report
  height 84px
  display flex
  align-items center
  justify-content center
  position relative
  & .marker
    width 25.42px
    height 35.8px
  &__enter
    width 20px
    position absolute
    left 20px
    top 50%
    transform translateY(-50%) scaleX(-1)
  // position fixed
  // // top 30px
  // top 0
  // right 20px
  // height 86px
  // display flex
  // align-items center
  // & img
  //   cursor pointer
  // &__donate
  //   width 13.4px
  //   margin-right 20px
  // &__info
  //   width 25px
</style>