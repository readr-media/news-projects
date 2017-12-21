<template>
  <span :class="[ 'charts', `charts--${chartIndex}` ]">
    <template v-if="chartIndex === 1">
      <span class="title">5% 國中小學生來自越南、印尼</span>
      <img v-if="device" v-lazy="{ src: `${responsiveSrc}${chartIndex}.png`, loading: '/proj-assets/newtype/images/spinner.svg' }" alt="">
      <span class="figcaption">教育部統計，2016 學年度共有近 20 萬名外籍配偶子女。扣掉比較沒有語言銜接問題的中國及港澳配偶子女後（77,027人），共有 119,151 名中、小學生的父母來自外國，其中又以越南和印尼藉配偶子女佔最大宗，光是來自這兩個國家的外籍配偶子女，就佔目前台灣中、小學學生總數 5.3%。</span>
    </template>
    <template v-else-if="chartIndex === 2">
      <span class="title">北部地區擁有超過 4 成<br>外籍新二代國中小學生</span>
      <img v-if="device" v-lazy="{ src: `${responsiveSrc}${chartIndex}.png`, loading: '/proj-assets/newtype/images/spinner.svg' }" alt="">
      <span class="figcaption">教育部統計，2016 學年國中、小學外籍新住民子女人數，以北部地區最多，占總體新住民子女 42.2 %，其次為中部地區 28.1%，略多於南部地區的 27.1%。</span>
    </template>
    <template v-else-if="chartIndex === 3">
      <span class="title">前十行政區，就集中<br>近全國 15% 外籍國中小學生</span>
      <img v-if="device" v-lazy="{ src: `${responsiveSrc}${chartIndex}.png`, loading: '/proj-assets/newtype/images/spinner.svg' }" alt="">
      <span class="figcaption">擁有最多外籍新二代國中小學生的前十名區域分別是中壢區、新莊區、桃園區、板橋區、三重區、平鎮區、鳳山區、 中和區、楊梅區及樹林區。光是這 10 區的外籍新二代學生就有 17,482 人，占全國新二代國中小學生 14.67%。以分佈來看，擁有最多新二代小學生的前十名行政區，有 5 個屬於新北市、 4 個歸桃園市管轄。</span>
      <span class="figcaption figcaption--caveat">註：以上資料皆不含中國港澳籍配偶新二代</span>
    </template>
    <template v-else-if="chartIndex === 4">
      <span class="title">華語補救申請數 6 年成長 2.4 倍</span>
      <img v-if="device" v-lazy="{ src: `${responsiveSrc}${chartIndex}.png`, loading: '/proj-assets/newtype/images/spinner.svg' }" alt="">
    </template>
  </span>
</template>

<script>
export default {
  props: [ 'chartIndex' ],
  data () {
    return {
      device: undefined
    }
  },
  computed: {
    responsiveSrc () {
      return `/proj-assets/newtype/images/story3/charts/${this.device}`
    }
  },
  mounted () {
    if (process.browser) {
      this.device = (window.innerWidth <= 767 ? 'phone' : 'web')
    }
  }
}
</script>


<style lang="stylus" scoped>
.charts
  display flex
  flex-direction column
  justify-content center
  align-items center
  width 60%
  margin 2rem auto 0 auto
  .title
    font-weight 400 !important
    br
      display none
  .figcaption--caveat
    background #a7a7a7
    color black !important
    padding .5rem
    margin 2rem 0
  img
    width 100%
    // height 100px
  &--3
    margin-bottom 2rem

@media (max-width: 767px)
  .charts
    width 100%
    .title
      text-align center
      br
        display initial
</style>

