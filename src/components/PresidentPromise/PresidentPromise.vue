<template>
  <div class="president-promise">
    <transition-group name="fade" mode="out-in">
      <a v-show="$store.state.PresidentPromise.showHeader" :key="'president-promise__readr-link'" class="president-promise__readr-link" href="https://www.readr.tw/" target="_blank" @click="sendGAHome">
        <img class="president-promise__readr-logo" src="/proj-assets/logo_readr.png" alt="">
      </a>
      <AppShareIcon v-show="$store.state.PresidentPromise.showHeader" :key="'president-promise__share-icon'" class="president-promise__share-icon" :shareUrl="shareLink" top="0px" right="0px" direction="down"/>
      <ButtonToResult v-show="$store.state.PresidentPromise.showHeader && showToResultButton" :key="'president-promise__move-to-result'" class="president-promise__move-to-result"/>
    </transition-group>
    <full-page
      :options="options"
      ref="fullpage"
      @after-load="afterLoad"
      @after-slide-load="afterSlideLoad"
    >
      <SectionLanding ref="t0"/>
      <SectionPromiseSurvey ref="t1"/>
      <SectionYourInterest ref="t2"/>
      <SectionResult ref="t3"/>
    </full-page>
  </div>
</template>

<script>
// share icon
import AppShareIcon from './components/AppShareIcon.vue'
// move to result navigation button
import ButtonToResult from './components/button/ButtonToResult.vue'
// Fullpage.js Vue wrapper 
import FullPage from './_vue-fullpage/FullPage.vue'
import fullPageMixin from './_vue-fullpage/fullPageMixin'
// sections
import SectionLanding from './components/section/SectionLanding.vue'
import SectionPromiseSurvey from './components/section/SectionPromiseSurvey.vue'
import SectionYourInterest from './components/section/SectionYourInterest.vue'
import SectionResult from './components/section/SectionResult.vue'
// store module
import PresidentPromiseStoreModule from '../../store/modules/PresidentPromise'
// constants
import { READR_SITE_URL } from '../../constants'
import { PROMISES_SHEET_ID, DEFAULT_SHEET_RANGE } from './constants'

const fetchSheet = (store, { spreadsheetId, range }) => {
  return store.dispatch('PresidentPromise/FETCH_PROMISEDATA', {
    params: {
      spreadsheetId: spreadsheetId,
      range: range,
    }
  })
}

export default {
  metaInfo () {
    return {
      title: '小英，說好的承諾呢？——520兩週年政見追蹤',
      description: '兩年了，你還記得總統曾經對人民許下的承諾嗎？來看看你關心的事情有沒有被兌現！',
      metaUrl: 'president-promise',
      metaImage: 'president-promise/ogimage.jpg'
    }
  },
  components: {
    AppShareIcon,
    ButtonToResult,
    FullPage,
    SectionLanding,
    SectionPromiseSurvey,
    SectionYourInterest,
    SectionResult,
  },
  mixins: [ fullPageMixin, ],
  data () {
    return {
      shareLink: `${READR_SITE_URL}president-promise`,
      options: {
        keyboardScrolling: false,
        lockAnchors: true,
        recordHistory: true,
        controlArrows: false,
        sectionsColor: [ '#2b616d', '#2b616d', '#1f464f', '#2b616d', ],
      },
    }
  },
  computed: {
    showToResultButton () {
      return this.$store.state.PresidentPromise.currentSection === 'section-landing' || this.$store.state.PresidentPromise.currentSection === 'section-promise-survey'
    },
    shouldNavToCategoryPromiseDone () {
      return 'promise-done' in this.$route.query
    },
  },
  methods: {
    afterLoad (anchorLink, index) {
      this.$store.commit('PresidentPromise/SET_CURRENT_SECTION', anchorLink)

      // landing to survey GA handle
      if (anchorLink === 'section-promise-survey') {
        if (!this.$store.state.PresidentPromise.surveySectionBeenNavigated) {
          this.$store.commit('PresidentPromise/SURVEY_SECTION_NAVIGATED')
          if (!this.$store.state.PresidentPromise.isLandingButtonClicked) {
            window.ga('send', 'event', 'projects', 'scroll', 'scroll to start', { nonInteraction: false })
          }
        }
      }

    },
    afterSlideLoad (anchorLink, index, slideAnchor, slideIndex) {
      this.$store.commit('PresidentPromise/SET_CURRENT_SLIDE_INDEX', slideIndex)
    },
    sendGAHome () {
      window.ga('send', 'event', 'projects', 'click', 'back to home', { nonInteraction: false })
    }
  },
  created () {
    this.$store.registerModule('PresidentPromise', PresidentPromiseStoreModule)
  },
  destroyed () {
    this.$store.unregisterModule('PresidentPromise')
  },
  beforeMount () {
    fetchSheet(this.$store, {
      spreadsheetId: PROMISES_SHEET_ID,
      range: DEFAULT_SHEET_RANGE,
    })
  },
  mounted () {
    this.setAllowScrolling(false)
    if (this.shouldNavToCategoryPromiseDone) this.moveTo('section-result')
  }
}
</script>

<style lang="stylus">
.president-promise
  &__readr-link
    position fixed
    top 14px
    left 14px
    z-index 9997
  &__readr-logo
    width 52px
  &__move-to-result
    position fixed
    top 14px
    right 96px
    z-index 9997

.fade-enter-active, .fade-leave-active
  transition all .25s ease
.fade-enter, .fade-leave-active
  opacity 0

.grecaptcha-badge
  opacity 0

@media (max-width 425px)
  .president-promise
    &__move-to-result
      right 70px
</style>
