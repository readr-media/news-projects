<template>
  <!-- <div :style="parallaxProps.image" :class="`parallax--story${storyIndex}`"> -->
  <div :class="[ 'parallax', `parallax--story${storyIndex}` ]">
    <div :class="[ `parallax__image-container`, `parallax__image-container--story${storyIndex}` ]">
      <img :class="[ `parallax__image`, `parallax__image--story${storyIndex}` ]" :src="parallaxProps.image.backgroundImage.replace(/url\(|\)/g, '')" alt="">
    </div>
    <blockquote>{{ parallaxProps.description }}</blockquote>
  </div>
</template>

<script>
import sectionParallax from '../../mixins/scrollmagic/sectionParallax.js'

export default {
  props: [ 'parallaxProps', 'storyIndex' ]
  // mixins: [ sectionParallax ]
}
</script>

<style lang="stylus" scoped>
.parallax
  height 600px
  background-size 100% auto
  background-position center center
  background-attachment fixed
  position relative
  &__image-container
    width 100%
    height 100%
    overflow hidden
    position relative
  &__image
    width 100%
    height auto
    position absolute
    bottom 0
    will-change transform
  blockquote
    display flex
    justify-content center
    align-items center
    padding 100px
    position absolute
    bottom -100px
    line-height 1.75

#story1
  blockquote
    background-color #FAE1E4
    width 500px
    height 250px
    clip-path polygon(22% 0%, 0% 21%, 10% 100%, 87% 92%, 100% 44%, 87% 0%)
    left 100px
#story2
  blockquote
    background-color #F4E5D2
    width 500px
    height 200px
    clip-path polygon(0% 40%, 12% 3%, 82% 0%, 100% 18%, 88% 99%, 11% 91%)
    right 100px

@media (max-width: 767px)
  .parallax
    height auto
    display flex
    flex-direction column
    background none
    &__image
      display block
      width 100vw
      position static
  #story1, #story2
    blockquote
      width 100vw
      height auto
      position static
      margin 0
      padding 1em 2em
      clip-path none
      text-align justify

</style>


