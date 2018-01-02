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
      <h2 :class="[`story${storyIndex}`, `title--story${storyIndex}-paragraph${paragraphOrder}`]" v-if="sectionContent.title">{{ sectionContent.title }}</h2>
      <p v-for="(paragraph, paragraphIndex) in sectionContent.paragraphs" :key="paragraphIndex" :class="{ 'highlight': paragraphIndex === sectionContent.highlightParagraph - 1 }">
        <Story4ChartSwiper
          v-if="storyIndex === 4 && paragraphOrder === 2 && paragraphIndex === 2"/>
        <StoryCommentaryCharts
          v-if="storyIndex === 3 && paragraphOrder === 2 && paragraphIndex === 0"
          :chartIndex="2"/>
        <StoryCommentaryCharts
          v-if="storyIndex === 3 && paragraphOrder === 2 && paragraphIndex === 0"
          :chartIndex="3"/>
        <template v-for="(token, tokenIndex) in tokenizeParagraph(paragraph, paragraphIndex)">
          <!-- <a class="hint" v-if="token === '（註）'" @click="toogleHint(`${paragraphIndex}-${tokenIndex}`)">{{ token }}</a> -->
          <span v-if="token === '（註）'">
            <a :class="['hint', `hint--story${storyIndex}`]" @click="toogleHint(`${paragraphIndex}-${tokenIndex}`)">{{ token }}</a>
            <span v-show="isHintToogle[`${paragraphIndex}-${tokenIndex}`]" :class="['hint-box', `hint-box--story${storyIndex}`]">
              {{ sectionContent.hints[`${paragraphIndex}-${tokenIndex}`] }}
            </span>
          </span>
          <a class="anchor" 
             v-else-if="token === '洪金晶' || token === '吳觀玲和簡雅婕'" 
             :href="token === '洪金晶' ? '/project/newtype/story1?single=true' : '/project/newtype/story2?single=true'"
             @click="anchor(token)"
             target="_blank">{{ token }}</a>
          <span class="highlight" v-else-if="sectionContent.highlights && sectionContent.highlights.includes(token)">{{ token }}</span>
          <span v-else-if="token === '「媽媽平常都說什麼話？」' || token === '「台語。」' || token === '「那跟你呢？都講什麼文？」' || token === '「現在都講越南話。'">{{ token }}<br></span>
          <span v-else>{{ token }}</span>
        </template>
        <!-- hint -->
        <!-- <template v-if="sectionContent.hints && hasHint(paragraphIndex)">
          <span v-for="hint in sectionContent.hints" v-show="isHintToogle[getHintKey(hint)]" class="hint-box">
            {{ getHintValue(hint) }}
          </span>
        </template> -->
        <StoryCommentaryCharts
          v-if="storyIndex === 3 && paragraphOrder === 0 && paragraphIndex === 2"
          :chartIndex="1"/>
        <StoryCommentaryCharts
          v-if="storyIndex === 3 && paragraphOrder === 2 && paragraphIndex === 2"
          :chartIndex="4"/>
        <span class="teacher-container" v-if="device && storyIndex === 5 && paragraphOrder === 0 && paragraphIndex === sectionContent.paragraphs.length - 1">
          <img 
            class="teacher" 
            :src="`/proj-assets/newtype/images/story5/${device}teacher.png`"
            alt="">
        </span>
      </p>
      <AppCredits v-if="storyIndex === 5 && paragraphOrder === 3"/>
    </main>
  </section>
</template>

<script>
const _ = require('lodash')

import StoryCommentaryCharts from './StoryCommentaryCharts.vue'
import Story4ChartSwiper from './Story4ChartSwiper.vue'
import AppCredits from '../AppCredits.vue'

