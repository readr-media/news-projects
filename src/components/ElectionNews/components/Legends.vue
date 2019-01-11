<template>
  <div class="legends">
    <div class="legends__top top">
      <p>情緒說明文字</p>
      <p>假文假文假文假文假文假文假文假文假文假文假文假文假文</p>
    </div>
    <div class="legends__bottom bottom">
      <div class="bottom__left sentiment">
        <img src="/proj-assets/election-news/img/sentiment-bad-arrow.svg" alt="">
        <p>0 ~ 3.75</p>
      </div>
      <div class="bottom__middle sentiment">
        <img src="/proj-assets/election-news/img/sentiment-normal-arrow.svg" alt="">
        <p>3.75 ~ 6.25</p>
      </div>
      <div class="bottom__right sentiment">
        <img src="/proj-assets/election-news/img/sentiment-good-arrow.svg" alt="">
        <p>6.25 ~ 10</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.legends
  &__bottom
    margin 10px 0 0 0

.top
  p
    margin 2px 0
    line-height 1.3
    font-size 12px

.bottom
  display flex

.sentiment
  display flex
  flex-direction column
  justify-content center
  align-items center
  img
    width 34px
  p
    margin 3px 0 0 0
    font-size 10px
  & + &
    margin 0 0 0 12px
</style>