<template>
  <div class="wrapper">
    <ul>
      <li>文字採訪：陳莉雅</li>
      <li>數據研究：李又如</li>
      <br>
      <li>資料整理：李又如、李昭妟、老皮</li>
      <br>
      <li>設計：財妹</li>
      <li>工程：凱子</li>
      <li>插畫：獅子人</li>
    </ul>
    <div class="logos">
      <a
        class="logos__readr"
        href="https://www.readr.tw"
        target="_blank"
      >
        <img
          src="/proj-assets/china-company/readr-logo.svg"
          alt=""
        >
      </a>
      <a
        class="logos__mm"
        href="https://www.mirrormedia.mg"
        target="_blank"
      >
        <img
          src="/proj-assets/china-company/mm.png"
          alt=""
        >
      </a>
    </div>
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

.logos
  display flex
  a
    width 50px
    img
      width 100%
  a + a
    margin 0 0 0 20px
  &__readr
    position relative
    top 5px

@media (max-width 1005px)
  ul
    line-height 1.25
    li
      font-size 12px
    br
      display initial !important

  .logos
    a
      width 35px
</style>
