<template>
  <section :class="`article-section--story${storyIndex}`">
    <!-- Adisde figure -->
    <aside class="aside-figure">
      <transition name="fade">
        <figure class="aside-figure__figure" v-show="isMobile || currentVisible" v-for="(figure, i) in sectionContent.sectionFigures" :key="i" v-if="figure">
          <!-- <img :src="requireImg[i]"> -->
          <img v-lazy="{ src: requireImg[i], loading: '/proj-assets/newtype/images/spinner.svg' }">
          <figcaption>{{ getFigureCaption(sectionContent.sectionFigures[i]) }}</figcaption>
        </figure>
      </transition>
    </aside>
    <aside></aside>
    <!-- Main section -->
    <main>
      <h2 :class="`story${storyIndex}`" v-if="sectionContent.title">{{ sectionContent.title }}</h2>
      <p v-for="(paragraph, paragraphIndex) in sectionContent.paragraphs" :key="paragraphIndex" :class="{ 'highlight': paragraphIndex === sectionContent.highlightParagraph - 1 }">
        <StoryCommentaryCharts
          v-if="storyIndex === 3 && paragraphOrder === 2 && paragraphIndex === 0"
          :chartIndex="2"/>
        <StoryCommentaryCharts
          v-if="storyIndex === 3 && paragraphOrder === 2 && paragraphIndex === 0"
          :chartIndex="3"/>
        <template v-for="(token, tokenIndex) in tokenizeParagraph(paragraph, paragraphIndex)">
          <a class="hint" v-if="token === '（註）'" @click="toogleHint(`${paragraphIndex}-${tokenIndex}`)">{{ token }}</a>
          <a class="anchor" v-else-if="token === '洪金晶' || token === '吳觀玲和簡雅婕'" v-scroll-to="token === '洪金晶' ? '#story1' : '#story2'">{{ token }}</a>
          <span class="highlight" v-else-if="sectionContent.highlights && sectionContent.highlights.includes(token)">{{ token }}</span>
          <span v-else>{{ token }}</span>
        </template>
        <!-- hint -->
        <template v-if="sectionContent.hints && hasHint(paragraphIndex)">
          <span v-for="hint in sectionContent.hints" v-show="isHintToogle[getHintKey(hint)]" class="hint-box">
            {{ getHintValue(hint) }}
          </span>
        </template>
        <StoryCommentaryCharts
          v-if="storyIndex === 3 && paragraphOrder === 0 && paragraphIndex === 0"
          :chartIndex="1"/>
        <StoryCommentaryCharts
          v-if="storyIndex === 3 && paragraphOrder === 2 && paragraphIndex === 0"
          :chartIndex="4"/>
        <img 
          class="teacher"
          v-if="storyIndex === 5 && paragraphOrder === 0 && paragraphIndex === sectionContent.paragraphs.length - 1" 
          src="/proj-assets/newtype/images/story5/teacher.png" 
          alt="">
      </p>
    </main>
  </section>
</template>

<script>
const _ = require('lodash')

import StoryCommentaryCharts from './StoryCommentaryCharts.vue'

