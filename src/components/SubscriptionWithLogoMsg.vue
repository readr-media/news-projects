<template>
  <section class="subscr-l-m">
    <div class="subscr-l-m__heading">
      <slot>
        <picture>
          <source srcset="/proj-assets/logo_readr_v2_black.webp" type="image/webp">
          <img src="/proj-assets/logo_readr_v2_black.png" alt="READr">
        </picture>
      </slot>
      <slot><p>留下信箱，第一時間獲得專題相關消息</p></slot>
    </div>
    <Subscription />
  </section>
</template>
<script>
import Subscription from 'src/components/Subscription.vue'

export default {
  name: 'SubscriptionWithLogoMsg',
  components: {
    Subscription
  }
}
</script>
<style lang="stylus" scoped>
.subscr-l-m
  &__heading
    display flex
    justify-content center
    align-items center
    width calc(100% - 30px)
    margin 0 auto
    picture
      width 60px
      img
        width 90%
    p
      margin 0 0 0 15px
      font-size .875rem
      line-height 1.7
      text-align left
  .subscription-wrapper
    margin-top 10px
  >>> .subscription__input
    height 44px
    background-color rgba(216,216,216,0.15)
    border-radius 4px
  >>> .subscription__btn
    height 44px
    margin-left 5px
    background-color rgba(0, 0, 0, 0.87)

@media (min-width: 768px)
  .subscr-l-m__heading
    flex-direction column
    p
      margin 10px 0 0
</style>