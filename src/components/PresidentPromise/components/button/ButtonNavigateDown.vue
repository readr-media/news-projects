<template>
  <button :class="[ 'down', { 'down--active': isActive } ]"
          @mouseover="toggleActive"
          @mouseout="toggleActive"
          @touchstart="toggleActive"
          @touchend="toggleActive">
    <div class="down__arrow-down"></div>
  </button>
</template>

<script>
import buttonToogleActive from '../../mixins/buttonToogleActive'

export default {
  mixins: [ buttonToogleActive ],
}
</script>

<style lang="stylus" scoped>
side = 90px
@keyframes fadeInDownDesktop
  0%
    opacity 0
    transform translateY(-(side / 2.5)) rotate(45deg)
  50%
    opacity 1
    transform translateX(0) rotate(45deg)

.down
  width side
  height side
  border-radius side
  cursor pointer
  background-color transparent
  border 2px solid white
  transition border .25s
  // display flex
  // justify-content center
  // align-items center
  padding 0
  &:focus
    outline none
  &--active
    border 2px solid #b2dbd5
    transition border .25s
  &__arrow-down
    width (side / 2.5)
    height (side / 2.5)
    background-color white
    transition background-color .25s
    transform rotate(45deg)
    clip-path polygon(0 85%, 0% 100%, 100% 100%, 100% 0, 85% 0, 85% 85%)
    position relative
    bottom 5px
    animation fadeInDownDesktop 3s ease-out none infinite
    margin auto
    ~/--active &
      background-color #b2dbd5
      transition background-color .25s

@media (max-width 425px)
  side = 54px
  @keyframes fadeInDownMobile
    0%
      opacity 0
      transform translateY(-(side / 2.5)) rotate(45deg)
    50%
      opacity 1
      transform translateX(0) rotate(45deg)

  .down 
    width side
    height side
    min-width side
    min-height side
    border-radius side
    &__arrow-down
      width (side / 2.5)
      height (side / 2.5)
      animation fadeInDownMobile 3s ease-out none infinite
</style>

