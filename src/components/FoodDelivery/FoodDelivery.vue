<template>
  <div>
    <HeaderIcons :class="{ hide: isInfo }" />
    <TableOfContents :class="{ hide: isReportContent || isInfo }" />
    <BaseReport :class="{ hide: isInfo }" >
    </BaseReport>
    <TheInfo v-if="isInfo" />
  </div>
</template>

<script>
import FoodDeliveryStoreModule from '../../store/modules/FoodDelivery'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('FoodDelivery')

import HeaderIcons from './components/HeaderIcons.vue'
import TableOfContents from './components/TableOfContents.vue'
import BaseReport from './components/BaseReport.vue'
import ReportContent1 from './components/ReportContent1.vue'
import TheInfo from './components/TheInfo.vue'

export default {
  name: 'FoodDelivery',
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'food-delivery',
      metaImage: ''
      // customScript: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.3.1/dist/css/yakuhanjp_s-narrow.min.css">'
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
  computed: {
    ...mapState([
      'isReportContent',
      'isInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'toggleReportContent',
      'changeClickedReportId'
    ])
  },
  created () {
    this.$store.registerModule('FoodDelivery', FoodDeliveryStoreModule)
    const params = this.$route.params.params || ''
    // todo [1-?]
    const regex = /^(order[1-5])$/i

    if (params.match(regex)) {
      const orderNum = Number(params.split('order')[1])
      this.toggleReportContent(true)
      this.changeClickedReportId(orderNum)
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
// $ff-sans-serif = YakuHanJPs_Narrow, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif
$ff-sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

html
  font-size 10px
  font-family $ff-sans-serif
body
  background-image url(/proj-assets/food-delivery/img/map.jpg)
  background-size contain
  background-position center top
  background-repeat repeat
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
  font-family $ff-sans-serif
a
  cursor pointer
.hide
  // visibility hidden
  opacity 0
// .op0
//   opacity 0
</style>