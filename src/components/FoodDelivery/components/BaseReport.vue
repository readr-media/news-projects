<template>
  <div class="base-report">
    <HeaderIconsReport />
    <HeaderIcons />
    <slot name="report"></slot>
    <slot name="result"></slot>
  </div>
</template>

<script>
import HeaderIconsReport from './HeaderIconsReport.vue'
import HeaderIcons from './HeaderIcons.vue'

export default {
  name: 'BaseReport',
  components: {
    HeaderIconsReport,
    HeaderIcons
    // ReportFigure
  }
}
</script>

<style lang="stylus">
.base-report
  position relative

</style>