<template>
  <article class="section-content-explore-article">
    <h1 class="section-content-explore-article__title">
      {{ $t('POLITICAL_CONTRIBUTION.EXPLORE.TITLE') }}
    </h1>
    <SectionContentCredits
      :isNewCredit="true"
      :showSpecialThanks="true"
      :publishedDate="'2018/09/27'"
    />
    <div class="section-content-explore-article__caution">
      <p class="section-content-explore-article__caution-placeholder">註：</p>
      <div class="section-content-explore-article__caution-container">
        <p>本站政治獻金資料收集僅供學術交流使用，嚴禁營利、徵信，或其他不正當目的之使用。</p>
        <p>原始資料中民進黨立委李昆澤、劉世芳收受政治獻金清單中「國民黨集團」為資料處理錯誤，因其中「台北世界貿易中心國際貿易大樓股份有限公司」應屬元大集團，而非「國民黨集團」，特此致歉。</p>
      </div>
    </div>
    <div class="section-content-explore-article__paragraph">
      {{ $t('POLITICAL_CONTRIBUTION.EXPLORE.P[0]') }}
    </div>
    <div class="section-content-explore-article__paragraph">
      {{ $t('POLITICAL_CONTRIBUTION.EXPLORE.P[1]') }}
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
    font-size 46px
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

