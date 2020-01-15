<template>
  <div class="chapter">
    <div
      :class="[
        'chapter__triangle',
        { 'chapter__triangle--rotate': active }
      ]"
      :style="{
        borderColor: `transparent transparent ${color} transparent`
      }"
    />
    <transition name="slide-fade">
      <p
        v-show="active"
        class="chapter__name"
        v-text="title"
      />
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UnitedFront')

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'black'
    }
  },
  computed: {
    ...mapState({
      currentArticleName: state => state.nav.currentArticleName
    }),
    active() {
      return this.name === this.currentArticleName
    }
  }
}
</script>

<style lang="stylus" scoped>
.chapter
  display flex
  flex-direction column
  align-items center
  cursor pointer
  &__triangle
    width 0
    height 0
    border-style solid
    border-width 0 15px 18px 15px
    // border-color transparent transparent #007bff transparent
    transform-origin 50% 50%
    transition transform .25s ease-out
    &--rotate
      transform rotate(90deg)
  &__name
    margin 12px 0 0 0
    writing-mode vertical-rl
    text-orientation mixed
    color #4a4a4a
    letter-spacing 2px

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
