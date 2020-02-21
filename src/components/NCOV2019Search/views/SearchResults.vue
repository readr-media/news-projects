<template>
  <section class="search-results">
    <div class="search-results-wrapper">
      <main class="search-results__main main">
        <BaseInputSearch
          :input="searchResultInput"
          :is-done="true"
          @submit="handleSubmit"
        />
        <p class="main__meta">
          找到 {{ 5566 }} 個「{{ searchResultInput }}」的資訊
        </p>
        <section class="main__articles articles">
          <BaseArticle
            class="articles__article"
            v-for="item in 10"
            :key="item"
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
  </section>
</template>

<script>
import _ from 'lodash'

import BaseInputSearch from '../components/BaseInputSearch.vue'
import BaseAsideSectionWrapper from '../components/BaseAsideSectionWrapper.vue'
import BaseTag from '../components/BaseTag.vue'
import BaseArticle from '../components/BaseArticle.vue'

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
    BaseArticle
  },
  data() {
    return {
      titleDefaultSearchResults: '其他人也問了',
      titleDiscuss: '找不到你想問的問題嗎？歡迎提問！'
    }
  },
  computed: {
    searchResultInput() {
      return _.get(this.$route, [ 'params', 'params' ], '')
    }
  },
  methods: {
    handleSubmit(value) {
      if (value === '') {
        return
      }

      this.$router.push({
        path: `/project/ncov2019search/${value}`,
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-results
  background-color rgba(216, 216, 216, 0.5)
  min-height 100vh
  padding 40px 0

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
</style>
