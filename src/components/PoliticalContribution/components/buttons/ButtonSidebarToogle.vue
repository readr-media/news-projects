<template>
  <div class="button-sidebar-toogle-container">
    <button
      :class="[ 'button-sidebar-toogle', { 'button-sidebar-toogle--hover': isActive } ]"
      @mouseover="toggleActive"
      @mouseout="toggleActive"
      @click="toogleSidebar"
    >
      <div :class="[ 'button-sidebar-toogle__icon', { 'button-sidebar-toogle__icon--folded': isFolded } ]"></div>
    </button>
    <AppArrowTooltip
      :class="[ 'button-sidebar-toogle-tooltip', { 'button-sidebar-toogle-tooltip--active': isActive } ]"
      :hintText="'隱藏'"
    />
  </div>
</template>

<script>
import AppArrowTooltip from '../AppArrowTooltip.vue'
import ButtonToogleActive from '../../mixins/ButtonToogleActive.js'

export default {
  props: {
    isFolded: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    AppArrowTooltip,
  },
  mixins: [
    ButtonToogleActive,
  ],
  methods: {
    toogleSidebar () {
      this.$emit('toogleSidebar')
    },
  }
}
</script>

<style lang="stylus" scoped>
.button-sidebar-toogle-container
  width max-content
  display flex
  align-items center

.button-sidebar-toogle
  width 40px
  height 40px
  background-color #808080
  border none
  cursor pointer
  padding 0
  filter brightness(100%)
  transition filter .25s
  &:focus
    outline none
  &--hover
    filter brightness(80%)
  &__icon
    width 40px
    height 40px
    background-color white
    clip-path polygon(30% 19%, 27% 24%, 70% 50%, 27% 77%, 30% 82%, 80% 50%)
    margin auto
    transform rotate(0deg)
    transition transform .25s
    &--folded
      transform rotate(-180deg)

.button-sidebar-toogle-tooltip
  width 40px
  margin 0 0 0 10px
  visibility hidden
  opacity 0
  transition opacity 1s
  pointer-events none
  &--active
    visibility visible
    opacity 1
    pointer-events initial
</style>

