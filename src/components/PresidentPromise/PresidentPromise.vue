<template>
  <div class="president-promise">
    <transition-group name="fade" mode="out-in">
      <a v-show="$store.state.PresidentPromise.showHeader" :key="'president-promise__readr-link'" class="president-promise__readr-link" href="https://www.readr.tw/" target="_blank">
        <img class="president-promise__readr-logo" src="/proj-assets/logo_readr.png" alt="">
      </a>
      <AppShareIcon v-show="$store.state.PresidentPromise.showHeader" :key="'president-promise__share-icon'" class="president-promise__share-icon" :shareUrl="shareLink" :bgColor="'#2b616d'" top="0px" right="0px" direction="down"/>
    </transition-group>
    <full-page :options="options" ref="fullpage" @after-load="afterLoad" @after-slide-load="afterSlideLoad">
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
import { READR_SITE_URL, SITE_DOMAIN_DEV } from '../../constants'

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
      title: '520 週年政策隨機篩',
      description: '透過 10 項政策快篩，看小英目前的施政方向是否擊中你的心。',
      metaUrl: 'president-promise',
      metaImage: 'president-promise/ogimage.jpg'
    }
  },
  components: {
    AppShareIcon,
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
  methods: {
    afterLoad (anchorLink, index) {
      this.$store.commit('PresidentPromise/SET_CURRENT_SECTION', anchorLink)
      // scrolling handler
      // anchorLink !== 'section-landing' ? ( anchorLink === 'section-promise-survey' ? this.setAllowScrolling(false, 'down, right, left') : this.setAllowScrolling(false) ) : this.setAllowScrolling(true)
      if (anchorLink !== 'section-landing') {
        if (anchorLink === 'section-promise-survey') {
          this.setAllowScrolling(true)
          this.setAllowScrolling(false, 'down, right, left')
        } else {
          this.setAllowScrolling(false)
        }
      } else {
       this.setAllowScrolling(true)
      }
      // this.setAllowScrolling(false)

    },
    afterSlideLoad (anchorLink, index, slideAnchor, slideIndex) {
      this.$store.commit('PresidentPromise/SET_CURRENT_SLIDE_INDEX', slideIndex)
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
      spreadsheetId: '18LjwTRLQM9TqVHt5dfY3Dlk-nmb7okxaZ4gjiLr5PZc',
      range: 'sheet1',
    })
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

.fade-enter-active, .fade-leave-active
  transition all .25s ease
.fade-enter, .fade-leave-active
  opacity 0

.grecaptcha-badge
  opacity 0
</style>
