<template>
  <div :id="`story${index}`">
    <StoryLanding :storyIndex="index" ></StoryLanding>
    <article :class="`article--story${index}`" :style="storyData.background.top">
      <!-- parallax background containers -->
      <div :class="['parallax-bg', `long-polygon-bg--story${index}`]" :style="storyData.background.longPolygon"></div>
      <div :class="['parallax-bg', `fat-polygon-bg--story${index}`]" :style="storyData.background.fatPolygon"></div>
      <div class="commentary-bg--top" v-if="index === 3 || index === 5">
        <img src="/proj-assets/newtype/images/story3/bg-top.png" alt="">
      </div>
      <!--  -->
      <!-- Story begin -->
      <StoryDescription :isCommentary="isCommentary" :headerContent="storyData.header"></StoryDescription>
      <template v-for="(section, i) in storyData.articleSection">
        <section :key="i" 
                 :class="['section-container', {'self-background': section.hasSelfBackground}]"
                 :id="`story${index}-section${i + 1}`"
                 :style="section.hasSelfBackground ? section.background : null">
          <StoryArticleSection v-for="(subsection, j) in section.content" 
                               :key="j"
                               :storyIndex="index"
                               :paragraphOrder="i"
                               :currentVisible="currentVisible[`story${index}-section${i + 1}-subsection${j + 1}`] ? currentVisible[`story${index}-section${i + 1}-subsection${j + 1}`] : false"
                               :class="[ 'subsection-container', { 'subsection': section.content.length > 1 }]" 
                               :id="`story${index}-section${i + 1}-subsection${j + 1}`"
                               :sectionContent="subsection"
                               @refreshWaypoint="refreshWaypoint">
          </StoryArticleSection>
        </section>
        <StoryAnimation v-if="!isCommentary && i === storyData.parallax.ordering - 2" :key="i" :storyIndex="index"></StoryAnimation>
        <StoryParallax v-if="!isCommentary && i === storyData.parallax.ordering - 1" :key="i" :parallaxProps="storyData.parallax" :storyIndex="index"></StoryParallax>
      </template>
      <div class="commentary-bg--bottom">
        <img :src="`/proj-assets/newtype/images/story${index === 5 ? '3' : index}/bg-bottom.png`" alt="">
      </div>
      <!-- Story end -->
      <StoryReadNext v-if="$store.state.route.query.single === 'true' || index !== 5" :index="index" :descriptions="storyData.readNextDescription"/>
    </article>
    <AppFooter v-if="$store.state.route.query.single === 'true' || index === 5"/>
  </div>
</template>

<script>
import StoryLanding from './Story/StoryLanding.vue'
import StoryDescription from './Story/StoryDescription.vue'
import StoryArticleSection from './Story/StoryArticleSection.vue'
import StoryAnimation from './Story/StoryAnimation.vue'
import StoryParallax from './Story/StoryParallax.vue'
import StoryReadNext from './Story/StoryReadNext.vue'
import AppFooter from './AppFooter.vue'
// import FBComment from './FBComment.vue'

import storyWaypoints from '../mixins/waypoints/storyOnChange.js'
import articleSectionWaypoints from '../mixins/waypoints/articleSectionOnChange.js'
import storyBackgroundTransform from '../mixins/scrollmagic/transform/storyBackground.js'

export default {
  props: [ 'index', 'storyData' ],
  components: {
    StoryLanding,
    StoryDescription,
    StoryArticleSection,
    StoryAnimation,
    StoryParallax,
    StoryReadNext,
    AppFooter
    // FBComment
  },
  mixins: [ storyWaypoints, articleSectionWaypoints ],
  // mixins: [ storyWaypoints, articleSectionWaypoints, storyBackgroundTransform ],
  data () {
    return {
      currentVisible: this.setCurrentVisible()
    }
  },
  computed: {
    isCommentary () {
      return this.index === 3 || this.index === 5
    }
  },
  methods: {
    refreshWaypoint () {
      this.refreshWaypoints()
    },
    setCurrentVisible () {
      let obj = {}
      this.storyData.articleSection.forEach((section, i) => {
        section.content.forEach((subsection, j) => {
          this.$set(obj, `story${this.index}-section${i + 1}-subsection${j + 1}`, false)
        })
      })
      return this.currentVisible = obj
    }
  }
}
</script>

<style lang="stylus" scoped>
#story1, #story2, #story3, #story4, #story5
  background-color #f8f8f8
  // &#story4
  //   background-color #f1f5f5
  height 100%
  article
    position relative
    height 100%
    overflow-y hidden
    padding-top 10%
    // padding-bottom 20%
    .parallax-bg
      position absolute
      top 0
      width 100%
      height 100%
      will-change transform
    .section-container
      position relative
      &.self-background
        background-size auto 100%
        background-repeat no-repeat
        background-position 0% 0%, 100% 0%
        background-color rgba(255, 255, 255, 1)
      .subsection
        &:nth-child(1) // First of subsection
          padding-bottom 0
        & + .subsection // Subsections between the first and last subsection
          padding-top 0
    .commentary-bg--top
      position absolute
      top 0
      width 100vw
      height auto
      img
        width 100%
    .commentary-bg--bottom
      position relative
      bottom 0
      width 100vw
      height auto
      img
        width 100%
#story4
  article
    .section-container
      &.self-background
        background-color #567067
#story3, #story5
  background-color #606060

@media (max-width: 767px)
  #story2
    article
      .section-container
        &.self-background
          background-position -250px 0%, 150% 0%
  #story4
    article
      .section-container
        &.self-background
          background-position -2000px 0%, 100% 0%

@media (max-width: 413px)
  #story2
    article
      .section-container
        &.self-background
            background-position -300px 0%, 150% 0%
  #story4
    article
      .section-container
        &.self-background
          background-position -2000px 0%, 150% 0%

@media (max-width: 374px)
  #story2
    article
      .section-container
        &.self-background
          background-position -250px 0%, 150% 0%
  #story4
    article
      .section-container
        &.self-background
          background-position -2000px 0%, 100% 0%
</style>

