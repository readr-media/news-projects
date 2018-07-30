<template>
  <button 
    :class="[ 'lightbox-submit', { 'lightbox-submit--active': isActive } ]"
    @mouseover="toggleActive"
    @mouseout="toggleActive"
    @touchstart="toggleActive"
    @touchend="toggleActive"
    v-text="'確定'"
  >
  </button>
</template>

<script>
import ButtonToogleActive from '../../mixins/ButtonToogleActive'

export default {
  mixins: [ ButtonToogleActive ],
}
</script>

<style lang="stylus" scoped>
.lightbox-submit
  width 364px
  height 44px
  border-radius 5px
  background-color transparent
  border solid 2px white
  cursor pointer
  transition border .25s, color .25s
  color white
  display block
  margin 42px auto 0 auto
  &:focus
    outline none
  &--active
    border 2px solid #b2dbd5
    color #b2dbd5
    transition border .25s, color .25s

@media (max-width 425px)
  .lightbox-submit
    width 100%
    height 36px
    margin 32px auto 0 auto
</style>

