<template>
  <div class="chart">
    <div
      v-for="party in candTksInfo"
      :key="getPartyAbbr(party)"
      :class="[ 'chart__bar', `chart__bar--${getPartyAbbr(party)}`, 'bar' ]"
    >
      <SquareBarCandidate
        v-for="candidate in party"
        :key="candidate.name"
        class="bar__candidate"
        :candidate="candidate"
      />
      <p
        class="bar__percentage"
        v-text="`${calcPartyElectedPercentage(party).toFixed(1)}%`"
      >
      </p>
    </div>
    <SquareBarLegends
      class="chart__legends"
      :parties="Object.keys(electedCandidatesGroupByParty)"
    />
  </div>
</template>

<script>
import SquareBarCandidate from './SquareBarCandidate.vue'
import SquareBarLegends from  './SquareBarLegends.vue'

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
    SquareBarCandidate,
    SquareBarLegends
  },
  computed: {
    electedCandidates () {
      const electeds =
        get(this.data, 'candTksInfo', [])
        .filter(cand => cand.candVictor === '*')
        .sort((a, b) => b.tks - a.tks)
      
      return electeds
    },
    electedCandidatesGroupByParty () {
      const groupByParty = groupBy(this.electedCandidates, candidate => {
        const { party } = candidate
        if (!([ '中國國民黨', '民主進步黨', '時代力量' ].includes(party))) {
          return '其他'
        } else {
          return party
        }
      })

      return groupByParty
    },
    candTksInfo () {
      const sorted = sortBy(this.electedCandidatesGroupByParty, o => -(o.length / this.electedCandidates.length))
      return sorted
    }
  },
  methods: {
    getPartyAbbr (partyArray) {
      return getPartyAbbr(get(partyArray, [ '0', 'party' ], ''))
    },
    calcPartyElectedPercentage (party = []) {
      if (this.electedCandidates.length === 0) { return 0 }

      const tksElectedsTotal = sumBy(this.electedCandidates, cand => cand.tks)
      const tksElectedsParty = sumBy(party, cand => cand.tks)
      return Number((tksElectedsParty / tksElectedsTotal).toFixed(3)) * 100
    }
  }
}
</script>

<style lang="stylus" scoped>
.chart
  &__bar
    display flex
    & + &
      margin 20px 0 0 0
    &--kmt
      & >>> .rect
        background-color #0071bc
    &--dpp
      & >>> .rect
        background-color #53a66f
    &--npp
      & >>> .rect
        background-color #fcc037
    &--others
      & >>> .rect
        background-color #736357
  &__legends
    margin 20px 0 0 0

.bar
  display flex
  align-items center
  &__candidate
    & + &
      margin 0 0 0 10px
  &__percentage
    margin 0 0 0 10px
    font-size 30px
    font-weight 600
</style>


