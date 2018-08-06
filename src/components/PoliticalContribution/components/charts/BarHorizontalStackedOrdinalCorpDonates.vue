<template>
  <div class="bar-horizontal-stacked-ordinal-corp-donates">
    <div class="chart">
      <div class="chart__kmt" :style="{ width: `${percentageKMT}%` }" v-text="percentageKMT > 15 ? `${percentageKMT}%` : ''"></div>
      <div class="chart__dpp" :style="{ width: `${percentageDPP}%` }" v-text="percentageDPP > 15 ? `${percentageDPP}%` : ''"></div>
    </div>
    <div class="chart chart__won-hint">
      <div class="chart__kmt chart__won-hint" :style="{ width: `${percentageKMT}%` }" v-text="kmtCandidates.length !== 0 ? `${kmtCandidatesWon.length}/${kmtCandidates.length}` : ''"></div>
      <div class="chart__dpp chart__won-hint" :style="{ width: `${percentageDPP}%` }" v-text="dppCandidates.length !== 0 ? `${dppCandidatesWon.length}/${dppCandidates.length}` : ''"></div>
    </div>
  </div>
</template>

<script>
import { get, sumBy } from 'lodash'

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    kmtCandidates () {
      return get(this.data, [ 'candidates', '中國國民黨' ], [])
    },
    kmtCandidatesWon () {
      return this.kmtCandidates.filter(candidate => candidate['當選註記'] === '*')
    },
    dppCandidates () {
      return get(this.data, [ 'candidates', '民主進步黨' ], [])
    },
    dppCandidatesWon () {
      return this.dppCandidates.filter(candidate => candidate['當選註記'] === '*')
    },
    donatesKMT () {
      return sumBy(this.kmtCandidates, o => +(o['收入金額'].split(',').join('')))
    },
    donatesDPP () {
      return sumBy(this.dppCandidates, o => +(o['收入金額'].split(',').join('')))
    },
    donatesKMTDPP () {
      return this.donatesKMT + this.donatesDPP
    },
    percentageKMT () {
      return Math.round(this.donatesKMT / this.donatesKMTDPP * 100)
    },
    percentageDPP () {
      return Math.round(this.donatesDPP / this.donatesKMTDPP * 100)
    },
  }  
}
</script>

<style lang="stylus" scoped>
.chart
  width 100%
  height 40px
  display flex
  &__kmt
    background-color #0071bc
    display flex
    justify-content center
    align-items center
    color white
  &__dpp
    background-color #53a66f
    display flex
    justify-content center
    align-items center
    color white
  &__won-hint
    background-color transparent
    color #808080
</style>


