<template>
  <footer class="the-footer">
    <img class="the-footer__readr" src="/proj-assets/food-delivery/img/readr--comp.svg" alt="">
    <OtherReports class="the-footer__other-reports" />
    <DonateItem class="the-footer__donate"/>
    <SubscrItem />
  </footer>
</template>

<script>
import OtherReports from './OtherReports.vue'
import DonateItem from './DonateItem.vue'
import SubscrItem from './SubscrItem.vue'

export default {
  name: 'TheFooter',
  components: {
    OtherReports,
    DonateItem,
    SubscrItem
  }
}
</script>

<style lang="stylus">
.the-footer
  background-color #ffdc03
  font-size 1.5rem
  line-height normal
  padding-top 20px
  padding-left 40px
  padding-right 40px
  &__readr
    width 45px
    display block
    // vertical-align middle
    margin-bottom 15px
    margin-left auto
    margin-right auto
  &__other-reports
    margin-bottom 20px
  &__donate
    margin-bottom 20px
</style>