export default {
  props: [ 'storyIndex', 'sectionContent', 'currentVisible', 'paragraphOrder' ],
  components: {
    StoryCommentaryCharts,
    Story4ChartSwiper,
    AppCredits
  },
  watch: {
    currentVisible () {
      if (window.innerWidth > 767 && this.currentVisible && this.$el) {
        if (this.$el.querySelector('.aside-figure__figure')) {
          const style = this.$el.querySelector('.aside-figure__figure').style
          style.position = 'fixed'
          style.top = '15%'
          style.left = '12%'
        }
      }
    }
  },
  data () {
    return {
      isHintToogle: {
        "0-1": false,
        "1-1": false,
        "3-1": false
      },
      device: undefined
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
    anchor (token) {
      if (token === '洪金晶') {
        ga('send', 'event', 'projects', 'click', '3_story1', { nonInteraction: false })
      } else if (token === '吳觀玲和簡雅婕') {
        ga('send', 'event', 'projects', 'click', '3_story2', { nonInteraction: false })
      }
    },
    getFigureCaption (figObj) {
      return _.values(figObj)[0]
    },
    tokenizeParagraph (paragraph, paragraphIndex) {
      const result = paragraph.split(/\/hint|\/highlight|\/anchor|\/br/)
      return result
    },
    toogleHint (toogleKey) {
      this.isHintToogle[toogleKey] = !this.isHintToogle[toogleKey]
      setTimeout(() => { this.$emit('refreshWaypoint') }, 500)
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
  },
  mounted () {
    window.innerWidth <= 767 ? this.device = 'phone' : this.device = 'web'
  }
}
</script>

<style lang="stylus" scoped>
section
  padding 4% 12%
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
      margin-bottom 1.5em
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
      &.story4
        &:after
          content ''
          display inline-block
          position absolute
          right 0
          -webkit-mask-image url(/proj-assets/newtype/images/tape-mask.png)
          -webkit-mask-position center center
          -webkit-mask-size 100% auto
          -webkit-mask-repeat no-repeat
          background-color #c4d3ce
          opacity .5
          width calc(343px * 0.6)
          height calc(104px * 0.6)
          z-index -1
      // &.story3, &.story5
      //   &:after
      //     content ''
      //     display inline-block
      //     position absolute
      //     right 0
      //     -webkit-mask-image url(/proj-assets/newtype/images/tape-mask.png)
      //     -webkit-mask-position center center
      //     -webkit-mask-size 100% auto
      //     -webkit-mask-repeat no-repeat
      //     background-color #7a7919
      //     width calc(343px * 0.6)
      //     height calc(104px * 0.6)
      //     z-index -1
    p
      line-height 1.8
      text-align justify
      z-index 2
      // display flex
      // flex-direction column
      &.highlight
        color #597269 !important
        font-weight bold
      .highlight
        color #e5e973
        font-weight bold
      .anchor
        cursor pointer
        color #fddcb6
      .hint
        cursor pointer
        color #b5b5b5
      .hint--story4
        color #364d77
      .anchor
        border-bottom 2px solid #fddcb6
        text-decoration none
      .hint-box
        display block
        border 1px solid white
        padding 50px
        margin 2em 0
        &--story4
          border 1px solid black
      .teacher-container
        width: 70%;
        margin-top: 1em;
        margin-bottom: 1em;
        display: flex;
        margin-left: auto;
        margin-right: auto
        .teacher
          width 100%
          height 50%

#story4-section3-subsection1
  main
    h2
      color white
    p
      color white

.article-section--story3, .article-section--story5
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding-top 0
  aside
    width 0
  main
    width 970px
    // align-items center
    h2
      align-self center

@media (max-width: 767px)
  section
    display flex
    flex-direction column-reverse
    padding 0
    // background-position -250px 0%, 150% 0%
    &.self-background:not(#story4-section3)
      main
        background-color rgba(255, 255, 255, .5)
    &.self-background[id=story4-section3]
      main
        background-color rgba(86, 112, 103, .8)
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
      overflow-x hidden
      h2
        padding-right 0
        margin-top 2.5em
        &:after
          top 0
          width calc(343px * 0.4) !important
          height calc(104px * 0.4) !important
      p
        .hint-box
          padding 20px
        .teacher-container
          width 140%
          position relative
          left -4em
          overflow-x hidden
          .teacher
            width 100%
            height 50%
    
  .article-section--story3, .article-section--story5
    main 
      width 100%
</style>


