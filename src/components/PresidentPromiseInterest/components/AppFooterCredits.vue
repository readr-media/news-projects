<template>
  <section class="credit">
    <a class="credit__mm-logo-link" href="https://www.mirrormedia.mg/" target="_blank">
      <img class="credit__mm-logo" src="/proj-assets/president-promise/mm_logo.png" alt="">
    </a>
    <div class="credit__local">
      <p>資料整理／李又如</p>
      <p>設計／許玲瑋</p>
      <p>網站／熊凱文</p>
    </div>
    <div class="credit__external">
      <p>原住民族政策合作／<br><a href="https://watching-tsai.indigenousyf.tw" target="_blank">原住民族青年陣線政策監督平台</a></p>
      <p>政策諮詢／<br>台灣高等教育產業工會、<br>全國教師工會總聯合會、<br>台灣勞工陣線、<br>台灣文化政策研究學會、<br>台北市醫師職業工會、<br class="important">經濟民主連合、<br>綠色公民行動聯盟、<br>大學改革陣線、<br>《技職3.0》執行長黃偉翔、<br>民間監督健保聯盟、<br>婦女新知基金會</p>
    </div>
  </section>
</template>

<style lang="stylus" scoped>
.credit
  display flex
  flex-direction column
  align-items center
  &__mm-logo
    width 40px
    height auto
  &__mm-logo-link
    margin 0 0 20px 0
  &__local
    display flex
    margin 0 0 10px 0
    > p
      font-size 14px
      line-height 1.71
      text-align center
      color #c9c9c9
      margin 0
    > p + p
      margin 0 0 0 10px
  &__external
    display flex
    flex-direction column
    justify-content center
    align-items center
    > p
      font-size 14px
      line-height 1.71
      text-align center
      color #c9c9c9
      margin 0
      > br
        display none
        &.important
          display initial
      > a
        color #c9c9c9
    > p + p
      margin 10px 0 0 0

@media (max-width 425px)
  .credit
    // height 550px
    &__local
      flex-direction column
      justify-content center
      align-items center
      margin 0 0 30px 0
      > p + p
        margin 5px 0 0 0
    &__external
      flex-direction column
      justify-content center
      align-items center
      > p
        > br
          display initial
      > p + p
        margin 30px 0 0 0
</style>

