<template>
  <article class="article">
    <h3>新任正副議長中，有 55% 出身政治家族</h3>
    <div>
      <img src="" alt="">
      <div>
        <p>原民進黨籍議員郭信良在台南議長選舉投票前一刻，宣布退黨並當選議長，民進黨推出的組合反而沒當選，對此，今天黨中央中評會討論台南議長選舉跑票的議員，最後未做出決議，民進黨立委段宜康在臉書上抨擊，中評委蔡易餘反對開除違反黨紀議員，且中評會主委蘇治芬最後不處理該案，「建議民進黨中評會解散吧。」
  蘇治芬隨後在臉書分享段宜康該文章，她表示「小段，你不用急，中評會不會打烊的」，並指會到台南調查並見市長黃偉哲，除了請段宜康稍安勿躁，也說「今天中評會哪有表決」。</p>
        <p>段宜康指出，建議民進黨中評會解散吧，不然就明白告訴大家「違紀參選沒有關係，黨的提名制度已經名存實亡」，今天應該處理台南的跑票議員，他們其實都已經聲明退黨了，這次中評會對這種明確的違紀行為，除了開除黨籍，沒有第二個可能了，誰知中評會主委蘇治芬，真的像魔術師一樣，在交付表決4:3贊成開除跑票議員黨籍之後，居然可以裁示投票結果不處理。</p>
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
      margin 0 auto
    h3
      width 60%
      max-width 750px
      margin 0 auto
</style>
