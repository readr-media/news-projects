<template>
  <div class="tooltip">
    <div
      v-show="newsCount !== 0"
      class="tooltip__sentiment sentiment"
    >
      <img class="sentiment__icon" :src="`/proj-assets/election-news/img/sentiment-${sentimentScoreString}.svg`" alt="">
      <p class="sentiment__score" v-text="sentimentScore"></p>
    </div>
    <div class="tooltip__info info">
      <p class="info__keyword" v-text="getKeywordLocale(keyword)"></p>
      <p class="info__sourcescount">{{ $t('ELECTION_NEWS.DASHBOARD_TOOLTIP.NUM_MEDIA') }}{{ sourcesCount }}</p>
      <p class="info__newscount">{{ $t('ELECTION_NEWS.DASHBOARD_TOOLTIP.NUM_NEWS') }}{{ newsCount }}</p>
    </div>
    <!-- <p>{{ graphTrackingLineDate }}</p> -->
    <!-- <p>{{ graphTrackingLineData }}</p> -->
  </div>
</template>

<script>
import { get, reduce } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

import { scaleSentimentScore, sentimentScoreString } from '../../util'

import { sentimentRange } from '../../costants'

import getKeywordLocale from 'src/components/ElectionNews/mixins/getKeywordLocale'

export default {
  mixins: [ getKeywordLocale ],
  computed: {
    ...mapState({
      filter: state => state.filter.sources
    }),
    ...mapGetters([
      'graphDataKeywordFirstSourceIds',
      'graphDataKeywordFirstFiltered',
      'graphTrackingLineDate'
    ]),
    graphTrackingLineData () {
      const date = this.graphTrackingLineDate
      return this.graphDataKeywordFirstFiltered[date]
    },
    sentimentScore () {
      if (!this.graphTrackingLineData) { return 0 }

      const sum = reduce(this.graphTrackingLineData, (sum, value) => sum + scaleSentimentScore(get(value, 'newsSentimentScore', 0)), 0)
      const length = Object.keys(this.graphTrackingLineData).length
      return (sum / length).toFixed(2)
    },
    sentimentScoreString () {
      return sentimentScoreString(this.sentimentScore)
    },
    sourcesCount () {
      return this.filter.length === 0 ? get(this.graphDataKeywordFirstSourceIds, 'length', 0) : this.filter.length
    },
    newsCount () {
      const sum = reduce(this.graphTrackingLineData, (sum, value) => sum + get(value, 'newsCount', 0), 0)
      return sum
    },
    keyword () {
      const { params = '' } = this.$route.params
      return params
    }
  }
}
</script>

<style lang="stylus" scoped>
.tooltip
  width 170px
  // height 100px
  box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
  background-color #ffffff
  display flex
  flex-direction column
  align-items center
  padding 10px
  &__sentiment
    margin 0 0 10px 0

.sentiment
  display flex
  flex-direction column
  align-items center
  &__icon
    height 30px
  &__score
    margin 10px 0 0 0
    font-size 10px

.info
  &__keyword
    margin 0
    font-size 12px
  &__sourcescount
    margin 5px 0 0 0
    font-size 12px
  &__newscount
    margin 5px 0 0 0
    font-size 12px
</style>