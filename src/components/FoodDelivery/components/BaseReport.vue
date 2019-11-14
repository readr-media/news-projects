<template>
  <!-- <main class="base-report" id="base-report" @scroll="changeRouter" :class="{ show: isReportContent }"> -->
  <main class="base-report" id="base-report" @scroll="changeRouter">
    <!-- <HeaderIcons /> -->
    <!-- <section v-for="(reportId, idx) in currentReportIds" :key="`report-${reportId}`" :ref="`report${idx}`"> -->
    <!-- <section class="base-report__report" v-for="reportId in reportIds" :key="`report-${reportId}`" ref="report" v-show="reportIdsNeedToShow.includes(reportId)"> -->
    <div class="base-report__container">
      <transition
        name="slideLeft"
        @enter="scrollToReport"
      >
        <!-- <div class="base-report__reports-wrapper" :class="{ show: isReportContent }"> -->
        <div v-show="isReportContent">
          <section class="base-report__report" v-for="reportId in reportIds" :key="`report-${reportId}`" ref="report" :id="`report${reportId}`">
            <div class="base-report__marker-wrapper">
              <MapMarker :num="reportId" class="base-report__marker" />
            </div>
            <component :is="`ReportContent${reportId}`" />
            <ReportResult />
            <OrderIndex v-if="isMounted && $store.state.viewport[0] >= 768" />
          </section>
          <TheFooter />
        </div>
      </transition>
    </div>
  </main>
</template>

<script>
const scrollIntoView = require('scroll-into-view')

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('FoodDelivery')

import MapMarker from './MapMarker.vue'
import ReportResult from './ReportResult.vue'
import OrderIndex from './OrderIndex.vue'
import TheFooter from './TheFooter.vue'

import ReportContent1 from './ReportContent1.vue'
import ReportContent2 from './ReportContent2.vue'
import ReportContent3 from './ReportContent3.vue'
import ReportContent4 from './ReportContent4.vue'
import ReportContent5 from './ReportContent5.vue'

export default {
  name: 'BaseReport',
  components: {
    // HeaderIcons,
    MapMarker,
    ReportResult,
    OrderIndex,
    TheFooter,
    // ReportContent1: () => import('./ReportContent1.vue'),
    // ReportContent2: () => import('./ReportContent2.vue'),
    // ReportContent3: () => import('./ReportContent3.vue'),
    // ReportContent4: () => import('./ReportContent4.vue'),
    // ReportContent5: () => import('./ReportContent5.vue')
    ReportContent1,
    ReportContent2,
    ReportContent3,
    ReportContent4,
    ReportContent5
  },
  beforeMount () {
    this.scrollToReport()
  },
  data () {
    return {
      // reportIdx: 0
      // wEl: null,
      // canChangeRouter: false,
      currentReadReportId: 1
      // isTransition: false
    }
  },
  computed: {
    ...mapState([
      'isReportContent',
      'clickedReportId',
      'reportIds',
      'isMounted'
    ])
  },
  methods: {
    // todo 切換時會不準（scroll 沒到位）
    changeRouter () {
      if (!this.isReportContent) return
      const reportBase = this.$el
      const reportPrev = this.$refs.report[this.currentReadReportId - 1]
      const reportNext = this.$refs.report[this.currentReadReportId] || reportBase.scrollHeight

      const reportBaseScrollT = reportBase.scrollTop
      const reportPrevOffsetT = reportPrev.offsetTop
      const reportNextOffsetT = reportNext.offsetTop
      
      if (reportBaseScrollT >= reportNextOffsetT) {
        this.currentReadReportId += 1
        this.$router.replace(`/project/food-delivery/order${this.currentReadReportId}`).catch((err) => {})
        // this.wEl.history.replaceState({}, '', `/project/food-delivery/order${this.currentReadReportId}`)
      } else if (reportBaseScrollT < reportPrevOffsetT) {
        this.currentReadReportId -= 1
        this.$router.replace(`/project/food-delivery/order${this.currentReadReportId}`).catch((err) => {})
        // this.wEl.history.replaceState({}, '', `/project/food-delivery/order${this.currentReadReportId}`)
      }
    },
    scrollToReport () {
      const reportEl = document.getElementById(`report${this.clickedReportId}`)
      scrollIntoView(reportEl, { time: 0, align: { top: 0, left: 0 } })
    }
  },
  watch: {
    isReportContent: {
      handler (newVal) {
        if (newVal) {
          this.currentReadReportId = this.clickedReportId
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.base-report
  position fixed
  // position absolute
  top 0
  left 0
  z-index 9
  // background-color #f5f4f5
  width 100%
  height 100%
  overflow-y auto
  // max-width 800px
  // transform translateX(100%)
  // transition transform 0.32s
  // &.show
  //   transform translateX(0)
  &__container
    max-width 800px
    margin-left auto
    margin-right auto
    overflow hidden
  // &__reports-wrapper
  //   // transform translateX(100%)
  //   left 100%
  //   // transition transform 0.32s
  //   transition left 0.32s
  //   &.show
  //     left 0%
  //     // transform translateX(0%)
  &__report
    position relative
  &__marker-wrapper
    height 84px
    display flex
    align-items center
    justify-content center
    background-color #f5f4f5
    @media (min-width $mobile)
      height 120px
    @media (min-width $tablet)
      display none
  &__marker
    width 25.42px
    height 35.8px
    @media (min-width $mobile)
      width 28.4px
      height 40px
    & .marker-color
      fill #000
</style>