<template>
  <button 
    :class="[ 'close', { 'close--active': isActive }, { 'close--small': isOnTooltip } ]"
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
  props: {
    isOnTooltip: {
      type: Boolean,
      default: false,
    }
  },
  mixins: [ ButtonToogleActive ],
}
</script>

<style lang="stylus" scoped>
.close
  side = 87px
  width side
  height side
  border-radius side
  cursor pointer
  background-color #1f464f
  border 3px solid #2b616d
  transition background-color .15s, border .15s
  // display flex
  // justify-content center
  // align-items center
  padding 0
  &:focus
    outline none
  &--active
    background-color #fa8d62
    border 3px solid #fa8d62
    transition background-color .15s, border .15s
  &__icon
    width (side / 2.5)
    height (side / 2.5)
    background-color #2b616d
    transition background-color .25s
    clip-path polygon(5% 0, 0 5%, 45% 50%, 0 95%, 5% 100%, 50% 55%, 95% 100%, 100% 95%, 55% 50%, 100% 5%, 95% 0, 50% 45%)
    margin auto
  &--small
    side = 36px
    width side
    height side
    border-radius side
    border 1px solid white
    .close__icon
      width (side / 2.5)
      height (side / 2.5)
      background-color white
      transition background-color .25s
      clip-path polygon(5% 0, 0 5%, 45% 50%, 0 95%, 5% 100%, 50% 55%, 95% 100%, 100% 95%, 55% 50%, 100% 5%, 95% 0, 50% 45%)
      margin auto 
    
@media (max-width 425px)
  .close
    side = 48px
    width side
    height side
    min-width side
    min-height side
    border-radius side
    &__icon
      width (side / 2.5)
      height (side / 2.5)
</style>


