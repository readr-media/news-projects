<template>
  <div class="section" data-anchor="section-landing" ref="section-landing">
    <div class="landing">
      <img class="landing__icon" src="/proj-assets/president-promise/category/520_landing.gif" alt="landing__icon">
      <h1 class="landing__title">小英，</h1>
      <h2 class="landing__subtitle">說好的承諾呢？</h2>
      <p class="landing__description">——520 兩週年政見追蹤</p>
      <!-- <ButtonNavigateDown @click.native="moveSectionDown"/> -->
      <div class="navigation-container">
        <ButtonNavigateMoveTo :navigateType="'take-survey'" @click.native="moveToSurvey"/>
        <ButtonNavigateMoveTo :navigateType="'see-statistic'" @click.native="moveToResult"/>
      </div>
    </div>
  </div>
</template>

<script>
import fullPageMixin from '../../_vue-fullpage/fullPageMixin'
// import ButtonNavigateDown from '../button/ButtonNavigateDown.vue'
import ButtonNavigateMoveTo from '../button/ButtonNavigateMoveTo.vue'

export default {
  components: {
    // ButtonNavigateDown,
    ButtonNavigateMoveTo,
  },
  mixins: [ fullPageMixin, ],
  methods: {
    moveToSurvey () {
      this.moveSectionDown()
    },
    moveToResult () {
      this.moveTo('section-result')
    }
  }
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
    font-size 120px
    color transparent
    -webkit-text-stroke 3px white
    margin 0 0 36px 0
  &__subtitle
    font-size 52px
    font-weight 900
    line-height 0.85
    color #ffffff
    margin 0 0 39px 0
  &__description
    font-size 24px
    line-height 1.33
    color #c9c9c9
    margin 0 0 69px 0
    text-align justify

.navigation-container
  display flex
  > button + button
    margin-left 46px

@media (max-width 425px)
  .landing
    max-width 100%
    max-height 568px
    &__icon
      side = 80px
      width side
      height side
      margin 0 0 22px 0
    &__title
      font-size 80px
      margin 0 0 19px 0
    &__subtitle
      font-size 38px
      line-height 1.16
    &__description
      font-size 22px
      line-height 1.36
      padding 0 40px
      margin 0 0 39px 0

  .navigation-container
    > button + button
      margin-left 20px

@media (max-width 320px)
  .landing
    max-width 100%
    max-height 568px
    &__icon
      side = 80px
      width side
      height side
      margin 0 0 22px 0
    &__title
      font-size 70px
      margin 0
    &__subtitle
      font-size 38px
      line-height 1.16
      margin 0 0 20px 0
    &__description
      font-size 22px
      line-height 1.36
      padding 0 40px
      margin 0 0 20px 0
</style>


