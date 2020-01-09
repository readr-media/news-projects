<template>
  <section class="section">
    <h1>各縣市政黨票比例</h1>
    <HorizontalColumnBar
      class="section__chart"
      :groupLimitToShow="6"
      :showDetailDataColor="false"
      :legendsType="'other'"
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
      rawData: state => state.gcs.data.legislatorPartyResultByCounty
    }),
    data() {
      return _.map(this.rawData, (partyData, countyCode) => {
        const title = mapCountyName(this.$store, countyCode.padStart(3, '0'))
        const sortOrder = [ '民進黨', '國民黨', '達 5% 其他黨', '未達 5%' ]
        const bars = _.map(partyData, (voteData, partyCode) => {
          let name
          let color
          switch (partyCode) {
            case 'over':
              name = '達 5% 其他黨'
              color = 'purple'
              break;
            case 'under':
              name = '未達 5%'
              color = 'gray'
              break;
            case '001':
              name = '國民黨'
              color = 'blue'
              break;
            case '016':
              name = '民進黨'
              color = 'green'
              break;
          }
          return {
            name,
            party: name,
            color,
            rate: _.get(voteData, 'r', 0),
            count: _.get(voteData, 'tks', 0)
          }
        }).sort((a, b) => sortOrder.indexOf(a.party) - sortOrder.indexOf(b.party))
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
  &__chart
    margin 24px 0 0 0
  h1
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
    h1
      font-size 16px
      text-align left
      margin 19px 0 0 0
</style>
