<template>
  <nav class="nav">
    <div
      class="nav__prev-wrapper"
      @click="$scrollTo(`#${prevArticleName}`)"
    />
    <p
      class="nav__title"
      v-text="currentArticleTitle"
    />
    <div
      class="nav__next-wrapper"
      @click="$scrollTo(`#${nextArticleName}`)"
    />
  </nav>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UnitedFront')

import _ from 'lodash'

export default {
  computed: {
    ...mapState({
      articles: state => state.articles,
      currentArticleName: state => state.nav.currentArticleName
    }),
    currentArticleIndex() {
      return _.findIndex(this.articles, [ 'name', this.currentArticleName ])
    },
    currentArticleTitle() {
      return _.get(this.articles, [ this.currentArticleIndex, 'title' ], '')
    },
    prevArticleName() {
      return _.get(this.articles, [ this.currentArticleIndex - 1, 'name' ], '')
    },
    nextArticleName() {
      return _.get(this.articles, [ this.currentArticleIndex + 1, 'name' ], '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav
  height 40px
  display flex
  justify-content space-between
  align-items center
  background-color #d8d8d8
  padding 0 16px
  &__prev-wrapper
    min-width 20px
    display flex
    justify-content center
    align-items center
    &:after
      display inline-block
      content ''
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 12px 10px 0;
      border-color: transparent #d02525 transparent transparent;
  &__title
    margin 0 10px
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  &__next-wrapper
    min-width 20px
    display flex
    justify-content center
    align-items center
    &:after
      display inline-block
      content ''
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 0 10px 12px;
      border-color: transparent transparent transparent #d02525;

</style>
