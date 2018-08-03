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
      <h1 class="section-content-explore-lightbox-info-donates-from__title">營利事業產業組成</h1>
      <div class="bar-chart-container">
        <div
          v-show="isRawDataCompanyDonateCurrentOrdinalEmpty"
          class="bar-chart-container__loading"
        >
          正在讀取營利事業捐贈明細...
        </div>
        <BarHorizontalCandidateInfoDonatesFrom
          id="section-content-explore-lightbox-info-donates-from-industry"
          :donates="candidateDonatesIndustryTypeFrom"
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
          正在讀取營利事業捐贈明細...
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
      'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIndustryType',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIsLocalCounty',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIsLocalElectionState',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByParty',
    ]),
    isRawDataCompanyDonateCurrentOrdinalEmpty () {
      return isEmpty(this.rawDataCompanyDonateCurrentOrdinal)
    },
    candidateDonatesIndustryTypeFrom () {
      const mapValuesToDonatesSum = mapValues(this.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByIndustryType, rows => sumBy(rows, row => +(row['收入金額'].split(',').join(''))))
      return take(sortBy(Object.entries(mapValuesToDonatesSum), ele => -ele[1]).map(ele => ({ from: ele[0], money: +ele[1]})), 4)
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
   & + &
    margin 30px 0 0 0
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
</style>


