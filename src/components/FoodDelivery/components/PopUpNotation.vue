<template>
  <span class="pop-up-notation" @click="toggleText">
    <img :src="`/proj-assets/food-delivery/img/icon/notation-${isText ? 'close' : 'default'}.svg`" alt="" loading="lazy">
    <transition name="fade-notation">
      <span class="pop-up-notation__text" v-if="isText" :style="{ top: `${textTop}px` }" @click.stop v-html="text"></span>
    </transition>
  </span>
</template>

<script>
export default {
  name: 'PopUpNotation',
  props: [ 'text' ],
  data () {
    return {
      textTop: 0,
      isText: false
    }
  },
  methods: {
    toggleText () {
      if (this.isText) {
        this.isText = false
      } else {
        this.textTop = this.$el.offsetTop + 32
        this.isText = true
      }
      window.ga('send', 'event', 'projects', 'click', `註-${this.isText ? '開' : '關'}`)
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'
@import '../util/transition.styl'

.pop-up-notation
  border-radius 50%
  width 24px
  height 24px
  box-shadow 0 2px 4px rgba(#000, 0.5)
  background-color #ffdc03
  display inline-flex
  justify-content center
  align-items center
  border 2px solid #fff
  margin-right 4px
  margin-left 4px
  cursor pointer
  & img
    width 14px
    vertical-align middle
    user-select none
  &__text
    position absolute
    box-shadow 0 2px 4px rgba(#000, 0.5)
    left 0
    width 100%
    border-radius 12px
    border 2px solid #fff
    background-color #ffdc03
    // line-height 1.38
    line-height 1.5
    padding 9px 15px
    cursor auto
    & span
      display block
      & + span
        margin-top 22px
    @media (min-width $mobile)
      border-radius 6px
      padding-left 20px
      padding-right 20px
</style>