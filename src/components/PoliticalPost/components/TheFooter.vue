<template>
  <footer class="the-footer">
    <TheCredit />
    <DonateItem
      class="the-footer__donate"
    />
    <TheSubscribe
      class="the-footer__newsletter"
    />
  </footer>
</template>

<script>
import TheCredit from './TheCredit.vue'
import DonateItem from './DonateItem.vue'
import TheSubscribe from './TheSubscribe.vue'

export default {
  components: {
    TheCredit,
    DonateItem,
    TheSubscribe
  }
}
</script>

<style lang="stylus">
.the-footer
  padding 47px 0
  display flex
  flex-direction column
  align-items center
  position relative
  z-index 200

@media (max-width 768px)
  .the-footer
    padding 30px 10px
</style>