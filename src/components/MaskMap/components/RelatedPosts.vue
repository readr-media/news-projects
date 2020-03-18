<template>
  <div class="related-posts" @mouseleave="closeSidebar" @click.stop>
    <div class="related-posts__prompt" @click="handleClickPrompt" :class="{ open: isOpen }">
      <img src="/proj-assets/maskmap/img/arrow-left.svg" alt="">
      <div>相關文章</div>
    </div>
    <div class="related-posts__content" :class="{ open: isOpen }">
      <h2>武漢肺炎相關文章</h2>
      <a class="related-posts__content__wrapper" v-for="post in posts" :href="postUrl(post)" target="_blank" :key="post.id">
        <p class="related-posts__content__date">{{ post.published_at | formatDate}}</p>
        <h3>{{ post.title }}</h3>
      </a>
      <div class="related-posts__content__loading" v-if="isLoading">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50"><path fill="#fff" d="M25.25 6.46c-10.318 0-18.683 8.365-18.683 18.683h4.068a14.62 14.62 0 0 1 14.615-14.615V6.46z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg>
      </div>
    </div>
  </div>
</template>

<script>
import { get as aGet } from 'axios'
import { get as _get } from 'lodash'

export default {
  name: 'RelatedPosts',
  data () {
    return {
      isOpen: false,
      isLoading: false,
      posts: []
    }
  },
  mounted () {
    window.addEventListener('click', this.closeSidebar)
  },
  methods: {
    handleClickPrompt () {
      this.toggleSidebar()
      if (this.posts.length === 0 && !this.isLoading) { this.fetchPosts() }
    },
    toggleSidebar () {
      this.isOpen = !this.isOpen
    },
    fetchPosts () {
      this.isLoading = true
      aGet('https://www.readr.tw/api/public/posts?project_id=1000109&type={"$in":[1,4]}&sort=-created_at').then((res) => {
        this.posts = _get(res, 'data._items', []).filter((post) => post.id !== 2113)
        this.isLoading = false
      })
    },
    closeSidebar () {
      this.isOpen = false
    },
    postUrl (post) {
      switch (post.type) {
        case 4:
          return `https://www.readr.tw/project/${post.slug}`
          break
        default:
          return `https://www.readr.tw/post/${post.id}`
          break
      }
    }
  },
  filters: {
    formatDate (date) {
      return date.slice(0, date.indexOf('T')).replace(/-/g, '/')
    }
  }
}
</script>

<style lang="stylus">
.related-posts
  font-size 1.5rem
  color rgba(#000, 0.87)
  &__prompt
    position absolute
    top 50%
    transform translate(0px, -50%)
    right 0
    background-color #269f84
    display flex
    flex-direction column
    justify-content center
    align-items center
    line-height 1.4
    text-align center
    width 28px
    font-weight 700
    border-top-left-radius 4px
    border-bottom-left-radius 4px
    border-top solid 2px #000
    border-bottom solid 2px #000
    border-left solid 2px #000
    height 132px
    cursor pointer
    transition transform 0.3s ease-in-out
    &.open
      transform translate(-240px, -50%)
      z-index 19
      & img
        transform rotate(180deg)
    & img
      width 7px
      height auto
      display block
      margin-bottom 10px
      transition transform 0.3s ease-in-out
  &__content
    position absolute
    top 0
    right 0
    transform translateX(100%)
    background-color #fff
    width 240px
    height 100%
    border-left solid 2px #000
    padding 16px 10px
    overflow-y auto
    transition transform 0.3s ease-in-out
    z-index 19
    &.open
      transform translateX(0%)
    & h2
      line-height 1.62
      font-size 2.1rem
      font-weight 700
      margin-bottom 12px
    &__wrapper
      background-color rgba(216, 216, 216, 0.15)
      padding 10px
      line-height 1.6
      cursor pointer
      display block
      color rgba(#000, 0.87)
      text-decoration none
      & + &
        margin-top 8px
      &:hover h3
        text-decoration underline
    &__date
      font-size 1.3rem
      line-height 1.85
      color rgba(#000, 0.66)
    &__loading
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      background-color rgba(#000, 0.5)
      display flex
      justify-content center
      align-items center
</style>