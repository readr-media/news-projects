<template>
  <main class="report-list">
    <article class="report-list__report" v-for="report in reports" :key="report.id">
      <a :href="report.link" target="_blank">
        <picture>
          <source type="image/webp" :srcset="`/proj-assets/the-third-force/img/report/${report.imgName}.webp`">
          <img :src="`/proj-assets/the-third-force/img/report/${report.imgName}.png`" alt="">
        </picture>
        <div class="report-list__text">
          <h2>{{ report.title }}</h2>
          <p>{{ report.intro }}</p>
        </div>
      </a>
    </article>
  </main>
</template>

<script>
import reports from '../constant/reports.js'

export default {
  name: 'ReportList',
  data () {
    return {
      reports
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.report-list
  max-width 1104px
  margin-right auto
  margin-left auto
  @media (min-width $breakpoint.md)
    display flex
    flex-wrap wrap
    max-width 712px
    // 65 - 18
    padding-top 47px
  @media (min-width $breakpoint.xl)
    max-width 1176px
    // 130 - 36
    padding-top 94px
  &__report
    padding-top 20px
    @media (min-width $breakpoint.md)
      width 50%
      padding 18px
    @media (min-width $breakpoint.xl)
      width calc(100% / 3)
      padding 36px
    & > a
      display block
      cursor pointer
      text-decoration none
      color rgba(#000, 0.87)
      position relative
      transition box-shadow 0.25s ease-out
    & img
      width 100%
      height 169px
      display block
      object-fit cover
      object-position center center
    & h2
      font-size 2.0rem
      font-weight 700
      line-height 1.3
      margin-bottom 16px
    & p
      font-size 1.6rem
      line-height 2
      text-align justify
  &__text
    padding 18px 10px
    background-color #f6f6f6
</style>
