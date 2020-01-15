<template>
  <div class="tooltip">
    <TooltipItem
      class="tooltip__item"
      v-for="index in 2"
      :key="index"
      :newsCount="newsCount[index - 1]"
      :sentimentScoreString="sentimentScoreString[index - 1]"
      :sentimentScore="sentimentScore[index - 1]"
      :sourcesCount="sourcesCount"
      :keyword="keywords[index - 1]"
    />
    <!-- <p>{{ graphTrackingLineDate }}</p> -->
    <!-- <p>{{ graphTrackingLineData }}</p> -->
  </div>
</template>

<script>
import { get, reduce } from 'lodash'

import TooltipItem from './TooltipItem.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

import { scaleSentimentScore, sentimentScoreString } from '../../util'

import { sentimentRange } from '../../costants'

export default {
  components: {
    TooltipItem
  },
  computed: {
    ...mapState({
      filter: state => state.filter.sources
    }),
    ...mapGetters([
      'graphDataKeywordSourceIds',
      'graphDataKeywordFirstFiltered',
      'graphDataKeywordSecondFiltered',
      'graphTrackingLineDate'
    ]),
    graphTrackingLineData () {
      const date = this.graphTrackingLineDate
      return [ this.graphDataKeywordFirstFiltered[date], this.graphDataKeywordSecondFiltered[date] ]
    },
    sentimentScore () {
      if (!this.graphTrackingLineData[0] || !this.graphTrackingLineData[1]) { return [ '', '' ] }

      return [ this.getSentimentScore(this.graphTrackingLineData[0]), this.getSentimentScore(this.graphTrackingLineData[1]) ]
    },
    sentimentScoreString () {
      return [ sentimentScoreString(this.sentimentScore[0]), sentimentScoreString(this.sentimentScore[1]) ]
    },
    sourcesCount () {
      return this.filter.length === 0 ? get(this.graphDataKeywordSourceIds, 'length', 0) : this.filter.length
    },
    newsCount () {
      return [ this.getNewsCount(this.graphTrackingLineData[0]), this.getNewsCount(this.graphTrackingLineData[1]) ]
    },
    keywords () {
      const { params = '', subparams = '' } = this.$route.params
      return [ params, subparams ]
    }
  },
  methods: {
    getSentimentScore (data) {
      const sum = reduce(data, (sum, value) => sum + scaleSentimentScore(get(value, 'newsSentimentScore', 0)), 0)
      const length = Object.keys(data).length
      return (sum / length).toFixed(2)
    },
    getNewsCount (data) {
      const sum = reduce(data, (sum, value) => sum + get(value, 'newsCount', 0), 0)
      return sum
    }
  }
}
</script>

<style lang="stylus" scoped>
.tooltip
  width 220px
  // height 100px
  box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
  background-color #ffffff
  display flex
  flex-direction column
  align-items center
  padding 20px
  z-index 999
  &__item
    & + &
      margin 20px 0 0 0
</style>