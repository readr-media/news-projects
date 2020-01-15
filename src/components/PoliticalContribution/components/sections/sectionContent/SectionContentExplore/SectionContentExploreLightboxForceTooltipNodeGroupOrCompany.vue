<template>
  <SectionContentExploreLightboxInfoProfileCorp
    :corpType="dataForceTooltipCurrentIdentityType"
    :groupNameOrCompanyTaxId="dataForceTooltipCurrentIdentityId"
  />
</template>

<script>
import SectionContentExploreLightboxInfoProfileCorp from './SectionContentExploreLightboxInfoProfileCorp.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreLightboxInfoProfileCorp,
  },
  computed: {
    ...mapGetters([
      'dataForceTooltipCurrentIdentityType',
      'dataForceTooltipCurrentIdentityId',
    ]),
  },
}
</script>
