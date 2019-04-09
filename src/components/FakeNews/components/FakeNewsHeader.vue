<template>
  <header class="fake-news-header">
    <div>
      <h1>fakebook：假訊息與它們的產地</h1>
      <nav>
        <a :class="[ { active: current === 'feed' }, 'home' ]" @click="$emit('clickHeader', 'feed')"><img src="/proj-assets/fake-news/nav_home.png" alt=""></a>
        <a href=""><img src="/proj-assets/fake-news/nav_READr.png" alt=""></a>
        <a :class="{ active: openAlert }" @click="$emit('openAlert')">
          <img src="/proj-assets/fake-news/nav_help.png" alt="">
          <div class="popup">
            <p>警示：這不是 Facebook！但是歡迎按讚、留言、分享。</p>
          </div>
        </a>
        <a :class="[{ active: openShare }, 'share']" @click="openShare = !openShare">
          <img src="/proj-assets/fake-news/nav_share.png" alt="">
          <button class="fb" @click="shareToFacebook"></button>
          <button class="line" @click="shareToLine"></button>
        </a>
        <a :class="[ { active: current === 'menu' }, 'menu' ]" @click="$emit('clickHeader', 'menu')"><img src="/proj-assets/fake-news/nav_hamburger.png" alt=""></a>
      </nav>
    </div>
  </header>
</template>
<script>
import { READR_SITE_URL } from '../../../constants'

export default {
  name: 'FakeNewsHeader',
  props: {
    current: {
      type: String
    },
    openAlert: {
      type: Boolean
    }
  },
  data () {
    return {
      openShare: false
    }
  },
  methods: {
    shareToFacebook () {
      window.open(`https://www.facebook.com/share.php?u=${READR_SITE_URL}fake-news`)
      // window.ga && window.ga('send', 'event', 'projects', 'click', `share to fb`, { nonInteraction: false })
    },
    shareToLine () {
      window.open(`https://line.me/R/msg/text/?${READR_SITE_URL}fake-news`)
      // window.ga && window.ga('send', 'event', 'projects', 'click', `share to line`, { nonInteraction: false })
    }
  }
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
      position relative
      display flex
      justify-content center
      align-items center
      height 42px
      img
        width 20px
        height 20px
      .popup
        position absolute
        top calc(100% + 10px)
        z-index 999
        width 90vw
        max-width 310px
        padding .5em
        background-color #ccd0d5
        border-radius 4px
        &::before
          content ''
          position absolute
          top -9px
          left 50%
          transform translateX(-50%)
          width 0
          height 0
          border-style solid
          border-width 0 5px 8.7px 5px
          border-color transparent transparent #ccd0d5
        p
          color #616770
          font-size .8125rem
          text-align justify
          line-height 1.38
          & + p
            margin-top .5em
  .share
    button
      position absolute
      left 50%
      transform translate3d(-50%,0,0)
      z-index 500
      width 40px
      height 40px
      padding 0
      background-position center
      background-repeat no-repeat
      border-radius 50%
      visibility hidden
      transition-duration .19s
      &.fb
        background-color #3b5998
        background-image url(/proj-assets/facebook.png)
        background-size 20px auto
      &.line
        background-color #00b900
        background-image url(/proj-assets/line.png)
        background-size 25px auto
    &.active
      button
        visibility visible
        &.fb
          transform translate3d(-50%,45px,0)
        &.line
          transform translate3d(-50%,90px,0)

@media (max-width: 1023px)
  .fake-news-header
    a
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
        .popup
          right -30px
          &::before
            left auto
            right 30px
</style>
