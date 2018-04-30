<template>
  <a class="logo" target="_blank"
    :href="href"
    :style="[{
      top: `${top}`,
      right: `${right}`,
      bottom: `${bottom}`,
      left: `${left}`,
      zIndex: `${zIndex}`,
      backgroundColor: `${bgColor}`,
      backgroundImage: `url(${bgImage})`,
      border: `${border}` } ]"
    @click="$_logo_ga">
  </a>
</template>
<script>
  export default {
    name: 'Logo',
    props: {
      href: {
        type: String,
        default: 'https://www.mirrormedia.mg/',
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
      bgImage: {
        type: String,
        default: '/proj-assets/navbtn.png'
      },
      border: {
        type: String,
        default: 'none'
      },
    },
    data () {
      return {
        
      }
    },
    methods: {
      $_logo_ga() {
        window.ga('send', 'event', 'projects', 'click', 'back to home', { nonInteraction: false })
      }
    },
    mounted () {},
  }
</script>
<style lang="stylus" scoped>

.logo
  position fixed
  width 44px
  height 44px
  background-size 100px auto
  background-position 0 0px
  background-repeat no-repeat
  border-radius 50%
  cursor pointer
  &.no-sprite
    background-size 44px auto
    background-position center center
    border-radius 0
</style>