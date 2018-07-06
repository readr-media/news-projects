<template>
  <section class="related-reports" :class="theme">
    <a v-for="report in highlight" :key="report.id" class="report" :href="getReportUrl(report.slug)" target="_blank">
      <div class="report__img" :style="{ 'background-image': `url(${getReportImg(report)})` }"></div>
      <h1 v-text="report.title"></h1>
      <p v-text="report.description"></p>
    </a>
    <template v-for="items in loadmoreItems" v-if="showLoadmore">
      <a v-for="report in items" v-if="items.length === 3 || (!hasMore && items.length < 3)" :key="report.id" class="report" :href="getReportUrl(report.slug)" target="_blank">
        <div class="report__img" :style="{ 'background-image': `url(${getReportImg(report)})` }"></div>
        <h1 v-text="report.title"></h1>
        <p v-text="report.description"></p>
      </a>
    </template>
    <div>
      <button v-if="hasMore" @click="loadmore">看更多</button>
    </div>
  </section>
</template>

<script>
import { chunk, filter, get, slice, take } from 'lodash'
import { getReportUrl } from 'src/util/comm'
import superagent from 'superagent'

const MAXRESULT_REPORTS = 4
const DEFAULT_PAGE = 1
const DEFAULT_SORT = '-published_at'

const fetchReports = (store, {
  maxResult = MAXRESULT_REPORTS,
  sort = DEFAULT_SORT,
  page = DEFAULT_PAGE
} = {}) => {
  return store.dispatch('FETCH_REPORTS', {
    params: {
      maxResult: maxResult,
      where: {
        reportPublishStatus: 2,
      },
      page: page,
      sort: sort,
    },
  })
}

const fetchReportsCount = (store) => {
  return store.dispatch('FETCH_REPORTS_COUNT')
}

export default {
  name: 'RelatedReports',
  props: {
    theme: { // value: dark, white
      type: String,
      default: 'dark',
    }
  },
  data () {
    return {
      page: DEFAULT_PAGE,
      showLoadmore: false,
    }
  },
  computed: {
    currentSlug () {
      return get(this.$route, 'params.project', '')
    },
    highlight () {
      return take(this.reports, 3)
    },
    hasMore () {
      return get(this.$store, 'state.reports.length', 0) < get(this.$store, 'state.reportsCount', 0)
    },
    loadmoreItems () {
      return chunk(slice(this.reports, 3), 3)
    },
    reports () {
      return filter(get(this.$store, 'state.reports'), i => i.slug !== this.currentSlug) || []
    }
  },
  beforeMount () {
    Promise.all([fetchReports(this.$store), fetchReportsCount(this.$store)])
  },
  methods: {
    loadmore () {
      this.showLoadmore = true
      this.page += 1
      fetchReports(this.$store, { page: this.page })
    },
    getReportImg (report) {
      return report.ogImage || report.heroImage || ''
    },
    getReportUrl
  }
}
</script>

<style lang="stylus">

.related-reports
  position relative
  padding 20px
  > div
    width 100%
  button
    display block
    width 100%
    padding .8em 0
    border none
    border-radius 30px
    cursor pointer
    outline none 
.report
  display block
  padding 25px 0
  text-decoration none
  transition background-color .5s
  h1, p
    margin 0
  h1
    margin-top 15px
    font-size 1.625rem
    font-weight 300
  p
    max-height 4.5rem
    margin 15px 0 0
    font-size 1rem
    font-weight 300
    line-height 1.5rem
    overflow hidden
  &__img
    width 100%
    padding-top 50%
    background-color #d3d3d3
    background-size cover
    background-position center center
    background-repeat no-repeat
.related-reports.dark
  color #fff
  button
    color #000
    background-color #fff
  .report
    color #fff
    background-color #000
    &:hover
      background-color #434343
.related-reports.white
  color #000
  button
    color #fff
    background-color #000
  .report
    color #000
    background-color #fff
    &:hover
      background-color #dbdbdb

@media (min-width: 768px)
  .related-reports
    display flex
    flex-wrap wrap
    justify-content flex-start
    button
      width calc((100% - 60px) / 3)
      margin 0 auto
  .report
    width calc((100% - 60px) / 3)
    margin 10px 10px
    padding 25px 20px
@media (min-width: 900px)
  .related-reports
    padding 20px 20%
</style>
