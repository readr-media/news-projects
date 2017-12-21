<template>
  <header>
    <nav class="nav--page">
      <Logo :top="`10px`" :left="`10px`" :bgColor="`#000`"></Logo>
      <Share :shareUrl="shareLink" :direction="`right`" :top="`10px`" :left="`60px`" :bgColor="`#000`"></Share>
      <HamburgerIcon :top="`10px`" :right="`10px`" :currentStoryIndex="currentStoryIndex" :isMenuOpen="isMenuOpen" @toogleMenu="toogleMenu()"></HamburgerIcon>
    </nav>
    <transition name="fade">
      <nav class="nav--hamburger-content" v-show="isMenuOpen">
        <!-- hamburger content -->
        <img src="/proj-assets/newtype/images/header/story-menu-item.png" alt="" @click="clickMenuItem('story1')">
        <img src="/proj-assets/newtype/images/header/story-menu-item.png" alt="" @click="clickMenuItem('story2')">
        <img src="/proj-assets/newtype/images/header/story-menu-item.png" alt="" @click="clickMenuItem('story1')">
        <img src="/proj-assets/newtype/images/header/story-menu-item.png" alt="" @click="clickMenuItem('story1')">
        <img src="/proj-assets/newtype/images/header/story-menu-item.png" alt="" @click="clickMenuItem('story1')">
      </nav>
    </transition>
    <img class="nav--top" src="/proj-assets/newtype/images/header/back-to-top.png" alt="" v-scroll-to="'.newtype-landing'">
  </header>
</template>

<script>
import Logo from '../../Logo.vue'
import Share from '../../Share.vue'
import HamburgerIcon from './AppHeader/HamburgerIcon.vue'

export default {
  props: [ 'shareUrl' ],
  components: {
    Logo,
    Share,
    HamburgerIcon
  },
  data () {
    return {
      isMenuOpen: false
    }
  },
  computed: {
    shareLink () {
      return `https://projects.mirrormedia.mg${this.shareUrl}`
    },
    currentStoryIndex () {
      if (this.shareUrl.includes('story1')) {
        return 1
      } else if (this.shareUrl.includes('story2')) {
        return 2
      } else if (this.shareUrl.includes('story3')) {
        return 3
      } else if (this.shareUrl.includes('story4')) {
        return 4
      } else if (this.shareUrl.includes('story5')) {
        return 5
      } else {
        return 0
      }
    }
  },
  methods: {
    toogleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    },
    clickMenuItem (anchor) {
      this.$scrollTo(`#${anchor}`)
      this.isMenuOpen = false
    }
  }
  // mounted () {
  //   if (process.browser) {
  //     window.onclick = () => {
  //       console.log('fuck')
  //       if (this.isMenuOpen) {
  //         this.isMenuOpen = false
  //       }
  //     }
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
// header
//   .logo-share
//     display flex
//     flex-direction row
.nav--hamburger-content
  position fixed
  top 100px
  right 10px
  z-index 998
  user-select none
  img
    display block
    cursor pointer
    height calc(100vh * 0.7 / 5)
    &:hover
      filter brightness(90%)
    &:nth-child(2n)
      position relative
      right 20px
  &.fade-enter-active, &.fade-leave-active
    transition opacity .25s
  &.fade-enter, &.fade-leave-to
    opacity 0

.nav--top
  position fixed
  right 10px
  bottom 10px
  width 3%
  z-index 999
  cursor pointer
  &:hover
    filter brightness(50%)

@media (max-width: 767px)
  .nav--hamburger-content
    top 0
    right 0
    width 100vw
    height 100vh
    background-color rgba(0, 0, 0, .5)
    display flex
    flex-direction column
    justify-content center
    align-items center
  .nav--top
  //   display none
    width 10%
</style>


