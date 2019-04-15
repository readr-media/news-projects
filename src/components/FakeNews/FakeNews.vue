<template>
  <div :class="[ { 'fixed-header': pageYOffset > 84, 'open-alert': openAlert }, 'disinformation' ]">
    <FakeNewsHeader
      :bodyHeight="bodyHeight"
      :current="current"
      :openAlert="openAlert"
      :pageYOffset="pageYOffset"
      class="disinformation__header"
      @clickHeader="handleHeader"
      @openAlert="handleAlert" />
    <main>
      <FakeNewsIndex
        :article="ARTICLE"
        :class="[ { active: current === 'menu' }, 'disinformation__index' ]"
        :currentChapter="currentChapter"
        :currentChapterMobile="currentChapterMobile"
        @goTo="goTo" />
      <div :class="[ { hidden: $store.state.viewport[0] < 1024 && current !== 'feed'  }, 'feed' ]">
        <div class="feed__main-block">
          <FakeNewsStory v-if="mounted && $store.state.viewport[0] < 1024" />
          <template v-for="(chapter, chapterIndex) in ARTICLE">
            <FakeNewsPost
              v-for="(post, postIndex) in chapter.subIndex"
              :id="`article-${chapterIndex + 1}-${postIndex + 1}`"
              :key="`article-${chapterIndex}-${postIndex}`"
              :chapterIndex="chapterIndex"
              :commentsReacted="commentsReacted"
              :post="post"
              :postIndex="postIndex"
              @reaction="handleReaction">
            </FakeNewsPost>
          </template>
          <Donate v-if="mounted && $store.state.viewport[0] < 1024" :projectSlug="'disinformation'" class="feed__donate" />
          <FakeNewsSubscribe v-if="mounted && $store.state.viewport[0] < 1024" />
          <template v-for="(chapter, chapterIndex) in ARTICLE_MORE">
            <FakeNewsPost
              v-for="(post, postIndex) in chapter.subIndex"
              :id="`article-${chapterIndex + 1 + ARTICLE.length}-${postIndex + 1}`"
              :key="`article-${chapterIndex + ARTICLE.length}-${postIndex}`"
              :chapterIndex="chapterIndex"
              :commentsReacted="commentsReacted"
              :isReadMore="true"
              :post="post"
              :postIndex="postIndex"
              class="read-more"
              @reaction="handleReaction">
            </FakeNewsPost>
          </template>
          <div class='polis' data-conversation_id='7rshkafphu'></div>
          <FakeNewsCredit v-if="mounted && $store.state.viewport[0] < 1024" class="feed__credit"  />
          <FakeNewsRelated
            v-if="$store.state.reports.length > 0 && $store.state.viewport[0] < 1024"
            :reports="$store.state.reports"
            :reportsCount="$store.state.reportsCount" />
        </div>
        <div class="feed__secondary-block">
          <FakeNewsStory v-if="mounted && $store.state.viewport[0] >= 1024" />
          <Donate v-if="mounted && $store.state.viewport[0] >= 1024" :projectSlug="'disinformation'" />
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

import Cookie from 'vue-cookie'
import Donate from '../Donate.vue'
import FakeNewsCredit from './components/FakeNewsCredit.vue'
import FakeNewsHeader from './components/FakeNewsHeader.vue'
import FakeNewsIndex from './components/FakeNewsIndex.vue'
import FakeNewsPost from './components/FakeNewsPost.vue'
import FakeNewsRelated from './components/FakeNewsRelated.vue'
import FakeNewsSubscribe from './components/FakeNewsSubscribe.vue'
import FakeNewsStory from './components/FakeNewsStory.vue'
import axios from 'axios'
import { ARTICLE, ARTICLE_MORE } from './constant'
import { smoothScroll } from 'kc-scroll'
import { throttle } from 'lodash'

import FakeNewsStoreModule from '../../store/modules/FakeNews'

const chapterIds = ARTICLE.map(chapter => `#article-${chapter.chapter}-1`)

const fetchCommentAmount = (store, id) => store.dispatch('FakeNews/FETCH_COMMENT_AMOUNT', id)

const fetchCommentsAmount = (store, ids) => store.dispatch('FakeNews/FETCH_COMMENTS_AMOUNT', ids)

const fetchReports = (store) => store.dispatch('FETCH_REPORTS', {
  params: {
    maxResult: 4,
    where: {
      reportPublishStatus: 2,
    },
    page: 1,
    sort: '-published_at',
  },
})

const getPostIds = () => {
  const postIds = []
  ARTICLE
    .map(chapter => chapter.subIndex
      .map((post, index) => postIds.push(`article-${chapter.chapter}-${index + 1}`)))
  ARTICLE_MORE
    .map(chapter => chapter.subIndex
      .map((post, index) => postIds.push(`article-${chapter.chapter}-${index + 1}`)))    
  return postIds
}

const updateCommentAmount = (store, { id, amount }) => store.dispatch('FakeNews/UPDATE_COMMENT_AMOUNT', { id, amount })

