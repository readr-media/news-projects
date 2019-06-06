<template>
  <ul class="section-content-footer__related-list">
    <li class="section-content-footer__related-list-item" @click="navigateTo('story1')">{{ $t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY1') }}</li>
    <li class="section-content-footer__related-list-item" @click="navigateTo('story2')">{{ $t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY2') }}</li>
    <li class="section-content-footer__related-list-item" @click="navigateTo('story3')">{{ $t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY3') }}</li>
    <li class="section-content-footer__related-list-item" @click="navigateTo('story4')">{{ $t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY4') }}</li>
    <li class="section-content-footer__related-list-item" @click="navigateTo('story5')"><div class="new-notification">NEW</div>{{ $t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY5') }}</li>
    <li class="section-content-footer__related-list-item" @click="navigateTo('story6')"><div class="new-notification">NEW</div>{{ $t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY6') }}</li>
  </ul>
</template>

<script>
export default {
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

.new-notification
  margin 0 11px 0 0
  background-color white
  color #9e005d
  border-radius 50%
  padding 10px 5px
  font-size 12px
  font-weight 600
  width 50px
  height 30px
  display inline-flex
  justify-content center
  align-items center
  position relative
  bottom 4px

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

