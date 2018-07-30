<template>
  <button 
    :class="[ 'close', { 'close--active': isActive } ]"
    @mouseover="toggleActive"
    @mouseout="toggleActive"
    @touchstart="toggleActive"
    @touchend="toggleActive"
  >
    <div class="close__icon"></div>
  </button>
</template>

<script>
import ButtonToogleActive from '../../mixins/ButtonToogleActive'

export default {
  mixins: [ ButtonToogleActive ],
}
</script>

<style lang="stylus" scoped>
.close
  side = 30px
  width side
  height side
  cursor pointer
  background-color black
  // border 1px solid white
  border none
  // transition background-color .15s, border .15s
  transition filter .15s
  // display flex
  // justify-content center
  // align-items center
  padding 0
  &:focus
    outline none
  &--active
    // background-color gray
    // border 1px solid gray
    // transition background-color .15s, border .15s
    filter brightness(80%)
  &__icon
    width (side / 2.5)
    height (side / 2.5)
    background-color white
    transition background-color .25s
    // clip-path polygon(5% 0, 0 5%, 45% 50%, 0 95%, 5% 100%, 50% 55%, 95% 100%, 100% 95%, 55% 50%, 100% 5%, 95% 0, 50% 45%)
    clip-path polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)
    margin auto
    
// @media (max-width 425px)
//   .close
//     side = 48px
//     width side
//     height side
//     min-width side
//     min-height side
//     border-radius side
//     &__icon
//       width (side / 2.5)
//       height (side / 2.5)
</style>


