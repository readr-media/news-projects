<template>
  <div class="tooltip-item">
    <div :class="[ 'tooltip-item__sentiment', 'sentiment', { 'sentiment--hide': newsCount === 0 } ]">
      <img class="sentiment__icon" :src="`/proj-assets/election-news/img/sentiment-${sentimentScoreString}.svg`" alt="">
      <p class="sentiment__score" v-text="sentimentScore"></p>
    </div>
    <div class="tooltip-item__info info">
      <p class="info__keyword" v-text="keyword"></p>
      <p class="info__sourcescount">媒體數量：{{ sourcesCount }}</p>
      <p class="info__newscount">新聞則數：{{ newsCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newsCount: {
      type: Number,
      default: 0
    },
    sentimentScoreString: {
      type: String,
      default: ''
    },
    sentimentScore: {
      type: String,
      default: ''
    },
    sourcesCount: {
      type: Number,
      default: 0
    },
    keyword: {
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="stylus" scoped>
.tooltip-item
  display flex
  &__sentiment
    margin 0 20px 0 0

.sentiment
  display flex
  flex-direction column
  align-items center
  &--hide
    opacity 0
  &__icon
    height 30px
  &__score
    margin 10px 0 0 0
    font-size 10px

.info
  &__keyword
    margin 0
    font-size 12px
  &__sourcescount
    margin 5px 0 0 0
    font-size 12px
  &__newscount
    margin 5px 0 0 0
    font-size 12px
</style>