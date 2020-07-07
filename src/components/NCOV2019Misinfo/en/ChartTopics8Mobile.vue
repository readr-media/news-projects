<template>
  <svg
    ref="svgElement"
    :width="width"
    :height="height"
  />
</template>

<script>
  import * as d3 from 'd3'
  import _ from 'lodash'

  export default {
    props: {
      // currentIndex: {
      //   type: Number,
      //   default: 1
      // },
      showKeywords: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        width: 414,
        height: 850,
        margin: { top: 50, right: 30, left: 30, bottom: 30 },
        // colors: [
        //   '#f5867a',
        //   '#ffad61',
        //   '#ffd663',
        //   '#b2d199',
        //   '#78b8cc'
        // ],
        // collections: [
        //   {
        //     topic: ['病毒在社區中的傳播'],
        //     keywords: ['棺材', '病例', '圖片', '委內瑞拉', '暴動']
        //   },
        //   {
        //     topic: ['官方機構的作為'],
        //     keywords: ['聯合國兒童基金會', '軍方', '世界衛生組織']
        //   },
        //   {
        //     topic: ['醫學相關、疾病的影響'],
        //     keywords: ['治癒', '維他命', '咖啡', '茶', '大蒜']
        //   },
        //   {
        //     topic: ['名人宣稱或相關活動'],
        //     keywords: ['否認', '教宗', '羅納度']
        //   },
        //   {
        //     topic: ['因為疫情衍生出的行為'],
        //     keywords: ['漢他病毒', '清真寺', '搶劫']
        //   },
        //   {
        //     topic: ['病毒是如何傳播'],
        //     keywords: ['動物', '寵物', '雞']
        //   },
        //   {
        //     topic: ['陰謀論', '病毒的起源', '疫情其實不嚴重'],
        //     keywords: ['諾斯特拉達穆斯', '被預言', '5G', '比爾蓋茲', '實驗室']
        //   },
        //   {
        //     topic: ['Vaccine development and availability', 'Public preparedness'],
        //     keywords: ['研發', '塞內加爾']
        //   },
        // ]
      }
    },
    computed: {
      innerWidth() {
        return this.width - this.margin.left - this.margin.right
      }
    },
    watch: {
      // currentIndex() {
      //   if (this.currentIndex % 2 === 0) {
      //     const keywordWeFocused = this.collections[this.currentIndex / 2 - 1].keywords
      //     this._circles
      //       .attr('fill', d => {
      //         // const keywords = d.keywords
      //         // if (keywords.includes('棺材')) {
      //         //   return '#f5867a'
      //         // } else if (keywords.includes('病例')) {
      //         //   return '#ffad61'
      //         // } else if (keywords.includes('圖片')) {
      //         //   return '#ffd663'
      //         // } else if (keywords.includes('委內瑞拉')) {
      //         //   return '#b2d199'
      //         // } else if (keywords.includes('暴動')) {
      //         //   return '#78b8cc'
      //         // }
      //
      //         // return '#f2f2f2'
      //
      //         let color = '#f2f2f2'
      //         keywordWeFocused.forEach((v, i) => {
      //           if (d.keywords.includes(v)) {
      //             color = this.colors[i]
      //           }
      //         })
      //         return color
      //       })
      //   } else {
      //     const data = this._dataCSV.filter(d => this.collections[0].topic.includes(d.topics))
      //     // this._circles.remove()
      //     this._x.domain(this.collections[0].topic)
      //     this._circles.selectAll('circle').data(data).exit().remove()
      //     this._circles = this._circles
      //       .selectAll('circle')
      //       .data(data)
      //       .enter()
      //       .append('circle')
      //       .attr('r', 2.5)
      //       .attr('fill', '#ec894c')
      //       .attr('y', (d) => this._y(d3.timeParse('%Y-%m-%d')(d.date)))
      //       .attr('x', (d) => {
      //         return this._x(d.topics) + this._x.bandwidth() / 2;
      //       })
      //       .style('transition', 'fill .5s ease-out')
      //     this._force
      //       // .forceSimulation(data)
      //       .force(
      //         'x',
      //         d3.forceX((d) => this._x(d.topics) + this._x.bandwidth() / 2)
      //       )
      //     this._force.restart()
      //   }
      // },
      showKeywords: {
        handler() {
          if (this.showKeywords) {
            this._circles
              .attr('fill', this.colorHandler)
          } else {
            this._circles
              .attr('fill', '#ec894c')
          }
        },
      }
    },
    methods: {
      resizeHandler() {
        const rect = this.$refs.svgElement.getBoundingClientRect()
        this.width = rect.width
        this.height = rect.height
      },
      colorHandler(d) {
        const keywords = d.keywords
        if (keywords.includes('developed')) {
          return '#f5867a'
        } else if (keywords.includes('senegal')) {
          return '#ffad61'
        } else if (keywords.includes('supermarket')) {
          return '#ffd663'
        }

        return '#f2f2f2'
      }
    },
    async mounted() {
      const width = this.width
      const height = this.height
      const margin = this.margin
      const innerWidth = this.innerWidth
      const noSplitHeight = 550

      const svgElement = this.$refs.svgElement
      const svg = d3
        .select(svgElement)
        .attr('viewBox', [0, 0, width, noSplitHeight + margin.top + margin.bottom])
      const wrapper = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      this._dataCSV = await d3.csv('/proj-assets/ncov2019misinfo/data/en/factcheck_report_split_topic.csv', (d) => {
        // if (d.topics === '病毒在社區中的傳播') {
          return {
            // date: d3.timeParse('%Y-%m-%d')(d.date),
            date: d.date,
            country: d.country,
            title: d.title,
            platform: d.platform,
            topics: d.topics,
            keywords: d.keywords.split(','),
          }
        // }
      })
      const data = this._dataCSV.filter(d => ['Vaccine development and availability', 'Public preparedness'].includes(d.topics))

      // const xDomainData = _.flatten(dataGroupByCountryTopTen.map(values => values[1].map(values => values[0])))
      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d3.timeParse('%Y-%m-%d')(d.date)))
        .range([0, innerWidth])
      this._x = x
      // const yAxis = g => g
      //   .call(
      //     d3.axisLeft(y)
      //       .tickFormat(d => d3.timeFormat('%m/%d')(d))
      //       // .ticks(3)
      //       .tickValues([
      //         d3.timeParse('%Y-%m-%d')('2020-01-30'),
      //         d3.timeParse('%Y-%m-%d')('2020-03-20'),
      //         d3.timeParse('%Y-%m-%d')('2020-05-12')
      //       ])
      //   )
      //   .call(g => g.select('.domain').remove())
      //   .call(g => g.selectAll('line').remove())
      //   .call(g => g.selectAll('text').style('font-size', '16px'))
      //   .attr('transform', 'translate(40, 0)')
      // wrapper.append('g').call(yAxis)


       this._y = d3.scaleBand().domain(['Vaccine development and availability', 'Public preparedness']).range([0, noSplitHeight])
       const y = this._y

      // const rDomainData = _.flatten(dataGroupByCountryTopTen.map(values => values[1].map(values => values[1].length)))
      // const r = d3
      //   .scaleSqrt()
      //   .domain(d3.extent(rDomainData))
      //   .range([5, 30])

      // const bubbleData = _.flatten(dataGroupByCountryTopTen.map(d => d[1].map(dd => ({
      //   date: dd[0],
      //   country: d[0],
      //   reportCount: dd[1].length
      // }))))
      this._circles = wrapper
        .append('g')
        .attr('className', 'circles')
        .selectAll('circle')
        .data(data)
        // .join('circle')
        .enter()
        .append('circle')
        .attr('r', 2.5)
        .attr('fill', this.showKeywords ? this.colorHandler : '#ec894c')
        // .style('transition', 'fill 1s ease')
        .attr('x', (d) => x(d3.timeParse('%Y-%m-%d')(d.date)))
        .attr('y', (d) => {
          return y(d.topics) + y.bandwidth() / 2;
        })
        .style('transition', 'fill .5s ease-out')

      wrapper
        .selectAll('text')
        .data(['Vaccine development and availability', 'Public preparedness'])
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'ideographic')
        .attr('x', innerWidth / 2)
        .attr('y', d => y(d) + y.bandwidth() / 2 - 70)
        .style('font-size', '16px')
        .text(d => d)

      this._force = d3
        .forceSimulation(data)
        .force('charge', d3.forceManyBody().strength(0))
        .force(
          'x',
          d3.forceX().x((d) => x(d3.timeParse('%Y-%m-%d')(d.date)))
        )
        .force(
          'y',
          d3.forceY((d) => y(d.topics) + y.bandwidth() / 2)
        )
        .force(
          'collision',
          d3.forceCollide().radius((d) => 2.5 + 1)
        )
      this._force.on('tick', () => {
        for (let i = 0; i < 10; i++) {
          this._force.tick();
        }
        this._circles
          .transition()
          .ease(d3.easeLinear)
          .delay(function(d,i) {return d.x})
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
      })

//       var ticksPerRender = 30;
//
// requestAnimationFrame(function render() {
//
//   for (var i = 0; i < ticksPerRender; i++) {
//     force.tick();
//   }
//
//   // UPDATE NODE AND LINK POSITIONS HERE
//
//   if (force.alpha() > 0) {
//     requestAnimationFrame(render);
//   }
// });
// force.stop()
      // Update simulation
      // force.force('y', d3.forceY((noSplitHeight - margin.top - margin.bottom) / 2))
      // force.alpha(1).restart()

      window.addEventListener('resize', this.resizeHandler)
    },
    destroyed() {
      window.removeEventListener('resize', this.resizeHandler)
    }
  }
</script>

<style scoped>
  svg {
    width: 100%;
    height: 100%;
  }
</style>
