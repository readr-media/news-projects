<template>
  <section class="section">
    <h2>不分區立委</h2>
    <h3>哪些政黨拿到了入場券</h3>
    <Chart class="section__chart" />
    <p
      v-if="!showResultContent"
      class="section__seat-hint"
    >
      分配席次將於中選會公布後顯示
    </p>
    <!-- Seats are shown after 1/11 -->
    <Seats
      v-if="showResultContent"
      class="section__seats"
      :title="'各政黨不分區席次'"
      :data="dataSeats"
      :total="dataSeatsTotal"
    />
  </section>
</template>

<script>
import Chart from './ChartParty.vue'
import Seats from './Seats.vue'

import _ from 'lodash'
import { mapGetters } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('Election2020')
const { mapState: mapStateResultToggler } = createNamespacedHelpers('electionResultToggler')

import { mapPartyName, mapPartyNameAbbr } from '../../utility/mappings'

export default {
  components: {
    Chart,
    Seats
  },
  computed: {
    ...mapGetters({
      dataChart: 'realtimeLegislatorsParty/dataChart'
    }),
    ...mapStateResultToggler({
      showResultContent: state => _.get(state, [ 'data', 'showContent', 'value' ], false)
    }),
    ...mapState({
      rawDataSeats: state => state.gcs.data.legislatorPartyResultSeats
    }),
    dataSeats() {
      return _.map(this.rawDataSeats, (data, partyCode) => {
        const partyCodePadded = partyCode.padStart(3, '0')
        const partyName = mapPartyNameAbbr(mapPartyName(this.$store, partyCodePadded))
        const seats = Math.floor(_.get(data, 'seat', 0))
        return {
          partyCode: partyCodePadded,
          name: partyName,
          seats
        }
      })
      .sort((a, b) => b.seats - a.seats)
      .filter(party => party.seats > 0)
    },
    dataSeatsTotal() {
      return this.dataSeats.reduce((acc, curr) => acc + curr.seats, 0)
    }
  },
  created() {
    this.$store.dispatch('realtimeLegislatorsParty/openDBChannel')
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
  &__chart
    margin 18px 0 0 0
  &__seat-hint
    margin 20px 0 0 0
    font-size 15px
    color $color-black-light
  &__seats
    margin 71px 0 0 0

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
    &__chart
      margin 36px 0 0 0
    &__seat-hint
      margin 27px 0 0 0
      font-size 16px
    &__seats
      margin 13px 0 0 0
</style>
