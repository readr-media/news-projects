<template>
  <div>
    <HeaderIcons />
    <TableOfContents />
    <BaseReport v-show="$store.state.FoodDelivery.isReportContent">
      <!-- <template #report>
        <ReportContent1 />
      </template> -->
      <!-- <template #result>
        <ReportResult />
      </template> -->
    </BaseReport>
  </div>
</template>

<script>
import FoodDeliveryStoreModule from '../../store/modules/FoodDelivery'

import HeaderIcons from './components/HeaderIcons.vue'
import TableOfContents from './components/TableOfContents.vue'
import BaseReport from './components/BaseReport.vue'
// import ReportResult from './components/ReportResult.vue'
import ReportContent1 from './components/ReportContent1.vue'

export default {
  name: 'FoodDelivery',
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'food-delivery',
      metaImage: ''
    }
  },
  components: {
    HeaderIcons,
    TableOfContents,
    BaseReport,
    // ReportResult
    // ReportContent1
  },
  created () {
    this.$store.registerModule('FoodDelivery', FoodDeliveryStoreModule)
  },
  beforeDestroy () {
    this.$store.unregisterModule('FoodDelivery')
  }
}
</script>

<style lang="stylus">
@import './util/report-content.styl'

html
  font-size 10px
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif
// body
//   background-color #f5f4f5
img
  max-width 100%
  height auto
html, div, h1, h2, p, a, strong, figure, figcaption, footer, header, section, ul, li
  margin 0
  padding 0
  border 0
  vertical-align baseline
ul
  list-style none
button
  border none
  cursor pointer
  padding 0
// .op0
//   opacity 0
</style>