<template>
  <div class="finding-show" :id="id" :style="fidingShowStyle">
    <div class="finding-show__infographic" ref="infographic"
      :class="{ active: isActive, fixed: isFixed, sunken: isSunken }"
      :style="infographicStyle">
      <slot name="infographic"></slot>
    </div>
    <div class="finding-show__shadow shadow" ref="shadow"
      :class="{ active: isFixed }" :style="shadowStyle"></div>
    <div class="finding-show__explanation" :style="shadowStyle"><slot name="explanation"></slot></div>
  </div>
</template>
<script>
  import verge from 'verge'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  export default {
    name: 'FindingShow',
    data () {
      return {
        contentTop: 9999,
        fidingShowStyle: {},
        isActive: false,
        isFixed: false,
        isAbsolute: false,
        infographicStyle: {},
        infographicSize: {},
        isSunken: false,
        shadowStyle: {},
      }
    },
    methods: {
      setUpShadow () {
        this.shadowStyle = {
          width: `${this.infographicSize.width}px`,
          height: `${this.$el.clientHeight}px`,
        }
        this.infographicStyle = {
          width: `${this.infographicSize.width}px`,
          height: `${this.infographicSize.height}px`,
          top: `${(verge.viewportH() - this.infographicSize.height) / 2}px`,
          left: `calc(50vw - ${this.infographicSize.width}px)`,
        }
      },
      setUpHandler () {
        window.addEventListener('scroll', () => {
          const current_top_y = currentYPosition()
          const content_height = this.$el.clientHeight
          const device_height = verge.viewportH()

          this.infographicSize.top = elmYPosition(`#${this.id}.finding-show .shadow`)
          this.contentTop = elmYPosition(`#${this.id}.finding-show .explanation`)

          if (this.infographicSize.top < current_top_y + device_height / 2) { 
            if (this.contentTop + content_height < current_top_y + device_height / 4) {
              this.isSunken = true
              this.isActive = true
            } else {
              this.isActive = true   
              this.isSunken = false
            }        
          } else {
            this.isActive = false
            this.isSunken = false
          }
        })        
      }      
    },
    mounted () {
      this.infographicSize.width = this.$refs.infographic.querySelector('img').clientWidth
      this.infographicSize.height = this.$refs.infographic.querySelector('img').clientHeight
      this.setUpShadow()
      this.setUpHandler()
      this.isFixed = true
    },
    props: {
      id: {
        type: String,
        default: `finding-show-${Date.now().toString()}`
      }
    },
  }
</script>
<style lang="stylus" scoped>
  .finding-show
    display flex
    align-items center
    margin-bottom 300px
    &__infographic
      flex 1
      opacity 0
      transition opacity 0.75s
      &.fixed
        position fixed
        z-index 9
      &.active
        opacity 1
        &.sunken
          opacity 0
    &__shadow
      display none
      &.active
        display block
    &__explanation
      flex 1
      display flex
      align-items center
</style>