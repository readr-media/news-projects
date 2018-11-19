<template>
  <div class="what-pp-say">
    <div class="what-pp-say__title"><h2><span v-text="$t('REFERENDUM.WHAT_PEOPLE_SAY.TITLE')"></span></h2></div>
    <div class="what-pp-say__vid vid">
      <video width="100%" height="100%" controls controlsList="nodownload" preload="metadata" playsinline 
        poster="/proj-assets/referendum/referendum-good-or-not-poster.png" :style="{ backgroundColor: '#000' }">
        <source src="/proj-assets/referendum/referendum-good-or-not.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="what-pp-say__desc desc"><span v-text="$t('REFERENDUM.WHAT_PEOPLE_SAY.DESC')"></span></div>
  </div>
</template>
<script>
  import verge from 'verge'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'  
  export default {
    name: 'WhatPeopleSay',
    data () {
      return {
        isGaSent: false
      }
    },
    methods: {},
    mounted () {
      window.addEventListener('scroll', () => {
        const current_top_y = currentYPosition()
        const content_top_y = elmYPosition(`.what-pp-say`)
        const content_height = this.$el.clientHeight
        const device_height = verge.viewportH()
        if (!this.isGaSent && (content_top_y + (content_height * 2) / 3 < current_top_y + device_height)) {
          window.ga('send', 'event', 'projects', 'scroll', `scroll to 8`, { nonInteraction: false })
          this.isGaSent = true
        }
      }) 
    },
  }
</script>
<style lang="stylus" scoped>
  .what-pp-say
    padding 50px 0
    background-color #f9f9f7
    position relative
    z-index 10    
    & > div
      &:not(.vid)
        padding 0 25px
        margin 20px 0
    &__title
      h2
        font-size 1.5rem
        font-weight 600
        font-style normal
        font-stretch normal
        line-height 1.42
        letter-spacing normal
        text-align justify
        color #a40035      
    &__vid
      width 100%
      max-width 600px
      background-color #000
    &__desc
      font-size 0.875rem
      font-weight normal
      font-style normal
      font-stretch normal
      line-height 1.71
      letter-spacing normal
      text-align justify
      color #a0a0a0
  @media screen and (min-width: 600px) 
    .what-pp-say   
      padding 130px 0
      & > div
        &:not(.desc):not(.vid)
          margin 50px auto 
        &.desc, &.vid
          padding 0
          margin 20px auto
      &__title
        h2
          font-size 1.875rem
          line-height 1.48
          text-align center
      &__vid
        max-width 600px
      &__desc
        max-width 600px
        line-height 1.57
</style>