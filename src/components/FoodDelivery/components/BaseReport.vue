<template>
  <!-- <main class="base-report" id="base-report" @scroll="changeRouter" :class="{ show: isReportContent }"> -->
  <main class="base-report" id="base-report" @scroll="changeRouter(); changeResult()">
    <!-- <section v-for="(reportId, idx) in currentReportIds" :key="`report-${reportId}`" :ref="`report${idx}`"> -->
    <!-- <section class="base-report__report" v-for="reportId in reportIds" :key="`report-${reportId}`" ref="report" v-show="reportIdsNeedToShow.includes(reportId)"> -->
    <div class="base-report__container">
      <HeaderIcons />
      <transition
        name="slideLeft"
        @enter="scrollToReport"
      >
        <!-- <div class="base-report__reports-wrapper" :class="{ show: isReportContent }"> -->
        <div v-show="isReportContent">
          <section v-for="(reportId, idx) in reportIds" :key="`report-${reportId}`" ref="report" :id="`report${reportId}`">
            <div class="base-report__marker-wrapper">
              <MapMarker :num="reportId" class="base-report__marker" />
            </div>
            <component :is="`ReportContent${reportId}`" />
            <ReportResult :result="results[ idx ]" ref="result" />
            <!-- <OrderIndex v-if="isMounted && $store.state.viewport[0] >= 768" /> -->
          </section>
          <OrderIndex v-if="isMounted && $store.state.viewport[0] >= 768" />
          <TheFooter />
        </div>
      </transition>
    </div>
  </main>
</template>

<script>
const scrollIntoView = require('scroll-into-view')

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('FoodDelivery')

import HeaderIcons from './HeaderIcons.vue'
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
    HeaderIcons,
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
      readReportIds: [],
      steps: {
        orderCount: [ 0, 0, 1, 1, 2 ],
        money: [ 0, 0, 67, 67, 167 ],
        action: [ '確認接單（繼續閱讀）', '已領取餐點（繼續閱讀）', '接下一張單（繼續閱讀）', '已領取餐點（繼續閱讀）', '' ],
        state: [ '收到第一張訂單', '抵達餐廳', '即將與顧客碰面', '抵達餐廳', '完成配送！' ]
      },
      seconds: [ 302, 190, 448, 330, 100 ],
      totalSeconds: 0,
      results: [
        {
          orderCount: 0,
          money: 0,
          time: '00:00',
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        },
        {
          orderCount: 0,
          money: 0,
          time: '00:00',
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        },
        {
          orderCount: 0,
          money: 0,
          time: '00:00',
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        },
        {
          orderCount: 0,
          money: 0,
          time: '00:00',
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        },
        {
          orderCount: 0,
          money: 0,
          time: '00:00',
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        }
      ],
      beforeScrollT: 0
    }
  },
  computed: {
    ...mapState([
      'isReportContent',
      // 'clickedReportId',
      'currentReadReportId',
      'reportIds',
      'isMounted'
    ]),
    wh () {
      return this.$store.state.viewport[1]
    },
    time () {
      const minutes = Math.floor(this.totalSeconds / 60)
      const seconds = (this.totalSeconds % 60)
      return `${minutes.toString().length === 2 ? minutes : `0${minutes}`}:${seconds.toString().length === 2 ? seconds : `0${seconds}`}`
    }
  },
  methods: {
    ...mapMutations([
      'changeCurrentReadReportId',
      'changeUserState'
    ]),
    // todo when auto scroll, need to prevent trigger?
    changeRouter () {
      if (!this.isReportContent) return
      const reportBase = this.$el
      const reportPrev = this.$refs.report[ this.currentReadReportId - 1 ]
      const reportNext = this.$refs.report[ this.currentReadReportId ] || reportBase.scrollHeight

      const reportBaseScrollT = reportBase.scrollTop + 16
      const reportPrevOffsetT = reportPrev.offsetTop
      const reportNextOffsetT = reportNext.offsetTop
      
      if (reportBaseScrollT >= reportNextOffsetT) {
        // this.currentReadReportId += 1
        this.changeCurrentReadReportId(this.currentReadReportId + 1)
        this.$router.replace(`/project/food-delivery/order${this.currentReadReportId}`).catch((err) => {})
        // this.wEl.history.replaceState({}, '', `/project/food-delivery/order${this.currentReadReportId}`)
      } else if (reportBaseScrollT < reportPrevOffsetT) {
        // this.currentReadReportId -= 1
        this.changeCurrentReadReportId(this.currentReadReportId - 1)
        this.$router.replace(`/project/food-delivery/order${this.currentReadReportId}`).catch((err) => {})
        // this.wEl.history.replaceState({}, '', `/project/food-delivery/order${this.currentReadReportId}`)
      }
    },
    scrollToReport () {
      const reportEl = document.getElementById(`report${this.currentReadReportId}`)
      scrollIntoView(reportEl, { time: 0, align: { top: 0, left: 0 } })
    },
    changeResult () {
      if (this.readReportIds.includes(this.currentReadReportId)) return

      const baseReportScrollT = this.$el.scrollTop
      if (baseReportScrollT <= this.beforeScrollT) {
        this.beforeScrollT = baseReportScrollT
        return
      }

      const reportIdx = this.currentReadReportId - 1
      // const resultEl = this.$refs.result[ reportIdx ].$el
      const resultOffsetT = this.$refs.result[ reportIdx ].$el.offsetTop

      if (baseReportScrollT >= (resultOffsetT - this.wh / 2)) {
        const stepIdx = this.readReportIds.length
        const state = this.steps.state[ stepIdx ]

        this.results[ reportIdx ].state = state
        this.changeUserState(state)

        this.totalSeconds += this.seconds[ reportIdx ]

        this.results.forEach((result, idx) => {
          if (this.readReportIds.includes(idx + 1)) return

          result.orderCount = this.steps.orderCount[ stepIdx ]
          result.money = this.steps.money[ stepIdx ]
          result.action = this.steps.action[ stepIdx ]
          result.time = this.time
        })
        this.readReportIds.push(this.currentReadReportId)
      }

      this.beforeScrollT = baseReportScrollT
    }
  }
  // watch: {
  //   isReportContent: {
  //     handler (newVal) {
  //       if (newVal) {
  //         this.currentReadReportId = this.currentReadReportId
  //       }
  //     },
  //     immediate: true
  //   }
  // }
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
  width 100%
  height 100%
  overflow-y auto
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
  // &__report
  //   position relative
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