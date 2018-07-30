<template>
  <header class="section-content-header">
    <nav class="section-content-header__nav">
      <a class="section-content-header__nav-item section-content-header__readr-link" :href="`https://${READR_DOMAIN_PROD}`" target="_blank">
        <img class="section-content-header__readr-logo" src="/proj-assets/political-contribution/logo-white.png" alt="">
      </a>
      <a class="section-content-header__nav-item navigation-figure" href="http://www.readr.tw/series/political-contribution" target="_blank">
        <img class="navigation-figure__img navigation-figure__img--star" src="/proj-assets/political-contribution/star.png" alt="bell-w">
        <p class="navigation-figure__figcaption">追蹤</p>
      </a>
      <a class="section-content-header__nav-item navigation-figure" href="http://www.readr.tw/series/political-contribution/15" target="_blank">
        <img class="navigation-figure__img" src="/proj-assets/political-contribution/memo.png" alt="bell-w">
        <p class="navigation-figure__figcaption">筆記</p>
      </a>
      <a class="section-content-header__nav-item navigation-figure" @click="toogleComment">
        <img class="navigation-figure__img" src="/proj-assets/political-contribution/comment-w.png" alt="comment-w">
        <p class="navigation-figure__figcaption">留言</p>
      </a>
      <a class="section-content-header__nav-item navigation-figure">
        <img class="navigation-figure__img" src="/proj-assets/political-contribution/share-w.png" alt="share-w">
        <p class="navigation-figure__figcaption">分享</p>
      </a>
    </nav>
  </header>
</template>

<script>
import { READR_DOMAIN_PROD, } from 'src/constants'

export default {
  data () {
    return {
      READR_DOMAIN_PROD
    }
  },
  methods: {
    toogleComment () {
      this.$emit('toogleComment')
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-header
  width 100vw
  height 60px
  background-color #9e005d
  padding 10px 0
  &__nav
    width inherit
    height 40px
    display flex
  &__nav-item
    flex 1 1 auto
    display flex
    justify-content center
    align-items center
    cursor pointer
    & + &
     border-left 2px solid white
  &__readr-link
    display flex
    justify-content center
    align-items center
  &__readr-logo
    width 40px
    height 40px
    position relative
    top 3px

.navigation-figure
  display flex
  justify-content center
  align-items center
  text-decoration none
  &__img
    width 32px
    height 32px
    &--star
      position relative
      bottom 2px
  &__figcaption
    font-size 22.4px
    color white
    margin 0 0 0 14px
</style>

