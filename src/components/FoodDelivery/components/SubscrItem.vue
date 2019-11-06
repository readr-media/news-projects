<template>
  <section class="subscr-item">
    <p>留下信箱，</p>
    <p>第一時間獲得專題相關消息。</p>
    <Subscription />
  </section>
</template>

<script>
import Subscription from 'src/components/Subscription.vue'

export default {
  name: 'SubscrItem',
  components: {
    Subscription
  }
}
</script>

<style lang="stylus">
.subscr-item
  text-align center
  & .subscription-wrapper
    margin-top 20px
    & .subscription
      // font-size 1.5rem
      &__input
        height 40px
        font-size 1.5rem
        border-radius 10px
        line-height 40px
        flex 1 0 70.83%
        // font-weight 500
        &::placeholder
          color #9b9b9b
          font-weight 500
      &__btn
        height 40px
        font-size 1.5rem
        border-radius 10px
        font-weight 500
        background-color #4a4a4a
        line-height 40px
        // width 18.75%
        flex 0 0 25%
</style>
