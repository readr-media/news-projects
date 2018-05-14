<template>
  <div class="share"
    :class="[ { open: isOpen }, direction ]"
    :style="[{
      top: `${top}`,
      right: `${right}`,
      bottom: `${bottom}`,
      left: `${left}`,
      zIndex: `${zIndex}` } ]" @click="$_share_toggleItmes">
    <a class="share__item toggle" :style="[{ backgroundColor: `${bgColor}`, border: `${border}` } ]"></a>
    <a class="share__item fb"
      :href="`https://www.facebook.com/share.php?u=${shareUrl}`"
      @click="$_share_ga('fb')"></a>
    <a class="share__item line"
      :href="`https://line.me/R/msg/text/?${shareUrl}`"
      @click="$_share_ga('line')"></a>
    <a class="share__item gplus" :href="`https://plus.google.com/share?url=${shareUrl}`"
      @click="$_share_ga('gplus')"></a>
  </div>
</template>
<script>
  export default {
    name: 'Share',
    props: {
      shareUrl: {
        type: String,
        required: true
      },
      direction: { // options: up, down, left, right
        type: String,
        default: 'down' 
      },
      top: {
        type: String,
        default: 'auto'
      },
      right: {
        type: String,
        default: 'auto'
      },
      bottom: {
        type: String,
        default: 'auto'
      },
      left: {
        type: String,
        default: 'auto'
      },
      zIndex: {
        type: Number,
        default: 999
      },
      bgColor: {
        default: 'transparent'
      },
      border: {
        type: String,
        default: 'none'
      },
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      $_share_ga(media) {
        window.ga('send', 'event', 'projects', 'click', `share to ${media}`, { nonInteraction: false })
      },
      $_share_toggleItmes() {
        this.isOpen = !this.isOpen
      }
    },
    mounted () {},
  }
</script>
<style lang="stylus" scoped>

.share
  position fixed
  width 36px
  height 40px
  cursor pointer
  &__item
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    height 100%
    z-index 900
    background-position center
    background-repeat no-repeat
    // border-radius 50%
    transition-duration .19s
  .toggle
    z-index 910
    background-image url(/proj-assets/president-promise/icon/share/share.png)
    background-size 100% auto
    background-repeat no-repeat
    // background-position -58px 0
  .fb
    // background-color #3b5998
    background-image url(/proj-assets/president-promise/icon/share/share_FB.png)
    background-size 100% auto
    opacity 0
    transition opacity .25s, transform .25s
  .line
    // background-color #00b900
    background-image url(/proj-assets/president-promise/icon/share/share_line.png)
    background-size 100% auto
    opacity 0
    transition opacity .25s, transform .25s
  .gplus
    background-image url(/proj-assets/president-promise/icon/share/share_google.png)
    background-size 100% auto
    opacity 0
    transition opacity .25s, transform .25s
.share.open
  // &.up
  //   .fb
  //     transform translate3d(0,-49px,0)
  //   .line
  //     transform translate3d(0,-98px,0)
  //   .gplus
  //     transform translate3d(0,-147px,0)
  &.down
    .fb
      transform translate3d(0,64px,0)
      opacity 1
      transition opacity .25s, transform .25s
    .line
      transform translate3d(0,128px,0)
      opacity 1
      transition opacity .25s, transform .25s
    .gplus
      transform translate3d(0,192px,0)
      opacity 1
      transition opacity .25s, transform .25s
  // &.left
  //   .fb
  //     transform translate3d(-49px,0,0)
  //   .line
  //     transform translate3d(-98px,0,0)
  //   .gplus
  //     transform translate3d(-147px,0,0)
  // &.right
  //   .fb
  //     transform translate3d(49px,0,0)
  //   .line
  //     transform translate3d(98px,0,0)
  //   .gplus
  //     transform translate3d(147px,0,0)
</style>