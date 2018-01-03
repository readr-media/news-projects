<template>
  <div class="credit">
    <p>文字、攝影：鐘聖雄</p>
    <p>影音：林俊耀、鐘聖雄</p>
    <p>編輯：李又如</p>
    <p>設計：許玲瑋</p>
    <p>插畫：洪金晶、朱家賢</p>
    <p>網頁製作：熊凱文</p>
    <p>發布日期：2018.01.04</p>
  </div>
</template>

<style lang="stylus" scoped>
.credit
  width 110%
  align-self center
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  margin 5em 0 0 0
  p
    font-weight 300 !important
    line-height .7 !important
    font-size 16px !important

@media (max-width: 767px)
  .credit
    width 100%
    margin 2.5em 0 0 0
    p
      line-height .43 !important
      font-size 14px !important
</style>

