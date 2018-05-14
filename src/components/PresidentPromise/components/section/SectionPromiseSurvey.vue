<template>
  <div class="section" data-anchor="section-promise-survey" ref="section-promise-survey">
    <SectionPromiseSurveyProgress
      v-show="$store.state.PresidentPromise.currentSlideIndex !== 10"
      :progressPerRound="progressPerRound"
    />
    <SlidePromiseSurvey
      v-for="(promise, i) in surveysPerRound"
      :key="i"
      :order="i"
      :promise="promise"
      @surveySubmit="surveySubmit"
    />
    <SlidePromiseSurveyEasterEgg/>
  </div>
</template>

<script>
import fullPageMixin from '../../_vue-fullpage/fullPageMixin'
import { find } from 'lodash'
import SlidePromiseSurvey from '../slide/SlidePromiseSurvey.vue'
import SlidePromiseSurveyEasterEgg from '../slide/SlidePromiseSurveyEasterEgg.vue'
import SectionPromiseSurveyProgress from './sectionPromiseSurvey/SectionPromiseSurveyProgress.vue'

export default {
  mixins: [ fullPageMixin ],
  components: {
    SlidePromiseSurvey,
    SlidePromiseSurveyEasterEgg,
    SectionPromiseSurveyProgress,
  },
  watch: {
    surveyRoundNum () {
      this.resetProgressPerRound()
    },
    isCurrentSectionActive () {
      if (this.isCurrentSectionActive && window.innerWidth <= 320) {
        this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', false)
      } else {
        this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', true)
      }
    },
    '$store.state.PresidentPromise.currentSlideIndex' (value, oldValue) {
      if (value > oldValue) this.progressPerRound += 1
    }
  },
  data () {
    return {
      progressPerRound: 1,
    }
  },
  computed: {
    isCurrentSectionActive () {
      return this.$store.state.PresidentPromise.currentSection === 'section-promise-survey'
    },
    promiseData () {
      return this.$store.state.PresidentPromise.promiseData
    },
    surveyRoundNum () {
      return this.$store.state.PresidentPromise.surveyRoundNum
    },
    surveysPerRound () {
      return this.$store.getters['PresidentPromise/surveysPerRound']
    },
  },
  methods: {
    resetProgressPerRound () {
      this.progressPerRound = 1
    },
    surveySubmit (pid, interest) {
      let submittedRef = find(this.promiseData, [ 'pid', pid ])
      
      // prevent sending duplicated result that is already send
      if (submittedRef.surveyResult !== 'no-ans') return

      submittedRef.surveyResult = interest
      this.$store.dispatch('PresidentPromise/UPDATE_INTEREST', { interest, promise: submittedRef })
    },
  },
}
</script>
