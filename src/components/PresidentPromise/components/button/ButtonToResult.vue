<template>
  <button
    class="result-button"
    @mouseover="toggleActive"
    @mouseout="toggleActive"
    @touchstart="toggleActive"
    @touchend="toggleActive"
    @click="clicked"
  >
    <div 
      :class="[ 'result-button__icon', { 'result-button__icon--active': isActive } ]"
      :style="{ maskImage: 'url(/proj-assets/president-promise/icon/icon_see-statistic.png)' }"
    >
    </div>
  </button>
</template>

<script>
import buttonToogleActive from '../../mixins/buttonToogleActive'
import fullPageMixin from '../../_vue-fullpage/fullPageMixin'

export default {
  mixins: [ buttonToogleActive, fullPageMixin ],
  methods: {
    clicked () {
      this.moveTo('section-result')
      window.ga('send', 'event', 'projects', 'click', 'icon-to-result', { nonInteraction: false })
    }
  }
}
</script>

<style lang="stylus" scoped>
.result-button
  width 42px
  height 44px
  cursor pointer
  background-color transparent
  border none
  &:focus
    outline none
  &__icon
    width 42px
    height 44px
    -webkit-mask-position center center
    -webkit-mask-size 100% 100%
    -webkit-mask-repeat no-repeat
    background-color white
    transition background-color .25s
    &--active
      background-color #b2dbd5
      transition background-color .25s

</style>

