<template>
  <button
    class="button-section"
    @mouseover="toggleActive"
    @mouseout="toggleActive"
    :style="[ isActive ? { 'width': `${buttonWidth + hintWidth}px` } : { 'width': `${buttonWidth}px` } ]"
  >
    <div
      :class="[ 'button-section__icon', { 'button-section__icon--router-link-active': routerLinkActive } ]"
      :style="{ maskImage: `url(/proj-assets/political-contribution/${iconSrc})` }"
    >
    </div>
    <p :class="[ 'button-section__hint', { 'button-section__hint--active': isActive } ]" v-text="hintWording"></p>
  </button>
</template>

<script>
import ButtonToogleActive from '../../mixins/ButtonToogleActive.js'

export default {
  props: {
    iconSrc: {
      type: String,
      required: true,
    },
    hintWording: {
      type: String,
      required: true,
    },
    routerLinkActive: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      buttonWidth: 60,
      hintWidth: undefined,
    }
  },
  mixins: [
    ButtonToogleActive,
  ],
  mounted () {
    // Workaround for transition to width: auto
    this.hintWidth = this.$el.querySelector('.button-section__hint').offsetWidth
  }
}
</script>

<style lang="stylus" scoped>
.button-section
  r = 60px
  // width r
  height r
  border-radius r
  border none
  box-shadow 0 0 4px 2px rgba(42, 35, 38, 0.2)
  background-color white
  cursor pointer
  display flex
  justify-content flex-start
  align-items center
  padding 0 0 0 10px
  transition width .25s
  font-family inherit
  &:focus
    outline none
  &__icon
    min-width 40px
    width 40px
    min-height 40px
    height 40px
    mask-position center center
    mask-size 100% auto
    mask-repeat no-repeat
    background-color #808080
    transition background-color .25s
    &--router-link-active
      background-color #9e005d
  &__hint
    margin 0
    padding 0 16px 0 19px
    font-size 16px
    color #2a2326
    white-space nowrap
    opacity 0
    transition opacity .25s
    pointer-events none
    &--active
      transition opacity .25s linear .25s
      opacity 1
      pointer-events initial
</style>
