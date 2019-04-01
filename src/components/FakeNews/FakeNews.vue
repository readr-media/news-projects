<template>
  <div :class="[ { 'fixed-header': pageYOffset > 84 }, 'fake-news' ]">
    <FakeNewsHeader
      :current="current"
      class="fake-news__header"
      @clickHeader="handleHeader"/>
    <main>
      <FakeNewsIndex
        :article="ARTICLE"
        :class="[ { active: current === 'menu' }, 'fake-news__index' ]"
        :currentChapter="currentChapter"
        :currentChapterMobile="currentChapterMobile"
        @goTo="goTo" />
      <div :class="[ { hidden: $store.state.viewport[0] < 1024 && current !== 'feed'  }, 'feed' ]">
        <div class="feed__main-block">
          <FakeNewsForeword />
          <template v-for="(chapter, chapterIndex) in ARTICLE">
            <FakeNewsPost v-for="(post, postIndex) in chapter.subIndex" :id="`article-${chapterIndex + 1}-${postIndex + 1}`" :key="`article-${chapterIndex}-${postIndex}`">
              <div
                v-for="(paragraph, paragraphIndex) in post.content"
                :key="`article-${chapterIndex}-${postIndex}-${paragraphIndex}`"
                v-html="paragraph"></div>
            </FakeNewsPost>
          </template>
          <FakeNewsRelated
            v-if="$store.state.reports.length > 0 && $store.state.viewport[0] < 1024"
            :reports="$store.state.reports"
            :reportsCount="$store.state.reportsCount" />
        </div>
        <div class="feed__secondary-block">
          <FakeNewsRelated
            v-if="$store.state.reports.length > 0 && $store.state.viewport[0] >= 1024"
            :reports="$store.state.reports"
            :reportsCount="$store.state.reportsCount" />
        </div>
      </div>
    </main>
  </div>
</template>
<script>

import FakeNewsForeword from './components/FakeNewsForeword.vue'
import FakeNewsHeader from './components/FakeNewsHeader.vue'
import FakeNewsIndex from './components/FakeNewsIndex.vue'
import FakeNewsPost from './components/FakeNewsPost.vue'
import FakeNewsRelated from './components/FakeNewsRelated.vue'
import { ARTICLE } from './constant'
import { throttle } from 'lodash'

const fetchReports = (store) => {
  return store.dispatch('FETCH_REPORTS', {
    params: {
      maxResult: 4,
      where: {
        reportPublishStatus: 2,
      },
      page: 1,
      sort: '-published_at',
    },
  })
}

const chapterIds = ARTICLE.map(chapter => `#article-${chapter.chapter}-1`)

export default {
  name: 'FakeNews',
  components: {
    FakeNewsForeword,
    FakeNewsHeader,
    FakeNewsIndex,
    FakeNewsPost,
    FakeNewsRelated
  },
  metaInfo() {
    return {
      title: '謠言與牠們的產地',
      description: 'Fake News',
      metaUrl: 'fake-news',
      metaImage: 'fake-news/og.jpg',
      customScript: `
        <script src="//cdn.jsdelivr.net/npm/typeit@6.0.2/dist/typeit.min.js"><\/script>
      `
    }
  },
  data () {
    return {
      ARTICLE,
      current: 'feed',
      chapterScrollTop: [],
      currentChapter: 1,
      currentChapterMobile: 1,
      pageYOffset: 0,
      
    }
  },
  beforeMount () {
    fetchReports(this.$store)
    this.pageYOffset = window.pageYOffset
    window.addEventListener('resize', this.calcChapterScrollTop)
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.calcChapterScrollTop()
    this.trackIndexByScroll(this.$store.state.viewport[1])
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcChapterScrollTop)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    calcChapterScrollTop () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const lastChapter = document.querySelector(chapterIds[chapterIds.length - 1])
      const chapterScrollTop = chapterIds.map(id => {
        return document.querySelector(id) ? document.querySelector(id).getBoundingClientRect().top + scrollTop - this.$store.state.viewport[1] : 0
      })
      chapterScrollTop.push(lastChapter.getBoundingClientRect().top + lastChapter.clientHeight  + scrollTop - this.$store.state.viewport[1])
      this.chapterScrollTop = chapterScrollTop
    },
    goTo (anchor) {
      this.current = 'feed'
    },
    handleHeader (value) {
      this.currentChapterMobile = this.currentChapter
      this.current = value
    },
    handleScroll: throttle(function () {
      this.pageYOffset = window.pageYOffset
      this.trackIndexByScroll(this.$store.state.viewport[1])
    }, 100),
    trackIndexByScroll (viewportH) {
      // const navHeight = document.querySelector('.fake-news-header nav').clientHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      for (let [index, value] of this.chapterScrollTop.entries()) {
        if (value > scrollTop) {
          return this.currentChapter = index
        }
      }
      
    }
  }
}
</script>
<style lang="stylus">
.fake-news
  background-color #f5f6f7
  h1, h2, p , a
    margin 0
  h1
    font-size 1.375rem
  h2
    font-size 1.375rem
  p
    font-size .9375rem
    text-align justify
    line-height 1.53
  a
    text-decoration none
    cursor pointer
  button
    font-size .8125rem
    background-color transparent
    border none
    cursor pointer
  main
    position relative
  
  
  .feed
    &__main-block
      > div + div
        margin-top 10px

@media (max-width: 1023px)
  .fake-news
    &.fixed-header
      .fake-news-header
        padding-bottom 42px
        nav
          position fixed
          top 0
          left 0
          right 0
          z-index 999
      .index
        top 42px
    &__index
      &.active
        left 0
    .feed.hidden
      display none

@media (min-width: 1024px)
  .fake-news
    &.fixed-header
      padding-top 84px
      .fake-news-header
        position fixed
        top 0
        left 0
        right 0
        z-index 999
        h1
          font-size .875rem
          line-height 42px
      .fake-news__index
        position fixed
        top 52px
    main
      width 1020px
      margin 0 auto
      padding 10px 0 20px
    .feed
      display flex
      width 816px
      margin 0 0 0 auto
      
      &__main-block
        width 490px
        margin-right 20px
      &__secondary-block
        flex 1
</style>
