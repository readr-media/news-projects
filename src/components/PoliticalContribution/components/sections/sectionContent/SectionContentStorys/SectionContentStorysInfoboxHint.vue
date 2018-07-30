<template>
  <span class="section-content-story-infobox-hint">
    <span class="section-content-story-infobox-hint__hint" v-text="hint" @click="toogleInfobox"></span>
    <transition name="fade" mode="out-in">
      <blockquote class="section-content-story-infobox-hint__infobox" v-show="showInfobox">
        <p class="section-content-story-infobox-hint__infobox-placeholder">註：</p>
        <slot></slot>
      </blockquote>
    </transition>
  </span>
</template>

<script>
export default {
  props: {
    hint: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      showInfobox: false
    }
  },
  methods: {
    toogleInfobox () {
      this.showInfobox = !this.showInfobox
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-story-infobox-hint
  &__hint
    border-bottom 2px solid #9e005d
    cursor pointer
    color #9e005d
    font-weight bold
  &__infobox
    margin 34px 0
    padding 40px 24px
    border 1px solid gray
    display flex
    justify-content center
    color gray
  &__infobox-placeholder
    margin 0

.fade-enter-active
  transition opacity .5s
.fade-leave-active
  transition opacity 0s
.fade-enter, .fade-leave-to
  opacity 0
</style>


