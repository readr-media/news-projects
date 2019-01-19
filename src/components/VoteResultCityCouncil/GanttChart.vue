<template>
  <div :class="[ party, 'gantt-chart' ]">
    <h3 v-text="councilor['姓名']"></h3>
    <p>在{{ councilor['地區'] }}議會{{ councilor['家族'] && councilor['家族'] !== '無' ? `屬於${councilor['家族']}家族` : `無家族成員擔任議員` }}</p>
    <p><span>至 2018 年總共當選 {{ personalCount }} 次</span><span v-if="councilor['家族'] && councilor['家族'] !== '無'">，含議員親屬當選次數 {{ familyCount }} 次</span></p>
    <div :id="`chart-${currentYear}-${index}`" :class="[ yearListFixed.length < 10 ? '' : 'expand', 'chart' ]"></div>
  </div>
</template>
<script>
import Highcharts from 'highcharts'
import Xrange from 'highcharts/modules/xrange'
import { max, union, uniq } from 'lodash'

const convertCountyNameToLatest = (countyName) => {
  if (countyName.match(/桃園/)) {
    return '桃園市'
  } else if (countyName.match(/臺中/)) {
    return '臺中市'
  } else if (countyName.match(/台南/)) {
    return '台南市'
  } else if (countyName.match(/高雄/)) {
    return '高雄市'
  } else if (countyName === '臺北縣') {
    return '新北市'
  }
  return countyName
}

const getLastYear = (countyName) => {
  if (countyName.match(/臺北縣|臺中縣|臺南縣|高雄縣/)) {
    return 2010
  } else if (countyName.match(/桃園縣/)) {
    return 2014
  }
  return 2022
}

const getYearList = (countyName, yearCsv) => {
  let data
  const county = countyName.replace('台', '臺')
  if (county.match(/桃園/)) {
    data = yearCsv.filter(data => data['地區'].match(/桃園/))
  } else if (county.match(/臺北縣|新北市/)) {
    data = yearCsv.filter(data => data['地區'].match(/臺北縣|新北市/))
  } else {
    data = yearCsv.filter(data => data['地區'] === county)
  }
  data = data.map(item => Object.entries(item).filter(year => year[1] === '1').map(year => Number(year[0])))
  data = (county.match(/桃園|臺北縣|新北市/) ? [ ...data[0], ...data[1] ] : data[0]) || []
  data = data.sort((a, b) => a - b)
  return data
}

