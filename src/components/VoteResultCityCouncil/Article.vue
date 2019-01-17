<template>
  <article class="article">
    <h3>13 個縣市議會讓國民黨稱霸 20 年</h3>
    <div>
      <img src="" alt="">
      <div>
        <p>若單看 1994 年後的議長及副議長黨籍（1994 年前各地方議會資料大多未標註黨籍），儘管縣市首長幾乎都在幾次選舉政黨輪替，議長黨籍變動卻不大。在 2018 的議長選舉中，民進黨只拿下一席。</p>
        <p>有 7 個縣市議長黨籍到現在都是國民黨（花蓮縣、基隆市、苗栗縣、台北市、桃園市、新北市、雲林縣）； 6 個縣市曾經有無黨籍議長，有的原本是國民黨籍，因選舉脫黨；有的後來加入國民黨（連江縣張永江、南投縣吳棋祥、澎湖縣蘇崑雄、台東縣吳俊立、台中市張清堂、彰化縣謝典霖），加起來共 13 個縣市，20 年來都由國民黨掌握議長席次。</p>
        <p>另外像高雄市、臺南市、宜蘭縣、嘉義市，只短暫出現過一位民進黨議長，且高雄市與宜蘭縣在今年又重回國民黨掌握。</p>
        <p>在政黨多元度的部分，唯有臺北市出現過兩位其他政黨的副議長，分別是新黨的費鴻泰、和親民黨的李新，但兩人原來都是國民黨黨員。</p>
      </div>
    </div>
    <h3>新任正副議長中，有 55% 出身政治家族</h3>
    <div>
      <img src="" alt="">
      <div>
        <p></p>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: 'ProjectArticle'
}
</script>
<style lang="stylus" scoped>
.article
  padding 70px 1em 50px
  > div
    margin-bottom 50px
  h3, p
    margin 0
  h3
    margin-bottom 50px
    color #e5004f
    font-size 1.625rem
    line-height 1.5
    text-align justify
  p
    font-size 1rem
    line-height 1.8
    text-align justify
    & + p
      margin-top 3em

@media (min-width: 768px)
  .article
    padding 70px 0 50px
    > div
      width 60%
      max-width 750px
      margin 0 auto 50px
    h3
      width 60%
      max-width 750px
      margin 0 auto
      text-align center
    p
      & + p
        margin-top 2em
</style>
