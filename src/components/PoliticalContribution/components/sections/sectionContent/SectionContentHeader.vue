<template>
  <header class="section-content-header">
    <nav class="section-content-header__nav">
      <a class="section-content-header__nav-item navigation-figure" href="http://www.readr.tw/series/political-contribution" target="_blank">
        <img class="navigation-figure__img navigation-figure__img--star" src="/proj-assets/political-contribution/star.png" alt="bell-w">
        <p class="navigation-figure__figcaption">
          {{ $t('POLITICAL_CONTRIBUTION.CONTENT_HEADER.FOLLOW') }}
        </p>
      </a>
      <a class="section-content-header__nav-item navigation-figure" href="http://www.readr.tw/series/political-contribution/15" target="_blank">
        <img class="navigation-figure__img" src="/proj-assets/political-contribution/memo.png" alt="bell-w">
        <p class="navigation-figure__figcaption">
          {{ $t('POLITICAL_CONTRIBUTION.CONTENT_HEADER.NOTES') }}
        </p>
      </a>
      <a class="section-content-header__nav-item navigation-figure" @click="toogleComment">
        <img class="navigation-figure__img" src="/proj-assets/political-contribution/comment-w.png" alt="comment-w">
        <p class="navigation-figure__figcaption">
          {{ $t('POLITICAL_CONTRIBUTION.CONTENT_HEADER.COMMENT') }}
        </p>
      </a>
      <a class="section-content-header__nav-item navigation-figure" target="_blank" :href="shareURL">
        <img class="navigation-figure__img" src="/proj-assets/political-contribution/share-w.png" alt="share-w">
        <p class="navigation-figure__figcaption">
          {{ $t('POLITICAL_CONTRIBUTION.CONTENT_HEADER.SHARE') }}
        </p>
      </a>
      <a class="section-content-header__nav-item navigation-figure" target="_blank" href="https://www.readr.tw/donate">
        <img class="navigation-figure__img" src="/proj-assets/political-contribution/donate-white.png" alt="share-w">
        <p class="navigation-figure__figcaption">
          {{ $t('POLITICAL_CONTRIBUTION.CONTENT_HEADER.DONATE') }}
        </p>
      </a>
      <a class="section-content-header__nav-item navigation-figure" @click="toogleNavSidebar">
        <div class="hamburger-icon">
          <div class="hamburger-icon__line"></div>
          <div class="hamburger-icon__line"></div>
          <div class="hamburger-icon__line"></div>
        </div>
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
  computed: {
    shareURL () {
      return `https://www.facebook.com/share.php?u=https://${READR_DOMAIN_PROD}${this.$route.fullPath}`
    }
  },
  methods: {
    toogleComment () {
      this.$emit('toogleComment')
    },
    toogleNavSidebar () {
      this.$emit('toogleNavSidebar')
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
    &:last-child
      display none
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

@media (max-width 1024px)
  .section-content-header
    &__nav-item
      &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(6)
        display none
      &:last-child
        display flex

  .navigation-figure
    &__figcaption
      display none

  .hamburger-icon
    display flex
    flex-direction column
    justify-content space-between
    width 32px
    height 24px
    &__line
      width 100%
      height 2px
      background-color white
</style>

