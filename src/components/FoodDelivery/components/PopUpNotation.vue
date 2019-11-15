<template>
  <!-- <span class="pop-up-notation" @mouseenter="showText" @mouseleave="hideText" @click="toggleText"> -->
  <span class="pop-up-notation" @click="toggleText">
    <!-- todo 叉叉樣式 -->
    <span class="pop-up-notation__symbol">{{ isText ? 'X' : '註' }}</span>
    <span class="pop-up-notation__text" v-if="isText" :style="{ top: `${textTop}px` }" @click.stop v-html="text"></span>
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
      // isMouseEnter: true
    }
  },
  methods: {
    // showText () {
    //   // if (this.Text) this.Text
    //   console.log('enter');
    //   this.isMouseEnter = true
    //   this.textTop = this.$el.offsetTop + 32
    //   this.isText = true
    // },
    // hideText () {
    //   console.log('leave');
    //   this.isText = false
    // },
    toggleText () {
      // if (this.isMouseEnter) {
      //   this.isMouseEnter = false
      //   return
      // }
      if (this.isText) {
        this.isText = false
      } else {
        this.textTop = this.$el.offsetTop + 32
        this.isText = true
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

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
  // position relative
  &__symbol
    display inline-block
    font-weight 500
    user-select none
    // cursor pointer
  &__text
    position absolute
    box-shadow 0 2px 4px rgba(#000, 0.5)
    left 0
    width 100%
    border-radius 12px
    border 2px solid #fff
    background-color #ffdc03
    // font-size 1.6rem
    line-height 1.38
    padding 9px 15px
    cursor auto
    & span
      display block
      & + span
        margin-top 22px
    // & br
    //   content ''
    //   display block
    //   height 28px
    @media (min-width $mobile)
      border-radius 6px
      padding-left 20px
      padding-right 20px
</style>