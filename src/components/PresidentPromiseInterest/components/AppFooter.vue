<template>
  <footer class="footer">
    <AppFooterPromiseDone/>
    <AppFooterCredits class="footer__credits"/>
    <section class="footer__relateds relateds">
      <h1 class="relateds__title">其他議題</h1>
      <RelatedReports class="relateds__reports"/>
    </section>
  </footer>
</template>

<script>
import AppFooterPromiseDone from './AppFooterPromiseDone.vue'
import AppFooterCredits from './AppFooterCredits.vue'
import RelatedReports from '../../RelatedReports.vue'

export default {
  components: {
    AppFooterPromiseDone,
    AppFooterCredits,
    RelatedReports,
  }
}
</script>

<style lang="stylus" scoped>
.footer
  &__credits
    margin 68px 0

.relateds
  display flex
  flex-direction column
  justify-content center
  align-items center
  &__title
    font-size 34px
    font-weight 400
    line-height 1.06
    text-align center
    color #ffffff
    margin 0
  &__reports
    & >>> .report
      &:hover
        background-color #2b616d !important

@media (max-width 425px)
  .footer
    &__credits
      margin 50px 0

  .relateds
    &__title
      font-size 24px
      line-height 1.5
</style>


