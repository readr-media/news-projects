<template>
  <div class="data-board">
    <div class="data-board__image">
      <img src="/proj-assets/election-board/images/test.jpg" alt="">
      <div class="data-board__correction">這不是蘇貞昌，我要校正</div>
    </div>
    <div class="data-board__info">
      <div class="content">
        <h3>新北市淡水區淡金路二段</h3>
        <ul>
          <li>此資料已被驗證 3 次</li>
          <li>此廣告還未有收據資料</li>
          <li>此廣告還未有價位資料</li>
        </ul>
        <a>我是候選人團隊！我要補充收據及價位資料<span>（這是什麼？）</span></a>
      </div>
      <div class="action">
        <button class="btn btn--back" @click="$emit('closeDataBoard')"><img src="/proj-assets/election-board/images/arrow.png"></button>
        <button class="btn btn--upload" @click="">同一地點其他看板</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'DataBoard'
}
</script>
<style lang="stylus" scoped>
theme-color = #4897db

.data-board
  display flex
  flex-direction column
  position fixed
  top 0
  left 0
  right 0
  z-index 20
  width 100%
  height 100vh
  background-color #000
  &__image
    flex 1
    position relative
    > img
      width 100%
      height 100%
      object-fit cover
      object-position center center
  &__correction
    position absolute
    left 0
    bottom 0
    width 100%
    color theme-color
    text-align center
    font-size .875rem
    line-height 30px
    background-color rgba(0,0,0,.5)
  &__info
    padding 25px
  .content
    color #fff
    h3
      font-size 1rem
      font-weight 300
    ul
      margin-top 20px
      padding-left 1.5em
      li
        color #a0a0a0
        font-weight 300
    a
      display inline-block
      padding-left 1.5em
      color theme-color
      font-size .875rem
      > span
        border-bottom 1px solid theme-color
  .action
    display flex
    justify-content space-between
    margin-top 20px
    .btn
      height 50px
      font-size 1.25rem
      font-weight 700
      border none
      border-radius 2px
      &--back
        width 55px
        padding 11px
        background-color #a0a0a0
        > img 
          width 34px
      &--upload
        flex 1
        margin-left 15px
        background-color theme-color

@media (min-width: 768px)
  .data-board
    justify-content center
    padding 0 calc((100% - 450px) / 2)
    &__image
      flex none
      width 450px
      padding-top 56.25%
      > img
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        width 100%
        height 100%
        object-fit contain
    &__info
      padding 0
      margin-top 35px
    .content
      h3
        font-size 1.25rem
    .action
      margin-top 30px
</style>
