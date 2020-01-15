<template>
  <div class="section-content-explore-lightbox-force-tooltip">
    <SectionContentExploreLightboxForceTooltipNodeCandidate v-show="showNodeTooltipCandidate"/>
    <SectionContentExploreLightboxForceTooltipNodeGroupOrCompany v-show="showNodeTooltipGroupOrCompany"/>
    <SectionContentExploreLightboxForceTooltipLink v-show="showLinkTooltip"/>
  </div>
</template>

<script>
import SectionContentExploreLightboxForceTooltipNodeCandidate from './SectionContentExploreLightboxForceTooltipNodeCandidate.vue'
import SectionContentExploreLightboxForceTooltipNodeGroupOrCompany from './SectionContentExploreLightboxForceTooltipNodeGroupOrCompany.vue'
import SectionContentExploreLightboxForceTooltipLink from './SectionContentExploreLightboxForceTooltipLink.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreLightboxForceTooltipNodeCandidate,
    SectionContentExploreLightboxForceTooltipNodeGroupOrCompany,
    SectionContentExploreLightboxForceTooltipLink,
  },
  computed: {
    ...mapGetters([
      'dataForceTooltipCurrentGraphType',
      'dataForceTooltipCurrentIdentityType',
    ]),
    showNodeTooltipCandidate () {
      return this.dataForceTooltipCurrentGraphType === 'node' && this.dataForceTooltipCurrentIdentityType === 'candidate'
    },
    showNodeTooltipGroupOrCompany () {
      return this.dataForceTooltipCurrentGraphType === 'node' && (this.dataForceTooltipCurrentIdentityType === 'group' || this.dataForceTooltipCurrentIdentityType === 'company')
    },
    showLinkTooltip () {
      return this.dataForceTooltipCurrentGraphType === 'link'
    },
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-force-tooltip
  background-color white
  pointer-events none
  padding 0px 10px 10px 0
</style>

