<template>
  <section class="subscr">
    <div class="subscr__intro">
      <a href="https://www.readr.tw/" target="_blank"><img src="/proj-assets/nanfangao-bridge/img/logo-readr.png" alt="readr logo"></a>
      <p>有更新資料與最新報導出爐時，第一時間通知你！</p>
    </div>
    <Subscription />
  </section>
</template>

<script>
import Subscription from 'src/components/Subscription.vue'

export default {
  name: 'TheSubscr',
  components: {
    Subscription
  }
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.subscr
  max-width 650px
  width 100%
  margin-top 80px
  margin-right auto
  margin-left auto
  font-size 1.4rem
  color #7d7d7d
  line-height 1.7
  @media (min-width $desktop-breakpoint)
    margin-top 115px
  &__intro
    display flex
    padding-right 14px
    padding-left 14px
    margin-bottom 10px
    // align-items center
    @media (min-width 460px)
      display block
      text-align center
      padding-right 0
      padding-left 0
    & a
      display block
      width 48px
      flex-shrink 0
      cursor pointer
      @media (min-width 460px)
        margin-right auto
        margin-left auto
    & img
      width 100%
      vertical-align middle
    & p
      padding-left 15px
      @media (min-width 460px)
        margin-top 10px
        padding-left 0
  & .subscription-wrapper
    & .subscription
      width 100%
      box-sizing border-box
      max-width 100%
      &__input
        background-color rgba(216, 216, 216, 0.15)
        height 44px
        font-size 1.4rem
        border-radius 4px
        padding-right 14px
        padding-left 14px
        // debug layout error for Slack, but I don't know why.
        min-width 0
        &::-webkit-input-placeholder
          color #9b9b9b
      &__btn
        background-color #427b80
        line-height normal
        font-size 1.4rem
        height 44px
        border-radius 4px
        margin-left 6px
        transition background-color 0.3s
        flex-shrink 0
        width 80px
        @media (min-width 460px)
          width 108px
        &:hover
          background-color #6fb4ba
        &:active
          background-color #30575a
          transition none
    & .info
      padding-left 14px
</style>