<template>
  <ul>
    <li>文字採訪：陳莉雅</li>
    <br>
    <li>數據研究：李又如</li>
    <br>
    <li>資料整理：李又如、李昭妟、Weiwei Hsu</li>
    <br>
    <li>設計：陳怡蒨</li>
    <br>
    <li>工程：熊凱文</li>
    <br>
    <li>插畫：獅子人</li>
  </ul>
</template>

<style lang="stylus" scoped>
ul
  list-style none
  margin 0
  padding 16px 0
  border-top 1px solid black
  border-bottom 1px solid black
  line-height 1.5
  li
    font-size 16px
    display inline-block
  br:nth-of-type(n):not(:nth-of-type(3))
    display none
    & + li
      margin 0 0 0 16px

@media (max-width 1400px)
  ul
    br
      display inline !important
      & + li
        margin 0 !important
</style>
