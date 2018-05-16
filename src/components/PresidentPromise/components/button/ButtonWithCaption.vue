<template>
  <div class="container">
    <!-- <div v-if="caption" :class="[ 'caption-container', { 'caption-container--fade-out': $store.state.PresidentPromise.resultSectionBeenNavigated } ]">
      <p class="caption-container__caption" v-text="caption"></p>
      <img class="caption-container__arrow" src="/proj-assets/president-promise/pic_arrow.png" alt="caption-container__arrow">
    </div> -->
    <button
      :class="[ 'button-with-caption', { 'button-with-caption--active': isActive } ]"
      @click="toggleLightbox"
      @mouseover="toggleActive"
      @mouseout="toggleActive"
      @touchstart="toggleActive"
      @touchend="toggleActive"
    >
      <img class="button-with-caption__icon" src="/proj-assets/president-promise/icon/icon_bulb.png" alt="button-with-caption__icon">
    </button>
  </div>
</template>

<script>
import buttonToogleActive from '../../mixins/buttonToogleActive'

export default {
  // props: {
  //   caption: {
  //     type: String,
  //   },
  // },
  mixins: [ buttonToogleActive],
  methods: {
    toggleLightbox () {
      this.$emit('toggleLightbox')
      window.ga('send', 'event', 'projects', 'click', 'feedback', { nonInteraction: false })
    },
  },
}
</script>

<style lang="stylus" scoped>
.container
  display flex
  align-items flex-end
  justify-content flex-end
  z-index 9999

@keyframes fadeOut
  from
    opacity 1
    pointer-events initial
  to
    opacity 0
    pointer-events none
.caption-container
  display flex
  flex-direction column
  justify-content center
  align-items center
  transform translate(30px, -20px)
  &--fade-out
    animation fadeOut 1s linear 5s 1 normal forwards
  &__caption
    width 190px
    height 66px
    font-size 18px
    line-height 1.33
    text-align justify
    color #ffffff
  &__arrow
    width 98px
    height 75px
.button-with-caption
  side = 90px
  width side
  height side
  border-radius side
  cursor pointer
  background-color #1f464f
  transition background-color .15s
  border none
  // display flex
  // justify-content center
  // align-items center
  padding 0
  &:focus
    outline none
  &--active
    background-color #fa8d62
    transition background-color .15s
  &__icon
    width 48px
    height 53px
    margin auto

@media (max-width 425px)
  .caption-container
    transform translate(30px, -10px)
  .button-with-caption
    side = 60px
    width side
    height side
    border-radius side
    &__icon
      width 32px
      height 35px
</style>


