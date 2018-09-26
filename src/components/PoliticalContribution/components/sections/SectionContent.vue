<template>
  <section :class="[ 'section-content', { 'section-content--background-dashboard': renderedSectionContent === 'dashboard' } ]">
    <SectionContentHeader
      :class="[ 'section-content__header', { 'section-content__header--sticky': isSectionContentReachTop } ]"
      @toogleComment="toogleComment"
      @toogleNavSidebar="toogleNavSidebar"
    />
    <div class="section-content__nav-aside-container">
      <AppNavAside
        :class="[ 'section-content__nav-aside', { 'section-content__nav-aside--hide': !showNavAside } ]"
        @openLightboxRelatedTopics="openLightboxRelatedTopics"
      />
    </div>
    <AppSidebar
      class="section-content__nav-sidebar"
      :isSidebarToogle="showNavSidebar"
      :isSectionContentReachTop="isSectionContentReachTop"
      @toogleSidebarOff="showNavSidebar = false"
    >
      <AppNavSidebar
        @closeNavSidebar="showNavSidebar = false"
        @toogleRelatedLightbox="openLightboxRelatedTopics"
      />
    </AppSidebar>
    <AppLightbox v-show="showLightboxRelatedTopics" :isLightboxShown="showLightboxRelatedTopics" @closeLightbox="closeLightboxRelatedTopics">
      <RelatedTopics/>
    </AppLightbox>
    <AppSidebar
      class="section-content__comment-sidebar"
      :isSidebarToogle="isSidebarCommentToogle"
      :isSectionContentReachTop="isSectionContentReachTop"
      @toogleSidebarOff="isSidebarCommentToogle = false"
    >
      <!-- <iframe class="section-content__comment-iframe" src="https://www.readr.tw/comment?resource_url=https://readr.tw/series/dollclaw-machine"></iframe> -->
      <iframe class="section-content__comment-iframe" src="http://dev.readr.tw/comment?resource_url=http://www.readr.tw/series/political-contribution"></iframe>
    </AppSidebar>
    <img
      :class="[ 'section-content__explore-duel', { 'section-content__explore-duel--show': showDuelButton } ]"
      src="/proj-assets/political-contribution/pk.png"
      @click="navigateDuel"
    />
    <!-- <transition name="fade" mode="out-in"> -->
      <!-- section below will be replace by contents -->
      <main class="section-content__main-section" :is="renderedSectionContent"></main>
    <!-- </transition> -->
    <SectionContentFooter
      v-show="showFooter"
      class="section-content__footer"
      :isFooterShow="showFooter"
    />
  </section>
</template>

<script>
import { disableBodyScroll, enableBodyScroll, } from 'body-scroll-lock'

import SectionContentHeader from './sectionContent/SectionContentHeader.vue'
import AppNavAside from '../AppNavAside.vue'
import AppNavSidebar from '../AppNavSidebar.vue'
import AppLightbox from '../AppLightbox.vue'
import AppSidebar from '../AppSidebar.vue'
import RelatedTopics from '../related/RelatedTopics.vue'
import SectionContentFooter from './sectionContent/SectionContentFooter.vue'

