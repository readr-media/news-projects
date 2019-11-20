<template>
  <main
    id="base-report"
    :class="[ 'base-report', { 'visibility-h': isHidden, 'below-the-bottom': !isBaseReport } ]"
    @scroll="changeRouter(); changeResult()"
  >
    <div class="base-report__container">
      <HeaderIcons v-show="isHeaderIcons" />
      <transition
        name="slide-report"
        @before-enter="isHidden = false"
        @enter       ="scrollToReport"
        @after-enter ="isHeaderIcons = true"
        @before-leave="isHeaderIcons = false"
        @after-leave ="afterLeaveReportContent"
      >
        <div v-show="isReportContent">
          <section v-for="(reportId, idx) in reportIds" :key="`report-${reportId}`" ref="report" :id="`report${reportId}`">
            <div class="base-report__marker-wrapper">
              <MapMarker :num="reportId" class="base-report__marker" />
            </div>
            <component :is="`ReportContent${reportId}`" />

            <ReportResult :result="results[ idx ]" ref="result" />
            
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
  mounted () {
    this.scrollToReport()
    if (!this.isBaseReport) {
      this.isHidden = false
    }
  },
  data () {
    return {
      steps: {
        orderCount: [ 0, 0, 1, 1, 2 ],
        money: [ 0, 0, 67, 67, 167 ],
        seconds: [ 302, 190, 448, 330, 100 ],
        // todo '回到首篇' or '繼續閱讀'？
        // todo 兩個 '已領取餐點' 要不要做一些區別
        action: [ '確認接單（繼續閱讀）', '已領取餐點（繼續閱讀）', '接下一張單（繼續閱讀）', '已領取餐點（繼續閱讀）', '接下一張單（回到首篇）' ],
        state: [ '收到第一張訂單', '抵達餐廳', '即將與顧客碰面', '抵達餐廳', '完成配送！' ]
      },
      totalSeconds: 0,
      results: [
        {
          id: 1,
          orderCount: 0,
          money: 0,
          seconds: 0,
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        },
        {
          id: 2,
          orderCount: 0,
          money: 0,
          seconds: 0,
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        },
        {
          id: 3,
          orderCount: 0,
          money: 0,
          seconds: 0,
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        },
        {
          id: 4,
          orderCount: 0,
          money: 0,
          seconds: 0,
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        },
        {
          id: 5,
          orderCount: 0,
          money: 0,
          seconds: 0,
          action: '確認接單（繼續閱讀）',
          state: '前往目的地的路上'
        }
      ],
      beforeScrollT: 0,
      isHidden: false,
      isHeaderIcons: true
    }
  },
  computed: {
    ...mapState([
      'isReportContent',
      'currentReadReportId',
      'reportIds',
      'isMounted',
      'isBaseReport',
      'readReportIds',
      'isAutoScrolling'
    ]),
    wh () {
      return this.$store.state.viewport[1]
    }
  },
  methods: {
    ...mapMutations([
      'changeCurrentReadReportId',
      'changeUserState',
      'toggleBodyScrollBar',
      'addReadReportIds'
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
        this.changeCurrentReadReportId(this.currentReadReportId + 1)
        this.$router.replace(`/project/food-delivery/order${this.currentReadReportId}`).catch((err) => {})
      } else if (reportBaseScrollT < reportPrevOffsetT) {
        this.changeCurrentReadReportId(this.currentReadReportId - 1)
        this.$router.replace(`/project/food-delivery/order${this.currentReadReportId}`).catch((err) => {})
      }
    },
    scrollToReport () {
      const reportEl = document.getElementById(`report${this.currentReadReportId}`)
      scrollIntoView(reportEl, { time: 0, align: { top: 0, left: 0 } })
    },
    changeResult () {
      if (this.readReportIds.includes(this.currentReadReportId) || this.isAutoScrolling) return

      const baseReportScrollT = this.$el.scrollTop
      if (baseReportScrollT <= this.beforeScrollT) {
        this.beforeScrollT = baseReportScrollT
        return
      }

      const reportIdx = this.currentReadReportId - 1
      const resultOffsetT = this.$refs.result[ reportIdx ].$el.offsetTop

      if (baseReportScrollT >= (resultOffsetT - this.wh / 2)) {
        const stepIdx = this.readReportIds.length
        const state = this.steps.state[ stepIdx ]

        // this.results[ reportIdx ].state = state
        
        this.changeUserState(state)

        this.totalSeconds += this.steps.seconds[ reportIdx ]

        this.results.forEach((result, idx) => {
          if (this.readReportIds.includes(idx + 1)) return

          result.state = state
          result.orderCount = this.steps.orderCount[ stepIdx ]
          result.money = this.steps.money[ stepIdx ]
          result.action = this.steps.action[ stepIdx ]
          result.seconds = this.totalSeconds
        })
        this.addReadReportIds(this.currentReadReportId)
      }

      this.beforeScrollT = baseReportScrollT
    },
    afterLeaveReportContent () {
      this.isHidden = true
      this.toggleBodyScrollBar(true)
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'
@import '../util/transition.styl'

.base-report
  position fixed
  top 0
  left 0
  z-index 9
  width 100%
  height 100%
  overflow-y auto
  transition opacity 0.45s $easeOutExpo, transform 0.6s $easeOutExpo
  &.below-the-bottom
    transform translateY(100%)
  &__container
    max-width 800px
    margin-left auto
    margin-right auto
    overflow hidden
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