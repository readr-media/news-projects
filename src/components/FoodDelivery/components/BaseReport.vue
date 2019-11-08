<template>
  <div class="base-report" id="base-report" @scroll="changeRouter" :class="{ show: isReportContent }">
    <!-- <HeaderIcons /> -->
    <section v-for="(reportId, idx) in currentReportIds" :key="`report-${reportId}`" :ref="`report${idx}`">
      <div class="base-report__wrapper">
        <MapMarker :num="reportId" class="base-report__marker" />
      </div>
      <component :is="`ReportContent${reportId}`" />
      <ReportResult />
    </section>
    <TheFooter />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('FoodDelivery')

// import HeaderIcons from './HeaderIcons.vue'
import MapMarker from './MapMarker.vue'
import ReportResult from './ReportResult.vue'
import TheFooter from './TheFooter.vue'

export default {
  name: 'BaseReport',
  components: {
    // HeaderIcons,
    MapMarker,
    ReportResult,
    TheFooter,
    ReportContent1: () => import('./ReportContent1.vue'),
    ReportContent2: () => import('./ReportContent2.vue'),
    ReportContent3: () => import('./ReportContent3.vue'),
    ReportContent4: () => import('./ReportContent4.vue'),
    ReportContent5: () => import('./ReportContent5.vue')
  },
  data () {
    return {
      reportIdx: 0
    }
  },
  computed: {
    ...mapState([
      'isReportContent',
      'clickedReportId',
      'reportIds'
    ]),
    currentReportIds () {
      const start = (this.clickedReportId - 1)
      return this.reportIds.slice(start)
    }
  },
  methods: {
    changeRouter () {
      const reportContainer = this.$el
      // const reportPrev = this.$refs.report[this.reportIdx]
      // const reportNext = this.$refs.report[(this.reportIdx + 1)] || reportContainer.scrollHeight
      const reportPrev = this.$refs[`report${this.reportIdx}`][0]
      const reportNext = this.$refs[`report${this.reportIdx + 1}`][0] || reportContainer.scrollHeight

      const reportContainerScrollT = reportContainer.scrollTop
      const reportPrevOffsetT = reportPrev.offsetTop
      const reportNextOffsetT = reportNext.offsetTop

      if (reportContainerScrollT >= reportNextOffsetT) {
        this.reportIdx += 1
        this.$router.replace(`/project/food-delivery/order${this.clickedReportId + this.reportIdx}`).catch((err) => {})
      } else if (reportContainerScrollT < reportPrevOffsetT) {
        this.reportIdx -= 1
        this.$router.replace(`/project/food-delivery/order${this.clickedReportId + this.reportIdx}`).catch((err) => {})
      }
    }
  },
  watch: {
    isReportContent (newVal) {
      if (newVal) {
        this.$el.scrollTop = 0
        this.reportIdx = 0
      }
    }
  }
}
</script>

<style lang="stylus">
.base-report
  position fixed
  top 0
  left 0
  z-index 9
  // background-color #f5f4f5
  width 100%
  height 100%
  overflow-y auto
  transform translateX(100%)
  &.show
    transform translateX(0%)
  &__wrapper
    height 84px
    display flex
    align-items center
    justify-content center
    background-color #f5f4f5
  &__marker
    width 25.42px
    height 35.8px
  & .marker-color
    fill #000
</style>