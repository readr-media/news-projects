<template>
  <header :class="`header--story${storyOrderToNumber}`">
    <h2 v-if="!isCommentary" :class="`story${storyOrderToNumber}`">個案故事{{ headerContent.storyOrder === '四' ? '三' : headerContent.storyOrder }}</h2>
    <h1 :style="h1Color">{{ headerContent.title[0] }}<br>{{ headerContent.title[1] }}</h1>
    <div v-if="!isCommentary" class="description">
      <!-- Story protagonist image -->
      <img class="description__protagonist" :src="`/proj-assets/newtype/images/story${storyOrderToNumber}/protagonist.png`" alt="">
      <!-- Decorations on the top of description -->
      <img class="description__dock" src="/proj-assets/newtype/images/dock.png" alt="">
      <!-- Tapes around the corner -->
      <!-- <img class="description__tape description__tape--top-left" src="/proj-assets/newtype/images/story2/tape.png" alt=""> -->
      <!-- <img class="description__tape description__tape--bottom-right" src="/proj-assets/newtype/images/story2/tape.png" alt=""> -->
      <img :class="[ 'description__tape', `description__tape--story${storyOrderToNumber}`, 'description__tape--top-left' ]"></img>
      <img :class="[ 'description__tape', `description__tape--story${storyOrderToNumber}`, 'description__tape--bottom-right' ]"></img>
      <!-- Contents -->
      <div class="description__content">
        <p v-for="(paragraph, i) in headerContent.description" :key="i">
          {{ paragraph }}
        </p>
      </div>
      <!-- Decorations on the bottom of description -->
      <!-- <img class="description__dock description__dock--bottom" src="/proj-assets/newtype/images/story2/dock-bottom.png" alt=""> -->
    </div>
  </header>
</template>

<script>
import protagonistTranform from '../../mixins/scrollmagic/transform/protagonist.js'

export default {
  props: [ 'isCommentary', 'headerContent' ],
  mixins: [ protagonistTranform ],
  computed: {
    storyOrderToNumber () {
      if (this.headerContent.storyOrder === '一') {
        return 1
      } else if (this.headerContent.storyOrder === '二') {
        return 2
      } else if (this.headerContent.storyOrder === '三') {
        return 3
      } else if (this.headerContent.storyOrder === '四') {
        return 4
      } else if (this.headerContent.storyOrder === '五') {
        return 5
      }
    },
    h1Color () {
      if (this.storyOrderToNumber === 1) {
        return { color: '#706e56' }
      } else if (this.storyOrderToNumber === 2) {
        return { color: '#567067' }
      } else if (this.storyOrderToNumber === 4) {
        return { color: '#364d77' }
      } else if (this.storyOrderToNumber === 3 || this.storyOrderToNumber === 5) {
        return { color: '#e4bb8b' }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
flex(flex-direction, justify-content, align-items)
  display flex
  flex-direction flex-direction
  justify-content justify-content
  align-items align-items

header
  flex(column, center, center)
  padding 0 20%
  padding-bottom 100px
  h2
    // background-color #F4E5D2
    padding 0 30px
    margin-bottom 0
    color #606060
    &.story1
      background-color #fae2e4
    &.story2
      background-color #f4e5d2
    &.story4
      background-color #c4d3ce
  h1
    // color #567067
    br
      display none
  .description
    position relative
    margin-top 188px
    flex(column, center, center)
    // .element
    //   background-color green
    //   -webkit-mask-image url(/proj-assets/newtype/images/tape-mask.png)
    //   -webkit-mask-position center center
    //   -webkit-mask-size 100% auto
    //   -webkit-mask-repeat no-repeat
    //   width 200px
    //   height 300px
    //   opacity .5
    &__protagonist
      position absolute
      // bottom 50%
      top 0
      width 40%
      left 50%
      transform translateX(-50%)
    &__dock
      position relative
      bottom -1px
      z-index 1
      width 100%
    &__tape
      // position absolute
      // z-index 2
      // width 200px
      // opacity .5
      // filter brightness(90%)
      // background-color #fae2e4
      -webkit-mask-image url(/proj-assets/newtype/images/tape-mask.png)
      -webkit-mask-position center center
      -webkit-mask-size 100% auto
      -webkit-mask-repeat no-repeat
      width 200px
      height 80px
      opacity .7
      position absolute
      z-index 2
      &--story1
        background-color #fae2e4
      &--story2
        background-color #f4e5d2
      &--story4
        background-color #c4d3ce
        opacity .5
      &--top-left
        left calc(-200px * 0.3)
        top -30px
      &--bottom-right
        right calc(-200px * 0.3)
        bottom -30px
    &__content
      // padding 0% 0%
      box-sizing content-box
      position relative
      background-color white
      background-clip content-box
      // Add clip corner on top right and bottom left border
      // &::before
      //   content ''
      //   position absolute
      //   top 0
      //   right 0
      //   border-top 80px solid #f8f8f8
      //   border-left 80px solid white
      //   width 0
      // &::after
      //   content ''
      //   position absolute
      //   bottom 0
      //   left 0
      //   border-top 80px solid white
      //   border-left 80px solid #f8f8f8
      //   width 0
      p
        line-height 1.8
        text-align justify
        font-weight 500
        padding 0 10%
        color #606060 !important
        &:nth-of-type(1)
          margin-top 2em !important
        &:nth-last-of-type(1)
          margin-bottom 4em !important
        &:nth-of-type(1)::first-letter
          float left
          font-size 350%
          line-height .9
          margin-right 10px
  &.header--story3, &.header--story5
    padding-bottom 0

@media (max-width: 767px)
  header
    padding 0
    h1
      text-align center
      br
        display block
    .description
      margin-top 40vh
      &__protagonist
        top -20vh
        bottom initial
        width 80%
      &__dock
        display none
      &__tape
        display none
      &__content
        p
          padding 0 2em
          &:nth-of-type(1)::first-letter
            font-size inherit
            line-height inherit
            margin-right 0
</style>


