<template>
  <div class="newtype-landing">
    <img class="newtype-landing__main-concept" src="/proj-assets/newtype/images/landing/main-concept.png" alt="">
    <div class="newtype-landing__content">
      <div :class="[ 'newtype-landing__title', { 'newtype-landing__title--active': showTitle } ]">
        <h1>新二代的難題</h1>
      </div>
      <div :class="[ 'newtype-landing__description' , { 'newtype-landing__description--active': showDescritpion } ]">
        <p>台灣很多「東南亞新二代」已經不是新聞，近年來政府單位開始關注的新面向，是所謂的「跨國銜轉學生」問題。<br>由於台灣托育資源稀缺，物價高昂，東南亞跨國婚姻家庭又經常是經濟弱勢，許多家長選擇將年幼子女送回越南、印尼等國撫養，等孩子年紀稍長再返台受教育。只是這些家長們通常沒料到，孩子會因為語言與文化隔閡，導致在學校裡格格不入的狀況⋯⋯</p>
      </div>
    </div>
    <img class="newtype-landing__lighting" src="/proj-assets/newtype/images/landing/lighting.png" alt="">
  </div>
</template>

<script>
import mobileWatpoints from '../mixins/waypoints/mobileLandingTransition.js'

export default {
  mixins: [ mobileWatpoints ],
  data () {
    return {
      showTitle: true,
      showDescritpion: false
    }
  },
  mounted () {
    if(process.browser) {
      if (window.innerWidth <= 767) {
        this.showDescritpion = false
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
.newtype-landing
  width 100vw
  height 100vh
  background-image url(/proj-assets/newtype/images/landing/bg.jpg)
  background-size 100% 100%
  position relative
  &__main-concept
    // width 75vw
    height 100vh
    position absolute
    top -5%
    right 0
  &__lighting
    width 5%
    position absolute
    top 15%
    left 10%
  &__content
    position absolute
    top 20%
    left 5%
    display flex
    flex-direction column
    justify-content center
    align-items center
    width 50vw
  &__title
    background-image url(/proj-assets/newtype/images/landing/title.png)
    background-size 100% 100%
    padding 5%
    width 100%
    h1
      color #567067
      // font-size calc(137.6px) !important
      // font-size 5em !important
      text-align center
  &__description
    width 90%
    padding 30px 10%
    background-color #577167
    clip-path polygon(8% 0%, 0% 94%, 78% 100%, 100% 66%, 92% 1%)
    text-align justify
    p
      color white !important
      line-height 1.8
      font-weight 300

@media (max-width: 767px)
  .newtype-landing
    // display flex
    // flex-direction column-reverse
    // background-attachment fixed
    background-size auto auto
    background-position 70% center
    height auto
    &__main-concept
      height 50vh
      top 25%
      // bottom 0
    &__lighting
      display none
    &__content
      width 100vw
      position static
      padding-top 20%
      padding-bottom 10%
    &__title
      opacity 0
      transition opacity 1s
      &--active
        opacity 1
    &__description
      margin-top 40vh
      clip-path none
      z-index 1
      padding 2% 5%
      opacity 0
      transition opacity 1s
      &--active
        opacity 1
</style>

