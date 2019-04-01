<template>
  <div class="related">
    <div class="related-container">
      <h3>READr 的更多專題</h3>
      <a v-for="report in reportFiltered"
        :key="report.id"
        :href="getReportUrl(report.slug)"
        class="report"
        target="_blank" >
        <figure>
          <img :src="report.heroImage" :alt="report.title">
        </figure>
        <p class="report__title" v-text="report.title"></p>
        <p v-text="report.ogDescription"></p>
      </a>
      <a href="https://www.readr.tw/series-list" class="more-report" target="_blank">到 READr 看更多專題</a>
    </div>
    <FakeNewsCredit v-if="$store.state.viewport[0] >= 1024"/>
  </div>
</template>
<script>
import FakeNewsCredit from './FakeNewsCredit.vue'
import { getReportUrl } from 'src/util/comm'

export default {
  name: 'FakeNewsRelated',
  components: {
    FakeNewsCredit
  },
  props: {
    reports: {
      type: Array
    },
  },
  computed: {
    reportFiltered () {
      return this.reports.filter(report => report.slug !== this.$route.params.project).slice(0, 3)
    }
  },
  methods: {
    getReportUrl
  }
}
</script>
<style lang="stylus" scoped>
.related
  h3
    margin 0
    color #4a4a4a
    font-size .9375rem
  p
    color #4a4a4a
    font-size .875rem
  a
    text-decoration none
    &.more-report
      display inline-block
      margin-top 1.5em
      color #4868a5
      font-size .875rem
      font-weight 600
  figure
    position relative
    margin 0
    padding-top 66.66%
    background-color #f5f6f7
    img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      object-fit cover
      object-position center center
  &-container
    padding .5em
    background-color #fff
    border 1px solid #dddfe2
    border-left none
    border-right none
  .report
    display block
    margin-top 1em
    &__title
      margin .5em 0
      font-weight 600

@media (min-width: 1024px)
  .related
    &-container
      border-left 1px solid #dddfe2
      border-right 1px solid #dddfe2
      border-radius 4px

</style>
