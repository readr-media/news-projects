<template>
  <button :class="[ 'checkbox', 
                    { 'checkbox--is-checked': isChecked },
                    { 'checkbox--is-hovered': !isChecked && isMouseOver }
                  ]"
          @click="clicked"
          @mouseover="hovered"
          @mouseout="hovered">
    <div class="checkbox__check-icon" v-show="showCheckedIcon"></div>
  </button>
</template>

<script>
import { get, } from 'lodash'

export default {
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isChecked () {
      this.$emit('update:interested', this.isChecked)
    }
  },
  data () {
    return {
      isDesktop: get(this.$store.state, 'useragent.isDesktop', false),
      isChecked: this.checked,
      isMouseOver: false,
    }
  },
  computed: {
    showCheckedIcon () {
      return this.isMouseOver || this.isChecked
    },
  },
  methods: {
    clicked () {
      this.isChecked = !this.isChecked
    },
    hovered () {
      if (!this.isDesktop) return
      this.isMouseOver = !this.isMouseOver
    }
  },
}
</script>

<style lang="stylus" scoped>
.checkbox
  side = 20px
  width side
  height side
  min-width side
  min-height side
  border-radius side
  cursor pointer
  background-color transparent
  border 1px solid white
  transition background-color .15s, border .15s
  // display flex
  // justify-content center
  // align-items center
  padding 0
  &:focus
    outline none
  &--is-checked
    background-color #fa8d62
    border 1px solid #fa8d62
    transition background-color .15s, border .15s
  &--is-hovered
    background-color rgba(250, 141, 98, .5)
    transition background-color .15s, border .15s
  &__check-icon
    width (side / 1.8)
    height (side / 1.8)
    background-color #275964
    transition background-color .15s
    transform rotate(45deg)
    clip-path polygon(85% 0, 100% 0, 100% 100%, 43% 100%, 43% 85%, 85% 85%)
    position relative
    bottom 3px
    right 1px
    margin auto

@media (max-width 425px)
  .checkbox
    side = 28px
    width side
    height side
    min-width side
    min-height side
    border-radius side
    &__check-icon
      width (side / 1.8)
      height (side / 1.8)
      bottom 5px
      right 2px

</style>


