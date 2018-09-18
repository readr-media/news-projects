<template>
  <div class="scatter-ordinal-corp-donates-tooltip">
    <div class="scatter-ordinal-corp-donates-tooltip__block corp-info">
      <p class="corp-info__name-bosses">{{ tooltipDataName }} {{ tooltipDataBosses }}</p>
      <p class="corp-info__main-companies">核心公司：{{ tooltipDataMainCompanies }}</p>
    </div>
    <div class="scatter-ordinal-corp-donates-tooltip__block donates-info">
      <p class="donates-info__donates-sum"><span class="donates-info__donates-sum--highlight">{{ tooltipDataDonatesSum }}</span> 元</p>
      <p class="donates-info__donates-won-percentage">命中率：{{ tooltipDataCandidateWonPercentage }}%</p>
      <p class="donates-info__donates-candidates">
        當選：{{ tooltipDataCandidatesKMTWons.length + tooltipDataCandidatesDPPWons.length }} 人 / 捐贈藍綠共：{{ tooltipDataCandidatesKMT.length + tooltipDataCandidatesDPP.length }} 人
      </p>
      <p class="donates-info__donates-candidates-kmt"><span class="kmt">中國國民黨</span>：當選：{{ tooltipDataCandidatesKMTWons.length }} 人 / 捐贈：{{ tooltipDataCandidatesKMT.length }} 人</p>
      <p class="donates-info__donates-candidates-dpp"><span class="dpp">民主進步黨</span>：當選：{{ tooltipDataCandidatesDPPWons.length }} 人 / 捐贈：{{ tooltipDataCandidatesDPP.length }} 人</p>
    </div>
  </div>
</template>

<script>
import { get, groupBy, uniqBy, } from 'lodash'

export default {
  props: {
    tooltipData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tooltipDataName () {
      return get(this.tooltipData, 'name', '')
    },
    tooltipDataBosses () {
      return get(this.tooltipData, 'bosses', '')
    },
    tooltipDataMainCompanies () {
      return get(this.tooltipData, 'mainCompanies', '')
    },
    tooltipDataDonatesSum () {
      return get(this.tooltipData, 'donatesSum', '').toLocaleString()
    },
    tooltipDataCandidates () {
      return get(this.tooltipData, 'candidates', {})
    },
    tooltipDataCandidatesKMT () {
      return uniqBy(get(this.tooltipDataCandidates, '中國國民黨', []), '候選人')
    },
    tooltipDataCandidatesKMTWons () {
      return get(groupBy(this.tooltipDataCandidatesKMT, '當選註記'), '*', [])
    },
    tooltipDataCandidatesDPP () {
      return uniqBy(get(this.tooltipDataCandidates, '民主進步黨', []), '候選人')
    },
    tooltipDataCandidatesDPPWons () {
      return get(groupBy(this.tooltipDataCandidatesDPP, '當選註記'), '*', [])
    },
    tooltipDataCandidateWonPercentage () {
      return (((this.tooltipDataCandidatesKMTWons.length + this.tooltipDataCandidatesDPPWons.length) / (this.tooltipDataCandidatesKMT.length + this.tooltipDataCandidatesDPP.length)) * 100).toFixed(0)
    }
  }
}
</script>

<style lang="stylus" scoped>
.scatter-ordinal-corp-donates-tooltip
  padding 10px 20px

.corp-info
  border-bottom 2px solid #d3d3d3
  &__name-bosses
    font-size 24px
    font-weight 400
    margin 10px 0
  &__main-companies
    font-size 18px
    margin 10px 0

.donates-info
  &__donates-sum
    font-size 18px
    margin 10px 0
    &--highlight
      font-size 24px
      color #9e005d
      font-weight 600
  &__donates-won-percentage
    font-size 18px
    margin 10px 0
  &__donates-candidates
    font-size 18px
    margin 10px 0
  &__donates-candidates-kmt
    font-size 18px
    margin 10px 0
  &__donates-candidates-dpp
    font-size 18px
    margin 10px 0

.kmt
  color #0071bc
.dpp
  color #53a66f
</style>


