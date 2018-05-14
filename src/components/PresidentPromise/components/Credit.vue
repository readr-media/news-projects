<template>
  <div class="credit">
    <div class="credit__local">
      <p>資料整理／李又如</p>
      <p>設計／許玲瑋</p>
      <p>網站／熊凱文</p>
    </div>
    <div class="credit__external">
      <p>原住民族政策合作／<br>原住民族青年陣線政策監督平台</p>
      <p>諮詢／<br>台灣文化政策協會、高教工會</p>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.credit
  height 200px
  background-color #1f464f
  display flex
  flex-direction column
  justify-content center
  align-items center
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
    > p
      font-size 14px
      line-height 1.71
      text-align center
      color #c9c9c9
      margin 0
      > br
        display none
    > p + p
      margin 0 0 0 10px

@media (max-width 425px)
  .credit
    height 300px
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
        margin 5px 0 0 0
</style>

