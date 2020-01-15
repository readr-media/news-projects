<template>
  <div class="ec-c-c">
    <div class="ec-c-c__text">
      <p>全台灣 2632 間小學中，<strong>晨光時間有校外團體進入</strong>的學校佔了整體 33%。</p>
    </div>
    <div class="ec-c-c__text">
      <p>這些團體的類型，<strong>以宗教團體為大宗</strong>，佔總入校團體類型的四成，服務校數更超過整體一半。</p>
    </div>
    <div class="ec-c-c__text">
      <p>宗教團體中，最大宗的分別是<strong>佛教慈濟慈善事業基金會（大愛媽媽）</strong>和<strong>彩虹愛家生命教育協會（彩虹媽媽）</strong>。</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EcChartContent'  
}
</script>
<style lang="stylus" scoped>
.ec-c-c
  background-color transparent !important
  &__text
    margin 75vh 0 0
    padding 10px 20px
    text-align center
    background-color rgba(255, 255, 255, .9)
    &:last-child
      margin-bottom 75vh
    p
      margin 0
      line-height 1.87
      & + p
        margin-top .5em
    strong
      padding 0 .5em
      color #fff
      font-weight normal
      background-color #2c585e

</style>