<template>
  <section class="other-reports">
    <div class="other-reports__title">更多精彩專題</div>
    <!-- todo what 最新報導 -->
    <a v-for="report in this.$store.state.FoodDelivery.otherReports" :href="`https://www.readr.tw/project/${report.slug}`" :key="report.id" target="_blank">{{ report.title }}</a>
  </section>
</template>

<script>
export default {
  name: 'OtherReports'
}
</script>

<style lang="stylus">
.other-reports
  text-align center
  &__title
    margin-bottom 20px
  & a
    text-decoration underline
    color #000
    font-weight 500
    display block
    & + a
      margin-top 20px
</style>