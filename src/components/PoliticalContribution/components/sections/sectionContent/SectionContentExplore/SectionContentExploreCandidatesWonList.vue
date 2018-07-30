<template>
  <section class="section-content-explore-candidates">
    <!-- <transition name="fade" mode="out-in"> -->
    <template v-if="isGroupByParty">
      <div v-for="party in rawDataBasicCurrentOrdinalWonGrouped" :key="`${ordinalRadioPicked}-${getPartyName(party)}`" class="section-content-explore-candidates__list">
        <SectionContentExplorePartyHeader class="section-content-explore-candidates__party-header" :headerParty="getPartyName(party)" :headerCount="party.length"/>
        <ol class="candidates-list">
          <li v-for="candidate in party" :key="`${ordinalRadioPicked}-${getPartyName(party)}-${candidate['候選人']}`" class="candidates-list__list-item">
            <SectionContentExploreCandidatePortrait
              :candidateName="candidate['候選人']"
              :candidateParty="candidate['推薦政黨']"
              :electionOrdinal="ordinalRadioPicked"
              @mouseover.native="handleTooltip(candidate['候選人'], $event)"
              @mousemove.native="handleTooltip(candidate['候選人'], $event)"
              @mouseout.native="handleTooltip(candidate['候選人'], $event)"
            />
          </li>
        </ol>
      </div>
    </template>
    <template v-else>
      <div class="section-content-explore-candidates__list">
        <ol class="candidates-list">
          <li v-for="candidate in rawDataBasicCurrentOrdinalWonGrouped" :key="`${ordinalRadioPicked}-${candidate['候選人']}`" class="candidates-list__list-item">
            <SectionContentExploreCandidatePortrait
              :candidateName="candidate['候選人']"
              :candidateParty="candidate['推薦政黨']"
              :electionOrdinal="ordinalRadioPicked"
              @mouseover.native="handleTooltip(candidate['候選人'], $event)"
              @mousemove.native="handleTooltip(candidate['候選人'], $event)"
              @mouseout.native="handleTooltip(candidate['候選人'], $event)"
            />
          </li>
        </ol>
      </div>
    </template>
    <!-- </transition> -->
    <SectionContentExploreCandidatesWonListTooltip
      class="section-content-explore-candidates__tooltip"
      :tooltipCandidateName="tooltipCandidateName"
    />
  </section>
</template>

<script>
import { get, groupBy, } from 'lodash'
import * as d3 from 'd3'

import SectionContentExplorePartyHeader from './SectionContentExplorePartyHeader.vue'
import SectionContentExploreCandidatePortrait from './SectionContentExploreCandidatePortrait.vue'
import SectionContentExploreCandidatesWonListTooltip from './SectionContentExploreCandidatesWonListTooltip.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExplorePartyHeader,
    SectionContentExploreCandidatePortrait,
    SectionContentExploreCandidatesWonListTooltip,
  },
  data () {
    return {
      tooltipCandidateName: ''
    }
  },
  computed: {
    ...mapGetters([
      'ordinalRadioPicked'
    ]),
    sortedBy () {
      return this.$store.state.PoliticalContribution.section.explore.navs.sortedBy
    },
    isGroupByParty () {
      return this.sortedBy === 'GroupByParty'
    },
    rawDataBasicCurrentOrdinalWonGrouped () {
      return this.$store.getters[`PoliticalContribution/rawDataBasicCurrentOrdinalWon${this.sortedBy}`]
    },
  },
  methods: {
    getPartyName (partyArray) {
      return get(partyArray, [ 0, '推薦政黨' ], '')
    },
    handleTooltip (candidate, event) {
      if (event.type === 'mouseover') {
        this.tooltipCandidateName = candidate
        d3.select('.section-content-explore-candidates__tooltip')
          .style('display', 'initial')
          .style('opacity', 1)
          .style('top', handleTooltipPosition('top'))
          .style('left', handleTooltipPosition('left'))
      } else if (event.type === 'mousemove') {
        d3.select('.section-content-explore-candidates__tooltip')
          .style('top', handleTooltipPosition('top'))
          .style('left', handleTooltipPosition('left'))
      } else if (event.type === 'mouseout') {
        d3.select('.section-content-explore-candidates__tooltip')
          .style('display', 'none')
          .style('opacity', 0)
      }

      function handleTooltipPosition (type) {
        if (type === 'top') {
          return function (d) {
            let tooltipHeight = parseInt(d3.select('.section-content-explore-candidates__tooltip').style('height'), 10)
            if (!isCollide('bottom')) {
              return (event.clientY + 20) + 'px'
            } else {
              return (event.clientY - 10 - tooltipHeight) + 'px'
            }
          }
        } else if (type === 'left') {
          return function (d) {
            let tooltipWidth = parseInt(d3.select('.section-content-explore-candidates__tooltip').style('width'), 10)
            if (!isCollide('right')) {
              return (event.clientX) + 'px'
            } else {
              return (event.clientX - tooltipWidth) + 'px'
            }
          }
        }
      }

      function isCollide (tooltipBorder) {
        let tooltipWidth = parseInt(d3.select('.section-content-explore-candidates__tooltip').style('width'), 10)
        let tooltipHeight = parseInt(d3.select('.section-content-explore-candidates__tooltip').style('height'), 10)
        let w = window
        let d = document
        let e = d.documentElement
        let g = d.getElementsByTagName('body')[0]
        let windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
        let windowHeight = w.innerHeight || e.clientHeight || g.clientHeight

        if (tooltipBorder === 'right') {
          if (event.clientX + tooltipWidth >= windowWidth) {
            return true
          } else {
            return false
          }
        } else if (tooltipBorder === 'bottom') {
          if (event.clientY + 20 + tooltipHeight >= windowHeight) {
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-candidates
  &__list
    & + &
      margin 40px 0 0 0
  &__party-header
    margin 0 0 5px 5px
  &__tooltip
    display none
    position fixed
    background white
    box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
    z-index 10000

.candidates-list
  list-style none
  margin 0
  padding 0
  display flex
  flex-wrap wrap
  &__list-item
    width 90px
    height 90px
    margin 5px
</style>

