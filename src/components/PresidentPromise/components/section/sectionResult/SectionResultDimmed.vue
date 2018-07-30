<template>
  <div class="section-dimmed" ref="section-dimmed">
    <h1 class="section-dimmed__title"><span>進入排行榜前，<br></span>有些小撇步你一定得知道...</h1>
    <picture>
      <source media="(min-width: 425px)" srcset="/proj-assets/president-promise/result-hint/web_hint.png">
      <source srcset="/proj-assets/president-promise/result-hint/phone_hint.png">
      <img class="section-dimmed__hint-img" src="/proj-assets/president-promise/result-hint/phone_hint.png" alt="section-dimmed__hint-img">
    </picture>
    <button
      :class="[ 'section-dimmed__fade-dimmed-out-button', { 'section-dimmed__fade-dimmed-out-button--active': isActive } ]"
      @mouseover="toggleActive"
      @mouseout="toggleActive"
      @touchstart="toggleActive"
      @touchend="toggleActive"
      @click="fadeDimmedOut"
    >
      我知道了
    </button>
  </div>
</template>

<script>
import ButtonToogleActive from '../../../mixins/ButtonToogledActive'

export default {
  mixins: [ ButtonToogleActive ],
  methods: {
    fadeDimmedOut () {
      this.$emit('fadeDimmedOut')
      window.ga('send', 'event', 'projects', 'click', 'ok', { nonInteraction: false })
    },
    calcDimensions () {
      // Using JS to calculate the dimensions except using CSS viewport, in order to avoid browser's bottom nav bar causing vh inconsistent
      this.$refs['section-dimmed'].style['height'] = `${this.$store.getters['PresidentPromise/heightMobile']}px`
    }
  },
  mounted () {
    if (!this.$store.state.useragent.isDesktop) {
      this.calcDimensions()
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-dimmed
  width 100vw
  height 100vh
  background-color rgba(0, 0, 0, .85)
  position absolute
  top 0
  left 0
  z-index 9999
  display flex
  flex-direction column
  justify-content center
  align-items center
  opacity 1
  &__title
    font-size 40px
    font-weight 900
    line-height 1.4
    text-align center
    color #b2dbd5
    margin 0
  &__hint-img
    max-width 760px
    margin 67px 0
  &__fade-dimmed-out-button
    font-size 36px
    color white
    background-color transparent
    border none
    border-bottom 3px solid white
    transition color .25s, border-bottom .25s
    padding 0 0 11px 0
    cursor pointer
    &:focus
      outline none
    &--active
      color #b2dbd5
      border-bottom 3px solid #b2dbd5
      transition color .25s, border-bottom .25s

.fade-enter-active, .fade-leave-active
  transition all .25s ease
.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 425px)
  .section-dimmed
    align-items flex-start
    &__title
      font-size 24px
      font-weight 900
      line-height 1.58
      text-align justify
      color #b2dbd5
      margin 0 0 0 20px
      span
        display none
    &__hint-img
      max-width 100%
      margin 5px 0
    &__fade-dimmed-out-button
      font-size 24px
      line-height 1.08
      text-align center
      color #ffffff
      padding 0 0 4px 0
      align-self center
</style>
