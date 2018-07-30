<template>
  <div class="section-content-explore-lightbox-info-donates-from">
    <div class="section-content-explore-lightbox-info-donates-from__chart">
      <h1 class="section-content-explore-lightbox-info-donates-from__title">政治獻金收入組成</h1>
      <BarHorizontalCandidateInfoDonatesFrom :donates="candidateDonatesBasicDonatesFrom"/>
    </div>
    <div class="section-content-explore-lightbox-info-donates-from__chart">
      <h1 class="section-content-explore-lightbox-info-donates-from__title">營利事業產業組成</h1>
    </div>
    <div class="section-content-explore-lightbox-info-donates-from__chart">
      <h1 class="section-content-explore-lightbox-info-donates-from__title">營利事業選區內／選區外</h1>
    </div>
    <div class="section-content-explore-lightbox-info-donates-from__chart">
      <h1 class="section-content-explore-lightbox-info-donates-from__title">營利事業選區縣市／外縣市</h1>
    </div>
  </div>
</template>

<script>
import { sortBy, take, takeRight, mapKeys, mapValues, dropWhile } from 'lodash'

import BarHorizontalCandidateInfoDonatesFrom from '../../../charts/BarHorizontalCandidateInfoDonatesFrom.vue'

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
    // legendHintsBasic () {
    //   return this.candidateDonatesBasicSort.map(entry => entry.name)
    // }
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
</style>


