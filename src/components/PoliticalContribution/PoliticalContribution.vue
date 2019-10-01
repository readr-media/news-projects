<template>
  <div id="political-contribution">
    <SectionLanding/>
    <SectionContent v-if="showSectionContent"/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo, { duration: 0 })

// Mixins
import AppRegsiterStore from './mixins/AppRegsiterStore.js'
import AppMetaInfo from './mixins/AppMetaInfo.js'
import AppRequireClientSideModule from './mixins/AppRequireClientSideModule.js'

// Components
import SectionLanding from './components/sections/SectionLanding.vue'
import SectionContent from './components/sections/SectionContent.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  mixins: [
    AppMetaInfo,
    AppRegsiterStore,
    AppRequireClientSideModule,
  ],
  components: {
    SectionLanding,
    SectionContent,
  },
  computed: {
    ...mapGetters([
      'showSectionContent'
    ])
  },
  created () {
    if (this.$route.query && this.$route.query.locale === 'en') {
      this.$i18n.locale = 'en'
    }
  }
}
</script>

<style lang="stylus">
#political-contribution
  // font-family Avenir, source-han-sans-traditional, Helvetica, Arial, sans-serif
  font-family Avenir, Microsoft JhengHei, Helvetica, Arial, sans-serif
  overflow-x hidden // For hiding horizontal scrollbar on older versions of chrome, and chrome in windows, this will causing position: sticky fail

.fade-enter-active, .fade-leave-active
  transition opacity .25s
.fade-enter, .fade-leave-to
  opacity 0
</style>