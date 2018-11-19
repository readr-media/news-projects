<template>
  <div class="finding-show" :id="id">
    <div class="finding-show__infographic" ref="infographic"
      :class="{ active: isActive }">
      <slot name="infographic"></slot>
    </div>
    <div class="finding-show__explanation">
      <slot name="explanation"></slot>
    </div>
  </div>
</template>
<script>
  import verge from 'verge'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  export default {
    name: 'FindingShowMobile',
    data () {
      return {
        isActive: false,
        isGaSent: false,
      }
    },
    methods: {
      setUpShowTime () {
        window.addEventListener('scroll', () => {
          const current_top_y = currentYPosition()
          const content_top_y = elmYPosition(`#${this.id}.finding-show`)
          const content_height = this.$el.clientHeight
          const device_height = verge.viewportH()

          if (content_top_y < current_top_y + device_height / 2) {
            if (content_top_y + content_height < current_top_y + device_height / 2) {
              this.isActive = false
            } else {
              this.isActive = true
            }
          } else {
            this.isActive = false
          }

          if (!this.isGaSent && (content_top_y + (content_height * 2) / 3 < current_top_y + device_height)) {
            window.ga('send', 'event', 'projects', 'click', `scroll to 1`, { nonInteraction: false })
            this.isGaSent = true
          }
        })
      }
    },
    mounted () {
      this.setUpShowTime()
    },
    props: {
      id: {
        type: String,
        default: `finding-show-${Date.now().toString()}`
      },
      index: {
        type: Number,
      },
    },    
  }
</script>
<style lang="stylus" scoped>
  .finding-show
    &__infographic
      .infographic
        opacity 0
        transition opacity 0.75s
        position fixed
        top 0
        left 0
        width 100vw
        height 100vh
        display flex
        justify-content center
        align-items center
        z-index 1!important
        img
          width 100%
          object-fit contain
          object-position center center
      &.active
        .infographic
          opacity 1
    &__explanation
      position relative
      z-index 9    
      padding 80vh 0 
      .explanation
        padding 25px
        background-color rgba(255,255,255,0.85)   
  // @media screen and (min-width: 600px) 
  //   .finding-show
  //     &__infographic
  //       .infographic
  //         img
  //           width auto
  //           height 100%
</style>