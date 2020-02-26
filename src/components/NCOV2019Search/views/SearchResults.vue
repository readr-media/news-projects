<template>
  <section
    class="search-results"
    v-infinite-scroll="loadmore"
    infinite-scroll-disabled="shouldDisableLoadmore"
  >
    <div class="search-results-wrapper">
      <main class="search-results__main main">
        <BaseInputSearch
          :input="searchResultInput"
          :is-done="true"
          @submit="handleSubmit"
        />
        <p
          class="main__meta"
          v-text="metaWording"
        />
        <section class="main__articles articles">
          <BaseArticle
            class="articles__article"
            v-for="item in articleItems"
            :key="item._id"
            :title="getArticleTitle(item)"
            :article-content="getArticleContent(item)"
            :related-link-text="getArticleLinkText(item)"
            :related-link-href="getArticleLinkHref(item)"
            :keywords="getArticleKeywords(item)"
            :date="getArticleDate(item)"
          />
        </section>
      </main>
      <aside class="search-results__aside aside">
        <BaseAsideSectionWrapper
          class="aside__item aside__default-search-results default-search-results"
          :title="titleDefaultSearchResults"
        >
          <div class="default-search-results__results results">
            <BaseTag
              class="results__result"
              v-for="result in defaultSearchResults"
              :key="result"
              :text="result"
              :to="`/project/ncov2019search/${result}`"
            />
          </div>
        </BaseAsideSectionWrapper>
        <BaseAsideSectionWrapper
          class="aside__item aside__discuss discuss"
          :title="titleDiscuss"
        >
          <iframe
            src="https://meet.ps/covid19"
            style="width: 100%; height: 550px;"
            frameborder="0"
            scrolling="auto"
          />
        </BaseAsideSectionWrapper>
      </aside>
    </div>
    <button
      class="search-results__lightbox-toggler-mobile"
      v-text="wordingLightboxTogglerMobile"
      @click="handleLightboxToggle"
    />
    <AppLightboxWrapper
      class="app-lightbox"
      :showLightbox.sync="showLightbox"
    >
      <section class="lightbox-content">
        <header class="lightbox-content__header">
          <h1
            class="lightbox-content__title"
            v-text="titleDiscuss"
          />
          <div
            class="lightbox-content__close-button"
            @click="handleCloseLightbox"
          />
        </header>
        <iframe
          src="https://meet.ps/covid19"
          style="width: 100%; height: calc(100vh - 44px);"
          frameborder="0"
          scrolling="auto"
        />
      </section>
    </AppLightboxWrapper>
  </section>
</template>

<script>
import _ from 'lodash'

import BaseInputSearch from '../components/BaseInputSearch.vue'
import BaseAsideSectionWrapper from '../components/BaseAsideSectionWrapper.vue'
import BaseTag from '../components/BaseTag.vue'
import BaseArticle from '../components/BaseArticle.vue'
import AppLightboxWrapper from '../components/AppLightboxWrapper.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('NCOV2019Search')
import { createPayload } from '../utils'

import Vue from 'vue'
if (process.browser) {
  const infiniteScroll = require('vue-infinite-scroll')
  Vue.use(infiniteScroll)
}

