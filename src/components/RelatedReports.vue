<template>
  <section class="related-reports">
    <a v-for="report in reports" :key="report.id" class="report" :href="getReportUrl(report.slug)" target="_blank">
      <div class="report__img" :style="{ 'background-image': `url(${report.ogImage})` }"></div>
      <h1 v-text="report.title"></h1>
      <p v-text="report.description"></p>
    </a>
    <button v-if="hasMore" @click="loadmore">看更多</button>
  </section>
</template>

<script>
import { filter, get } from 'lodash'
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
        publishStatus: 2,
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
  data () {
    return {
      page: DEFAULT_PAGE,
    }
  },
  computed: {
    currentSlug () {
      return get(this.$route, 'params.project', '')
    },
    hasMore () {
      return get(this.$store, 'state.reports.length', 0) < get(this.$store, 'state.reportsCount', 0)
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
      if (this.hasMore) {
        this.page += 1
        console.log('this.page', this.page)
        fetchReports(this.$store, { page: this.page })
      }
    },
    getReportUrl
  }
}
</script>

<style lang="stylus">

.related-reports
  position relative
  padding 20px
  color #fff
  button
    width 100%
    padding .8em 0
    background-color #fff
    border none
    border-radius 30px
    cursor pointer
    outline none 
.report
  display block
  padding 25px 0
  color #fff
  text-decoration none
  transition background-color .5s
  &:hover
    background-color #434343
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

@media (min-width: 768px)
  .related-reports
    display flex
    flex-wrap wrap
    justify-content flex-start

  .report
    width calc((100% - 60px) / 3)
    margin 10px 10px
    padding 25px 20px
@media (min-width: 900px)
  .related-reports
    padding 20px 20%
</style>
