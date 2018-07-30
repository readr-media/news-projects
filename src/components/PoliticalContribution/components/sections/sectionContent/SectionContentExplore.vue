<template>
  <main class="section-content-explore">
    <AppLightbox v-show="showLightbox" @closeLightbox="closeLightbox">
      <SectionContentExploreLightbox/>
    </AppLightbox>
    <SectionContentExploreArticle/>
    <SectionContentExploreAsideHint/>
    <SectionContentExploreCandidatesWon/>
    <SectionContentExploreDuel/>
  </main>
</template>

<script>
import { disableBodyScroll, enableBodyScroll, } from 'body-scroll-lock'
import { get, isEmpty, find, } from 'lodash'
import { DATA, } from 'src/components/PoliticalContribution/constants'

import AppLightbox from '../../AppLightbox.vue' // TODO: mobile version
import SectionContentExploreLightbox from './SectionContentExplore/SectionContentExploreLightbox.vue'
import SectionContentExploreArticle from './SectionContentExplore/SectionContentExploreArticle.vue'
import SectionContentExploreAsideHint from './SectionContentExplore/SectionContentExploreAsideHint.vue'
import SectionContentExploreCandidatesWon from './SectionContentExplore/SectionContentExploreCandidatesWon.vue'
import SectionContentExploreDuel from './SectionContentExplore/SectionContentExploreDuel.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    AppLightbox,
    SectionContentExploreLightbox,
    SectionContentExploreArticle,
    SectionContentExploreAsideHint,
    SectionContentExploreCandidatesWon,
    SectionContentExploreDuel,
  },
  watch: {
    showLightbox () {
      this.showLightbox ? disableBodyScroll(this.rootContainer) : enableBodyScroll(this.rootContainer)
    },
  },
  data () {
    return {
      rootContainer: undefined
    }
  },
  computed: {
    ...mapGetters([
      'isQueryValidOrdinal',
      'ordinalUrlQuery',
      'ordinalUrlQueryString',
    ]),
    showLightbox () {
      return ('name' in this.$route.query) && ('ordinal' in this.$route.query)
    },
  },
  methods: {
    closeLightbox () {
      this.$router.push('explore')
    }
  },
  // For usage of auto picking radio by valid ordinal query
  created () {
    if (this.isQueryValidOrdinal) {
      this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_RADIO_PICKED', this.ordinalUrlQueryString)
    }
  },
  // When user visit a candidate directly, we should disable root container's scroll immediately
  mounted () {
    this.rootContainer = document.querySelector('#political-contribution')
    if (this.showLightbox) {
      disableBodyScroll(this.rootContainer)
    }
  }
}
</script>