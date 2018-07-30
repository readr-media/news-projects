<template>
  <section class="section-content-explore-lightbox">
    <div v-show="!isQueryValidOrdinal" class="section-content-explore-lightbox__error">
      invalid ordinal
    </div>
    <div v-show="isQueryValidOrdinal" class="section-content-explore-lightbox__contnet">
      <SectionContentExploreLightboxSidebar
        :class="[ 'section-content-explore-lightbox__info', { 'section-content-explore-lightbox__info--folded': !isSidebarToogledInfo } ]"
        :isSidebarToogled="isSidebarToogledInfo"
        :foldedHint="foldedHintInfo"
        @toogleSidebar="toogleSidebarInfo"
      >
        <div class="section-content-explore-lightbox__info-content">
          <div class="loading loading--sidebar" v-if="loadingInfo">Loading...</div>
          <SectionContentExploreLightboxInfo v-else/>
        </div>
      </SectionContentExploreLightboxSidebar>
      <SectionContentExploreLightboxSidebar
        :class="[ 'section-content-explore-lightbox__ranks', { 'section-content-explore-lightbox__ranks--folded': !isSidebarToogledRanks } ]"
        :isSidebarToogled="isSidebarToogledRanks"
        :foldedHint="foldedHintRanks"
        @toogleSidebar="toogleSidebarRanks"
      >
        <div class="section-content-explore-lightbox__ranks-content">
          <div class="loading loading--sidebar" v-if="fetchLoadingCompanyDonate">Loading...</div>
          <SectionContentExploreLightboxRanks v-else/>
        </div>
      </SectionContentExploreLightboxSidebar>
      <SectionContentExploreLightboxForce
        class="section-content-explore-lightbox__force"
        :isSidebarToogledInfo="isSidebarToogledInfo"
        :isSidebarToogledRanks="isSidebarToogledRanks"
      />
    </div>
  </section>
</template>

<script>
import { isEmpty, } from 'lodash'

import SectionContentExploreLightboxForce from './SectionContentExploreLightboxForce.vue'
import SectionContentExploreLightboxSidebar from './SectionContentExploreLightboxSidebar.vue'
import SectionContentExploreLightboxRanks from './SectionContentExploreLightboxRanks.vue'
import SectionContentExploreLightboxInfo from './SectionContentExploreLightboxInfo.vue'

