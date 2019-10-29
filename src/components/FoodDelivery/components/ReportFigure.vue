<template>
  <section class="report-figure">
    <h3>成為外送員<br>額外多花了多少錢？</h3>
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
.report-figure
  margin-top 20px
  margin-bottom 30px
  line-height normal
  text-align center
  & h3
    font-size 2.1rem
    font-weight 300
    // margin-bottom 10px
  & picture, img
    display block
  & picture
    margin 10px -20px
    // margin-left -20px
    // margin-right -20px
  & figcaption
    font-size 1.4rem
</style>