import SectionContentDashboard from './sectionContent/SectionContentDashboard.vue'
import SectionContentExplore from './sectionContent/SectionContentExplore.vue'
import SectionContentStorys from './sectionContent/SectionContentStorys.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapState, mapMutations, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    AppNavAside,
    AppNavSidebar,
    AppLightbox,
    AppSidebar,
    RelatedTopics,
    SectionContentHeader,
    'dashboard': SectionContentDashboard,
    'explore': SectionContentExplore,
    'storys': SectionContentStorys,
    SectionContentFooter,
  },
  watch: {
    showLightboxRelatedTopics () {
      this.showLightboxRelatedTopics ? disableBodyScroll(this.lightboxTarget) : enableBodyScroll(this.lightboxTarget)
    }
  },
  data () {
    return {
      isSectionContentReachTop: false,
      showNavAside: false,
      showNavSidebar: false,
      isSidebarCommentToogle: false,
      scrollerSectionContent: undefined,
      scrollerFooter: undefined,
      // showLightboxRelatedTopics: false,
      lightboxTarget: undefined,
    }
  },
  computed: {
    ...mapState({
      showLightboxRelatedTopics: state => state.showLightboxRelatedTopics
    }),
    ...mapGetters([
      'renderedSectionContent'
    ]),
    showFooter () {
      return this.renderedSectionContent === 'storys'
    },
    showDuelButton () {
      return this.renderedSectionContent === 'explore' && this.isSectionContentReachTop
    }
  },
  methods: {
    setScrollers () {
      this.setScrollerSectionContent()
      if (this.$store.state.useragent.isDesktop) {
        this.setScrollerFooter()
      }
    },
    // scrollerSectionContent
    setScrollerSectionContent () {
      this.scrollerSectionContent = window.scrollama()
      this.scrollerSectionContent
        .setup({
          step: '.section-content',
          offset: 0,
        })
        .onStepEnter(this.sectionContentHandleStepEnter)
        .onStepExit(this.sectionContentHandleStepExit)

      window.addEventListener('resize', this.scrollerSectionContentResizeHandler)
    },
    sectionContentHandleStepEnter ({ element, index, direction }) {
      this.showNavAside = true
      this.isSectionContentReachTop = true
    },
    sectionContentHandleStepExit ({ element, index, direction }) {
      this.showNavAside = false
      this.isSectionContentReachTop = false
    },
    scrollerSectionContentResizeHandler () {
      this.scrollerSectionContent.resize()
    },
    // scrollerFooter
    setScrollerFooter () {
      this.scrollerFooter = window.scrollama()
      this.scrollerFooter
        .setup({
          step: '.section-content-footer__container',
          offset: 1,
        })
        .onStepEnter(this.footerHandleStepEnter)
        .onStepExit(this.footerHandleStepExit)

      window.addEventListener('resize', this.scrollerFooterResizeHandler)
    },
    footerHandleStepEnter ({ element, index, direction }) {
      this.showNavAside = false
    },
    footerHandleStepExit ({ element, index, direction }) {
      if (direction === 'up') {
        this.showNavAside = true
      }
    },
    scrollerFooterResizeHandler () {
      this.scrollerFooter.resize()
    },
    toogleComment () {
      this.isSidebarCommentToogle = !this.isSidebarCommentToogle
    },
    toogleNavSidebar () {
      this.showNavSidebar = !this.showNavSidebar
    },
    ...mapMutations({
      openLightboxRelatedTopics: 'OPEN_LIGHTBOX_RELATEDTOPICS',
      closeLightboxRelatedTopics: 'CLOSE_LIGHTBOX_RELATEDTOPICS'
    }),
    navigateDuel () {
      this.$scrollTo('.section-content-explore-duel', { duration: 500, offset: -80 })
    },
  },
  mounted () {
    this.setScrollers()
    this.lightboxTarget = document.querySelector('.related-topics')
    // Perform a auto scroll while section content component has mounted, and hasn't exist before
    // scenario like: user visit path /political-contribution/story1 directly, or
    //                user has navigate a router link on landing page while visited landing page previously, section content compoent still not rendered before
    this.$scrollTo('.section-content')
  },
  destoryed () {
    window.removeEventListener('resize', this.scrollerSectionContentResizeHandler)
    window.removeEventListener('resize', this.scrollerFooterResizeHandler)
  }
}
</script>

<style lang="stylus" scoped>
.section-content
  // position relative
  transition background-color .25s
  &--background-dashboard
    background-color #eaeaea
  &__header
    // position sticky
    // top 0
    position absolute
    z-index 10003
    &--sticky
      z-index 10006
      position fixed
      top 0
  &__nav-aside-container
    position fixed
    top 60px
    height calc(100vh - 60px)
    display flex
    align-items center
    z-index 10000
  &__nav-aside
    margin 0 0 0 40px
    display flex
    flex-direction column
    justify-content center
    opacity 1
    transition opacity .25s
    pointer-events initial
    &--hide
      opacity 0
      pointer-events none
  &__comment-iframe
    width 100%
    height 100%
  &__main-section
    max-width 900px
    margin 0 auto
    padding 167px 0 0 0
  &__explore-duel
    position fixed
    bottom 10px
    right 10px
    width 80px
    height 80px
    cursor pointer
    opacity 0
    pointer-events none
    transition opacity .25s
    &:hover
      filter brightness(80%)
    &--show
      opacity 1
      pointer-events initial

@media (max-width 1024px)
  .section-content
    &--background-dashboard
      background-color white
    &__nav-aside
      display none
    &__main-section
      max-width 100%
      margin 0
      padding 85px 20px 0 20px
    &__explore-duel
      display none
    &__footer
      display none
</style>

