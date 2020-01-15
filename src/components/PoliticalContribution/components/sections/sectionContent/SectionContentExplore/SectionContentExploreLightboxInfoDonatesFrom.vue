<template>
  <div class="section-content-explore-lightbox-info-donates-from">
    <div class="section-content-explore-lightbox-info-donates-from__chart">
      <h1 class="section-content-explore-lightbox-info-donates-from__title">{{ isNameLightboxShownCorp ? '捐贈政黨組成' : '政治獻金收入組成' }}</h1>
      <div class="bar-chart-container">
        <div
          v-show="isRawDataCompanyDonateCurrentOrdinalEmpty && isNameLightboxShownCorp"
          class="bar-chart-container__loading"
        >
          正在讀取營利事業捐贈明細...
        </div>
        <BarHorizontalCandidateInfoDonatesFrom
          id="section-content-explore-lightbox-info-donates-from-basic"
          :donates="isNameLightboxShownCorp ? corpDonatesPartiesTo : candidateDonatesBasicDonatesFrom"
        />
      </div>
    </div>
    <div v-if="!isNameLightboxShownCorp" class="section-content-explore-lightbox-info-donates-from__chart">
      <div class="title-container">
        <h1 class="section-content-explore-lightbox-info-donates-from__title">營利事業產業組成</h1>
        <button 
          :class="[ 'title-container__caution-button', { 'title-container__caution-button--active': showCaution } ]"
          @click="showCaution = !showCaution"
        >
          註
        </button>
      </div>
      <div v-show="showCaution" class="caution-container">
        此分類使用財政部稅籍資料，由行業代碼對應到稅務行業分類的十九大分類。由於一間公司可能會登記多個業別，加總金額會大於總金額。假設 A 公司登記為「製造業」與「批發零售業」，捐贈 2 萬元，則計算方式為「製造業 2 萬元」、「批發零售業 2 萬元」。
      </div>
      <div class="bar-chart-container">
        <div
          v-show="isIndustryPercentageMOFEmpty"
          class="bar-chart-container__loading"
        >
          正在讀取營利事業捐贈明細...
        </div>
        <BarHorizontalCandidateInfoDonatesFrom
          id="section-content-explore-lightbox-info-donates-from-industry"
          :donates="candidateDonatesIndustryTypeFrom"
          :isDataPercentage="true"
        />
      </div>
    </div>
    <div v-if="!isNameLightboxShownCorp" class="section-content-explore-lightbox-info-donates-from__chart">
      <h1 class="section-content-explore-lightbox-info-donates-from__title">營利事業選區內／選區外</h1>
      <div class="bar-chart-container">
        <div
          v-show="isRawDataCompanyDonateCurrentOrdinalEmpty"
          class="bar-chart-container__loading"
        >
          正在讀取營利事業行業別明細...
        </div>
        <BarHorizontalCandidateInfoDonatesFrom
          id="section-content-explore-lightbox-info-donates-from-local-election-state"
          :donates="candidateDonatesLocalElectionStateFrom"
        />
      </div>
    </div>
    <div v-if="!isNameLightboxShownCorp" class="section-content-explore-lightbox-info-donates-from__chart">
      <h1 class="section-content-explore-lightbox-info-donates-from__title">營利事業選區縣市／外縣市</h1>
      <div class="bar-chart-container">
        <div
          v-show="isRawDataCompanyDonateCurrentOrdinalEmpty"
          class="bar-chart-container__loading"
        >
          正在讀取營利事業捐贈明細...
        </div>
        <BarHorizontalCandidateInfoDonatesFrom
          id="section-content-explore-lightbox-info-donates-from-local-county"
          :donates="candidateDonatesCountyFrom"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { sortBy, take, takeRight, mapKeys, mapValues, dropWhile, sumBy, isEmpty, } from 'lodash'

