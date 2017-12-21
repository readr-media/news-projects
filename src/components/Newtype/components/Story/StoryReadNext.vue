<template>
  <section :style="{ backgroundImage: `url(/proj-assets/newtype/images/story${index}/texture.jpg)` }">
    <div class="description-container" :style="{ backgroundColor: bgColor() }">
      <h2>
        <template v-for="d in descriptions">{{ d }}<br></template>
      </h2>
      <img :src="`/proj-assets/newtype/images/story${index}/next-pic.png`" alt="">
    </div>
    <div class="next-icon animated infinite bounce" :style="{ backgroundColor: bgColor() }" v-scroll-to="`#story${index + 1}`"></div>
  </section>
</template>

<script>
export default {
  props: [ 'index', 'descriptions' ],
  methods: {
    bgColor () {
      if (this.index === 1) {
        return '#706e56'
      } else if (this.index === 2) {
        return '#567067'
      } else if (this.index === 3) {
        return '#606060'
      } else if (this.index === 4) {
        return 'red'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../node_modules/animate.css/animate.min.css'

section
  width 100vw
  // height 50vh
  padding 5% 10% 15% 10%
  position relative
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
  .description-container
    width 100%
    // height 50%
    display flex
    flex-direction column
    align-items center
    padding 1% 0 8% 0
    position relative
    h2
      color #f8f8f8 !important
      font-weight 400 !important
      // margin .5em
      text-align center
      line-height 1.5em
    img
      position absolute
      height 150px
      bottom -75px
  .next-icon
    cursor pointer
    content ''
    -webkit-mask-image url(/proj-assets/newtype/images/icon-next.png)
    -webkit-mask-position center center
    -webkit-mask-size 100% auto
    -webkit-mask-repeat no-repeat
    width 80px
    height 40px
    position absolute
    bottom 5%
    padding 0
    // z-index 2

@media (max-width: 767px)
  section
    height auto
    padding 5% 10% 40% 10%
    .description-container
      padding 5% 10% 15% 10%
      h2
        text-align justify
        br
          display none
      img
        height 75px
        bottom -35px
</style>


