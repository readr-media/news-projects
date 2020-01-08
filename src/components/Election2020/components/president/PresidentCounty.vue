<template>
  <section class="section">
    <!-- <HorizontalColumnBar
      :groupLimitToShow="1"
      :data="[
        {
          title: '台北市',
          bars: [
            {
              name: '蔡英文',
              party: '民進黨',
              rate: 1,
              count: 123,
              color: 'green',
            },
            {
              name: '朱立倫',
              party: '民進黨',
              rate: 0.3,
              count: 123123,
              color: 'blue',
            },
            {
              name: '王金平',
              party: '民進黨',
              rate: 0.5,
              count: 12355,
              color: 'orange',
            },
          ]
        },
        {
          title: '新北市',
          bars: [
            {
              name: '蔡英文',
              party: '民進黨',
              rate: 1,
              count: 12333,
              color: 'green',
            },
            {
              name: '朱立倫',
              party: '民進黨',
              rate: 0.1,
              count: 123123,
              color: 'blue',
            },
            {
              name: '王金平',
              party: '民進黨',
              rate: 0.01,
              count: 1232423,
              color: 'orange',
            },
          ]
        },
        {
          title: '基隆市',
          bars: [
            {
              name: '蔡英文',
              party: '民進黨',
              rate: 0.45,
              count: 12345,
              color: 'green',
            },
            {
              name: '朱立倫',
              party: '民進黨',
              rate: 0.23,
              count: 123664,
              color: 'blue',
            },
            {
              name: '王金平',
              party: '民進黨',
              rate: 0.56,
              count: 12345,
              color: 'orange',
            },
          ]
        },
      ]"
    /> -->
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
@media (min-width 768px)
  .section
    max-width 1000px
    margin 0 auto
</style>
