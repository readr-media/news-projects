<template>
  <section class="landing">
    <div class="d3">
      <h1><span>東區沒落</span><br>不只是租金問題</h1>
    </div>
    <div class="brief">
      <h1><span>東區沒落</span><br>不只是租金問題</h1>
      <p>今年年初，營業超過 40 年的東區老字號餐聽「永福樓」歇業，業者對外表示是租金不堪負荷所致，為「東區沒落」的說法再上添一筆。近一兩年，「國際名店出走」、「東區老店歇業」的新聞多次躍上媒體版面。東區名店的熄燈是個案還是東區真的在走下坡？READr 從數據走進東區，看看東區到底怎麼了？</p>
    </div>
  </section>
</template>
<script>
export default {
  name: 'EasternDistrictLanding'
}
</script>
<style lang="stylus" scoped>
.landing
  background-color #1a1a1a
  h1, p
    margin 0
  h1
    font-size 2.25rem
    line-height normal
    span
      font-size 3.375rem
  .d3
    position relative
    height 100vh
    h1
      position absolute
      top 70px
      left 5%
  .brief
    padding 1.5em 0
    background-color #1a1a1a
    h1
      display none
    p
      width 90%
      margin 0 auto
      font-size 1.25rem
      text-align justify
      line-height 1.7

@media (min-width: 768px)
  .landing
    .d3
      h1
        left 20%
    .brief
      padding 3em 0
      p
        width 60%

@media (min-width: 1200px)
  .landing
    display flex
    height 100vh
    padding 70px 5%
    h1
      font-size 3.75rem
      span
        font-size 6.25rem
    .d3
      flex 1
      height auto
      h1
        display none
    .brief
      width 540px
      padding 0
      margin-left 50px
      h1
        display block
      p
        width auto
        margin-top 50px
</style>
