<template>
  <footer class="section-content-footer">
    <div class="section-content-footer__container">
      <div class="section-content-footer__related-title">相關文章</div>
      <ul class="section-content-footer__related-list">
        <li class="section-content-footer__related-list-item" @click="navigateTo('story1')">選一次立委，金流超過 28 億！</li>
        <li class="section-content-footer__related-list-item" @click="navigateTo('story2')">立委篇／老鳥與新秀，募款能力差了 6.6 倍</li>
        <li class="section-content-footer__related-list-item" @click="navigateTo('story3')">企業篇／金權遊戲？翻開金主的投資名冊</li>
        <li class="section-content-footer__related-list-item" @click="navigateTo('story4')">政治獻金開放了嗎？</li>
        <li class="section-content-footer__related-list-item" @click="navigateTo('story5')">資料怎麼看？政治獻金的五個發現</li>
        <li class="section-content-footer__related-list-item" @click="navigateTo('story6')">政治獻金資料到底解密了什麼？</li>
      </ul>
    </div>
    <AppParticles class="section-content-footer__particles" id="section-content-footer-particles" :isFooterShow="isFooterShow"/>
  </footer>
</template>

<script>
import AppParticles from '../../AppParticles.vue'

export default {
  props: {
    isFooterShow: {
      type: Boolean,
      required: true,
    }
  },
  components: {
    AppParticles,
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
      this.$scrollTo('.section-content')
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-footer
  height calc(271px + 271px / 2)
  display flex
  align-items flex-end
  overflow hidden
  position relative
  &__container
    width 100%
    height 271px
    display flex
    align-items center
    overflow hidden
    position relative
    background-color #9e005d
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
  &__related-list-item
    cursor pointer
    text-decoration none
    font-size 19px
    font-weight normal
    font-style normal
    font-stretch normal
    line-height 1.5
    letter-spacing normal
    color #ffffff
    border-bottom 2px solid transparent
    transition border-bottom .25s
    margin 3px 0
    width max-content
    &:hover
      border-bottom 2px solid white
  &__particles
    position absolute
    right calc((100vw - 900px) / 2 / 2)
    bottom calc(271px / 2)
    width 150px
    height 271px

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
