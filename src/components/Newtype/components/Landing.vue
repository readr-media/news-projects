<template>
  <div class="newtype-landing">
    <img class="newtype-landing__main-concept" src="/proj-assets/newtype/images/landing/main-concept.png" alt="">
    <div class="newtype-landing__content">
      <div :class="[ 'newtype-landing__title', { 'newtype-landing__title--active': showTitle } ]">
        <h1>新二代的難題</h1>
      </div>
      <div :class="[ 'newtype-landing__description' , { 'newtype-landing__description--active': showDescritpion } ]">
        <p>再害但王著入兒轉及資強：上女我候苦不星時趣色，各演會花開中美風開法場新長，無部鄉告作力院觀中就一日個我了動西汽能的望知前如面音會關？三廣有都種來老和善是間多用處意是有你了們，或義戰在藝的，心方司會明懷它為極資灣大不白真專收都出裡魚點著望。</p>
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
    width 45vw
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
    width 80%
    padding 2% 10%
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
    background-attachment fixed
    background-size auto auto
    background-position 70% center
    height auto
    &__main-concept
      height 50vh
      top 30%
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
      margin-top 50vh
      clip-path none
      z-index 1
      padding 2% 5%
      opacity 0
      transition opacity 1s
      &--active
        opacity 1
</style>

