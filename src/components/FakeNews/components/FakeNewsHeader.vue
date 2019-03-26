<template>
  <header class="fake-news-header">
    <div>
      <h1>謠言與牠們的產地</h1>
      <nav>
        <a class="home"><img src="/proj-assets/fake-news/nav_home.png" alt=""></a>
        <a href=""><img src="/proj-assets/fake-news/nav_READr.png" alt=""></a>
        <a href=""><img src="/proj-assets/fake-news/nav_help.png" alt=""></a>
        <a href=""><img src="/proj-assets/fake-news/nav_share.png" alt=""></a>
        <a href="" class="menu"><img src="/proj-assets/fake-news/nav_hamburger.png" alt=""></a>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  name: 'FakeNewsHeader'
}
</script>
<style lang="stylus" scoped>
.fake-news-header
  background-color #4868a5
  // background-image linear-gradient(to right, #032669, #4868a5)
  
  h1
    padding 0 0 0 10px
    color #fff
    font-weight 500
    line-height 84px
  nav
    display flex
    background-color #4868a5
    a
      flex 1
      display flex
      justify-content center
      align-items center
      height 42px
      img
        width 20px
        height 20px
      

@media (max-width: 1023px)
  .fake-news-header
    nav
      &.active
          background-color #032669

@media (min-width: 1024px)
  .fake-news-header
    > div
      display flex
      width 1020px
      margin auto
    h1
      padding 0
    nav
      align-items center
      margin 0 0 0 auto
      a
        & + a
          margin-left 20px
        &.home, &.menu
          display none
</style>
