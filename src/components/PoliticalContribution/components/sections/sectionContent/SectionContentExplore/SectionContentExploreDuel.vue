<template>
  <section v-show="showDuel" class="section-content-explore-duel">
    <SectionContentExploreDuelStage :class="[ 'section-content-explore-duel__stage', { 'section-content-explore-duel__stage--sticky': isDuelVisible } ]"/>
    <SectionContentExploreDuelCounty class="section-content-explore-duel__county"/>
  </section>
</template>

<script>
import { isEmpty, } from 'lodash'

import SectionContentExploreDuelStage from './SectionContentExploreDuelStage.vue'
import SectionContentExploreDuelCounty from './SectionContentExploreDuelCounty.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreDuelStage,
    SectionContentExploreDuelCounty,
  },
  data () {
    return {
      isDuelVisible: false,
      scroller: undefined,
    }
  },
  computed: {
    ...mapGetters([
      'rawDataBasicCurrentOrdinal',
    ]),
    showDuel () {
      return !isEmpty(this.rawDataBasicCurrentOrdinal)
    }
  },
  methods: {
    sectionContentExploreDuelHandleStepEnter () {
      this.isDuelVisible = true
    },
    sectionContentExploreDuelHandleStepExit () {
      this.isDuelVisible = false
    },
    scrollerResizeHandler () {
      this.scroller.resize()
    }
  },
  mounted () {
    this.scroller = window.scrollama()
    this.scroller
      .setup({
        step: '.section-content-explore-duel',
        offset: 0,
      })
      .onStepEnter(this.sectionContentExploreDuelHandleStepEnter)
      .onStepExit(this.sectionContentExploreDuelHandleStepExit)

    window.addEventListener('resize', this.scrollerResizeHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.scrollerResizeHandler)
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-duel
  &__stage
    width 450px
    // position sticky
    // top 60px
    float left
    &--sticky
      position fixed
      top 0
  &__county
    width 50%
    margin 0 0 0 50%
</style>

