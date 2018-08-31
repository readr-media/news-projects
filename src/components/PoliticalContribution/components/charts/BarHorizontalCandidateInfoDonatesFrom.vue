<template>
  <div class="bar-horizontal-donates-from"></div>
</template>

<script>
import * as d3 from 'd3'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    donates: {
      type: Array,
      required: true,
    },
    isDataPercentage: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    // nameUrlQuery () {
    //   if (this.isQueryValidCandidateName) {
    //     this.updateScales()
    //     this.visualize()
    //   }
    // },
    // ordinalRadioPicked () {
    //   if (this.isQueryValidCandidateName) {
    //     this.updateScales()
    //     this.visualize()
    //   }
    // },
    donates () {
      if (this.isQueryValidCandidateName || this.isQueryValidGroupOrCompanyName) {
        this.updateScales()
        this.updateHeight()
        this.visualize()
      }
    }
  },
  data () {
    return {
      // // donates example
      // donates: [
      //   {
      //     from: '營利事業捐贈',
      //     money: 1675
      //   },
      //   {
      //     from: '政黨捐贈',
      //     money: 1223
      //   },
      //   {
      //     from: '人民團體',
      //     money: 1112
      //   },
      //   {
      //     from: '其他',
      //     money: 567
      //   },
      // ],
      barBandwidthDefault: 30,
      outerWidth: undefined,
      outerHeight: undefined,
      margin: undefined,
      innerWidth: undefined,
      innerHeight: undefined,
      svg: undefined,
      xScale: undefined,
      yScale: undefined,
      yAxis: undefined,
    }
  },
  computed: {
    ...mapGetters([
      // 'nameUrlQuery',
      // 'ordinalRadioPicked',
      'isQueryValidCandidateName',
      'isQueryValidGroupOrCompanyName',
    ]),
    donateSum () {
      return d3.sum(this.donates, d => d.money)
    },
    donateProportion () {
      return this.donates.map(donate => ({ from: donate.from, proportion: (donate.money / this.donateSum * 100).toFixed(0) }))
    }
  },
  methods: {
    init () {
      this.outerWidth = d3.select(`#${this.$el.id}.bar-horizontal-donates-from`).node().getBoundingClientRect().width
      this.outerHeight = this.barBandwidthDefault * 4

      this.margin = { top: 0, right: 0, bottom: 0, left: 150, }
      this.innerWidth = this.outerWidth - this.margin.right - this.margin.left
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom

      this.svg =
        d3.select(`#${this.$el.id}.bar-horizontal-donates-from`)
          .append('svg')
            .attr('width', this.outerWidth)
            .attr('height', this.outerHeight)
          .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      this.xScale =
        d3.scaleLinear()
          .domain([ 0, d3.max(this.donates, d => +d.money) ])
          .range([ 0,  this.innerWidth ])
      this.yScale =
        d3.scaleBand()
          .domain(this.donates.map(donate => donate.from))
          .range([ 0, this.innerHeight ])
          .padding(0.3)

      this.yAxis =
        d3.axisLeft(this.yScale)
          .tickFormat(d => d.length > 7 ? `${d.substring(0, 8)}...` : d)
      this.svg
        .append('g')
          .attr('class', 'bar-horizontal-donates-from__y-axis')
          .call(this.yAxis)
    },
    updateHeight () {
      const barCount = this.donates.length
      this.outerHeight = this.barBandwidthDefault * barCount
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom

      d3.select(`#${this.$el.id}.bar-horizontal-donates-from svg`)
        .attr('height', this.outerHeight)
      this.yScale
        .domain(this.donates.map(donate => donate.from))
        .range([ 0, this.innerHeight ])
      this.yAxis.scale(this.yScale)
    },
    updateScales () {
      this.xScale
        .domain([ 0, d3.max(this.donates, d => +d.money) ])
        .range([ 0,  this.innerWidth ])
      // this.yScale
      //   .domain(this.donates.map(donate => donate.from))
      //   .range([ 0, this.innerHeight ])
      // this.yAxis.scale(this.yScale)
    },
    visualize () {
      // Data joins
      const bars =
        this.svg
          .selectAll(`#${this.$el.id} .bar-horizontal-donates-from__bar`)
          .data(this.donates)
      const hints =
        this.svg
          .selectAll(`#${this.$el.id} .bar-horizontal-donates-from__hint`)
          .data(this.donates)

      // Update + Enter
      bars
        .enter()
        .append('rect')
          .attr('class', 'bar-horizontal-donates-from__bar')
        .merge(bars)
          .attr('width', d => this.xScale(d.money))
          .attr('height', this.yScale.bandwidth())
          .attr('y', d => this.yScale(d.from))
          .attr('fill', '#9e005d')
      hints
        .enter()
        .append('text')
          .attr('class', 'bar-horizontal-donates-from__hint')
        .merge(hints)
          .attr('x', d => this.xScale(d.money) - (this.isDataPercentage ? 55 : 42))
          .attr('y', d => this.yScale(d.from) + this.yScale.bandwidth() / 2 + 6)
          .text((d, i) => this.xScale(d.money) - (this.isDataPercentage ? 55 : 42) >= 0 ? `${this.isDataPercentage ? d.money : this.donateProportion[i].proportion}%` : '')
      // Exit
      bars.exit().remove()
      hints.exit().remove()

      this.svg
        .select(`#${this.$el.id} .bar-horizontal-donates-from__y-axis`)
        .call(this.yAxis)
    },
  },
  mounted () {
    this.init()
    this.updateHeight()
    this.visualize()
  }
}
</script>

<style lang="stylus">
.bar-horizontal-donates-from
  width 100%
  height auto
  &__hint
    fill white
  &__y-axis
    .domain
      opacity 0
    .tick
      line
        opacity 0
      text
        font-size 16px
</style>


