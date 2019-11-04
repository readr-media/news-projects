<template>
  <div class="base-report">
    <!-- <HeaderIconsReport /> -->
    <!-- <MapMarker num="1" class="base-report__marker" /> -->
    <HeaderIcons />
    <section v-for="reportId in reportIds" :key="`report-${reportId}`">
      <div class="base-report__wrapper">
        <MapMarker :num="reportId" class="base-report__marker" />
      </div>
      <component :is="`ReportContent${reportId}`" />
      <ReportResult />
    </section>
  </div>
</template>

<script>
// import HeaderIconsReport from './HeaderIconsReport.vue'
import HeaderIcons from './HeaderIcons.vue'
import MapMarker from './MapMarker.vue'
import ReportResult from './ReportResult.vue'

export default {
  name: 'BaseReport',
  components: {
    // HeaderIconsReport,
    HeaderIcons,
    MapMarker,
    ReportResult,
    ReportContent1: () => import('./ReportContent1.vue'),
    ReportContent2: () => import('./ReportContent2.vue'),
    ReportContent3: () => import('./ReportContent3.vue'),
    ReportContent4: () => import('./ReportContent4.vue'),
    ReportContent5: () => import('./ReportContent5.vue')
  },
  computed: {
    stateFD () {
      return this.$store.state.FoodDelivery
    },
    reportIds () {
      const start = (this.stateFD.clickedReportId - 1)
      return this.stateFD.reportIds.slice(start)
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
  background-color #f5f4f5
  width 100%
  height 100%
  overflow-y auto
  &__wrapper
    height 84px
    display flex
    align-items center
    justify-content center
  &__marker
    width 25.42px
    height 35.8px
  & .marker-color
    fill #000
</style>