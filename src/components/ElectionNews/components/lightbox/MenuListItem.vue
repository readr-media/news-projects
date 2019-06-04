<template>
  <li class="list-item">
    <div class="list-item__left left">
      <img
        class="left__icon"
        :src="`/proj-assets/election-news/img/sentiment-${sentimentScoreString}.svg`"
        alt=""
      >
      <p
        class="left__score"
        v-text="sentimentScore"
      >
      </p>
    </div>
    <div class="list-item__right right">
      <p
        class="right__news-title"
        v-text="listItem.t"
      >
      </p>
      <p
        v-show="lightboxSwitcher === 'left'"
        class="right__news-source"
        v-text="getMediaSourceLocale(getSourceName(listItem.source))"
      >
      </p>
    </div>
  </li>
</template>

<script>
import { scaleSentimentScore, sentimentScoreString } from '../../util'
import { sentimentRange } from '../../costants'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

import getMediaSourceLocale from 'src/components/ElectionNews/mixins/getMediaSourceLocale'

export default {
  props: {
    listItem: {
      type: Object,
      defalut () {
        return {}
      }
    }
  },
  mixins: [ getMediaSourceLocale ],
  computed: {
    ...mapState({
      mapping: state => state.mapping.sources,
      lightboxSwitcher: state => state.lightboxSwitcher
    }),
    sentimentScore () {
      return this.scaleSentimentScore(this.listItem.s).toFixed(2)
    },
    sentimentScoreString () {
      return sentimentScoreString(this.sentimentScore)
    },
  },
  methods: {
    scaleSentimentScore,
    getSourceName (sourceId) {
      return this.mapping[sourceId]
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  display flex
  &__right
    margin 0 0 0 13px

.left
  display flex
  flex-direction column
  align-items center
  margin 2px 0 0 0
  &__icon
    height 21px
  &__score
    margin 7px 0 0 0
    font-size 10px

.right
  &__news-title
    margin 0 0 5px 0
    font-size 14px
    line-height 1.5
    text-align justify
  &__news-source
    margin 0
    font-size 12px
    color #999999

@media (min-width 1024px)
  .list-item
    &__right
      margin 0 0 0 24px

  .left
    &__score
      font-size 12px

  .right
    &__news-title
      font-size 16px
    &__news-source
      font-size 16px
</style>