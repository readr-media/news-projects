<template>
  <section :class="[ 'section-content', { 'section-content--background-gray': renderedSectionContent === 'dashboard' } ]">
    <SectionContentHeader
      :class="[ 'section-content__header', { 'section-content__header--sticky' :isSectionContentReachTop } ]"
      @toogleComment="toogleComment"
    />
    <AppAsideNav :class="[ 'section-content__aside-nav', { 'section-content__aside-nav--hide': !showAsideNav } ]" @openLightboxRelatedTopics="openLightboxRelatedTopics"/>
    <AppLightbox v-show="showLightboxRelatedTopics" @closeLightbox="closeLightboxRelatedTopics">
      <RelatedTopics/>
    </AppLightbox>
    <AppSidebar
      class="section-content__comment-sidebar"
      :isSidebarToogle="isSidebarCommentToogle"
      :isSectionContentReachTop="isSectionContentReachTop"
      @toogleSidebarOff="isSidebarCommentToogle = false"
    >
      <!-- <iframe class="section-content__comment-iframe" src="https://www.readr.tw/comment?resource_url=https://readr.tw/series/dollclaw-machine"></iframe> -->
      <iframe class="section-content__comment-iframe" src="http://dev.readr.tw/comment?resource_url=http://dev.readr.tw/series/foreign-labour"></iframe>
    </AppSidebar>
    <transition name="fade" mode="out-in">
      <!-- section below will be replace by contents -->
      <main class="section-content__main-section" :is="renderedSectionContent"></main>
    </transition>
    <SectionContentFooter v-show="showFooter" class="section-content__footer"/>
  </section>
</template>

<script>
import SectionContentHeader from './sectionContent/SectionContentHeader.vue'
import AppAsideNav from '../AppAsideNav.vue'
import AppLightbox from '../AppLightbox.vue'
import RelatedTopics from '../related/RelatedTopics.vue'
import AppSidebar from '../AppSidebar.vue'
import SectionContentFooter from './sectionContent/SectionContentFooter.vue' // TODO: style while wide screen

import SectionContentDashboard from './sectionContent/SectionContentDashboard.vue'
import SectionContentExplore from './sectionContent/SectionContentExplore.vue'
import SectionContentStorys from './sectionContent/SectionContentStorys.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    AppAsideNav,
    AppLightbox,
    RelatedTopics,
    AppSidebar,
    SectionContentHeader,
    'dashboard': SectionContentDashboard,
    'explore': SectionContentExplore,
    'storys': SectionContentStorys,
    SectionContentFooter,
  },
  data () {
    return {
      isSectionContentReachTop: false,
      showAsideNav: false,
      isFooterAppear: false,
      isSidebarCommentToogle: false,
      scrollerSectionContent: undefined,
      scrollerFooter: undefined,
      showLightboxRelatedTopics: false,
    }
  },
  computed: {
    ...mapGetters([
      'renderedSectionContent'
    ]),
    showFooter () {
      return this.renderedSectionContent === 'storys'
    }
  },
  methods: {
    setScrollers () {
      this.setScrollerSectionContent()
      this.setScrollerFooter()
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
      this.showAsideNav = true
      this.isSectionContentReachTop = true
    },
    sectionContentHandleStepExit ({ element, index, direction }) {
      this.showAsideNav = false
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
          step: '.section-content__footer',
          offset: 1,
        })
        .onStepEnter(this.footerHandleStepEnter)
        .onStepExit(this.footerHandleStepExit)

      window.addEventListener('resize', this.scrollerFooterResizeHandler)
    },
    footerHandleStepEnter ({ element, index, direction }) {
      this.isFooterAppear = true
      this.showAsideNav = false
    },
    footerHandleStepExit ({ element, index, direction }) {
      this.isFooterAppear = false
      this.showAsideNav = true
    },
    scrollerFooterResizeHandler () {
      this.scrollerFooter.resize()
    },
    toogleComment () {
      this.isSidebarCommentToogle = !this.isSidebarCommentToogle
    },
    openLightboxRelatedTopics () {
      this.showLightboxRelatedTopics = true
    },
    closeLightboxRelatedTopics () {
      this.showLightboxRelatedTopics = false
    },
  },
  mounted () {
    this.setScrollers()

    // Perform a auto scroll while section content component has mounted, and hasn't exist before
    // scenario like: user visit path /political-contribution/story1 directly, or
    //                user has navigate a router link on landing page while visited landing page previously, section content compoent still not rendered before
    // this.$scrollTo('.section-content')
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
  &--background-gray
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
  &__aside-nav
    position fixed
    top 60px
    margin 0 0 0 40px
    height calc(100vh - 60px)
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
</style>

