<template>
  <section class="section-content-explore-candidates-won">
    <div :class="[ 'section-content-explore-candidates-won__buttons', { 'section-content-explore-candidates-won__buttons--sticky': buttonsFixed } ]">
      <SectionContentExploreRadios class="section-content-explore-candidates-won__radios"/>
      <SectionContentExploreSorts class="section-content-explore-candidates-won__sorts"/>
    </div>
    <div v-show="fetchLoading" class="section-content-explore-candidates-won__loading-container">正在讀取基本資料...</div>
    <SectionContentExploreCandidatesWonList v-show="!fetchLoading"/>
  </section>
</template>

<script>
import { isEmpty, } from 'lodash'

import SectionContentExploreRadios from './SectionContentExploreRadios.vue'
import SectionContentExploreSorts from './SectionContentExploreSorts.vue'
import SectionContentExploreCandidatesWonList from './SectionContentExploreCandidatesWonList.vue'

import { fetchSheetBasic, fetchSheetCorpNameTaxIdMapping, } from 'src/components/PoliticalContribution/dispatchers'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreRadios,
    SectionContentExploreSorts,
    SectionContentExploreCandidatesWonList,
  },
  data () {
    return {
      scrollerFetchBasic: undefined,
      fetchLoading: false,
      // scrollerButtonsFixed: undefined,
      buttonsFixed: false,
    }
  },
  computed: {
    ...mapGetters([
      'ordinalRadioPicked',
      'rawDataBasicCurrentOrdinal',
    ]),
  },
  methods: {
    sectionContentExploreStepEnter () {
      if (isEmpty(this.rawDataBasicCurrentOrdinal)) {
        this.fetchLoading = true
        // fetchSheetBasic(this.$store, this.ordinalRadioPicked)
        // .then(() => { this.fetchLoading = false })
        Promise.all([
          fetchSheetBasic(this.$store, 'seventh'),
          fetchSheetBasic(this.$store, 'eighth'),
          fetchSheetBasic(this.$store, 'ninth'),
        ]).then(() => { this.fetchLoading = false })

        fetchSheetCorpNameTaxIdMapping(this.$store)
      }
    },
    scrollerResizeHandler () {
      this.scrollerFetchBasic.resize()
      // this.scrollerButtonsFixed.resize()
    },
  },
  mounted () {
    this.scrollerFetchBasic = window.scrollama()
    this.scrollerFetchBasic
      .setup({
        step: '.section-content-explore', // container in SectionContentExplore.vue
        offset: .5,
      })
      .onStepEnter(this.sectionContentExploreStepEnter)

    // this.scrollerButtonsFixed = window.scrollama()
    // this.scrollerButtonsFixed
    //   .setup({
    //     step: '.section-content-explore-candidates-won', // container in SectionContentExplore.vue
    //     offset: 0,
    //   })
    //   .onStepEnter(() => {
    //     this.buttonsFixed = true
    //   })
    //   .onStepExit(({ direction }) => {
    //     if (direction === 'up') {
    //       this.buttonsFixed = false
    //     }
    //   })

    window.addEventListener('resize', this.scrollerResizeHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.scrollerResizeHandler)
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-candidates-won
  margin 0 0 107px 0
  padding 235px 0 0 0
  position relative
  &__loading-container
    width 100%
    height 300px
    display flex
    justify-content center
    align-items center
  &__buttons
    width 900px
    padding 10px 0
    position absolute
    top 60px
    background-color white
    &--sticky
      z-index 10000
      position fixed
      top 60px
  &__radios
    margin 0 0 21px 0
  &__sorts
    margin 21px 0 0 0

@media (max-width 1024px)
  .section-content-explore-candidates-won
    padding 265px 0 0 0
    &__buttons
      width 100%
</style>


