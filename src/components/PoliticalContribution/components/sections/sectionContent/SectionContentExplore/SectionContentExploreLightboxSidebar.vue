<template>
  <div class="section-content-explore-lightbox-sidebar">
    <ButtonSidebarToogle class="section-content-explore-lightbox-sidebar__toogle" :isFolded="!isSidebarToogled" @toogleSidebar="toogleSidebar"/>
    <div class="section-content-explore-lightbox-sidebar__content">
      <div :class="[ 'section-content-explore-lightbox-sidebar__folded-hint', { 'section-content-explore-lightbox-sidebar__folded-hint--hide': isSidebarToogled } ]" v-text="foldedHint"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ButtonSidebarToogle from '../../../buttons/ButtonSidebarToogle.vue'

export default {
  props: {
    isSidebarToogled: {
      type: Boolean,
      required: true,
    },
    foldedHint: {
      type: String,
      default: '',
    }
  },
  components: {
    ButtonSidebarToogle,
  },
  methods: {
    toogleSidebar () {
      this.$emit('toogleSidebar')
    }
  },
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-sidebar
  position relative
  width 384px
  height 100%
  border-left 2px solid lightgray
  background-color white
  &__toogle
    position sticky
    top 0
  &__content
    display flex
    height calc(95vh - 40px)
  &__folded-hint
    width 40px
    height 100%
    margin 0
    position sticky
    top 40px
    font-size 18px
    line-height 1.69
    color #808080
    padding 0 10px
    opacity 1
    pointer-events initial
    transition opacity .25s
    &--hide
      opacity 0
      pointer-events none

@media (max-width 1024px)
  .section-content-explore-lightbox-sidebar
    width 100%
    height auto
    border-left none
    &__toogle
      display none
    &__content
      height auto
    &__folded-hint
      display none
</style>


