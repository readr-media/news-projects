<template>
  <section class="section-content-explore-lightbox-info">
    <template v-if="!isLightBoxWorks">
      invalid candidate: "{{ nameUrlQuery }}",<br>
      cause by invalid query string,<br>
      or candidate didn't exist in data
    </template>
    <template v-else>
      <SectionContentExploreRadios
        class="section-content-explore-lightbox-info__radios--mobile"
        :isLightboxNavigation="true"
      />
      <SectionContentExploreLightboxInfoProfile
        v-show="isQueryValidCandidateName"
        class="section-content-explore-lightbox-info__profile"
        :candidateName="candidateProfileName"
        :candidateBornYear="candidateProfileBornYear"
        :candidateParty="candidateProfileParty"
        :candidateIsVeteran="candidateProfileIsVeteran"
        :candidateCommittee="candidateProfileCommittee"
        :isCandidateWon="isCandidateWon"
      />
      <SectionContentExploreLightboxInfoProfileCorp
        v-show="isQueryValidGroupOrCompanyName"
        class="section-content-explore-lightbox-info__profile"
        :corpType="corpType"
        :groupNameOrCompanyTaxId="groupNameOrCompanyTaxId"
      />
      <div class="scrollable-container">
        <SectionContentExploreLightboxInfoDonates
          v-show="isQueryValidCandidateName"
          class="section-content-explore-lightbox-info__donates"
          :candidateDonatesTotal="candidateDonatesTotal"
          :candidateDonatesCompany="candidateDonatesCompany"
          :candidateDonatesCompanyCount="candidateDonatesCompanyCount"
        />
        <SectionContentExploreLightboxInfoDonatesFrom
          class="section-content-explore-lightbox-info__donates-from"
          :candidateDonatesBasic="candidateDonatesBasic"
        />
      </div>
    </template>
  </section>
</template>

<script>
import { get, isNaN, } from 'lodash'

import SectionContentExploreRadios from './SectionContentExploreRadios.vue'
import SectionContentExploreLightboxInfoProfile from './SectionContentExploreLightboxInfoProfile.vue'
import SectionContentExploreLightboxInfoProfileCorp from './SectionContentExploreLightboxInfoProfileCorp.vue'
import SectionContentExploreLightboxInfoDonates from './SectionContentExploreLightboxInfoDonates.vue'
import SectionContentExploreLightboxInfoDonatesFrom from './SectionContentExploreLightboxInfoDonatesFrom.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreRadios,
    SectionContentExploreLightboxInfoProfile,
    SectionContentExploreLightboxInfoProfileCorp,
    SectionContentExploreLightboxInfoDonates,
    SectionContentExploreLightboxInfoDonatesFrom,
  },
  computed: {
    ...mapState({
      corpNameTaxIdMappingGroupByName: state => state.corpNameTaxIdMappingGroupByName,
    }),
    ...mapGetters([
      'nameUrlQuery',
      'isQueryValidCandidateName',
      'isQueryValidGroupOrCompanyName',
      'isLightBoxWorks',
      'dataBasicCurrentOrdinalCandidateLightboxShown',
    ]),
    isCandidateWon () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '當選註記' ], '') === '*'
    },
    candidateProfileName () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '候選人' ], '')
    },
    candidateProfileBornYear () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '出生年次' ], '')
    },
    candidateProfileParty () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '推薦政黨' ], '')
    },
    candidateProfileIsVeteran () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '是否現任' ], '')
    },
    candidateProfileCommittee () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '委員會' ], '')
    },
    candidateDonatesTotal () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '總收入' ], '')
    },
    candidateDonatesCompany () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '營利事業捐贈收入' ], '')
    },
    candidateDonatesCompanyCount () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '捐贈企業數' ], '')
    },
    candidateDonatesPersonal () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '個人捐贈收入' ], '')
    },
    candidateDonatesParty () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '政黨捐贈收入' ], '')
    },
    candidateDonatesPeopleGroup () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '人民團體捐贈收入' ], '')
    },
    candidateDonatesAnonymous () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '匿名捐贈收入' ], '')
    },
    candidateDonatesOthers () {
      return get(this.dataBasicCurrentOrdinalCandidateLightboxShown, [ 0, '其他收入' ], '')
    },
    candidateDonatesBasic () {
      return [
        { name: '總收入', value: this.candidateDonatesTotal },
        { name: '營利事業', value: this.candidateDonatesCompany },
        { name: '個人', value: this.candidateDonatesPersonal },
        { name: '政黨', value: this.candidateDonatesParty },
        { name: '人民團體', value: this.candidateDonatesPeopleGroup },
        { name: '匿名', value: this.candidateDonatesAnonymous },
        { name: '其他捐贈', value: this.candidateDonatesOthers },
      ]
    },
    corpType () {
      return isNaN(Number(get(get(this.corpNameTaxIdMappingGroupByName, this.nameUrlQuery), [ 0, '名稱／統一編號' ]))) ? 'group' : 'company'
    },
    groupNameOrCompanyTaxId () {
      return get(get(this.corpNameTaxIdMappingGroupByName, this.nameUrlQuery), [ 0, '名稱／統一編號' ], '')
    },
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-info
  padding 0 40px 0 0
  width 344px
  height calc(95vh - 40px)
  display flex
  flex-direction column
  &__radios
    &--mobile
      display none !important
  &__profile
    padding 0 0 20px 0
    border-bottom 1px solid #808080
  &__donates, &__donates-from
    padding 20px 0
    border-bottom 1px solid #808080

.scrollable-container
  overflow-y scroll
  flex 1 1 auto
  &::-webkit-scrollbar
    display none
    background-color transparent
  &::-webkit-scrollbar-track
    background-color transparent
  &::-webkit-scrollbar-thumb
    background-color transparent

@media (max-width 1024px)
  .section-content-explore-lightbox-info
    padding 0
    width 100%
    height auto
    &__radios
      &--mobile
        display flex
        margin 5px 0 20px 2px
        justify-content flex-start !important
    &__donates-from
      border-bottom none
</style>