export default {
  props: [ 'storyIndex', 'sectionContent', 'currentVisible', 'paragraphOrder' ],
  components: {
    StoryCommentaryCharts
  },
  watch: {
    currentVisible () {
      if (window.innerWidth > 767 && this.currentVisible && this.$el) {
        if (this.$el.querySelector('.aside-figure__figure')) {
          const style = this.$el.querySelector('.aside-figure__figure').style
          style.position = 'fixed'
          style.top = '35%'
          style.left = '12%'
        }
      }
    }
  },
  data () {
    return {
      isHintToogle: {
        "0-1": false,
        "0-3": false
      }
    }
  },
  computed: {
    requireImg () {
      return this.sectionContent.sectionFigures.map((figure) => `/proj-assets/newtype/images/${_.keys(figure)}.jpg`)
    },
    isMobile () {
      if (process.browser) {
        return window.innerWidth <= 767
      }
    }
  },
  methods: {
    getFigureCaption (figObj) {
      return _.values(figObj)[0]
    },
    tokenizeParagraph (paragraph, paragraphIndex) {
      const result = paragraph.split(/\/hint|\/highlight|\/anchor/)
      return result
    },
    toogleHint (toogleKey) {
      Object.keys(this.isHintToogle).forEach((key) => {
        if (key !== toogleKey)
        this.isHintToogle[key] = false
      })
      this.isHintToogle[toogleKey] = !this.isHintToogle[toogleKey]
    },
    getHintKey (hint) {
      return _.keys(hint)[0]
    },
    getHintValue (hint) {
      return _.values(hint)[0]
    },
    hasHint (paragarphIndex) {
      let bool = false
      Object.keys(this.isHintToogle).forEach((key) => {
        const visibleIndex = parseInt(key.split('-')[0])
        if (paragarphIndex === visibleIndex) {
          bool = true
        }
      })
      return bool
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  padding 5% 12%
  aside
    width 35%
    float left
    clear both
    min-height 1px
    figure
      display flex
      flex-direction column
      figureBorderWidth = 20px
      // margin 0 40px 0 0
      img
        width 18vw
        padding figureBorderWidth
        background-color white
        box-sizing content-box
        box-shadow 0px 0px 8px 0px rgba(0,0,0,0.03)
        &[src $= svg]
          width 9vw
          padding-left calc(4.5vw + 20px)
          padding-right calc(4.5vw + 20px)
      figcaption
        width 18vw
        box-sizing content-box
        padding figureBorderWidth
        line-height 1.75
        text-align justify
    .fade-enter-active, .fade-leave-active
      transition opacity .25s
    .fade-enter, .fade-leave-to
      opacity 0

  main
    width 65%
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
    h2
      float left
      clear left
      position relative
      z-index 0
      padding-right 20px
      &.story1
        &:after
          content ''
          display inline-block
          position absolute
          right 0
          -webkit-mask-image url(/proj-assets/newtype/images/tape-mask.png)
          -webkit-mask-position center center
          -webkit-mask-size 100% auto
          -webkit-mask-repeat no-repeat
          background-color #fae2e4
          width calc(343px * 0.6)
          height calc(104px * 0.6)
          z-index -1
      &.story2
        &:after
          content ''
          display inline-block
          position absolute
          right 0
          -webkit-mask-image url(/proj-assets/newtype/images/tape-mask.png)
          -webkit-mask-position center center
          -webkit-mask-size 100% auto
          -webkit-mask-repeat no-repeat
          background-color #f4e5d2
          width calc(343px * 0.6)
          height calc(104px * 0.6)
          z-index -1
      &.story3, &.story5
        &:after
          content ''
          display inline-block
          position absolute
          right 0
          -webkit-mask-image url(/proj-assets/newtype/images/tape-mask.png)
          -webkit-mask-position center center
          -webkit-mask-size 100% auto
          -webkit-mask-repeat no-repeat
          background-color #7a7919
          width calc(343px * 0.6)
          height calc(104px * 0.6)
          z-index -1
    p
      line-height 1.8
      text-align justify
      z-index 2
      // display flex
      // flex-direction column
      &.highlight
        color #567067 !important
        font-weight bold
      .highlight
        color #fddcb6
      .anchor, .hint
        cursor pointer
        color #fddcb6
      .hint-box
        display block
        border 1px solid white
        padding 50px
        margin-top 2em
      .teacher
        width: 50%;
        margin-top: 1em;
        margin-bottom: 1em;
        display: flex;
        margin-left: auto;
        margin-right: auto

.article-section--story3, .article-section--story5
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding-top 0
  aside
    width 0
  main
    width 80%
    // align-items center
    h2
      align-self center

@media (max-width: 767px)
  section
    display flex
    flex-direction column-reverse
    padding 0
    // background-position -250px 0%, 150% 0%
    &.self-background
      main
        background-color rgba(255, 255, 255, .5)
    aside
      width 100%
      figure
        margin 0
        display flex !important
        img
          width calc(100vw - 4em)
          padding 20px 2em
          &[src $= svg]
            width 50vw
            padding-left 25vw
            padding-right 25vw
        figcaption
          width calc(100vw - 4em)
          padding 20px 2em
          background-color white
          padding-top 0
    main
      width 100%
      padding 0 2em
      h2
        padding-right 0
        &:after
          top 0
          width calc(343px * 0.5)
          height calc(104px * 0.5)
      p
        .hint-box
          padding 20px
        .teacher
          width 100%
    
  .article-section--story3, .article-section--story5
    main 
      width 100%
</style>


