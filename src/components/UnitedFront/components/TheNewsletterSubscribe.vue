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
      <p>READr 致力於以有趣的形式，提供多元觀點的啟蒙式內容。</p>
      <p>有更新資料與最新報導出爐時，第一時間通知你！</p>
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
        background-color #427b80
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
          background-color #6fb4ba
        &:active
          background-color #30575a
          transition none
    & .info
      padding-left 14px
</style>