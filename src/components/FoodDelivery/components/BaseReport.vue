<template>
  <main
    id="base-report"
    :class="[ 'base-report', { 'visibility-h': isHidden, 'below-the-bottom': !isBaseReport } ]"
    @scroll="changeRouter(); changeResult(); sendGAFooter()"
  >
    <div class="base-report__container">
      <HeaderIcons v-show="isHeaderIcons" />
      <transition
        name="slide-report"
        @before-enter="isHidden = false"
        @enter       ="scrollToReport"
        @after-enter ="afterEnterReportContent"
        @before-leave="beforeLeaveReportContent"
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
          <TheFooter ref="theFooter" />
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
        action: [ '確認接單（繼續閱讀）', '已領取餐點（繼續閱讀）', '接下一張單（繼續閱讀）', '已領取餐點（繼續閱讀）', '接下一張單' ],
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
          // state: '前往目的地的路上'
        },
        {
          id: 2,
          orderCount: 0,
          money: 0,
          seconds: 0,
          action: '確認接單（繼續閱讀）',
          // state: '前往目的地的路上'
        },
        {
          id: 3,
          orderCount: 0,
          money: 0,
          seconds: 0,
          action: '確認接單（繼續閱讀）',
          // state: '前往目的地的路上'
        },
        {
          id: 4,
          orderCount: 0,
          money: 0,
          seconds: 0,
          action: '確認接單（繼續閱讀）',
          // state: '前往目的地的路上'
        },
        {
          id: 5,
          orderCount: 0,
          money: 0,
          seconds: 0,
          action: '確認接單（繼續閱讀）',
          // state: '前往目的地的路上'
        }
      ],
      beforeScrollT: 0,
      isHidden: true,
      isHeaderIcons: true,
      isSendGAFooter: false
      // isFixedBg: false
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
      return this.$store.state.viewport[ 1 ]
    }
  },
  methods: {
    ...mapMutations([
      'changeCurrentReadReportId',
      'changeUserState',
      'toggleBodyScrollBar',
      'addReadReportIds'
    ]),
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

      if (baseReportScrollT >= (resultOffsetT - this.wh * 0.5)) {
        
        const stepIdx = this.readReportIds.length
        const state = this.steps.state[ stepIdx ]
        let gaLabel = ''
        
        this.changeUserState(state)

        this.totalSeconds += this.steps.seconds[ reportIdx ]

        this.results.forEach((result, idx) => {
          if (this.readReportIds.includes(idx + 1)) return
          result.orderCount = this.steps.orderCount[ stepIdx ]
          result.money = this.steps.money[ stepIdx ]

          const suffix = (stepIdx === 4 ? (this.currentReadReportId === 5 ? '（回到首篇）' : '（繼續閱讀）') : '')
          result.action = this.steps.action[ stepIdx ] + suffix
          result.seconds = this.totalSeconds
        })
        this.addReadReportIds(this.currentReadReportId)

        switch (this.currentReadReportId) {
          case 1:
            gaLabel = '如何成為外送員'
            break
          case 2:
            gaLabel = '美食外送平台解決了什麼問題'
            break
          case 3:
            gaLabel = '司機管理仰賴檢舉和評價'
            break
          case 4:
            gaLabel = '外送員最害怕的事：車禍'
            break
          case 5:
            gaLabel = '平台經濟帶來的好與壞'
            break
          default:
            break
        }
        window.ga('send', 'event', 'projects', 'scroll', gaLabel, this.currentReadReportId)
      }

      this.beforeScrollT = baseReportScrollT
    },
    sendGAFooter () {
      if (this.currentReadReportId !== 5 || this.isSendGAFooter) return
      if (this.$el.scrollTop >= this.$refs.theFooter.$el.offsetTop - this.wh * 0.5) {
        window.ga('send', 'event', 'projects', 'scroll', 'end', 6)
        this.isSendGAFooter = true
      }
    },
    afterLeaveReportContent () {
      this.isHidden = true
      this.toggleBodyScrollBar(true)
    },
    afterEnterReportContent () {
      this.isHeaderIcons = true
      // this.isFixedBg = true
    },
    beforeLeaveReportContent () {
      this.isHeaderIcons = false
      // this.isFixedBg = false
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
  // overflow-y scroll
  transition transform 0.6s $easeOutExpo, opacity 0.45s $easeOutExpo
  &.below-the-bottom
    transform translateY(100%)
  &__container
    max-width 800px
    margin-left auto
    margin-right auto
    overflow hidden
    // &::after
    //   content ""
    //   display block
    //   position absolute
    //   left 0
    //   top 0
    //   width 100%
    //   height 100vh
    //   z-index -1
    //   background-image url(/proj-assets/food-delivery/img/map.png)
    //   background-size contain
    //   background-position center top
    //   background-repeat repeat
    //   background-color #202020
    // &.hide-fixed-bg::after
    //   visibility hidden
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
.webp .base-report__container::after
  background-image url(/proj-assets/food-delivery/img/map.webp)
</style>