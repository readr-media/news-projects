<template>
  <div class="section-content-explore-lightbox-force-tooltip-link">
    <h1 class="section-content-explore-lightbox-force-tooltip-link__source-name" v-text="sourceName"></h1>
    <p>以營利事業名義捐贈給</p>
    <h1 class="section-content-explore-lightbox-force-tooltip-link__target-name" v-text="targetName"></h1>
    <p><span class="section-content-explore-lightbox-force-tooltip-link__money">{{ linkDataDonateSum }}</span> 萬元</p>
    <div v-show="isSourceGroup" class="section-content-explore-lightbox-force-tooltip-link__company-detail-container">
      <p>子公司明細：</p>
      <p v-for="(row, i) in linkData" :key="i">
        {{ row['捐贈者／支出對象'] }} 捐贈 <span class="section-content-explore-lightbox-force-tooltip-link__money">{{ (+(row['收入金額'].split(',').join('')) / 10000).toFixed(2) }}</span> 萬元
      </p>
    </div>
  </div>
</template>

<script>
import { get, find, sumBy } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  computed: {
    ...mapGetters([
      'rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany',
      'dataForceNested',
      'dataForceTooltipCurrentIdentityType',
      'dataForceTooltipCurrentIdentityId',
    ]),
    isSourceGroup () {
      return this.dataForceTooltipCurrentIdentityType === 'group'
    },
    sourceId () {
      return get(this.dataForceTooltipCurrentIdentityId, 'source', '')
    },
    sourceName () {
      return this.isSourceGroup ?
             this.sourceId :
             get(this.rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany, [ this.sourceId, 0, '捐贈者／支出對象' ], '')
    },
    targetName () {
      return get(this.dataForceTooltipCurrentIdentityId, 'target', '')
    },
    linkData () {
      return get(this.dataForceNested, [ 'byCandidate', this.targetName, this.sourceId ])
    },
    linkDataDonateSum () {
      return (sumBy(this.linkData, row => +(row['收入金額'].split(',').join(''))) / 10000).toFixed(2)
    },
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-force-tooltip-link
  h1
    font-size 28px
    margin 10px 0
    font-weight 400
  p
    font-size 16px
    margin 10px 0
  &__source-name
    margin 20px 0 10px 0
  &__money
    font-size 18px
    color #9e005d
    font-weight 600
</style>


