<template>
  <div class="wrapper">
    <ul>
      <li>文字採訪：陳莉雅</li>
      <li>數據研究：李又如</li>
      <br>
      <li>資料整理：李又如、李昭妟、Weiwei Hsu</li>
      <br>
      <li>設計：財妹</li>
      <li>工程：凱子</li>
      <li>插畫：獅子人</li>
    </ul>
    <a
      href="https://www.mirrormedia.mg"
      target="_blank"
    >
      <img
        src="/proj-assets/china-company/mm.png"
        alt=""
      >
    </a>
  </div>
</template>

<style lang="stylus" scoped>
.wrapper
  display flex
  flex-direction column
  justify-content center
  align-items center

ul
  list-style none
  margin 0
  padding 16px 0
  line-height 1.5
  text-align center
  li
    font-size 16px
    display inline-block
  li + li
    margin 0 0 0 16px
  br
    &:nth-of-type(1)
      display none
    & + li
      margin 0 0 0 16px

a
  width 50px
  img
    width 100%

@media (max-width 1400px)
  ul
    line-height 1.25
    li
      font-size 12px
    br
      display initial !important

  a
    width 35px
</style>
