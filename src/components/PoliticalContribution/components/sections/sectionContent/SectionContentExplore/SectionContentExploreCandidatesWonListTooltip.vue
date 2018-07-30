<template>
  <div class="section-content-explore-candidates-won-list-tooltip">
    <SectionContentExploreLightboxInfoProfile
      class="section-content-explore-candidates-won-list-tooltip__profile"
      :candidateName="candidateProfileName"
      :candidateBornYear="candidateProfileBornYear"
      :candidateParty="candidateProfileParty"
      :candidateIsVeteran="candidateProfileIsVeteran"
      :candidateCommittee="candidateProfileCommittee"
      :isCandidateWon="isCandidateWon"
      :showThumbnail="false"
    />
    <SectionContentExploreLightboxInfoDonates
      class="section-content-explore-candidates-won-list-tooltip__donates"
      :candidateDonatesTotal="candidateDonatesTotal"
      :candidateDonatesCompany="candidateDonatesCompany"
      :candidateDonatesCompanyCount="candidateDonatesCompanyCount"
    />
  </div>
</template>

<script>
import { get, } from 'lodash'

import SectionContentExploreLightboxInfoProfile from './SectionContentExploreLightboxInfoProfile.vue'
import SectionContentExploreLightboxInfoDonates from './SectionContentExploreLightboxInfoDonates.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    tooltipCandidateName: {
      type: String,
      required: true,
    },
  },
  components: {
    SectionContentExploreLightboxInfoProfile,
    SectionContentExploreLightboxInfoDonates,
  },
  computed: {
    ...mapGetters([
      'rawDataBasicCurrentOrdinalGroupByCandidate',
    ]),
    candidateProfileName () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ this.tooltipCandidateName, 0, '候選人' ], '')
    },
    candidateProfileBornYear () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ this.tooltipCandidateName, 0, '出生年次' ], '')
    },
    candidateProfileParty () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ this.tooltipCandidateName, 0, '推薦政黨' ], '')
    },
    candidateProfileIsVeteran () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ this.tooltipCandidateName, 0, '是否現任' ], '')
    },
    candidateProfileCommittee () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ this.tooltipCandidateName, 0, '委員會' ], '')
    },
    isCandidateWon () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ this.tooltipCandidateName, 0, '當選註記' ], '') === '*'
    },
    candidateDonatesTotal () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ this.tooltipCandidateName, 0, '總收入' ], '')
    },
    candidateDonatesCompany () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ this.tooltipCandidateName, 0, '營利事業捐贈收入' ], '')
    },
    candidateDonatesCompanyCount () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ this.tooltipCandidateName, 0, '捐贈企業數' ], '')
    },
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-candidates-won-list-tooltip
  padding 0 10px
</style>


