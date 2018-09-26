<template>
  <div :style="{ height: `${currentHeight}px` }">
    <div
      class="chart"
      :style="{
        width: `${defaultWidth}px`,
        height: `${defaultHeight}px`,
        transform: `scale(${currentWidth / defaultWidth})`
      }"
    >
      <template v-if="isChartReady">
        <AppChartLegends
          class="chart__components"
          :legends="legends"
        />
        <BarHorizontalOrdinalCandidateYTick
          class="chart__components"
          v-for="(candidate, i) in dataCurrentOrdinal"
          :key="`candidate-y-tick-${candidate.candidate}`"
          :order="i + 1"
          :candidateName="candidate.candidate"
          :candidateDivision="candidate.division"
          :style="{ transform: `translate3d(0, ${Math.round(yScale(candidate.candidate) + ((yScale.bandwidth() - 96) / 2) + 10)}px, 0)` }"
        />
        <SectionContentExploreCandidatePortraitRound
          class="chart__components"
          v-for="candidate in dataCurrentOrdinal"
          :key="`candidate-portrait-${candidate.candidate}`"
          :candidateName="candidate.candidate"
          :candidateParty="candidate.party"
          :isWon="candidate.isWon"
          :style="{ transform: `translate3d(${310 - 45}px, ${Math.round(yScale(candidate.candidate) + ((yScale.bandwidth() - 90) / 2))}px, 0)` }"
        />
      </template>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

import AppChartLegends from './AppChartLegends.vue'
import SectionContentExploreCandidatePortraitRound from '../sections/sectionContent/SectionContentExplore/SectionContentExploreCandidatePortraitRound.vue'
import BarHorizontalOrdinalCandidateYTick from './BarHorizontalOrdinalCandidateYTick.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    ordinal: {
      type: String,
      default: '',
    },
    legends: {
      type: Array,
      default () {
        return []
      },
    },
    data: {
      type: Object,
      required: true,
    },
    dataHintUnit: {
      type: String,
      default: '萬元',
    },
  },
  components: {
    AppChartLegends,
    SectionContentExploreCandidatePortraitRound,
    BarHorizontalOrdinalCandidateYTick,
  },
  watch: {
    shouldVisualizeOrdinal () {
      if (this.isChartReady) {
        this.updateScales()
        this.visualize()
      }
    },
    data () {
      if (this.isChartReady) {
        this.updateScales()
        this.visualize()
      }
    }
  },
  data () {
    const defaultWidth = 900
    const defaultHeight = 675
    const defaultAspect = defaultWidth / defaultHeight

    return {
      defaultWidth,
      defaultHeight,
      defaultAspect,
      currentWidth: defaultWidth,
      currentHeight: defaultHeight,

      //
      outerWidth: undefined,
      outerHeight: undefined,
      margin: undefined,
      innerWidth: undefined,
      innerHeight: undefined,
      svg: undefined,
      xScale: undefined,
      yScale: undefined,
    }
  },
  computed: {
    containerSelector () {
      return `#${this.$el.id}`
    },
    chartSelector () {
      return `${this.containerSelector} .chart`
    },
    ...mapGetters([
      'ordinalRadioPicked',
    ]),
    shouldVisualizeOrdinal () {
      return this.ordinal === '' ? this.ordinalRadioPicked : this.ordinal
    },
    dataCurrentOrdinal () {
      return this.data[this.shouldVisualizeOrdinal]
    },
    isChartReady () {
      return this.svg !== undefined
    },
  },
  methods: {
    init () {
      this.outerWidth = this.defaultWidth
      this.outerHeight = this.defaultHeight

      this.margin = { top: 0, right: 0, bottom: 0, left: 310, }
      this.innerWidth = this.outerWidth - this.margin.right - this.margin.left
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom

      this.svg =
        d3.select(this.chartSelector)
          .append('svg')
            .attr('width', this.outerWidth)
            .attr('height', this.outerHeight)
          .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            // .lower()

      this.xScale =
        d3.scaleLinear()
          .domain([ 0, d3.max(this.dataCurrentOrdinal, d => d.amount) ])
          .range([ 0,  this.innerWidth ])
      this.yScale = 
        d3.scaleBand()
          .domain(this.dataCurrentOrdinal.map(donate => donate.candidate))
          .range([ 0, this.innerHeight ])
          .padding(0.5)
    },
    updateScales () {
      this.xScale
        .domain([ 0, d3.max(this.dataCurrentOrdinal, d => d.amount) ])
        .range([ 0,  this.innerWidth ])
      this.yScale
        .domain(this.dataCurrentOrdinal.map(donate => donate.candidate))
        .range([ 0, this.innerHeight ])
    },
    visualize () {
      // Data joins
      const bars =
        this.svg
          .selectAll('rect')
          .data(this.dataCurrentOrdinal)
      const hints =
        this.svg
          .selectAll('text.hint-on-bar')
          .data(this.dataCurrentOrdinal)

      // Update + Enter
      bars
        .enter()
        .append('rect')
        .merge(bars)
          .attr('width', d => this.xScale(d.amount))
          .attr('height', this.yScale.bandwidth())
          .attr('y', d => this.yScale(d.candidate))
          .attr('fill', '#9e005d')
      hints
        .enter()
        .append('text')
          .attr('class', 'hint-on-bar')
        .merge(hints)
           .attr('x', 80)
           .attr('y', d => this.yScale(d.candidate) + this.yScale.bandwidth() / 2 + 20)
           .text(d => this.dataHintUnit === '家' ? d.amount : Number((d.amount / 10000).toFixed(0)).toLocaleString())
           .style('font-size', '54px')
           .style('fill', 'white')
        .append('tspan')
          .attr('dx', 5)
          .text(d => this.dataHintUnit)
          .style('font-size', '27px')

      // Exit
      bars.exit().remove()
      hints.exit().remove()

      // Data joins
      const hintsDonatesMoney =
        this.svg
          .selectAll('text.hint-below-bar')
          .data(this.dataCurrentOrdinal, d => d.donatesMoney)

      if (this.dataHintUnit === '家') {
        // Update + Enter
        hintsDonatesMoney
          .enter()
          .append('text')
            .attr('class', 'hint-below-bar')
          .merge(hintsDonatesMoney)
            .attr('x', 80)
            .attr('y', d => this.yScale(d.candidate) + this.yScale.bandwidth() / 2 + 60)
            .text(d => `金額：${Number((d.donatesMoney / 10000).toFixed(0)).toLocaleString()} 萬元`)
            .style('font-size', '27px')
            .style('fill', '#808080')
      }

      // Exit
      hintsDonatesMoney.exit().remove()
    },
    calculateCurrentDimensions () {
      const containerWidth = this.$el.getBoundingClientRect().width
      this.currentWidth = containerWidth
      this.currentHeight = Math.round(containerWidth / this.defaultAspect)
    },
  },
  mounted () {
    this.init()
    this.visualize()
    this.calculateCurrentDimensions()
  }
}
</script>

<style lang="stylus" scoped>
.chart
  transform-origin 0% 0%
  position relative
  &__components
    position absolute !important
</style>

