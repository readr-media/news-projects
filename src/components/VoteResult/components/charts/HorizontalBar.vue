<template>
  <div class="chart">
    <div class="chart__bars bars">
      <HorizontalBarParty
        v-for="(party, i) in candTksInfo"
        :key="i"
        :class="[ 'bars__bar', `bars__bar--${getPartyAbbr(party)}` ]"
        :percentage="calcPartyValidVotePercentage(party)"
        :candidatesElected="filterElectedCandidates(party)"
      />
    </div>
    <LegendsParty
      class="chart__legends"
      :parties="Object.keys(candidatesGroupByParty)"
    />
  </div>
</template>

<script>
import HorizontalBarParty from './HorizontalBarParty.vue'
import LegendsParty from  './LegendsParty.vue'

import { get, groupBy, sortBy, sumBy } from 'lodash'
import { getPartyAbbr } from '../../util/index.js'

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    HorizontalBarParty,
    LegendsParty
  },
  computed: {
    candidates () {
      return get(this.data, 'candTksInfo', []).sort((a, b) => b.tks - a.tks)
    },
    candidatesGroupByParty () {
      const groupByParty = groupBy(this.candidates, candidate => {
        const { party } = candidate
        if (!([ '中國國民黨', '民主進步黨', '時代力量' ].includes(party))) {
          return '其他'
        } else {
          return party
        }
      })

      return groupByParty
    },
    tksTotal () {
      return sumBy(this.candidates, candidate => candidate.tks)
    },
    candTksInfo () {
      const sorted = sortBy(this.candidatesGroupByParty, partyArray => {
        const tksParty = sumBy(partyArray, candidate => candidate.tks)
        return -(tksParty / this.tksTotal)
      })
      return sorted
    }
  },
  methods: {
    getPartyAbbr (partyArray) {
      return getPartyAbbr(get(partyArray, [ '0', 'party' ], ''))
    },
    calcPartyValidVotePercentage (party = []) {
      // 比例計算方法：同黨候選人總得票數 / 有效票總得票數
      if (this.candidates.length === 0) { return 0 }

      const tksParty = sumBy(party, cand => cand.tks)
      return Number((tksParty / this.tksTotal).toFixed(3)) * 100
    },
    filterElectedCandidates (partyArray) {
      return partyArray.filter(candidate => candidate.candVictor === '*')
    }
  }
}
</script>

<style lang="stylus" scoped>
.chart
  &__legends
    margin 17px 0 0 0

.bars
  &__bar
    & + &
      margin 10px 0 0 0
    &--kmt
      & >>> .bar-wrapper__bar
        background-color #0071bc
    &--dpp
      & >>> .bar-wrapper__bar
        background-color #53a66f
    &--npp
      & >>> .bar-wrapper__bar
        background-color #fcc037
    &--others
      & >>> .bar-wrapper__bar
        background-color #736357
</style>

