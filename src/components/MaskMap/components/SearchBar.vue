<template>
  <section class="search-bar">
    <div class="search-bar__address">
      <input type="text" placeholder="輸入住址搜尋附近藥局⋯">
      <svg class="position" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" @click="$parent.getCurrentPosition"><path d="m23.6000156 11.6000156h-.8000156c-.205875-5.65631247-4.7437031-10.1941406-10.4000156-10.4000156v-.80001562c0-.22092188-.1790625-.39998438-.3999844-.39998438s-.3999844.1790625-.3999844.39998438v.80001562c-5.65631247.205875-10.1941406 4.74370313-10.4000156 10.4000156h-.80001562c-.22092188 0-.39998438.1790625-.39998438.3999844s.1790625.3999844.39998438.3999844h.80001562c.205875 5.6563125 4.74370313 10.1941406 10.4000156 10.4000156v.8000156c0 .2209219.1790625.3999844.3999844.3999844s.3999844-.1790625.3999844-.3999844v-.8000156c5.6562656-.205875 10.1940937-4.7437031 10.4000156-10.4000156h.8000156c.2209219 0 .3999844-.1790625.3999844-.3999844s-.1790625-.3999844-.3999844-.3999844zm-12.04446 8.8444288c-4.32617486-.2114307-7.7865132-3.671711-8.00000004-8h4.81602443c.18792293 1.6752726 1.50949248 2.9975023 3.18397561 3.1855661zm0-5.3333333c-1.3810797-.2008037-2.46586302-1.285587-2.66666671-2.6666667h2.66666671zm0-3.5555555h-2.66666671c.20080369-1.3810797 1.28558701-2.46586302 2.66666671-2.66666671zm0-3.18397561c-1.67527259.18792293-2.99750232 1.50949248-3.18556615 3.18397561h-4.81443389c.21143075-4.32617486 3.67171108-7.7865132 8.00000004-8.00000004zm.8888888-4.81602443c4.3262218.21143075 7.7865132 3.67171108 8 8.00000004h-4.8160244c-.1879229-1.67527259-1.5094925-2.99750232-3.1839756-3.18556615zm0 5.33333333c1.3810797.20080369 2.465863 1.28558701 2.6666667 2.66666671h-2.6666667zm0 3.55555551h2.6666667c-.2008037 1.3810797-1.285587 2.465863-2.6666667 2.6666667zm0 3.1839756c1.6752726-.1879229 2.9975023-1.5094925 3.1855661-3.1839756h4.8144339c-.2114307 4.3262218-3.671711 7.7865132-8 8z"/></svg>
    </div>
    <button type="button">搜尋</button>
    <div class="search-bar__share">
      <svg height="16" viewBox="0 0 4 16" width="4" xmlns="http://www.w3.org/2000/svg"><path d="m291 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill-rule="evenodd" transform="translate(-289 -14)"/></svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style lang="stylus">
.search-bar
  position absolute
  display flex
  top 10px
  left 0
  width 100%
  // background-color green
  padding-left 10px
  padding-right 10px
  justify-content space-between
  font-size 1.5rem
  height 44px
  // color rgba(0, 0, 0, 0.87)
  & > *
    border-radius 4px
    border solid 2px #000
    height 100%
  &__address
    background-color #fff
    width 68%
    display flex
    align-items center
    padding-left 8px
    padding-right 3px
    // border-radius 4px
    // border solid 2px rgba(0, 0, 0, 0.87)
    & input
      padding 0 9px 0 0
      // margin 0
      border none
      flex 1 1 auto
      width 100%
      outline 0
      background-color transparent
      // font-weight 300
      &::-webkit-input-placeholder
        font-size 1.5rem
        color rgba(0, 0, 0, 0.87)
    & .position
      flex 0 0 auto
      cursor pointer
      padding 3px
  & button
    background-color #f5a623
    font-weight 700
    width 22.67%
    padding 0
    display flex
    justify-content center
    align-items center
    outline 0
    cursor pointer
    // border-radius 4px
    // border solid 2px #000000
  &__share
    background-color #9b9b9b
    width 6%
    display flex
    justify-content center
    align-items center
    cursor pointer
</style>
