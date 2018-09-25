<template>
  <footer class="section-content-footer">
    <div class="section-content-footer__container">
      <div class="section-content-footer__related-title">相關文章</div>
      <SectionContentFooterStorysList/>
    </div>
    <AppParticles class="section-content-footer__particles" id="section-content-footer-particles" :isFooterShow="isFooterShow"/>
  </footer>
</template>

<script>
import AppParticles from '../../AppParticles.vue'
import SectionContentFooterStorysList from './SectionContentFooterStorysList.vue'

export default {
  props: {
    isFooterShow: {
      type: Boolean,
      required: true,
    }
  },
  components: {
    AppParticles,
    SectionContentFooterStorysList
  },
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
  &__particles
    position absolute
    right calc((100vw - 900px) / 2 / 2)
    bottom calc(271px / 2)
    width 150px
    height 271px
</style>
