<template>
  <div class="marathonChart">
    <div :id="`js-chart-${chart}`" ></div>
  </div>
</template>
<script>
  import Highcharts from 'highcharts'

  export default {
    name: 'MarathonChart',
    props: {
      chart: {
        type: Number,
        required: true,
      }
    },
    mounted() {
      this.$_marathon_drawChart(this.chart)
    },
    methods: {
      $_marathon_drawChart(chart) {
        switch(chart) {
          case 1:
            return this.$_marathon_drawChart1()
          case 2:
            return this.$_marathon_drawChart2()
          case 3:
            return this.$_marathon_drawChart3()
          case 4:
            return this.$_marathon_drawChart4()
          case 5:
            return this.$_marathon_drawChart5()
          case 6:
            return this.$_marathon_drawChart6()
          case 7:
            return this.$_marathon_drawChart7()
          default:
            this.$_marathon_drawChart1()
        }
      },
      $_marathon_drawChart1() {
        Highcharts.chart('js-chart-1', {
          chart: { type: 'column', backgroundColor: 'rgba(244, 91, 105, .1)', borderRadius: 5, spacingTop: 50 },
          title: { text: '' },
          xAxis: {
            title: { text: '次數/週', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['小於1', '1', '2', '3', '4', '5', '6', '7', '大於7'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '人數', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -20, offset: 15, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { enabled: false },
          plotOptions: {
            column: {
              dataLabels: {
                color: '#f45b69',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '人數',
            showInLegend: false,
            color: '#f45b69',
            data: [89, 346, 447, 316, 211, 128, 70, 58, 91],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart2() {
        Highcharts.chart('js-chart-2', {
          chart: { type: 'column', backgroundColor: 'rgba(255, 191, 85, .1)', borderRadius: 5, spacingTop: 50 },
          title: { text: '' },
          xAxis: {
            title: { text: '公里/週', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['小於 10', '10-19', '20-29', '30-39', '40-49', '大於 50'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '人數', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -20, offset: 15, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { enabled: false },
          plotOptions: {
            column: {
              dataLabels: {
                color: '#ffbf55',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '數量',
            showInLegend: false,
            color: '#ffbf55',
            data: [129, 335, 408, 322, 238, 324],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart3() {
        Highcharts.chart('js-chart-3', {
          chart: { type: 'column', backgroundColor: 'rgba(0, 152, 218, .1)', borderRadius: 5, spacingTop: 50 },
          title: { text: '' },
          xAxis: {
            title: { text: '完賽時間', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['3 hr', '4 hr', '5 hr', '5.5 hr'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '平均<br>週跑次數', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, x: 10, y: -30, offset: 0, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { headerFormat: '<b>{point.x}月平均</b>', pointFormat: ' {point.y} 次' },
          plotOptions: {
            column: {
              dataLabels: {
                color: '#0098da',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '次數',
            showInLegend: false,
            color: '#0098da',
            data: [2.0, 2.5, 4.3, 6.7],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart4() {
        Highcharts.chart('js-chart-4', {
          chart: { type: 'column', backgroundColor: 'rgba(0, 152, 218, .1)', borderRadius: 5, spacingTop: 50 },
          title: { text: '' },
          xAxis: {
            title: { text: '完賽時間', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['3 hr', '4 hr', '5 hr', '5.5 hr'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '平均週跑<br>距離(km)', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, x: 10, y: -30, offset: 0, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { headerFormat: '<b>{point.x}月平均</b>', pointFormat: ' {point.y} 公里' },
          plotOptions: {
            column: {
              dataLabels: {
                color: '#0098da',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '距離',
            showInLegend: false,
            color: '#0098da',
            data: [21.4, 29.2, 46.2, 63.6],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart5() {
        Highcharts.chart('js-chart-5', {
          chart: { type: 'bar', backgroundColor: 'rgba(255, 191, 85, .1)', borderRadius: 5, spacingTop: 10 },
          title: { text: '' },
          xAxis: {
            categories: ['台南市立<br>田徑場', '新竹田徑場', '鳳山體育場', '板橋<br>重慶國小', '浮洲橋<br>→ 城林橋', '衛武營<br>都會公園', '文心森林公園', '四號公園', '植物園<br>→ 科博館', '板橋<br>五權公園'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '次數', align: 'high', style: { color: '#4d4d4d' }, rotation: 0 },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { enabled: false },
          plotOptions: {
            bar: {
              dataLabels: {
                color: '#ffbf55',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '數量',
            showInLegend: false,
            color: '#ffbf55',
            data: [1208, 843, 791, 772, 625, 615, 514, 325, 146, 83],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart6() {
        Highcharts.chart('js-chart-6', {
          chart: { type: 'column', backgroundColor: 'rgba(244, 91, 105, .1)', borderRadius: 5, spacingTop: 20 },
          title: { text: '' },
          xAxis: {
            title: { text: '次數/週', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['<3', '3-5', '5-9', '10-14', '15-20'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          tooltip: { headerFormat: '<b>佔 {series.name} 跑者的</b>', pointFormat: ' {point.y} %' },
          yAxis: {
            title: { text: '(%)', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -20, offset: 15, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
            symbolRadius: 0,
            itemDistance: 10
          },
          series: [
            { name: '< 3hr', color: '#f45b69', data: [6.1, 33.3, 48.5, 12.1, 0.0] },
            { name: '3~4hr', color: '#ffbf55', data: [22.6, 53.1, 22.2, 2.1, 0.0] },
            { name: '4~5hr', color: '#0098da', data: [33.0, 55.2, 10.8, 0.9, 0.1] }
          ],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart7() {
        Highcharts.chart('js-chart-7', {
          chart: { type: 'line', backgroundColor: 'rgba(244, 91, 105, .1)', borderRadius: 5, spacingTop: 20 },
          title: { text: '' },
          xAxis: {
            title: { text: '公里/週', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['<10', '10-19', '20-29', '30-39', '40-49', '>50'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '(%)', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -20, offset: 15, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { headerFormat: '<b>佔 {series.name} 跑者的</b>', pointFormat: ' {point.y} %' },
          plotOptions: {
            line: { marker: { symbol: 'circle' } },
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
            symbolRadius: 0,
            itemDistance: 10
          },
          series: [
            { name: '< 3hr', color: '#f45b69', data: [0.0, 6, 10, 10, 16, 58] },
            { name: '3~4hr', color: '#ffbf55', data: [0.0, 4, 16, 27, 23, 31] },
            { name: '4~5hr', color: '#0098da', data: [0.0, 16, 39, 26, 12, 7] }
          ],
          credits: { enabled: false },
        })
      },
    }
  }
</script>
<style lang="stylus" scoped>

.marathonChart
  width 100%
  margin-top 40px
  > div
    width 100%

@media (min-width: 900px)
  .marathonChart
    width 700px
    margin-left auto
    margin-right auto
    padding-bottom 40px
    &.chart--3
      padding-bottom 0

// highcharts
#js-chart-1, #js-chart-2, #js-chart-3, #js-chart-4, #js-chart-6, #js-chart-7
  height 300px
#js-chart-5
  height 500px

</style>