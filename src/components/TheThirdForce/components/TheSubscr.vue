<template>
  <section class="subscr">
    <div class="subscr__intro">
      <a href="https://www.readr.tw/" target="_blank">
        <img src="/proj-assets/the-third-force/img/logo-readr-black.png" alt="readr logo">
      </a>
      <div class="text">
        <p class="text__desk">READr 致力於以有趣的形式，提供多元觀點的啟蒙式內容。</p>
        <p>留下信箱，第一時間獲得專題相關消息。</p>
      </div>
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
  width 100%
  margin-right auto
  margin-left auto
  font-size 1.4rem
  color rgba(0, 0, 0, 0.87)
  line-height 1.57
  background-color #f6f6f6
  padding 48px 15px
  @media (min-width $breakpoint.sm)
    padding-top 42px
    padding-bottom 84px
  &__intro
    display flex
    padding-right 15px
    padding-left 15px
    margin-bottom 24px
    align-items center
    @media (min-width $breakpoint.sm)
      display block
      text-align center
      padding-right 0
      padding-left 0
    & a
      display block
      width 48px
      flex-shrink 0
      cursor pointer
      @media (min-width $breakpoint.sm)
        margin-right auto
        margin-left auto
    & img
      width 100%
      vertical-align middle
    & .text
      padding-left 14px
      @media (min-width $breakpoint.sm)
        padding-left 0
        margin-bottom 32px
        margin-top 32px
      &__desk
        display none
        @media (min-width $breakpoint.sm)
          display block
  & .subscription-wrapper
    max-width 692px
    margin-left auto
    margin-right auto
    & .subscription
      width 100%
      box-sizing border-box
      max-width 100%
      &__input
        background-color #fff
        height 44px
        font-size 1.4rem
        border-radius 0
        padding-right 14px
        padding-left 14px
        // debug layout error for Slack, but I don't know why.
        min-width 0
        transition box-shadow 0.15s ease-out
        outline 0
        &::-webkit-input-placeholder
          color rgba(0, 0, 0, 0.66)
        &:focus
          box-shadow inset 0 0 0 2px #eeeeee
      &__btn
        background-color #f0ff57
        color rgba(0, 0, 0, 0.87)
        line-height normal
        font-size 1.4rem
        height 44px
        border-radius 0
        margin-left 9px
        transition background-color 0.3s
        flex-shrink 0
        width 80px
        @media (min-width $breakpoint.sm)
          width 108px
        // &:hover
        //   background-color #6fb4ba
        &:active
          background-color #838b30
          transition none
    & .info
      padding-left 14px
</style>