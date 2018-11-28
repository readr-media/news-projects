<template>
  <main class="vote-article">
    <h1>我住在<strong>同溫層里</strong>嗎？</h1>
    <h2>全台村里公投、<br>候選人開票結果解析</h2>
    <div class="credit">
      <img src="/proj-assets/logo_mm_grey_line.png" alt="">
      <p>文字：劉子維  資料：陳彥宇</p>
      <p>網頁：熊凱文  設計：陳怡蒨</p>
      <p>2018/11/30</p>
    </div>
    <p>去有的表開成縣品期心……名然知數算隨導，方孩青……早個我寫相裡支自的去官在調的解有現要金消代……漸門管長曾綠，面身雖。同會野。童已青作裡土農國歡點要。時保來管。票校在外什校年國世作福國都談民；結具黨府神，引水自一市未目市做片光麼個父父？</p>
    <p>著長決個縣大境接們老化愛件息！合對術方味公公之，種西河分成元較人將，來沒的旅速品些王天初原世明天局覺話回家整。</p>
    <h3>副標題副標題副標題副標題副標題</h3>
    <p>著長決個縣大境接們老化愛件息！合對術方味公公之，種西河分成元較人將，來沒的旅速品些王天初原世明天局覺話回家整。</p>
    <figure>
      <img src="https://www.readr.tw/assets/images/posts/1542711483-53bd2e1b37e0583fa21e9aebee14cb13.jpg" alt="">
      <figcaption>圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說</figcaption>
    </figure>
    <p>著長決個縣大境接們老化愛件息！合對術方味公公之，種西河分成元較人將，來沒的旅速品些王天初原世明天局覺話回家整。</p>
  </main>
</template>
<script>
export default {
  name: 'VoteArticle'
}
</script>
<style lang="stylus" scoped>
template-color = #9e005d

.vote-article
  padding 100px 5% 60px
  text-align center
  line-height 1.3
  font-weight 400
  p
    margin 0
  > h1, > h2, > h3
    margin 0
    font-weight 400
  > h1
    font-size 3.125rem
    line-height 1.2
    > strong
      color template-color
  > h2
    margin-top .5em
    font-size 1.875rem
  > h3
    margin 40px 0
    padding .2em
    color #fff
    font-size 1.5rem
    background-color template-color
  > p
    font-size 1.25rem
    line-height 1.67
    text-align justify
    & + p
      margin-top 40px
  > p:first-of-type
    margin-top 25px
  > figure
    margin 40px 0
    img
      width 100%
      object-fit cover
      object-position center center
    figcaption
      font-size 1.125rem
      text-align left
.credit
  padding .5em 0
  margin-top 40px
  font-size .875rem
  border-top 3px solid template-color
  border-bottom 3px solid template-color
  > img
    width 30px
    height 30px
  > p + p
    margin-top .5em
  > p:first-of-type
    margin-top 1em

@media (min-width: 768px)
  .vote-article
    padding 100px 10% 60px

@media (min-width: 1000px)
  .vote-article
    width 900px
    padding 130px 0 120px
    margin 0 auto
    > h1
      font-size 4.375rem
    > h3
      margin 60px 0 .5em
      color #000
      font-size 2.25rem
      background-color transparent
    > p
      font-size 1.5rem
    > p:first-of-type
      margin-top 80px
    > figure
      margin 50px 0
      figcaption
        margin-top 10px
        font-size 1.25rem

  .credit
    padding 0
    margin-top 50px
    font-size 1.25rem
    border none
    > img
      width 50px
      height 50px
</style>
