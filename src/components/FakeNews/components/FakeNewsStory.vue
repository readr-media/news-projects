<template>
  <div class="story">
    <p>解說式圖文標題</p>
    <div class="story-container">
      <figure @click="handleSlideshow(1)">
        <img src="/proj-assets/disinformation/story-01.jpg" alt="">
        <figcaption>網路帶來方便的社會，卻也成為有心人利用的工具。</figcaption>
      </figure>
      <figure @click="handleSlideshow(2)">
        <img src="/proj-assets/disinformation/story-02.jpg" alt="">
        <figcaption>前行政院長賴清德去年 10 月指出，臺灣受到嚴重的假訊息威脅。</figcaption>
      </figure>
      <figure @click="handleSlideshow(3)">
        <img src="/proj-assets/disinformation/story-03.jpg" alt="">
        <figcaption>去年底，行政院提出一套「打假方案」。</figcaption>
      </figure>
      <figure @click="handleSlideshow(4)">
        <img src="/proj-assets/disinformation/story-04.jpg" alt="">
        <figcaption>但這個舉動立刻引發爭議：政府的介入會不會影響言論自由？</figcaption>
      </figure>
      <figure @click="handleSlideshow(5)">
        <img src="/proj-assets/disinformation/story-05.jpg" alt="">
        <figcaption>爭議之後，行政院決定先退一步，希望網路平台業者能先自律。</figcaption>
      </figure>
      <figure @click="handleSlideshow(6)">
        <img src="/proj-assets/disinformation/story-06.jpg" alt="">
        <figcaption>但經過我們的調查，發現「業者先自律」的呼籲早在 3 年前就已經開始。</figcaption>
      </figure>
      <figure @click="handleSlideshow(7)">
        <img src="/proj-assets/disinformation/story-07.jpg" alt="">
        <figcaption>假訊息的解方，全世界都在找。</figcaption>
      </figure>
      <figure @click="handleSlideshow(8)">
        <img src="/proj-assets/disinformation/story-08.jpg" alt="">
        <figcaption>你覺得什麼是假訊息？什麼程度的假訊息應該被管制？</figcaption>
      </figure>
      <figure @click="handleSlideshow(9)">
        <img src="/proj-assets/disinformation/story-09.jpg" alt="">
        <figcaption>假訊息的管制真的無解嗎？</figcaption>
      </figure>
    </div>
    <div v-show="openSlideshow" class="story-slideshow">
      <div class="story-slideshow-container">
        <div class="story-slideshow__header">
          <nav>
            <div v-for="item in 9" :key="`story-${item}`" @click="current = item"></div>
          </nav>
          <div class="story-slideshow__header-title">
            <p>解說式圖文標題</p>
            <button @click="openSlideshow = false"><img src="/proj-assets/disinformation/close.png" alt=""></button>
          </div>
        </div>
        <img v-for="item in 9" v-show="current === item" :key="`story-img-${item}`" :src="`/proj-assets/disinformation/story-0${item}.jpg`" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FakeNewsStory',
  data () {
    return {
      current: 1,
      openSlideshow: false
    }
  },
  methods: {
    handleSlideshow (index) {
      this.current = index
      this.openSlideshow = true
    }
  }
}
</script>
<style lang="stylus" scoped>
.story
  padding 1em 0
  background-color #fff
  border 1px solid #dddfe2
  border-left none
  border-right none
  p
    padding 0 1em
  figure
    position relative
    display inline-block
    width 110px
    height 150px
    margin 0 0 0 1em
    cursor pointer
    & + figure
      margin-left .4em
    &:last-of-type
      margin-right 1em
    &::after
      content ''
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      background-image linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .6) 100%)
    img
      width 100%
      height 100%
      border-radius 4px
      object-fit cover
      object-position center bottom
    figcaption
      position absolute
      left 0
      bottom 0
      z-index 1
      width 100%
      padding .5em
      color #fff
      font-size .8125rem
      text-align justify
      white-space normal
  &-container
    width 100%
    margin-top .5em
    overflow-x auto
    white-space nowrap
  &-slideshow
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 999
    width 100%
    img
      width 100%
      height 100%
      object-fit cover
      object-position center center
    &-container
      position relative
      width 100%
      height 100%
    &__header
      position absolute
      top 0
      left 0
      right 0
      width 100%
      padding 1em 1em 0
      nav
        display flex
        justify-content space-around
        > div
          flex 1
          height 2px
          background-color #ccd0d5
          cursor pointer
          & + div
            margin-left 5px
      &-title
        display flex
        margin-top .5em
        p
          padding 0
          color #fff
          font-size .9375rem
        button
          margin 0 0 0 auto
          img
            width 15px
            height 15px

@media (min-width: 1024px)
  .story
    padding 1em
    border-left 1px solid #dddfe2
    border-right 1px solid #dddfe2
    border-radius 4px
    p
      padding 0
    figure
      display flex
      align-items center
      width 100%
      height auto
      margin 0
      font-size 0
      & + figure
        margin 10px 0 0 
      &::after
        content none
      img
        width 50px
        height 50px
        border-radius 50%
      figcaption
        flex 1
        position static
        padding 0
        margin-left 15px
        color #000
        font-size .875rem
        font-weight 600
        text-align justify
    &-container
      white-space normal
    &-slideshow
      display flex
      justify-content center
      align-items center
      background-color rgba(0,0,0,.8)
      &-container
        width 375px
        height 700px
      &__header-title
        button
          position fixed
          top 15px
          right 15px

</style>
