<template>
  <section class="subscr">
    <div class="subscr__intro">
      <a
        href="https://www.readr.tw/"
        target="_blank"
      >
        <img
          class="subscr__img"
          src="/proj-assets/unitedfront/logo-readr.png"
          alt="readr logo"
        >
      </a>
      <div class="subscr__text text">
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
      class="subscr__form"
    />
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

<style lang="stylus" scoped>
.subscr
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
  &__form
    margin 10px 0 0 0
    width 650px
  & >>> .subscription-wrapper
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
        background-color #ff8261
        line-height normal
        font-size 14px
        height 44px
        border-radius 4px
        margin-left 6px
        transition background-color 0.3s
        flex-shrink 0
        width 80px
        color white
        @media (min-width 460px)
          width 108px
    & .info
      padding-left 14px

.text
  &__mobile
    display none

@media (max-width 768px)
  .subscr
    width calc(100% - 40px)
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
