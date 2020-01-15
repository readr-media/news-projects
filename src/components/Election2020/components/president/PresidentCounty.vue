<template>
  <section class="section">
    <h2>你的故鄉是什麼顏色？</h2>
    <h3>各縣市候選人票數比例，你的故鄉比較支持誰？</h3>
    <HorizontalColumnBar
      :groupLimitToShow="6"
      :data="data"
    />
  </section>
</template>

<script>
import HorizontalColumnBar from '../charts/HorizontalColumnBar.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Election2020')

import _ from 'lodash'

import { mapCountyName, mapPresidentName, mapPresidentParty } from '../../utility/mappings'

export default {
  components: {
    HorizontalColumnBar
  },
  computed: {
    ...mapState({
      rawData: state => state.gcs.data.presidentResultByCounty
    }),
    data() {
      return _.map(this.rawData, (candidateData, countyCode) => {
        const title = mapCountyName(this.$store, countyCode.padStart(3, '0'))
        const candidateSortOrder = [ '蔡英文', '韓國瑜', '宋楚瑜' ]
        const bars = _.map(_.omit(candidateData, 'tt'), (voteData, candidateCode) => {
          const name = mapPresidentName(this.$store, candidateCode)
          const party = mapPresidentParty(this.$store, candidateCode)
          let color
          switch (name) {
            case '蔡英文':
              color = 'green'
              break
            case '韓國瑜':
              color = 'blue'
              break
            case '宋楚瑜':
              color = 'orange'
              break
          }
          return {
            name,
            party,
            color,
            rate: _.get(voteData, 'r', 0),
            count: _.get(voteData, 'tks', 0)
          }
        }).sort((a, b) => candidateSortOrder.indexOf(a.name) - candidateSortOrder.indexOf(b.name))
        return {
          title,
          bars
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.section
  h2
    font-family $font-family-serif
    font-size 21px
    color $color-black
    text-align center
    font-weight bold
    line-height 1.14
    margin 28px 0 0 0
  h3
    font-size 15px
    color $color-black
    text-align center
    font-weight normal
    line-height 1.87
    margin 11px 0 0 0
@media (min-width 768px)
  .section
    max-width 1152px
    margin 0 auto
    h2
      font-size 30px
      text-align left
    h3
      font-size 16px
      text-align left
      margin 19px 0 0 0
</style>
