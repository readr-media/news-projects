<template>
  <!-- todo remove this component -->
  <section class="report-figure">
    <h3>成為外送員額外多花了多少錢？</h3>
    <figure>
      <picture>
        <source media="(min-width: 576px)" srcset="https://fakeimg.pl/960x576/">
        <img src="https://fakeimg.pl/640x384/" alt="">
      </picture>
      <figcaption>圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說圖說</figcaption>
    </figure>
  </section>
</template>

<script>
export default {
  name: 'ReportFigure'
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.report-figure
  margin-top 20px
  margin-bottom 30px
  line-height normal
  text-align center
  @media (min-width $mobile)
    margin-top 40px
    margin-bottom 40px
  & h3
    font-size 2.1rem
    font-weight 300
    margin-bottom 10px
    // margin-bottom 10px
  & picture, img
    display block
  & picture
    margin-bottom 10px
    margin-left -20px
    margin-right -20px
    @media (min-width 640px)
      margin-left 0
      margin-right 0
  & figcaption
    font-size 1.4rem
</style>