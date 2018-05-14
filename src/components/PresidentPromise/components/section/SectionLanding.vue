<template>
  <div class="section" data-anchor="section-landing" ref="section-landing">
    <div class="landing">
      <img class="landing__icon" src="/proj-assets/president-promise/category/520_landing.gif" alt="landing__icon">
      <h1 class="landing__title">520</h1>
      <h2 class="landing__subtitle">週年政策隨機篩</h2>
      <p class="landing__description">透過 10 項政策快篩，看小英目前的施政方向是否擊中你的心。</p>
      <ButtonNavigateDown @click.native="moveSectionDown"/>
    </div>
  </div>
</template>

<script>
import fullPageMixin from '../../_vue-fullpage/fullPageMixin'
import ButtonNavigateDown from '../button/ButtonNavigateDown.vue'

export default {
  components: {
    ButtonNavigateDown,
  },
  mixins: [ fullPageMixin, ],
}
</script>

<style lang="stylus" scoped>
.landing
  max-width 1366px
  max-height 768px
  height 100%
  margin auto
  display flex
  flex-direction column
  justify-content center
  align-items center
  &__icon
    side = 140px
    width side
    height side
    margin 0 0 12px 0
  &__title
    font-size 160px
    color transparent
    -webkit-text-stroke 2px white
    margin 0 0 15px 0
  &__subtitle
    font-size 52px
    font-weight 900
    line-height 0.85
    color #ffffff
    margin 0 0 32px 0
  &__description
    font-size 24px
    line-height 1.33
    color #c9c9c9
    margin 0 0 36px 0
    text-align justify

@media (max-width 425px)
  .landing
    max-width 100%
    max-height 568px
    &__icon
      side = 80px
      width side
      height side
    &__title
      font-size 80px
      margin 0
    &__subtitle
      font-size 38px
      line-height 1.16
    &__description
      font-size 22px
      line-height 1.36
      padding 0 40px
</style>


