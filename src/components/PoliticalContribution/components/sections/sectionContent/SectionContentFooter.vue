<template>
  <footer class="section-content-footer">
    <div class="section-content-footer__related-title">相關文章</div>
    <ul class="section-content-footer__related-list">
      <router-link class="section-content-footer__related-list-item-link" to="story1" v-scroll-to="'.section-content'">
        <li class="section-content-footer__related-list-item">選一次立委，金流超過 28 億！</li>
      </router-link>
      <router-link class="section-content-footer__related-list-item-link" to="story2" v-scroll-to="'.section-content'">
        <li class="section-content-footer__related-list-item">立委篇／老鳥與新秀，募款能力差了 6.6 倍</li>
      </router-link>
      <router-link class="section-content-footer__related-list-item-link" to="story3" v-scroll-to="'.section-content'">
        <li class="section-content-footer__related-list-item">企業篇／金權遊戲？翻開金主的投資名冊</li>
      </router-link>
      <router-link class="section-content-footer__related-list-item-link" to="story4" v-scroll-to="'.section-content'">
        <li class="section-content-footer__related-list-item">政治獻金開放了嗎？</li>
      </router-link>
      <router-link class="section-content-footer__related-list-item-link" to="story5" v-scroll-to="'.section-content'">
        <li class="section-content-footer__related-list-item">2.0-1</li>
      </router-link>
      <router-link class="section-content-footer__related-list-item-link" to="story6" v-scroll-to="'.section-content'">
        <li class="section-content-footer__related-list-item">2.0-2</li>
      </router-link>
    </ul>
  </footer>
</template>

<style lang="stylus" scoped>
.section-content-footer
  height 271px
  background-color #9e005d
  display flex
  align-items center
  overflow hidden
  position relative
  &__related-title
    width 400px
    height 400px
    border-radius 400px
    border 104px solid white
    background-color #9e005d
    position absolute
    transform translate3d(-56px , 0, 0)
    display flex
    justify-content center
    align-items center
    font-size 28px
    font-weight 600
    color #ffffff
    letter-spacing 10px
    text-indent 10px
    text-align center
  &__related-list
    width 900px
    margin 0 auto
    padding 0 0 0 20px
  &__related-list-item-link
    text-decoration none
    font-size 19px
    font-weight normal
    font-style normal
    font-stretch normal
    line-height 1.5
    letter-spacing normal
    color #ffffff
  &__related-list-item
    border-bottom 2px solid transparent
    transition border-bottom .25s
    margin 3px 0
    width max-content
    &:hover
      border-bottom 2px solid white

.router-link-exact-active
  display none

@media (max-width 1650px)
  .section-content-footer
    &__related-list
      padding 0 0 0 100px

@media (max-width 1440px)
  .section-content-footer
    &__related-list
      padding 0 0 0 150px

@media (max-width 1366px)
  .section-content-footer
    &__related-list
      padding 0 0 0 180px

@media (max-width 1280px)
  .section-content-footer
    &__related-list
      padding 0 0 0 200px
</style>
