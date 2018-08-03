<template>
  <article class="section-content-explore-article">
    <h1 class="section-content-explore-article__title">查找政商關係</h1>
    <SectionContentCredits :publishedDate="'2018/xx/x'" :showSpecialThanks="true"/>
    <div class="section-content-explore-article__caution">
      <p class="section-content-explore-article__caution-placeholder">註：</p>
      <div class="section-content-explore-article__caution-container">
        <p>本站政治獻金資料收集僅供學術交流使用，嚴禁營利、徵信，或其他不正當目的之使用。</p>
        <p>原始資料中民進黨立委李昆澤、劉世芳收受政治獻金清單中「國民黨集團」為資料處理錯誤，因其中「台北世界貿易中心國際貿易大樓股份有限公司」應屬元大集團，而非「國民黨集團」，特此致歉。</p>
      </div>
    </div>
    <div class="section-content-explore-article__paragraph">
      選一個立委要花多少錢？是誰在資助我們的民意代表？要回答這些問題，要付出什麼樣的代價？依照台灣的法律，候選人必須申報選舉時政治獻金的來源，也應在選舉後公開讓人民檢視。但這些合法的政治金流與其說是公開，不如說是被放在監察院「典藏」，需要親赴政府機關才看得到，還只能印出一張張無法應用的 A4 紙。
    </div>
    <div class="section-content-explore-article__paragraph">
      我們費了九牛二虎之力，把這些資料通通帶出來了！來看看 2016 年選舉時，區域立委候選人跟企業有什麼關係吧！
    </div>
  </article>
</template>

<script>
import SectionContentCredits from '../SectionContentCredits.vue'

export default {
  components: {
    SectionContentCredits,
  }
}
</script>

<style lang="stylus">
.section-content-explore-article
  &__title
    font-size 58px
    font-weight 600
    text-align center
    margin 0 0 40px 0
    line-height 1.25
  &__caution
    display flex
    font-size 17px
    text-align justify
    color #808080
    line-height 1.5
  &__caution-placeholder
    margin 4px 0
  &__caution-container
    display flex
    flex-direction column
    > p
      margin 4px 0
  &__paragraph
    font-size 19px
    line-height 1.5
    text-align justify
    margin 27px 0

  @media (max-width 1024px)
    .section-content-explore-article
      &__title
        font-size 40px
      &__paragraph
        font-size 22px
        line-height 1.64
</style>

