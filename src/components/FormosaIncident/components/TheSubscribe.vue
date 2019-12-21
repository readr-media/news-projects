<template>
  <section class="the-subscr">
    <div class="the-subscr__intro">
      <a
        href="https://www.readr.tw/"
        target="_blank"
      >
        <picture class="the-subscr__img" >
          <source type="image/webp" srcset="/proj-assets/formosaincident/img/logo-readr.webp">
          <img src="/proj-assets/formosaincident/img/logo-readr.png" alt="READr logo">
        </picture>
      </a>
      <div class="the-subscr__text text">
        <div class="text__desktop">
          <p>READr 致力於以有趣的形式，提供多元觀點的啟蒙式內容。</p>
          <p>有更新資料與最新報導出爐時，第一時間通知你！</p>
        </div>
        <div class="text__mobile">
          <p>留下信箱，第一時間獲得專題相關消息。</p>
        </div>
      </div>
    </div>
    <Subscription
      class="the-subscr__form"
    />
  </section>
</template>

<script>
import Subscription from 'src/components/Subscription.vue'

export default {
  name: 'TheSubscribe',
  components: {
    Subscription
  }
}
</script>

<style lang="stylus">
.the-subscr
  display flex
  flex-direction column
  align-items center
  &__intro
    display flex
    flex-direction column
    align-items center
    p
      margin 10px 0 0 0
      font-size 14px
      color #7d7d7d
  &__text
    text-align center
  &__img
    width 48px
    & img
      width 100%
      height auto
  &__form
    margin 10px 0 0 0
    width 650px
  & .subscription-wrapper
    & .subscription
      width 100%
      box-sizing border-box
      max-width 100%
      &__input
        background-color rgba(216, 216, 216, 0.15)
        height 44px
        font-size 14px
        border-radius 4px
        padding-right 14px
        padding-left 14px
        // debug layout error for Slack, but I don't know why.
        min-width 0
        &::placeholder
          color #9b9b9b
      &__btn
        background-color #94d7cd
        line-height normal
        font-size 14px
        height 44px
        border-radius 4px
        margin-left 6px
        transition background-color 0.3s
        flex-shrink 0
        width 80px
        color black
        @media (min-width 460px)
          width 108px
        &:hover
          background-color #bdfaf1
        &:active
          background-color #30575a
          transition none
    & .info
      padding-left 14px

.text
  &__mobile
    display none

@media (max-width 719.98px)
  .the-subscr
    width 100%
    &__intro
      flex-direction row
      align-items center
    &__form
      width 100%
  
  .text
    width 206px
    margin 0 0 0 17px
    &__desktop
      display none
    &__mobile
      display initial
      text-align left
      line-height 1.71
      p
        margin 0
</style>