import BarHorizontalCandidateInfoDonatesFrom from '../../../charts/BarHorizontalCandidateInfoDonatesFrom.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    candidateDonatesBasic: {
      type: Array,
      required: true,
    }
  },
  components: {
    BarHorizontalCandidateInfoDonatesFrom,
  },
  data () {
    return {
      showCaution: false,
    }
  },
  computed: {
    candidateDonatesBasicDonatesFrom () {
      const sorted = sortBy(this.candidateDonatesBasic, [ d => -Number(d.value.split(',').join('')) ]).map(category => mapKeys(category, (value, key) => { 
        if (key === 'name') return 'from'
        if (key === 'value') return 'money'
      }))
      const sortedDropTotal = dropWhile(sorted, [ 'from', '總收入' ])

      const topThree = take(sortedDropTotal, 3).map(category => mapValues(category, (value, key) => key === 'money' ? +(value.split(',').join('')) : value ))

      const others = takeRight(sortedDropTotal, sortedDropTotal.length - 3).map(category => mapValues(category, (value, key) => key === 'money' ? +(value.split(',').join('')) : value ))
      const othersSum = others.reduce((acc, curr) => acc + curr.money, 0)
      return [
        ...topThree,
        {
          from: '其他',
          money: othersSum
        }
      ]
    },
    ...mapGetters([
      'isNameLightboxShownCorp',
      'rawDataCompanyDonateCurrentOrdinal',
      // 'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIndustryType',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIsLocalCounty',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIsLocalElectionState',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByParty',
      'dataIndustryPercentageMOFCurrentOrdinalNameLightboxShown',
    ]),
    isRawDataCompanyDonateCurrentOrdinalEmpty () {
      return isEmpty(this.rawDataCompanyDonateCurrentOrdinal)
    },
    isIndustryPercentageMOFEmpty () {
      return isEmpty(this.dataIndustryPercentageMOFCurrentOrdinalNameLightboxShown)
    },
    candidateDonatesIndustryTypeFrom () {
      // const mapValuesToDonatesSum = mapValues(this.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIndustryType, rows => sumBy(rows, row => +(row['收入金額'].split(',').join(''))))
      // return take(sortBy(Object.entries(mapValuesToDonatesSum), ele => -ele[1]).map(ele => ({ from: ele[0], money: +ele[1]})), 4)
      return take(this.dataIndustryPercentageMOFCurrentOrdinalNameLightboxShown.map(ele => ({ from: ele['大業別'], money: ele['大業別金額比例'] })), 4)
    },
    candidateDonatesCountyFrom () {
      const mapValuesToDonatesSum = mapValues(this.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIsLocalCounty, rows => sumBy(rows, row => +(row['收入金額'].split(',').join(''))))
      return take(sortBy(Object.entries(mapValuesToDonatesSum), ele => -ele[1]).map(ele => ({ from: ele[0], money: +ele[1]})), 4)
    },
    candidateDonatesLocalElectionStateFrom () {
      const mapValuesToDonatesSum = mapValues(this.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIsLocalElectionState, rows => sumBy(rows, row => +(row['收入金額'].split(',').join(''))))
      return take(sortBy(Object.entries(mapValuesToDonatesSum), ele => -ele[1]).map(ele => ({ from: ele[0], money: +ele[1]})), 4)
    },
    corpDonatesPartiesTo () {
      const mapValuesToDonatesSum = mapValues(this.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByParty, rows => sumBy(rows, row => +(row['收入金額'].split(',').join(''))))
      return take(sortBy(Object.entries(mapValuesToDonatesSum), ele => -ele[1]).map(ele => ({ from: ele[0], money: +ele[1]})), 4)
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-info-donates-from
  &__chart
    position relative
    & + &
      margin 30px 0 0 0
    &--fix-height
      height 143px
  &__title
    font-size 20px
    font-weight 600
    margin 0

.bar-chart-container
  position relative
  &__loading
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    display flex
    justify-content flex-start
    align-items center

.title-container
  display flex
  align-items center
  &__caution-button
    d = 23px
    width d
    height d
    border-radius d
    border solid 1px #9e005d
    color #9e005d
    padding 0
    margin 0 0 0 11px
    display flex
    justify-content center
    align-items center
    cursor pointer
    font-size 16px
    background-color white
    &:focus
      outline none
    &--active
      background-color #9e005d
      color white

.caution-container
  width 100%
  // height calc(100% - 30px)
  // position absolute
  // top 30px
  // left 0
  border solid 1px #9e005d
  background-color white
  margin 5px 0
  padding 16px
  font-size 16px
  line-height 1.3
  text-align justify
</style>


