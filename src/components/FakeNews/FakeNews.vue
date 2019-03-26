<template>
  <div class="fake-news">
    <FakeNewsHeader class="fake-news__header"/>
    <main>
      <div class="feed">
        <div></div>
        <div class="feed__main-block">
          <FakeNewsForeword />
          <FakeNewsPost>
            <h2>與謊言的戰爭</h2>
            <p>假訊息問題嚴重，但解決方案很容易牴觸言論自由，人權與自由之間該如何權衡？其中牽涉的角色有很多，政府、媒體、網路平台業者、甚至讀者自己，都需要思考這個問題。希望在政府想推的《數位通訊傳播法》立法——<a href="https://www.readr.tw/" target="_blank">https://www.readr.tw/</a>
也就是如果發現有假訊息在臉書上流竄，臉書應該要立即標示或是採取行動——之前，讓社會大眾思考這個問題。</p>
            <iframe src='https://public.flourish.studio/visualisation/256537/embed' frameborder='0' scrolling='no' style='width:100%;height:600px;'></iframe>
          </FakeNewsPost>
          <FakeNewsPost>
            <iframe src='https://public.flourish.studio/visualisation/260847/embed' frameborder='0' scrolling='no' style='width:100%;height:600px;'></iframe>
          </FakeNewsPost>
        </div>
      </div>
    </main>
  </div>
</template>
<script>

import FakeNewsForeword from './components/FakeNewsForeword.vue'
import FakeNewsHeader from './components/FakeNewsHeader.vue'
import FakeNewsPost from './components/FakeNewsPost.vue'
import { throttle } from 'lodash'

export default {
  name: 'FakeNews',
  components: {
    FakeNewsForeword,
    FakeNewsHeader,
    FakeNewsPost
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
    };
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: throttle(function () {
      window.pageYOffset > 84
      ? document.querySelector('.fake-news').classList.add('fixed-header')
      : document.querySelector('.fake-news').classList.remove('fixed-header')
    }, 100)
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
  button
    font-size .8125rem
    background-color transparent
    border none
    cursor pointer
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
    main
      width 1020px
      margin 0 auto
      padding 10px 0 20px
    .feed
      width 816px
      margin 0 0 0 auto
      &__main-block
        width 490px
        
</style>
