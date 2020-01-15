<template>
  <section class="credit">
    <p>
      文字採訪：劉子維
    </p>
    <p>
      設計：陳怡蒨
    </p>
    <p>
      工程：熊凱文
    </p>
    <p>
      ​​封面攝影：陳毅偉
    </p>
  </section>
</template>

<style lang="stylus" scoped>
.credit
  background-color white
  height 50px
  font-size 15px
  color #4a4a4a
  display flex
  justify-content center
  align-items center
  position relative
  z-index 200
  p
    margin 0 10px

@media(max-width 768px)
  .credit
    text-align center
    flex-direction column
    height auto
    p
      margin 10px 0
</style>