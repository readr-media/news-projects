<template>
  <article class="article">
    <h1 class="article__title">你全家都議員<br>議員家族勢力全解析</h1>
    <VoteArticleCredits class="article__credits"/>
    <div class="article__content content">
      <p>地方公職人員選舉要到了，你熟悉選舉公報上的人嗎？極度仰賴地方支持的議員選舉，常見到「ＸＸＸ的兒子」、「ＯＯＯ的孫女」出現在選舉文宣，選民關係也成了可以傳承給下一代的資產。有人把老爸老媽掛嘴邊，當作爭取選民支持的加分條件，也有人擔心被貼上「政二代」的標籤，這些淵遠流長的關係更成為政治素人難以挑戰的門檻。READr 蒐集了從 1940 年代以來超過 9 千位地方議員資料，並追查他們的親屬關係，看看誰家的政治香火傳承最久。</p>
      <p>註：由於宜蘭縣、臺東縣歷史資料不足，暫不列入比較。</p>
      <p class="less-margin">資料來源：中選會、各縣市議會網站、臺灣議事資料開放平臺、臺南市歷屆議會文史、立法院開放資料服務平台。</p>
    </div>
  </article>
</template>

<script>
import VoteArticleCredits from './VoteArticleCredits.vue'

export default {
  components: {
    VoteArticleCredits,
  }
}
</script>

<style lang="stylus" scoped>
.article
  max-width 1000px
  display flex
  flex-direction column
  align-items center
  &__title
    font-size 80px
    font-weight normal
    line-height 1.5
    text-align center
  &__credits, &__content
    margin 60px 0 0 0

.content
  font-size 24px
  line-height 1.67
  text-align justify
  p + p
    margin 60px 0 0 0

.less-margin
  margin 5px 0 0 0 !important

@media (max-width 768px)
  .article
    max-width 100vw
    padding 0 20px
    &__title
      font-size 40px
      line-height 1.5
      text-align center
    &__credits
      margin 20px 0 0 0 
    &__content
      margin 30px 0 0 0

  .content
    font-size 20px
    line-height 2
</style>

