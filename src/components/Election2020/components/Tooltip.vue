<template>
  <div
    v-show="showTooltip"
    ref="tooltip"
    :style="{ top: `${y + offset}px`, left: `${x + offset}px` }"
    class="tooltip"
    v-click-outside="handleClickOutside"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Tooltip',
  props: {
    showTooltip: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      default: 20
    }
  },
  directives: {
    'click-outside': {
      bind (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },
  watch: {
    showTooltip (value) {
      if (value) {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        this.$nextTick(() => {
          // const rect = this.$refs.tooltip.getBoundingClientRect()
          const isOutWidth = this.x + this.offset + 300 > viewportWidth // rect.right > viewportWidth
          
          if (isOutWidth) {
            this.$refs.tooltip.classList.add('fix-horiz')
          }
        })
      } else {
        this.$refs.tooltip.classList.remove('fix-both')
        this.$refs.tooltip.classList.remove('fix-horiz')
        this.$refs.tooltip.classList.remove('fix-vert')
      }
    }
  },
  methods: {
    handleClickOutside () {
      if (this.showTooltip) {
        this.$emit('close')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.tooltip
  position fixed
  padding 20px 15px
  background-color #fff
  border 1px solid rgba(0, 0, 0, .3)
  z-index 500
  &.fix-horiz
    transform translateX(-100%)
  
@media (min-width: 768px)
  .tooltip
    min-width 300px
    
</style>