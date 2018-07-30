<template>
  <div :style="{ height: `${currentHeight}px` }">
    <div
      class="chart bar-horizontal-ordinal-industry-participate-chart"
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
        <BarHorizontalOrdinalIndustryParticipateYTick
          v-for="industry in dataCurrentOrdinal"
          :key="`industry-y-tick-${industry.name}`"
          class="bar-horizontal-ordinal-industry-participate-chart__industry-y-tick"
          :industryName="industry.name"
          :isCrony="industry.isCrony"
          :style="{ transform: `translate3d(10px, ${yScale(industry.name) + yScale.bandwidth() / 2 - 10}px, 0)`}"
        />
      </template>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

import AppChartLegends from './AppChartLegends.vue'
import BarHorizontalOrdinalIndustryParticipateYTick from './BarHorizontalOrdinalIndustryParticipateYTick.vue'

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
  },
  components: {
    AppChartLegends,
    BarHorizontalOrdinalIndustryParticipateYTick
  },
  watch: {
    shouldVisualizeOrdinal () {
      if (this.isChartReady) {
        this.updateScales()
        this.visualize()
      }
    }
  },
  data () {
    const defaultWidth = 568
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

      this.margin = { top: 0, right: 0, bottom: 0, left: 160, }
      this.innerWidth = this.outerWidth - this.margin.right - this.margin.left
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom

      this.svg = 
        d3.select(this.chartSelector)
          .append('svg')
            .attr('width', this.outerWidth)
            .attr('height', this.outerHeight)
          .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      this.xScale =
        d3.scaleLinear()
          .domain([ 0, d3.max(this.dataCurrentOrdinal, d => d.percentage) ])
          .range([ 0,  this.innerWidth ])
      this.yScale =
        d3.scaleBand()
          .domain(this.dataCurrentOrdinal.map(industry => industry.name))
          .range([ 0, this.innerHeight ])
          .padding(0.5)
    },
    updateScales () {
      this.xScale
        .domain([ 0, d3.max(this.dataCurrentOrdinal, d => d.percentage) ])
        .range([ 0,  this.innerWidth ])
      this.yScale
        .domain(this.dataCurrentOrdinal.map(industry => industry.name))
        .range([ 0, this.innerHeight ])
    },
    visualize () {
      // Data joins
      const bars =
        this.svg
          .selectAll('.bar-horizontal-ordinal-industry-participate-chart__bar')
          .data(this.dataCurrentOrdinal)
      const hints =
        this.svg
          .selectAll('.bar-horizontal-ordinal-industry-participate-chart__hint')
          .data(this.dataCurrentOrdinal)
      const hintsDonatesMoney =
        this.svg
          .selectAll('.bar-horizontal-ordinal-industry-participate-chart__hint-donates-money')
          .data(this.dataCurrentOrdinal)

      // Update + Enter
      bars
        .enter()
        .append('rect')
          .attr('class', 'bar-horizontal-ordinal-industry-participate-chart__bar')
        .merge(bars)
          .attr('width', d => this.xScale(d.percentage))
          .attr('height', this.yScale.bandwidth())
          .attr('y', d => this.yScale(d.name))
          .attr('fill', '#9e005d')
      hints
        .enter()
        .append('text')
           .attr('class', 'bar-horizontal-ordinal-industry-participate-chart__hint')
        .merge(hints)
           .attr('x', 10)
           .attr('y', d => this.yScale(d.name) + this.yScale.bandwidth() / 2 + 10)
           .text(d => `${d.percentage}%`)
      /*
      ** NOTE: Might have a better pattern to deal with the case below
      */
      // Enter of hintsDonatesMoney
      const hintsDonatesMoneyText =
        hintsDonatesMoney
          .enter()
          .append('text')
            .attr('class', 'bar-horizontal-ordinal-industry-participate-chart__hint-donates-money')
            .attr('x', 0)
            .attr('y', d => this.yScale(d.name) + this.yScale.bandwidth() / 2 + 32)
      hintsDonatesMoneyText
        .append('tspan')
          .text(d => '捐贈金額：')
      hintsDonatesMoneyText
        .append('tspan')
          .attr('class', 'bar-horizontal-ordinal-industry-participate-chart__hint-donates-money--highlight')
          .text(d => `${((d.donatesMoney / 10000).toFixed(0)).toLocaleString()}`)
      hintsDonatesMoneyText
        .append('tspan')
          .text(' 萬元')
      // Update of hintsDonatesMoney
      hintsDonatesMoney
        .attr('x', 0)
        .attr('y', d => this.yScale(d.name) + this.yScale.bandwidth() / 2 + 32)
        .select('.bar-horizontal-ordinal-industry-participate-chart__hint-donates-money--highlight')
          .text(d => `${((d.donatesMoney / 10000).toFixed(0)).toLocaleString()}`)

      // Exit
      bars.exit().remove()
      hints.exit().remove()
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

<style lang="stylus">
.chart
  transform-origin 0% 0%
  position relative
  &__components
    position absolute

.bar-horizontal-ordinal-industry-participate-chart
  position relative
  transform-origin 0% 0%
  &__hint
    font-size 26px
    fill white
  &__hint-donates-money
    font-size 13px
    font-weight 400
    fill #808080
    &--highlight
      fill #9e005d
      font-weight 500
  &__industry-y-tick
    position absolute
</style>

