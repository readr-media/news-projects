<template>
  <div class="story-credits">
    <div class="story-credits__row story-credits__row--more-margin-bottom">
      <a href="https://www.mirrormedia.mg" target="_blank">
        <img class="story-credits__mm-logo" src="/proj-assets/political-contribution/mm.png" alt="">
      </a>
    </div>
    <template v-if="!isNewCredit">
      <div class="story-credits__row story-credits__row--mobile-break">
        <p class="story-credits__credit">文字：李又如</p>
        <p class="story-credits__credit">設計：陳怡蒨</p>
        <p class="story-credits__credit">工程：熊凱文</p>
      </div>
      <div class="story-credits__row">
        <p class="story-credits__credit">資料整理：李又如、熊凱文</p>
      </div>
      <div v-if="showSpecialThanks" class="story-credits__row">
        <p class="story-credits__credit">資料分析：李宗榮</p>
      </div>
      <div class="story-credits__row">
        <p class="story-credits__published-date">發布日期：{{ publishedDate }}</p>
      </div>
    </template>
    <template v-else>
      <div class="story-credits__row story-credits__row--mobile-break">
        <p class="story-credits__credit">文字：李又如</p>
        <p class="story-credits__credit">設計：陳怡蒨</p>
        <p class="story-credits__credit">工程：熊凱文</p>
      </div>
      <div class="story-credits__row">
        <p class="story-credits__credit story-credits__credit--line-break">資料協力：<br><a href="https://ronny.tw/" target="_blank">Ronny Wang</a>、<br>Timothy Lee、<br><a href="https://campaign-finance.g0v.ctiml.tw/" target="_blank">參與「鍵盤救國」的鄉民們</a></p>
      </div>
      <div v-if="showSpecialThanks" class="story-credits__row">
        <p class="story-credits__credit">資料分析：李宗榮</p>
      </div>
      <div v-if="showConsultant" class="story-credits__row">
        <p class="story-credits__credit">資料顧問：卞中佩</p>
      </div>
      <div class="story-credits__row">
        <p class="story-credits__published-date">發布日期：{{ publishedDate }}</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    showSpecialThanks: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: String,
      required: true,
    },
    isNewCredit: {
      type: Boolean,
      default: false,
    },
    showConsultant: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style lang="stylus" scoped>
.story-credits
  display flex
  flex-direction column
  justify-content center
  align-items center
  margin 40px 0 48px 0
  &__row
    display flex
    font-size 17px
    text-align center
    color #808080
    margin 4px 0
    &--more-margin-bottom
      margin 4px 0 8px 0
  &__mm-logo
    width 40px
    height auto
  &__credit
    margin 0
    & + &
      margin 0 0 0 8px
    & > a
      color #808080
    &--line-break
      br
        display none
  &__published-date
    margin 0

@media (max-width 1024px)
  .story-credits
    margin 25px 0
    &__row
      font-size 18px
      &--mobile-break
        margin 0
        flex-direction column
        .story-credits__credit
          margin 4px 0
    &__credit
      &--line-break
        line-height 1.3
        br
          display initial
</style>

