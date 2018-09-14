<template>
  <div class="verify-boards">
    <div class="boards">
      <div class="boards-container">
        <div v-for="item in 8" :key="item" class="board" @click="selectBoard"></div>
      </div>
    </div>
    <div class="action">
      <div class="action-text">這是同一個使用者上傳的資料，哪些<span>是</span>競選看板的照片？</div>
      <button>這些是競選看板照片</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VerifyBoards',
  methods: {
    selectBoard (e) {
      e.target.classList.toggle('selected')
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #ffdb5c

.verify-boards
  display flex
  flex-direction column
  position absolute
  top 0
  left 0
  right 0
  z-index 1000
  width 100%
  height 100vh
  background-color theme-color
  .boards
    flex 1
    display flex
    padding 15px 25px
    background-color #000
    &-container
      flex 1
      display flex
      flex-wrap wrap
      justify-content space-between
      width 100%
      overflow-y auto
      .board
        position relative
        width calc(50% - 15px)
        padding-top calc(50% - 15px)
        margin-top 10px
        background-color #a0a0a0
        &:nth-of-type(1), &:nth-of-type(2)
          margin-top 0
        &.selected
          border 2px solid theme-color
          &::after
            content ''
            position absolute
            top calc(50% - 10px)
            left 50%
            transform translate(-50%, -50%) rotate(45deg)
            width 30px
            height 45px
            border 1px solid theme-color
            border-width 0 10px 10px 0
  .action
    padding 25px
    .action-text
      margin 0 auto
      color #000
      font-size 1.25rem
      font-weight 500
      line-height 1.4
      text-align justify
      > span
        border-bottom 5px solid #000
    > button
      width 100%
      margin-top 20px
      padding .5em .5em
      font-size 1.25rem
      font-weight 500
      background-color #a0a0a0
      border none
      border-radius 2px

@media (min-width: 768px)
  .verify-boards
    .boards
      padding 50px 0
    .boards-container
      flex none
      justify-content flex-start
      align-items center
      width 620px
      margin 0 auto
      .board
        width calc((100% - 60px) / 3)
        padding-top calc((100% - 60px) / 3)
        margin 20px 10px 0
        &:nth-of-type(3)
          margin-top 0
    .action
      display flex
      flex-direction column
      justify-content center
      padding 50px calc((100% - 450px) / 2)
</style>