export default {
  props: {
    defaultSearchResults: {
      type: Array,
      required: true
    }
  },
  components: {
    BaseInputSearch,
    BaseAsideSectionWrapper,
    BaseTag,
    BaseArticle,
    AppLightboxWrapper
  },
  data() {
    return {
      titleDefaultSearchResults: '其他人也問了',
      titleDiscuss: '找不到你想問的問題嗎？歡迎提問！',
      wordingLightboxTogglerMobile: 'Ask',
      searchItemsPage: 0,
      searchItemsPerPage: 10,
      shouldDisableLoadmore: false,
      showLightbox: false
    }
  },
  computed: {
    searchResultInput() {
      return _.get(this.$route, [ 'params', 'params' ], '')
    },
    metaWording() {
      const resultWording = `找到 ${this.total} 個「${this.searchResultInput}」的資訊`
      switch (this.searchStatus) {
        case 'error':
          return '發生錯誤'
        case 'loading':
          return '讀取中'
        case 'done':
        default:
          return resultWording
      }
    },
    ...mapState({
      total: state => _.get(state, [ 'articleData', 'hits', 'total' ], 0),
      articleItems: state => _.get(state, [ 'articleData', 'hits', 'hits' ], []),
      searchStatus: state => _.get(state, 'searchStatus', 'done')
    })
  },
  methods: {
    handleSubmit(value) {
      if (value === '') {
        return
      }

      this.$router.push({
        path: `/project/ncov2019search/${value}`,
      })
      window.ga(
        'send', 
        'event', 
        'projects',
        'search',
        value,
        { nonInteraction: false }
      )
    },

    getArticleTitle(article) {
      return _.get(article, [ '_source', 'title' ], '')
    },
    getArticleContent(article) {
      return _.get(article, [ '_source', 'content' ], '')
    },
    getArticleLinkText(article) {
      const ogTitle = _.get(article, [ '_source', 'og_title' ])
      return ogTitle ? ogTitle : this.getArticleLinkHref(article)
    },
    getArticleLinkHref(article) {
      return _.get(article, [ '_source', 'link' ], '')
    },
    getArticleKeywords(article) {
      const tags = _.get(article, [ '_source', 'tags' ])
      return _.take((tags || []).map(tag => _.get(tag, 'text', '')), 3)
    },
    getArticleDate(article) {
      return _.get(article, [ '_source', 'updated_at' ], '')
    },
    
    ...mapActions(['SEARCH_ARTICLE']),
    async loadmore() {
      this.searchItemsPage += 1
      this.shouldDisableLoadmore = true

      const currentFrom = this.searchItemsPerPage * this.searchItemsPage
      await this.SEARCH_ARTICLE({
        payload: createPayload({
          query: this.searchResultInput,
          from: currentFrom
        }),
        push: true
      })

      if (currentFrom + this.searchItemsPerPage < this.total) {
        this.shouldDisableLoadmore = false
      }
    },

    handleLightboxToggle() {
      this.showLightbox = !this.showLightbox
    },
    handleCloseLightbox() {
      this.showLightbox = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-results
  background-color rgba(216, 216, 216, 0.5)
  min-height 100vh
  padding 95.8px 0
  &__lightbox-toggler-mobile
    display none

.search-results-wrapper
  max-width 1100px
  margin 0 auto
  display flex
  justify-content space-between

.main
  width 684px
  &__meta
    font-size 15px
    font-weight 600
    color rgba(0, 0, 0, 0.87)
    margin 30px 0 0 0
    letter-spacing 1px
  &__articles
    margin 30px 0 0 0

.articles
  &__article
    & + &
      margin 12px 0 0 0

.aside
  width 380px
  &__item
    & + &
      margin 20px 0 0 0

.results
  display flex
  flex-wrap wrap
  padding 15px
  &__result
    margin 5px

.app-lightbox
  visibility hidden

@media (max-width 768px)
  .search-results
    padding 60px 10px
    &__lightbox-toggler-mobile
      display flex
      justify-content center
      align-items center
      position fixed
      right 10px
      bottom 10px
      width: 40px;
      height: 40px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
      background-color: #429057;
      border-radius 100%
      color white
      font-size 13px
      font-weight 600
      border none

  .search-results-wrapper
    max-width auto
    margin 0

  .main
    width 100vw
    &__meta
      line-height 2
      margin 24px 0 0 0
    &__articles
      margin 24px 0 0 0

  .articles
    &__article
      & + &
        margin 10px 0 0 0

  .aside
    display none

  .app-lightbox
    visibility visible

  .lightbox-content
    background-color #429057
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15)
    &__header
      height 44px
      font-size: 15px;
      font-weight: 600;
      color white
      padding 0 20px
      display flex
      justify-content space-between
      align-items center
    &__title
      margin 0
      font-size inherit
    &__close-button
      cursor pointer
      -webkit-tap-highlight-color transparent
      z-index 10000
      width 12px
      height 12px
      &:after
        content ''
        display block
        width 100%
        height 100%
        clip-path polygon(10% 0, 0 10%, 39% 49%, 0 89%, 9% 100%, 50% 59%, 92% 100%, 100% 92%, 60% 49%, 100% 9%, 90% 0, 50% 38%)
        background-color white
</style>
