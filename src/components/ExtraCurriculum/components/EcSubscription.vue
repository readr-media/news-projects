<template>
  <section class="ec-subscription">
    <div class="subscr-heading">
      <picture>
        <source srcset="/proj-assets/logo_readr_v2_black.webp" type="image/webp">
        <img src="/proj-assets/logo_readr_v2_black.png" alt="READr">
      </picture>
      <p>留下信箱，第一時間獲得專題相關消息。</p>
    </div>
    <Subscription />
  </section>
</template>
<script>
import Subscription from 'src/components/Subscription.vue'

export default {
  name: 'EcSubscription',
  components: {
    Subscription
  }
}
</script>
<style lang="stylus" scoped>
.ec-subscription
  padding 50px 0
  background-color #fff
  .subscr-heading
    display flex
    justify-content center
    picture
      width 60px
      img
        width 90%
    p
      margin 0 0 0 15px
      font-size .875rem
      line-height 1.7
  .subscription-wrapper
    margin-top 10px
  >>> .subscription__input
    height 44px
    background-color rgba(216,216,216,0.15)
    border-radius 4px
  >>> .subscription__btn
    height 44px
    margin-left 5px
    background-color #2c585e
</style>