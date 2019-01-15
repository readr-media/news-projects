<template>
  <section class="foreword">
    <h1>你全家都議長</h1>
    <h2>議長 / 縣市勢力篇</h2>
    <p>12月25日，隨著2018年選舉新任縣市長就職，各縣市議員也上任了。議會開議之前，最重要的是要決定議會的「老大」。議長選舉出爐，READr 帶你來看看這些議長的家庭背景，以及各地方議會都是由哪些家族在把持。</p>
    <div class="credit">
      <img src="/proj-assets/vote2018-result-city-council/logo-mm.png" alt="mirrormedia">
      <p><span>文／李又如</span><span>設計／許玲瑋</span><span>工程／譚學勇</span></p>
    </div>
    <!-- <h3>請點選地圖，切換不同縣市議長資料</h3> -->
  </section>
</template>
<script>
export default {
  name: 'ProjectForeword'
}
</script>
<style lang="stylus" scoped>

.foreword
  display flex
  flex-direction column
  padding 60px 1em 20px
  text-align center
  > h1, > h2, > p
    margin 0
  > h1
    order 1
    color #e5004f
    font-size 2.75rem
  > h2
    order 2
    margin 16px 0 45px
    font-size 1.625rem
  > h3
    order 5
    align-self center
    display inline
    width calc(100% + 2em)
    margin 45px 0 0
    padding .3em 1em
    color #fff
    font-size 1rem
    font-weight 400
    background-color #e5004f
  > p
    order 3
    text-align justify
    line-height 1.67

.credit
  order 4
  font-size .875rem
  margin-top 30px
  > img
    width 30px
    height 30px
  > p
    margin 20px 0 0
    span
      & + span
        margin-left 1.5em

@media (min-width: 768px)
  .foreword
    width 60%
    max-width 750px
    padding 60px 0
    margin 0 auto
    > h1
      font-size 4.5rem
    > h2
      margin 35px 0 40px
      font-size 1.875rem
    > p
      order 4
      margin-top 55px
  .credit
    order 3
    margin 0

@media (min-width: 1200px)
  .foreword
    padding 60px 0 85px
</style>
