<template>
  <!-- <div class="food-delivery" :class="{ 'overflow-h': !isScrollBar }"> -->
  <div class="food-delivery">
    <LoadingCover />
    <!-- <HeaderIcons :class="{ 'opacity-0': isInfo }" /> -->
    <!-- todo transition -->
    <TableOfContents :class="{ 'opacity-0': isReportContent || isInfo }" />
    <!-- <TableOfContents :class="{ 'opacity-0': isInfo }" /> -->
    <!-- todo v-if -->
    <!-- <transition name="slideLeft"> -->
    <BaseReport :class="{ 'opacity-0': isInfo, 'visibility-h': !isReportContent }" />
    <!-- </transition> -->

    <TheInfo v-if="isInfo" />
  </div>
</template>

<script>
import FoodDeliveryStoreModule from '../../store/modules/FoodDelivery'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('FoodDelivery')

// import smoothscroll from 'smoothscroll-polyfill'
// if (typeof window !== 'undefined') {
//   smoothscroll.polyfill()
// }

import LoadingCover from './components/LoadingCover.vue'
import HeaderIcons from './components/HeaderIcons.vue'
import TableOfContents from './components/TableOfContents.vue'
import BaseReport from './components/BaseReport.vue'
import ReportContent1 from './components/ReportContent1.vue'
import TheInfo from './components/TheInfo.vue'

export default {
  name: 'FoodDelivery',
  metaInfo () {
    // todo need to change description, title?
    const params = this.$route.params.params
    const metaUrl = `food-delivery${params ? `/${params}` : ''}`
    const metaImage = `food-delivery/img/og-${params ? params.split('order')[ 1 ] : 'default'}.jpg`

    return {
      title: '記者來當外送員：開箱美食外送秘辛！',
      description: '美食外送服務如火如荼發展的同時，我成為臺灣 4 萬 5 千多個外送員的其中之一。這趟田野旅程讓我發現，這個新創服務就和它的老東家 Uber 一樣，雖然解決了產業的問題，卻也為社會帶來極大的麻煩。',
      metaUrl,
      metaImage
    }
  },
  components: {
    LoadingCover,
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
      'isInfo',
      'isScrollBar'
    ])
  },
  // watch: {
  //   '$route' (to, from) {
  //     switch (to.params.params) {
  //       case value:
          
  //         break;
      
  //       default:
  //         break;
  //     }
  //   }
  // },
  methods: {
    ...mapMutations([
      'toggleReportContent',
      // 'changeClickedReportId',
      'changeCurrentReadReportId',
      'setIsMounted'
    ])
  },
  created () {
    this.$store.registerModule('FoodDelivery', FoodDeliveryStoreModule)
    const params = this.$route.params.params || ''
    const regex = /^(order[1-5])$/i

    if (params.match(regex)) {
      const orderNum = Number(params.split('order')[1])
      this.changeCurrentReadReportId(orderNum)
      this.toggleReportContent(true)
    } else {
      this.$router.replace('/project/food-delivery').catch((err) => {})
    }
  },
  mounted () {
    this.setIsMounted()
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
.food-delivery
  max-width 800px
  margin-right auto
  margin-left auto
  // transform translateZ(0)
  // overflow hidden
  position relative
img
  max-width 100%
  height auto
html, div, h1, h2, h3, p, a, strong, figure, figcaption, footer, header, section, ul, li
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
  outline none
a
  cursor pointer
.opacity-0
  opacity 0
.visibility-h
  visibility hidden
// .overflow-h
//   overflow hidden
// transition
.slideLeft
  // todo
  &-enter-active, &-leave-active
    transition transform 0.32s
  &-enter, &-leave-to
    transform translateX(100%)
</style>