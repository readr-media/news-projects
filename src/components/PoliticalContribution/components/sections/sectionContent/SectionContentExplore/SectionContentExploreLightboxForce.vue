<template>
  <section class="section-content-explore-lightbox-force">
    <header class="section-content-explore-lightbox-force__header">
      <SectionContentExploreRadios
        class="section-content-explore-lightbox-force__radios"
        :isLightboxNavigation="true"
      />
      <h1 class="section-content-explore-lightbox-force__title">營利事業捐贈關係圖</h1>
    </header>
    <SectionContentExploreLightboxSearch
      :class="[
        'section-content-explore-lightbox-force__search',
        { 'section-content-explore-lightbox-force__search--folded-single': isSidebarFoldedSingle },
        { 'section-content-explore-lightbox-force__search--folded-double': isSidebarFoldedDouble },
      ]"
    />
    <SectionContentExploreLightboxForceZoom
      :class="[
        'section-content-explore-lightbox-force__zoom',
        { 'section-content-explore-lightbox-force__zoom--folded-single': isSidebarFoldedSingle },
        { 'section-content-explore-lightbox-force__zoom--folded-double': isSidebarFoldedDouble },
      ]"
    />
    <div class="section-content-explore-lightbox-force__graph-container">
      <div
        v-if="isCompanyDonateDataLoading"
        :class="[ 'loading', { 'loading--folded-single': isSidebarFoldedSingle }, { 'loading--folded-double': isSidebarFoldedDouble } ]"
      >
        正在讀取營利事業捐贈明細...
      </div>
      <SectionContentExploreLightboxForceTooltip
        class="section-content-explore-lightbox-force__tooltip"
      />
      <SectionContentExploreLightboxForceGraph
        :class="{ 'hidden': isCompanyDonateDataLoading}"
        :isSidebarToogledInfo="isSidebarToogledInfo"
        :isSidebarToogledRanks="isSidebarToogledRanks"
      />
    </div>
    <footer class="section-content-explore-lightbox-force__footer">
      <SectionContentExploreLightboxForceLegend
        :class="[
          'section-content-explore-lightbox-force__legend',
          { 'section-content-explore-lightbox-force__legend--folded-single': isSidebarFoldedSingle },
          { 'section-content-explore-lightbox-force__legend--folded-double': isSidebarFoldedDouble },
        ]"
      />
    </footer>
  </section>
</template>

<script>
import { isEmpty, } from 'lodash'

import SectionContentExploreRadios from './SectionContentExploreRadios.vue'
import SectionContentExploreLightboxSearch from './SectionContentExploreLightboxSearch.vue'
import SectionContentExploreLightboxForceZoom from './SectionContentExploreLightboxForceZoom.vue'
import SectionContentExploreLightboxForceTooltip from './SectionContentExploreLightboxForceTooltip.vue'
import SectionContentExploreLightboxForceGraph from './SectionContentExploreLightboxForceGraph2.vue'
import SectionContentExploreLightboxForceLegend from './SectionContentExploreLightboxForceLegend.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    isSidebarToogledInfo: {
      type: Boolean,
      required: true,
    },
    isSidebarToogledRanks: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    SectionContentExploreRadios,
    SectionContentExploreLightboxSearch,
    SectionContentExploreLightboxForceZoom,
    SectionContentExploreLightboxForceTooltip,
    SectionContentExploreLightboxForceGraph,
    SectionContentExploreLightboxForceLegend,
  },
  computed: {
    ...mapGetters([
      'rawDataCompanyDonateCurrentOrdinal'
    ]),
    isCompanyDonateDataLoading () {
      return isEmpty(this.rawDataCompanyDonateCurrentOrdinal)
    },
    isSidebarFoldedSingle () {
      // bitwise xor
      return (this.isSidebarToogledInfo ^ this.isSidebarToogledRanks) === 1
    },
    isSidebarFoldedDouble () {
      return !this.isSidebarToogledInfo && !this.isSidebarToogledRanks
    },
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-force
  // position relative
  display flex
  flex-direction column
  &__header
  //   width 436px
    padding 15px 0 0 20px
  &__radios
    justify-content flex-start !important
    padding 0 0 0 5px
  &__title
    font-size 36px
    font-weight 400
    margin 10px 0

  &__graph-container
    min-width 95vw
    min-height calc(95vh - 103px - 100px)
    position relative
    overflow hidden
  &__tooltip
    position absolute
    top 0
    left 20px

  &__footer
    min-height 100px
    display flex
    justify-content center
    align-items center
  &__legend
    transform translate3d(-384px, 0, 0) // 688 / 2 + 40
    transition transform .25s
    &--folded-single
      transform translate3d(-212px, 0, 0) // 344 / 2 + 40
    &--folded-double
      transform translate3d(-40px, 0, 0)
  //   position absolute
  //   top 130px
  //   left 20px

  &__search, &__zoom
    position absolute
    right calc(384px * 2 + 20px)
    transition transform .25s
    &--folded-single
      transform translate3d(344px, 0, 0)
    &--folded-double
      transform translate3d(688px, 0, 0)
  &__search
    top 52px
  &__zoom
    top 130px
    z-index 10000

.loading
  width calc(95vw - 768px)
  min-height calc(95vh - 103px - 100px)
  display flex
  justify-content center
  align-items center
  transition transform .25s
  &--folded-single
    transform translate3d(172px, 0, 0)
  &--folded-double
    transform translate3d(344px, 0, 0)

.hidden
  opacity 0
  pointer-events none
</style>