export default {
  name: 'GanttChart',
  props: {
    councilCsv: {
      type: Array
    },
    councilor: {
      type: Object
    },
    currentYear: {
      type: Number
    },
    countyName: {
      type: String
    },
    index: {
      type: Number
    },
    yearCsv: {
      type: Array
    },
    yearList: {
      type: Array
    }
  },
  computed: {
    yearListFixed () {
      const lastYear = getLastYear(this.councilor['地區'])
      return [ ...this.yearList, lastYear ]
    },
    councilorsName () {
      return uniq(this.family.map(councilor => councilor['姓名']))
    },
    councilorsSeries () {
      const convertToSeriesFormat = []
      const familyData = this.councilorsName.map((councilor, index) => {
        const personal = this.family.filter(member => member['姓名'] === councilor)
        const data = personal.map(item => {
          const lastYear = getLastYear(item['地區'])
          const yearList = [ ...getYearList(item['地區'], this.yearCsv), lastYear ] 
          const startYearIndex = yearList.findIndex(year => year === Number(item['年份']))
          const endYear = Number(item['年份']) === 2018 ? 2022 : yearList[startYearIndex + 1]
          return { x: Number(item['年份']), x2: endYear, y: index, name: item['姓名'] }
        })
        const mergedSeries = []
        if (data.length > 1) {
          let origin = data[0]
          for (let i = 1; i < data.length; i += 1) {
            if (data[i].x === origin.x2 && i === data.length - 1) {
              origin.x2 = data[i].x2
              mergedSeries.push(origin)
            } else if (data[i].x === origin.x2) {
              origin.x2 = data[i].x2
            } else {
              mergedSeries.push(origin)
              origin = data[i]
            }
          }
        } else {
          mergedSeries.push(data[0])
        }
        return mergedSeries
      }).filter(item => item.length > 0)
      
      for (let i = 0; i < familyData.length; i += 1) {
        for (let j = 0; j < familyData[i].length; j += 1) {
          convertToSeriesFormat.push(familyData[i][j])
        }
      }
      return convertToSeriesFormat
    },
    family () {
      if (this.councilor['家族']) {
        return this.councilCsv.filter(councilor => (councilor['家族'] === this.councilor['家族']) && (convertCountyNameToLatest(councilor['地區']) === convertCountyNameToLatest(this.councilor['地區'])))
      }
      return this.councilCsv.filter(councilor => (councilor['姓名'] === this.councilor['姓名']))
    },
    familyCount () {
      return this.councilor['家族'] ? this.family.length : 0
    },
    party () {
      if (this.councilor['黨籍'] === '中國國民黨') {
        return 'kmt'
      } else if (this.councilor['黨籍'] === '民主進步黨') {
        return 'dpp'
      } else if (this.councilor['黨籍'] === '新黨') {
        return 'new'
      } else if (this.councilor['黨籍'] === '親民黨') {
        return 'pfp'
      } else if (this.councilor['黨籍'] === '無黨籍') {
        return 'none'
      }
      return 'unknow'
    },
    personalCount () {
      return this.councilCsv.filter(councilor => (councilor['姓名'] === this.councilor['姓名']) && (councilor['年份'] <= this.councilor['年份'])).length
    },
    scrollLeft () {
      const latest = max(this.councilorsSeries.map(item => item.x2))
      const percentage = (latest - this.yearListFixed[0] + 1) / (this.yearListFixed[this.yearListFixed.length - 1] - this.yearListFixed[0] + 1)
      return 1200 * percentage
    }
  },
  mounted () {
    Xrange(Highcharts)
    this.drawHighChart()
    document.querySelector(`#chart-${this.currentYear}-${this.index}`).scrollLeft = this.scrollLeft
  },
  methods: {
    drawHighChart () {
      const width = this.yearListFixed.length < 10 ? null : 1200
      Highcharts.chart(`chart-${this.currentYear}-${this.index}`, {
        chart: { type: 'xrange', backgroundColor: 'rgba(0,0,0, .1)', width: width, height: 230, marginRight: 50, spacingBottom: 10 },
        title: { text: '' },
        legend: { enabled: false },
        plotOptions: {
          series: {
            color: '#8d8d8d',
            colorByPoint: false,
            dataLabels: {
              enabled: true,
              format: "{key}",
              y: 15,
              style: {
                color: '#fff',
                fontSize: '12px',
                fontWeight: 200,
                textOutline: 0
              },
            }
          }
        },
        xAxis: {
          type: 'linear',
          labels: {
            style: {
              color: '#fff',
              fontSize: '12px'
            },
            rotation: -45,
            y: -20,
          },
          tickPositions: this.yearListFixed,
          tickLength: 0,
          tickColor: '#a9a6a3',
          gridLineColor: '#a9a6a3',
          gridLineWidth: 1,
          startOnTick: true,
          endOnTick: true,
          lineWidth: 0,
          opposite: true
        },
        yAxis: {
          title: { text: '' },
          labels: {
            enabled: false
          },
          gridLineWidth: 0,
          categories: this.councilorsName,
          reversed: true
        },
        tooltip: { enabled: false },
        series: [{
          borderColor: 'rgba(103, 94, 86, .95)',
          pointWidth: 15,
          data: this.councilorsSeries,
        }],
        exporting: { enabled: false },
        credits: { enabled: false },
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.gantt-chart
  letter-spacing 1px
  & + .gantt-chart
    margin-top 40px
  > h3
    position relative
    width 100%
    margin 0 auto
    padding .5em 0
    letter-spacing 1px
    text-shadow 1.4px 1.4px 1.9px rgba(0, 0, 0, 0.2)
    background-color #48423c
    overflow hidden
    &::before, &::after
      content ''
      position absolute
      top 0
      width 35px
      height 100%
      background-repeat no-repeat
      background-size cover
    &::before
      left 0
      background-position -26px 50%
    &::after
      right 0
      background-position 8px 50%
  > p
    margin 1em 0 0

  .chart
    min-height 230px
    margin-top 20px
    &.expand
      overflow-x auto !important
  
  &.kmt
    > h3
      background-color #364d77
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-kmt.png)
  &.dpp
    > h3
      background-color #147266
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-dpp.png)
  &.new
    > h3
      background-color #ffdb00
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-new.png)
  &.pfp
    > h3
      background-color #fe6407
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-pfp.png)
  &.none
    > h3
      background-color #7d7d7d
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-none.png)
  &.unknow
    > h3
      background-color #48423c
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-unknow.png)

@media (min-width: 1200px)
  .gantt-chart
    > h3
      width calc(100% - 70px)

</style>
