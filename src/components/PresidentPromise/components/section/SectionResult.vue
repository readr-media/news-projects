<template>
  <div class="section" data-anchor="section-result" ref="section-result">
    <!-- <div class="scroll-container" ref="scroll-container" @scroll="scroll"> -->
    <div class="scroll-container" ref="scroll-container" @scroll="scroll">
      <div class="result" ref="result">
        <h1 class="result__title">政策追蹤排行榜</h1>
        <h2 class="result__subtitle">排行榜會隨著大家關心的程度變化！READr 的記者也會針對這些政策作追蹤報導，敬請期待！</h2>
        <SectionResultSwiper :scrollContainerRef="$refs['scroll-container']"/>
      </div>
      <EmailKeepTracking class="footer"/>
      <Credit/>
      <AppFooter/>
    </div>
    <transition name="fade" mode="out-in">
      <SectionResultDimmed v-show="showDimmed" @fadeDimmedOut="fadeDimmedOut"/>
    </transition>
    <ButtonWithCaption
      v-show="showLightboxToogleButton" 
      class="section__toogle-lightbox"
      @toggleLightbox="toogleLightbox"
    />
    <transition name="fade" mode="out-in">
      <SectionResultLightbox v-show="showLightbox" :showLightbox.sync="showLightbox"/>
    </transition>
  </div>
</template>

<script>
import ButtonWithCaption from '../button/ButtonWithCaption.vue'
import SectionResultDimmed from './sectionResult/SectionResultDimmed.vue'
import SectionResultLightbox from './sectionResult/SectionResultLightbox.vue'
import SectionResultSwiper from './sectionResult/SectionResultSwiper.vue'
import EmailKeepTracking from '../EmailKeepTracking.vue'
import Credit from '../Credit.vue'
import AppFooter from '../AppFooter.vue'
import { isElementReachEnd, } from '../../util/comm'

export default {
  components: {
    ButtonWithCaption,
    SectionResultDimmed,
    SectionResultLightbox,
    SectionResultSwiper,
    EmailKeepTracking,
    Credit,
    AppFooter,
  },
  watch: {
    isCurrentSectionActive () {
      if (this.isCurrentSectionActive && !this.$store.state.PresidentPromise.resultSectionBeenNavigated) {
        this.$store.commit('PresidentPromise/RESULT_SECTION_NAVIGATED')
        this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', false)
        setTimeout(() => {
          this.fadeDimmedOut()
        }, 5000)
      }
    },
    showLightbox (value) {
      this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', !value)
    }
  },
  data () {
    return {
      showLightbox: false,
      showLightboxToogleButton: false,
      showDimmed: true
      // shouldLoadmore: false,
    }
  },
  computed: {
    isCurrentSectionActive () {
      return this.$store.state.PresidentPromise.currentSection === 'section-result'
    }
  },
  methods: {
    toogleLightbox () {
      this.showLightbox = !this.showLightbox
    },
    calcSrcollContainerDimensions () {
      // Using JS to calculate the dimensions except using CSS viewport, in order to avoid browser's bottom nav bar causing vh inconsistent
      this.$refs['scroll-container'].style['height'] = `${this.$store.getters['PresidentPromise/heightMobile']}px`
    },
    scroll (e) {
      // this.shouldLoadmore = isElementReachEnd(e.target, this.$refs['result'])
      if (window.innerWidth > 425) {
        if (e.target.scrollTop <= 173 && !this.$store.state.PresidentPromise.showHeader) {
          this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', true)
        } else if (e.target.scrollTop > 173 && this.$store.state.PresidentPromise.showHeader) {
          this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', false)
        }
      } else {
        if (e.target.scrollTop <= 148 && !this.$store.state.PresidentPromise.showHeader) {
          this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', true)
        } else if (e.target.scrollTop > 148 && this.$store.state.PresidentPromise.showHeader) {
          this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', false)
        }
      }
    },
    fadeDimmedOut () {
      this.showDimmed = false
      this.showLightboxToogleButton = true
      this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', true)
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
.result
  max-width 100%
  &__title
    font-size 40px
    font-weight 900
    line-height 1.1
    text-align center
    color #b2dbd5
    padding 69px 0 22px 0
    margin 0
  &__subtitle
    font-size 18px
    line-height 1.33
    text-align center
    color #ffffff
    margin 0 0 19px 0
.section
  position relative
  &__toogle-lightbox
    position absolute
    right 20px
    bottom 20px
.footer
  margin 143px 0 0 0

@media (max-width 425px)
  .result
    &__title
      font-size 24px
      line-height 1.58
      text-align left
      padding 88px 0 23px 20px
      margin 0
    &__subtitle
      font-size 18px
      line-height 1.58
      text-align justify
      padding 0px 20px
      // margin 0
  .section
    &__toogle-lightbox
      right 10px
      bottom 10px
  .footer
    margin 0
</style>


