<template>
  <div class="section-content-explore-lightbox-force-tooltip-node-candidate">
    <SectionContentExploreLightboxInfoProfile
      class="section-content-explore-lightbox-force-tooltip-node-candidate__profile"
      :candidateName="candidateProfileName"
      :candidateBornYear="candidateProfileBornYear"
      :candidateParty="candidateProfileParty"
      :candidateIsVeteran="candidateProfileIsVeteran"
      :candidateCommittee="candidateProfileCommittee"
      :isCandidateWon="isCandidateWon"
    />
    <p class="section-content-explore-lightbox-force-tooltip-node-candidate__donate-sum">
      本關係圖中收入
      <span class="section-content-explore-lightbox-force-tooltip-node-candidate__donate-sum-number">{{ dataForceTooltipDonateSum }}</span>
      萬元
    </p>
  </div>
</template>

<script>
import { get, find } from 'lodash'

import SectionContentExploreLightboxInfoProfile from './SectionContentExploreLightboxInfoProfile.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreLightboxInfoProfile,
  },
  computed: {
    ...mapGetters([
      'rawDataBasicCurrentOrdinalGroupByCandidate',
      'dataForceDonateSum',
      'dataForceTooltipCurrentIdentityType',
      'dataForceTooltipCurrentIdentityId',
    ]),
    dataForceTooltipDataBasic () {
      return this.rawDataBasicCurrentOrdinalGroupByCandidate[this.dataForceTooltipCurrentIdentityId]
    },
    dataForceTooltipDonateSum () {
      return Number((get(this.dataForceDonateSum, [this.dataForceTooltipCurrentIdentityType, this.dataForceTooltipCurrentIdentityId], 0) / 10000).toFixed(2)).toLocaleString()
    },
    isCandidateWon () {
      return get(this.dataForceTooltipDataBasic, [ 0, '當選註記' ], '') === '*'
    },
    candidateProfileName () {
      return get(this.dataForceTooltipDataBasic, [ 0, '候選人' ], '')
    },
    candidateProfileBornYear () {
      return get(this.dataForceTooltipDataBasic, [ 0, '出生年次' ], '')
    },
    candidateProfileParty () {
      return get(this.dataForceTooltipDataBasic, [ 0, '推薦政黨' ], '')
    },
    candidateProfileIsVeteran () {
      return get(this.dataForceTooltipDataBasic, [ 0, '是否現任' ], '')
    },
    candidateProfileCommittee () {
      return get(this.dataForceTooltipDataBasic, [ 0, '委員會' ], '')
    },
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-force-tooltip-node-candidate
  min-width 280px
  &__donate-sum
    margin 10px 0 0 0
    font-size 16px
  &__donate-sum-number
    font-size 18px
    color #9e005d
    font-weight 600
</style>


