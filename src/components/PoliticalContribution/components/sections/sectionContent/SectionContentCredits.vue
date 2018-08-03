<template>
  <div class="story-credits">
    <div class="story-credits__row">
      <p class="story-credits__credit">文：李又如</p>
      <p class="story-credits__credit">設計：陳怡蒨</p>
    </div>
    <div class="story-credits__row story-credits__row--mobile-break">
      <p class="story-credits__credit">網站製作：熊凱文</p>
      <p class="story-credits__credit">資料整理：李又如、熊凱文</p>
    </div>
    <div v-if="showSpecialThanks" class="story-credits__row">
      <p class="story-credits__credit">資料分析：李宗榮</p>
    </div>
    <div class="story-credits__row">
      <p class="story-credits__published-date">發布日期：{{ publishedDate }}</p>
    </div>
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
  &__credit
    margin 0
    & + &
      margin 0 0 0 8px
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
</style>

