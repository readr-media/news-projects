<template>
  <div class="section" data-anchor="section-result" ref="section-result">
    <!-- <div class="scroll-container" ref="scroll-container" @scroll="scroll"> -->
    <div class="scroll-container" ref="scroll-container" @scroll="scroll">
      <div class="result" ref="result">
        <h1 class="result__hint">政策追蹤排行榜</h1>
        <SectionResultSwiper :scrollContainerRef="$refs['scroll-container']"/>
      </div>
      <EmailKeepTracking class="footer"/>
      <Credit/>
    </div>
    <div :class="['section__dimmed', { 'section__dimmed--fade-dimmed-out': $store.state.PresidentPromise.resultSectionBeenNavigated }]"></div>
    <ButtonWithCaption 
      class="section__toogle-lightbox"
      :caption="'找不到您關心的政策？請點擊這裡，告訴我們遺漏了哪些。'"
      @toggleLightbox="toogleLightbox"
    />
    <transition name="fade" mode="out-in">
      <SectionResultLightbox v-show="showLightbox" :showLightbox.sync="showLightbox"/>
    </transition>
  </div>
</template>

<script>
import ButtonWithCaption from '../button/ButtonWithCaption.vue'
import SectionResultLightbox from './sectionResult/SectionResultLightbox.vue'
import SectionResultSwiper from './sectionResult/SectionResultSwiper.vue'
import EmailKeepTracking from '../EmailKeepTracking.vue'
import Credit from '../Credit.vue'
import { isElementReachEnd, } from '../../util/comm'

export default {
  components: {
    ButtonWithCaption,
    SectionResultLightbox,
    SectionResultSwiper,
    EmailKeepTracking,
    Credit,
  },
  watch: {
    isCurrentSectionActive () {
      if (this.isCurrentSectionActive && !this.$store.state.PresidentPromise.resultSectionBeenNavigated) {
        this.$store.commit('PresidentPromise/RESULT_SECTION_NAVIGATED')
        this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', false)
        setTimeout(() => {
          this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', true)
        }, 2500)
      }
    },
    showLightbox (value) {
      this.$store.commit('PresidentPromise/UPDATE_SHOWHEADER', !value)
    }
  },
  data () {
    return {
      showLightbox: false,
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
  &__hint
    font-size 40px
    font-weight 900
    line-height 1.1
    text-align center
    color #b2dbd5
    padding 69px 0 60px 0
    margin 0

@keyframes fadeDimmedOut
  from
    z-index 9999
    background-color rgba(0, 0, 0, .5)
  to
    z-index -1
    background-color transparent
.section
  position relative
  &__dimmed
    width 100vw
    height 100vh
    background-color rgba(0, 0, 0, .5)
    position absolute
    top 0
    left 0
    z-index 9999
    &--fade-dimmed-out
      animation fadeDimmedOut 1s linear 2s 1 normal forwards
  &__toogle-lightbox
    position absolute
    right 20px
    bottom 20px

.footer
  margin 143px 0 0 0

@media (max-width 425px)
  .result
    &__hint
      font-size 24px
      line-height 1.58
      text-align left
      padding 88px 0 23px 20px
      margin 0
  .section
    &__toogle-lightbox
      right 10px
      bottom 10px
  .footer
    margin 0
</style>