import { fetchSheetBasic, fetchSheetCompanyDonate, fetchSheetCorpNameTaxIdMapping, } from 'src/components/PoliticalContribution/dispatchers'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreLightboxForce,
    SectionContentExploreLightboxSidebar,
    SectionContentExploreLightboxRanks,
    SectionContentExploreLightboxInfo,
  },
  watch: {
    ordinalUrlQueryString () {
      if (this.isQueryValidOrdinal) {
        // TODO: refactor
        // TODO: should check isQueryValidCandidateName or isQueryValidGroupOrCompanyName to avoid wasting memory
        if (isEmpty(this.rawDataCompanyDonateCurrentOrdinal)) {
          this.fetchLoadingCompanyDonate = true
          fetchSheetCompanyDonate(this.$store, this.ordinalRadioPicked)
          .then(() => { this.fetchLoadingCompanyDonate = false })
        }
        if (isEmpty(this.corpNameTaxIdMappingGroupByName)) {
          this.fetchLoadingCorpNameTaxIdMapping = true
          fetchSheetCorpNameTaxIdMapping(this.$store)
          .then(() => { this.fetchLoadingCorpNameTaxIdMapping = false })
        }
      }
    },
    nameUrlQuery () {
      if (this.nameUrlQuery && this.$store.state.PoliticalContribution.currentLightboxShownName !== this.nameUrlQuery) {
        this.$store.commit('PoliticalContribution/SET_CURRENT_LIGHTBOX_SHOWN_NAME', this.nameUrlQuery)
      }
    }
  },
  data () {
    return {
      isSidebarToogledRanks: true,
      isSidebarToogledInfo: true,
      fetchLoadingBasic: false,
      fetchLoadingCompanyDonate: false,
      fetchLoadingCorpNameTaxIdMapping: false,
    }
  },
  computed: {
    ...mapState({
      corpNameTaxIdMappingGroupByName: state => state.corpNameTaxIdMappingGroupByName
    }),
    ...mapGetters([
      'nameUrlQuery',
      'ordinalRadioPicked',
      'nameLightboxShown',
      'ordinalUrlQueryString',
      /* 
      ** Reason to checking isQueryValidOrdinal: only when lightbox is shown, or updated, we should fetch data if ordinal is valid
      ** it's no matter what we should get ordinal string by radio picked or url query, in SectionContentExplore.vue, if ordinal valid,
      ** we will commit a mutation so they are equal
      */
      'isQueryValidOrdinal',
      'isQueryValidCandidateName',
      'isQueryValidGroupOrCompanyName',
      'rawDataBasicCurrentOrdinal',
      'rawDataCompanyDonateCurrentOrdinal',
      'isNameLightboxShownCorp',
    ]),
    loadingInfo () {
      return this.fetchLoadingBasic || this.fetchLoadingCorpNameTaxIdMapping
    },
    foldedHintInfo () {
      return this.isNameLightboxShownCorp ? '查看集團公司基本資料' : '查看候選人基本資料'
    },
    foldedHintRanks () {
      return this.isNameLightboxShownCorp ? '查看集團公司關係排名' : '查看候選人政商關係排名'
    }
  },
  methods: {
    toogleSidebarRanks () {
      this.isSidebarToogledRanks = !this.isSidebarToogledRanks
    },
    toogleSidebarInfo () {
      this.isSidebarToogledInfo = !this.isSidebarToogledInfo
    },
  },
  created () {
    if (this.nameUrlQuery && this.nameLightboxShown !== this.nameUrlQuery) {
      this.$store.commit('PoliticalContribution/SET_CURRENT_LIGHTBOX_SHOWN_NAME', this.nameUrlQuery)
    }
  },
  mounted () {
    if (this.isQueryValidOrdinal) {
      if (isEmpty(this.rawDataBasicCurrentOrdinal)) {
        this.fetchLoadingBasic = true
        Promise.all([
          fetchSheetBasic(this.$store, 'seventh'),
          fetchSheetBasic(this.$store, 'eighth'),
          fetchSheetBasic(this.$store, 'ninth'),
        ]).then(() => { this.fetchLoadingBasic = false })
      }
      // TODO: refactor
      // TODO: should check isQueryValidCandidateName or isQueryValidGroupOrCompanyName to avoid wasting memory
      if (isEmpty(this.rawDataCompanyDonateCurrentOrdinal)) {
        this.fetchLoadingCompanyDonate = true
        fetchSheetCompanyDonate(this.$store, this.ordinalRadioPicked)
        .then(() => { this.fetchLoadingCompanyDonate = false })
      }
      if (isEmpty(this.corpNameTaxIdMappingGroupByName)) {
        this.fetchLoadingCorpNameTaxIdMapping = true
        fetchSheetCorpNameTaxIdMapping(this.$store)
        .then(() => { this.fetchLoadingCorpNameTaxIdMapping = false })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox
  display flex
  flex-direction row-reverse
  width 100%
  height 100%
  overflow hidden

  &__info
    transition transform .25s
    z-index 10001
    overflow hidden
    &--folded
      transform translate3d(344px, 0, 0)
  &__info-content
    display flex
    justify-content center
    align-items center
    width calc(100% - 40px)

  &__ranks
    transition transform .25s
    z-index 10000
    &--folded
      transform translate3d(344px, 0, 0)
  &__ranks-content
    display flex
    justify-content center
    align-items center
    width calc(100% - 40px)

  &__force
    // flex 1 1 auto
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    
  &__error
    width 100%
    display flex
    justify-content center
    align-items center
  &__contnet
    display flex
    flex-direction row-reverse
    width 100%
    height 100%
    position relative

.loading
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  &--sidebar
    transform translate3d(-40px, 0, 0)
  &--force
    justify-content center
    span
      transform translate3d(-384px, 0, 0)

.section-content-explore-lightbox__info--folded + .section-content-explore-lightbox__ranks
  transform translate3d(344px, 0, 0)
.section-content-explore-lightbox__info--folded ~ .section-content-explore-lightbox__ranks--folded
  transform translate3d(688px, 0, 0)
</style>


