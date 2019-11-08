<template>
  <div>
    <HeaderIcons />
    <TableOfContents />
    <BaseReport v-if="$store.state.FoodDelivery.isReportContent">
      <!-- <template #report>
        <ReportContent1 />
      </template> -->
      <!-- <template #result>
        <ReportResult />
      </template> -->
    </BaseReport>
    <!-- <TheFooter /> -->
    <TheInfo v-if="$store.state.FoodDelivery.isInfo" />
  </div>
</template>

<script>
import FoodDeliveryStoreModule from '../../store/modules/FoodDelivery'

import HeaderIcons from './components/HeaderIcons.vue'
import TableOfContents from './components/TableOfContents.vue'
import BaseReport from './components/BaseReport.vue'
// import ReportResult from './components/ReportResult.vue'
import ReportContent1 from './components/ReportContent1.vue'
// import TheFooter from './components/TheFooter.vue'
import TheInfo from './components/TheInfo.vue'

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
    TheInfo
    // TheFooter
    // ReportResult
    // ReportContent1
  },
  beforeCreate () {
    this.$store.registerModule('FoodDelivery', FoodDeliveryStoreModule)
    const params = this.$route.params.params || ''
    // todo [1-?]
    const regex = /^(order[1-5])$/i
    // todo catch error
    // https://blog.csdn.net/weixin_43202608/article/details/98884620
    if (params.match(regex)) {
      const stateFD = this.$store.state.FoodDelivery
      stateFD.isReportContent = true
      stateFD.clickedReportId = Number(params.split('order')[1])
    } else {
      this.$router.replace('/project/food-delivery').catch((err) => {})
    }
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
a
  cursor pointer
// .op0
//   opacity 0
</style>