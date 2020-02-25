<template>
  <section class="search">
    <div class="search__background background">
      <img
        v-for="order in 5"
        :class="[
          'background__img',
          { 'background__img--show': getShowBackgroundImg(order) }
        ]"
        :key="order"
        :src="`/proj-assets/ncov2019search/background-imgs/${order}.jpg`"
        alt="background"
      >
    </div>
    <div class="search__content-wrapper content-wrapper">
      <div class="content-wrapper__headings headings">
        <h1 class="headings__title title">
          <img
            class="title__img"
            src="/proj-assets/ncov2019search/title.png"
            :alt="title"
          >
        </h1>
        <h2
          class="headings__subtitle"
          v-text="subtitle"
        />
      </div>
      <div class="content-wrapper__interactions interactions">
        <BaseInputSearch
          class="interactions__search"
          @submit="handleSubmit"
        />
        <div class="interactions__default-search-results default-search-results">
          <span
            class="default-search-results__wording"
            v-text="wordingDefaultResults"
          />
          <div class="default-search-results__results results">
            <BaseTag
              class="results__result"
              v-for="result in searchResults"
              :key="result"
              :text="result"
              :to="`/project/ncov2019search/${result}`"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'

import BaseInputSearch from '../components/BaseInputSearch.vue'
import BaseTag from '../components/BaseTag.vue'

export default {
  props: {
    defaultSearchResults: {
      type: Array,
      required: true
    }
  },
  components: {
    BaseInputSearch,
    BaseTag
  },
  data() {
    return {
      title: '武漢肺炎知識家',
      subtitle: '在這裡你可以找到所有 READr 針對武漢肺炎所提供的資訊。',
      wordingDefaultResults: '其他人也問了：',
      currentBackgroundOrderInternal: 1
    }
  },
  computed: {
    searchResults() {
      return _.take(this.defaultSearchResults, 3)
    },
    currentBackgroundOrder: {
      get() {
        return this.currentBackgroundOrderInternal
      },
      set(value) {
        this.currentBackgroundOrderInternal = value > 5 ? 1 : value
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.currentBackgroundOrder += 1
    }, 5000)
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
    getShowBackgroundImg(order) {
      return order === this.currentBackgroundOrder
    }
  }
}
</script>

<style lang="stylus" scoped>
.search
  width 100vw
  height 100vh
  display flex
  justify-content center
  align-items center
  &__background
    // background-image url(/proj-assets/ncov2019search/background-imgs/1.jpg)
    // background-size cover
    // background-repeat no-repeat
    height 100vh
    position absolute
    width 100%
    height 100%
    z-index 10000001
    &:before
      content ''
      position absolute
      display block
      width 100%
      height 100%
      background-color rgba(0, 0, 0, 0.7)
      z-index 10000002
    &:after
      content 'Copyright © 2020 READr'
      position absolute
      left 0
      bottom 0
      width 100%
      font-size 13px
      color rgba(255, 255, 255, 0.6)
      text-align center
      margin 0 0 11px 0
      z-index 10000002
  &__content-wrapper
    position relative
    z-index 10000002

.background
  &__img
    position absolute
    width 100%
    height 100%
    object-fit cover
    opacity 0
    transition opacity .5s
    &--show
      opacity 1

.content-wrapper
  width 684px
  padding 0 0 80px 0
  &__interactions
    margin 77px 0 0 0

.headings
  display flex
  flex-direction column
  align-items center
  &__subtitle
    font-size 15px
    line-height 1.87
    color white
    font-weight normal
    margin 25px 0 0 0
    text-align justify

.title
  margin 0
  &__img
    width 353px

.interactions
  display flex
  flex-direction column
  align-items center
  &__search
    width 100%
  &__default-search-results
    margin 13px 0 0 0

.default-search-results
  display flex
  &__wording
    padding 2px 0
    font-size 15px
    color white

.results
  &__result
    & + &
      margin 0 0 0 10px

@media (max-width 768px)
  .search
    &__content-wrapper
      width 100vw

  .content-wrapper
    width 100vw
    padding 0 10px
    &__interactions
      margin 36px 0 0 0

  .headings
    &__subtitle
      margin 28px 0 0 0

  .title
    &__img
      width 100%
      max-width 414px

  .interactions
    &__default-search-results
      margin 10px 0 0 0

  .default-search-results
    width 100%
    padding 10px
    background-color rgba(255, 255, 255, 0.2)
    flex-direction column
    &__wording
      padding 0
      font-size 13px

  .results
    display flex
    flex-wrap wrap
    margin 5px 0 0 -5px
    &__result
      margin 5px !important
      & + &
        margin 0
</style>