export default {
  name: 'FakeNews',
  components: {
    Donate,
    FakeNewsCredit,
    FakeNewsHeader,
    FakeNewsIndex,
    FakeNewsPost,
    FakeNewsRelated,
    FakeNewsSubscribe,
    FakeNewsStory,
  },
  metaInfo() {
    return {
      title: 'fakebook：假訊息與它們的產地',
      description: '假訊息問題嚴重，但解決方案很容易牴觸言論自由，人權與自由之間該如何權衡？READr 想和你一起從各個面向探索假訊息與它們的產地。',
      metaUrl: 'disinformation',
      metaImage: 'disinformation/og.jpg',
      customScript: `
        <script src="https://public.flourish.studio/resources/embed.js"><\/script>
        <script async src='https://polis.pdis.nat.gov.tw/embed.js'><\/script>
      `
    }
  },
  data () {
    return {
      ARTICLE,
      ARTICLE_MORE,
      bodyHeight: 0,
      chapterScrollTop: [],
      current: 'feed',
      currentPost: 'article-1-1',
      currentChapterMobile: 1,
      currentChapterYOffset: 0,
      maxChapter: 1,
      mounted: false,
      openAlert: false,
      pageYOffset: 0,
      postIds: [],
      reactions: '',
    }
  },
  computed: {
    commentsReacted () {
      return this.reactions.split(',').filter(id => id) 
    },
    chapter () {
      return Number(this.currentPost.split('-')[1])
    },
    currentChapter () {
      return Number(this.currentPost.split('-')[1])
    },
  },
  watch: {
    chapter (value) {
      if (value > this.maxChapter) {
        this.maxChapter = value
        window.ga && window.ga('send', 'event', 'projects', 'scroll', `scroll to ${value}`, { nonInteraction: false })
      }
    }
  },
  created () {
    this.$store.registerModule('FakeNews', FakeNewsStoreModule)
  },
  beforeMount () {
    fetchReports(this.$store)
    this.bodyHeight = document.body.clientHeight
    this.pageYOffset = window.pageYOffset
    this.postIds = getPostIds()
    fetchCommentsAmount(this.$store, this.postIds)
    this.getReactions()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScrollForIndex)
  },
  mounted () {
    this.mounted = true
    window.ga && window.ga('send', 'pageview')
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleScrollForIndex)
    this.$store.unregisterModule('FakeNews')
  },
  methods: {
    getReactions () {
      this.reactions = Cookie.get('fn-reactions') || ''
    },
    goTo (anchor) {
      this.current = 'feed'
      setTimeout(() => {
        smoothScroll(`${anchor}-anchor`)
      }, 0)
    },
    handleHeader (value) {
      if (value === 'menu') {
        this.currentChapterYOffset = this.pageYOffset
      } else if (value === 'feed') {
        setTimeout(() => {
          window.scrollTo(0, this.currentChapterYOffset)
        }, 0)
      }
      this.currentChapterMobile = this.currentChapter
      this.current = value
      
    },
    handleAlert () {
      this.openAlert = !this.openAlert
    },
    handleReaction (id) {
      const regex = new RegExp(`${id}`)
      const origin = this.reactions || ''
      let ids = origin.split(',').filter(originId => originId)
      let commentAmount = this.$store.state.FakeNews.comments[id] || 0
      origin.match(regex) ? '' : ids.push(id)
      axios.get(`/project-api/fake-news/comment/${id}`)
      .then(res => {
        const amount = res.data.amount + 1
        updateCommentAmount(this.$store, { id , amount })
      })
      const cookieValue = ids.join(',')
      Cookie.set('fn-reactions', cookieValue, { expires: '3M' })
      this.getReactions()
    },
    handleScroll: throttle(function () {
      this.bodyHeight = document.body.clientHeight
      this.pageYOffset = window.pageYOffset
    }, 100),
    handleScrollForIndex: throttle(function () {
      const lastPost = document.querySelector(`#${this.postIds[this.postIds.length - 1]}`)
      for (let [index, value] of this.postIds.entries()) {
        const ele = document.querySelector(`#${value}`)
        const eleTop = ele ? ele.getBoundingClientRect().top : ''
        if (eleTop > this.$store.state.viewport[1]) {
          return this.currentPost = this.postIds[index - 1]
        }
      }
      if (lastPost && lastPost.getBoundingClientRect().top < this.$store.state.viewport[1]) {
        this.currentPost = this.postIds[this.postIds.length - 1]
      }
    }, 500),
  }
}
</script>
<style lang="stylus">
.disinformation
  background-color #f5f6f7
  h1, h2, h3, p , a
    margin 0
  h1
    font-size 1.25rem
  h2
    font-size 1.25rem
  h3
    font-size 1.125rem
  p
    font-size .9375rem
    text-align justify
    line-height 1.53
    &.source
      color #616770
      font-size .8125rem
      text-align right
    &.description
      color #616770
      font-size .8125rem
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

  &.open-alert
    .disinformation-header
      .popup
        display block

  &__index
    position absolute
    top 0
    left 100%
    z-index 500
    width 100%
    height calc(100vh - 126px)
  .disinformation-header
    .popup
      display none
  .feed
    &__main-block
      > div + div
        margin-top 10px
    &__donate, &__credit
      padding 0 1em
  
@media (max-width: 1023px)
  .disinformation
    &.fixed-header
      .disinformation-header
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
      display none
      padding-bottom 1em
      overflow auto
      &.active
        display block
        left 0
    .feed.hidden
      display none
    

@media (min-width: 1024px)
  .disinformation
    &.fixed-header
      padding-top 84px
      .disinformation-header
        position fixed
        top 0
        left 0
        right 0
        z-index 999
        h1
          font-size .875rem
          line-height 42px
      .disinformation__index
        position fixed
        top 58px
    main
      width 1020px
      margin 0 auto
      padding 16px 0 20px
    
    &__index
      top 16px
      left calc((100% - 1020px) / 2)
      width 186px
      height auto
    
    .feed
      display flex
      width 816px
      margin 0 0 0 auto
      
      &__main-block
        width 490px
        margin-right 20px
      &__secondary-block
        flex 1
        > div + div
          margin-top 1em
</style>
