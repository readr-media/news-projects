<template>
  <div :class="[ { 'fixed-header': pageYOffset > 84, 'open-alert': openAlert }, 'fake-news' ]">
    <FakeNewsHeader
      :current="current"
      :openAlert="openAlert"
      class="fake-news__header"
      @clickHeader="handleHeader"
      @openAlert="handleAlert" />
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
            <FakeNewsPost
              v-for="(post, postIndex) in chapter.subIndex"
              :id="`article-${chapterIndex + 1}-${postIndex + 1}`"
              :key="`article-${chapterIndex}-${postIndex}`"
              :commentsReacted="commentsReacted"
              @reaction="handleReaction">
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

import Cookie from 'vue-cookie'
import FakeNewsForeword from './components/FakeNewsForeword.vue'
import FakeNewsHeader from './components/FakeNewsHeader.vue'
import FakeNewsIndex from './components/FakeNewsIndex.vue'
import FakeNewsPost from './components/FakeNewsPost.vue'
import FakeNewsRelated from './components/FakeNewsRelated.vue'
import { ARTICLE } from './constant'
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
  return postIds
}

const updateCommentAmount = (store, { id, amount }) => store.dispatch('FakeNews/UPDATE_COMMENT_AMOUNT', { id, amount })

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
      title: 'fakebook：假訊息與它們的產地',
      description: '假訊息問題嚴重，但解決方案很容易牴觸言論自由，人權與自由之間該如何權衡？READr 想和你一起從各個面向探索假訊息與它們的產地。',
      metaUrl: 'fake-news',
      metaImage: 'fake-news/og.jpg',
      customScript: `
        <script src="//cdn.jsdelivr.net/npm/typeit@6.0.2/dist/typeit.min.js"><\/script>
        <script src="https://public.flourish.studio/resources/embed.js"><\/script>
      `
    }
  },
  data () {
    return {
      ARTICLE,
      chapterScrollTop: [],
      current: 'feed',
      currentPost: 'article-1-1',
      currentChapterMobile: 1,
      openAlert: false,
      pageYOffset: 0,
      postIds: [],
      reactions: ''
    }
  },
  computed: {
    commentsReacted () {
      return this.reactions.split(',').filter(id => id) 
    },
    currentChapter () {
      return Number(this.currentPost.split('-')[1])
    }
  },
  // watch: {
  //   currentPost (id) {
  //     const lazyitems = [ ...document.querySelectorAll(`#${id} .lazy`) ]
  //     lazyitems.map(item => {
  //       if (item.getAttribute('lazy-flourish')) {
  //         item.setAttribute('data-src', item.getAttribute('lazy-flourish'))
  //         item.classList.add('flourish-embed')
  //       }
  //     })
  //   }
  // },
  created () {
    this.$store.registerModule('FakeNews', FakeNewsStoreModule)
  },
  beforeMount () {
    fetchReports(this.$store)
    this.pageYOffset = window.pageYOffset
    this.postIds = getPostIds()
    fetchCommentsAmount(this.$store, this.postIds)
    this.getReactions()
    // window.addEventListener('resize', this.calcChapterScrollTop)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScrollForIndex)
  },
  mounted() {
    // this.calcChapterScrollTop()
    // this.trackIndexByScroll(this.$store.state.viewport[1])
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.calcChapterScrollTop)
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleScrollForIndex)
  },
  destroyed () {
    this.$store.unregisterModule('FakeNews')
  },
  methods: {
    // calcChapterScrollTop () {
    //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    //   const lastChapter = document.querySelector(chapterIds[chapterIds.length - 1])
    //   const chapterScrollTop = chapterIds.map(id => {
    //     return document.querySelector(id) ? document.querySelector(id).getBoundingClientRect().top + scrollTop - this.$store.state.viewport[1] : 0
    //   })
    //   chapterScrollTop.push(lastChapter.getBoundingClientRect().top + lastChapter.clientHeight  + scrollTop - this.$store.state.viewport[1])
    //   this.chapterScrollTop = chapterScrollTop
    // },
    getReactions () {
      this.reactions = Cookie.get('fn-reactions') || ''
    },
    goTo (anchor) {
      this.current = 'feed'
    },
    handleHeader (value) {
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
      if (origin.match(regex)) { // minus
        commentAmount -= 1
        ids = ids.filter(originId => originId !== id)
      } else { // add
        commentAmount += 1
        ids.push(id)
      }
      updateCommentAmount(this.$store, { id , amount: commentAmount })
      const cookieValue = ids.join(',')
      Cookie.set('fn-reactions', cookieValue, { expires: '3M' })
      this.getReactions()
    },
    handleScroll: throttle(function () {
      this.pageYOffset = window.pageYOffset
      // this.trackIndexByScroll(this.$store.state.viewport[1])
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
    // trackIndexByScroll (viewportH) {
    //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    //   for (let [index, value] of this.chapterScrollTop.entries()) {
    //     if (value > scrollTop) {
    //       return this.currentChapter = index
    //     }
    //   }
    // }
  }
}
</script>
<style lang="stylus">
.fake-news
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
    &.resource
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
    .fake-news-header
      .popup
        display block

  &__index
    position absolute
    top 0
    left 100%
    z-index 500
    width 100%
    height calc(100vh - 126px)
  .fake-news-header
    .popup
      display none
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
      display none
      &.active
        display block
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
    
    &__index
      top 10px
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
</style>
