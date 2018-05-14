<template>
  <div class="section section-your-interest" data-anchor="section-your-interest" ref="section-your-interest">
    <!-- Fullpage will inject scrollOverflow wrapper here -->
    <div class="scroll-container" ref="scroll-container">
      <div class="your-interest">
        <h1 class="your-interest__hint">你感興趣的政策</h1>
        <template v-if="interests.length === 0">
          <SectionYourInterestNoInterest/>
        </template>
        <template v-else>
          <SectionYourInterestPromise v-for="(interest, i) in interests" :key="interest.pid" :order="i" :interest="interest"/>
        </template>
        <div class="your-interest__button-container">
          <ButtonNavigateMoveTo :navigateType="'more'" @click.native="nextRoundSurvey"/>
          <ButtonNavigateMoveTo :navigateType="'see-statistic'" @click.native="moveSectionDown"/>
        </div>
      </div>
      <EmailKeepTracking v-show="$store.state.PresidentPromise.currentSection === 'section-your-interest'"/>
      <Credit v-show="$store.state.PresidentPromise.currentSection === 'section-your-interest'"/>
    </div>
  </div>
</template>

<script>
import fullPageMixin from '../../_vue-fullpage/fullPageMixin'
import SectionYourInterestPromise from './sectionYourInterest/SectionYourInterestPromise.vue'
import SectionYourInterestNoInterest from './sectionYourInterest/SectionYourInterestNoInterest.vue'
import ButtonNavigateMoveTo from '../button/ButtonNavigateMoveTo.vue'
import EmailKeepTracking from '../EmailKeepTracking.vue'
import Credit from '../Credit.vue'

export default {
  mixins: [ fullPageMixin ],
  components: {
    SectionYourInterestPromise,
    SectionYourInterestNoInterest,
    ButtonNavigateMoveTo,
    EmailKeepTracking,
    Credit,
  },
  computed: {
    interests () {
      return this.$store.getters['PresidentPromise/interestCurrentRound']
    }
  },
  methods: {
    nextRoundSurvey () {
      this.$store.dispatch('PresidentPromise/SURVEY_NEXT_ROUND')
      this.moveTo('section-promise-survey', 0)
    },
    calcSrcollContainerDimensions () {
      // Using JS to calculate the dimensions except using CSS viewport, in order to avoid browser's bottom nav bar causing vh inconsistent
      this.$refs['scroll-container'].style['height'] = `${this.$store.getters['PresidentPromise/heightMobile']}px`
    }
  },
  mounted () {
    if (!this.$store.state.useragent.isDesktop) {
      this.calcSrcollContainerDimensions()
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll-container
  height 100vh
  overflow-y scroll
  -webkit-overflow-scrolling touch
.your-interest
  max-width 1366px
  // max-height 768px
  // height 100%
  margin auto
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 69px 0
  &__hint
    font-size 40px
    font-weight 900
    line-height 1.1
    text-align center
    color #b2dbd5
    margin 0 0 60px 0
  &__button-container
    display flex
    > button
      & + button
        margin-left 46px

@media (max-width 425px)
  .your-interest
    max-width 100%
    padding 69px 20px
    align-items flex-start
    &__hint
      font-size 24px
      line-height 1.58
      margin 0 0 27px 0
    &__button-container
      width 100%
      display flex
      justify-content center
      > button
        & + button
          margin-left 20px
</style>

