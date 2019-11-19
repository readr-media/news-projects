<template>
  <div class="food-delivery">
    <LoadingCover />
    <TableOfContents :class="{ 'opacity-0': isReportContent || isInfo }" />
    <BaseReport :class="{ 'opacity-0': isInfo }" />
    <transition name="fade-normal">
      <TheInfo v-if="isInfo" :class="{ 'overflow-y-s': isReportContent }" />
    </transition>
  </div>
</template>

<script>
import FoodDeliveryStoreModule from '../../store/modules/FoodDelivery'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('FoodDelivery')

import LoadingCover from './components/LoadingCover.vue'
import HeaderIcons from './components/HeaderIcons.vue'
import TableOfContents from './components/TableOfContents.vue'
import BaseReport from './components/BaseReport.vue'
import ReportContent1 from './components/ReportContent1.vue'
import TheInfo from './components/TheInfo.vue'

export default {
  name: 'FoodDelivery',
  metaInfo () {
    const params = this.$route.params.params
    const metaUrl = `food-delivery${params ? `/${params}` : ''}`
    const metaImage = `food-delivery/img/og-${params ? params.split('order')[ 1 ] : 'default'}.jpg`
    let title = ''
    let description = ''
    switch (params) {
      case 'order1':
        title = '記者來當外送員：如何成為美食平台外送員？'
        description = '美食外送服務如火如荼發展的同時，我成為臺灣 4 萬 5 千多個外送員的其中之一。大多數的外送員都是為了「高薪」和「自由」才踏入這一行，但在帳號開通說明會的現場，我發現這份工作並沒有真的那麼自由。'
        break
      case 'order2':
        title = '記者來當外送員：美食外送平台解決了什麼問題'
        description = '美食外送服務如火如荼發展的同時，我成為臺灣 4 萬 5 千多個外送員的其中之一。平台以高密度的資料運算指揮著大量的外送員，解決了傳統美食外送遇到的三大瓶頸，但彈性的聘用機制卻同時讓外送員陷入風險。'
        break
      case 'order3':
        title = '記者來當外送員：仰賴檢舉和評價的外送員管理機制'
        description = '相較於顧客會不斷收到折價卷、店家的權益至少有一紙合約保障，對於外送員，平台卻是片面調整規定與獎勵制度。我們追蹤過去一年平台給予外送員的獎勵機制，發現在固定單量下，實際收入減少超過一萬元。'
        break
      case 'order4':
        title = '記者來當外送員：車禍是外送員最害怕的事'
        description = '平台以自認的承攬制大量招收外送員，但同時以「夥伴關係」規避了雇主責任，這個議題終於在悲劇中浮上檯面。彈性工作與勞動保障是否真難兩全？目前政府又打算如何因應？'
        break
      case 'order5':
        title = '記者來當外送員：平台經濟帶來的好與壞'
        description = '美食外送服務如火如荼發展的同時，我成為臺灣 4 萬 5 千多個外送員的其中之一。這只是我的兼職，但有很多人靠這份工作餬口，他們的勞動保障卻和只做每日只工作 1 小時的人無異。'
        break
      default:
        title = '記者來當外送員：開箱美食外送秘辛！'
        description = '美食外送服務如火如荼發展的同時，我成為臺灣 4 萬 5 千多個外送員的其中之一。這趟田野旅程讓我發現，這個新創服務就和它的老東家 Uber 一樣，雖然解決了產業的問題，卻也為社會帶來極大的麻煩。'
        break
    }

    return {
      title,
      description,
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
  },
  computed: {
    ...mapState([
      'isReportContent',
      'isInfo',
      'isScrollBar'
    ])
  },
  watch: {
    '$route' (to, from) {
      const params = to.params.params
      if (params) {
        const orderId = Number(params.split('order')[ 1 ])
        this.changeCurrentReadReportId(orderId)
        this.toggleReportContent(true)
        this.toggleBodyScrollBar(false)
      } else {
        this.toggleReportContent(false)
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleReportContent',
      'changeCurrentReadReportId',
      'setIsMounted',
      'changeBeginningContent',
      'toggleBodyScrollBar'
    ])
  },
  created () {
    this.$store.registerModule('FoodDelivery', FoodDeliveryStoreModule)
    const params = this.$route.params.params || ''
    const regex = /^(order[1-5])$/i

    if (params.match(regex)) {
      const orderNum = Number(params.split('order')[ 1 ])
      this.changeCurrentReadReportId(orderNum)
      this.toggleReportContent(true)
    } else {
      this.$router.replace('/project/food-delivery').catch((err) => {})
    }
  },
  beforeMount () {
    this.toggleBodyScrollBar(false)
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
@import './util/transition.styl'
@import './util/report-content.styl'

$ff-sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

html
  font-size 10px
  font-family $ff-sans-serif
body
  background-image url(/proj-assets/food-delivery/img/map.jpg)
  background-size contain
  background-position center top
  background-repeat repeat
  min-height 100vh
.food-delivery
  max-width 800px
  margin-right auto
  margin-left auto
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
.overflow-h
  overflow hidden
.overflow-y-s
  overflow-y scroll
</style>