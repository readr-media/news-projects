<template>
  <div class="related-reports--wrapper">
    <a :href="`/series/${currentProjectSlug}/donate`" class="related-reports--donate" :class="theme" v-if="currentProjectSlug && donationActive" target="_blank" @click="sendGA">
      <span v-text="$t('DONATE_PREFIX')"></span>
      <span class="donate-icon"></span>
      <span v-text="$t('DONATE_POSTFIX')"></span>
    </a>
    <div class="related-reports--title" :class="{ active: displayTitle, }"><span v-text="$t('RELATED_REPORT')"></span></div>
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
        <button v-if="hasMore" @click="loadmore" v-text="$t('MORE')"></button>
      </div>
    </section>  
  </div>
</template>

<script>
import { chunk, find, filter, get, slice, take } from 'lodash'
import { getReportUrl } from 'src/util/comm'

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
    },
    displayTitle: {
      type: Boolean,
      default: false,
    },
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
    currentProjectSlug () {
      return get(find(get(this.$store, 'state.reports'), { slug: this.currentSlug }), 'project.slug')
    },
    donationActive () {
      return get(this.$store, 'state.setting.DONATION_ACTIVE', false)
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
    getReportUrl,
    sendGA () {
      window.ga('send', 'event', 'projects', 'click', `donate`, { nonInteraction: false })
    }
  }
}
</script>

<style lang="stylus">

.related-reports
  &--donate
    width calc(100% - 40px)
    display flex
    justify-content center
    align-items center
    background-color #ddcf21
    font-size 1.75rem
    text-shadow none
    padding 10px
    margin 50px auto
    &, &:hover, &:link, &:visited
      color #000
      text-decoration none
    &:hover
      box-shadow 0 0 15px rgba(0, 0, 0, 0.2)
    &.dark
      background-color #fff
      .donate-icon
        background-image url(/proj-assets/donate.png)
      &:hover
        box-shadow 0 0 15px rgba(255, 255, 255, 0.9)    
    .donate-icon
      height 34px
      width 34px
      display inline-block
      margin 0 10px
      background-image url(/proj-assets/donate-black.png)
      background-repeat no-repeat
      background-size contain
      background-position center center
  &--title
    display none
    width 100%
    font-size 2.125rem
    font-weight normal
    line-height 1.06
    color #313131    
    justify-content center
    align-items center
    &.active
      display flex
  position relative
  > div
    width calc(100% - 40px)
    margin 0 auto
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
  padding 25px 20px
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
    &:hover
      background-color #434343
.related-reports.light
  color #000
  button
    color #fff
    background-color #000
  .report
    color #000
    &:hover
      background-color #dbdbdb

@media (min-width: 768px)
  .related-reports
    display flex
    flex-wrap wrap
    justify-content flex-start
    padding 0 20px
    button
      width calc((100% - 60px) / 3)
      margin 0 auto
    &--donate
      width calc(60% - 50px)
  .report
    width calc((100% - 60px) / 3)
    margin 10px 10px
    padding 25px 20px
@media (min-width: 900px)
  .related-reports
    padding 20px 20%
</style>
