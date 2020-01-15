<template>
  <button
    :class="[ 'interest', { 'interest--active': isActive } ]"
    @mouseover="toggleActive"
    @mouseout="toggleActive"
    @touchstart="toggleActive"
    @touchend="toggleActive"
  >
    <div class="interest__emotion" :style="{ maskImage: `url(/proj-assets/president-promise/icon/icon_${emotionType}.png)` }"></div>
    <p class="interest__emotion-hint" v-text="EMOTION_HINT_WORDING[emotionType]"></p>
  </button>
</template>

<script>
import ButtonToogleActive from '../../mixins/ButtonToogledActive'

export default {
  props: {
    emotionType: {
      type: String,
      required: true,
    },
  },
  mixins: [ ButtonToogleActive ],
  data () {
    return {
      EMOTION_HINT_WORDING: {
        'very-interest': '我關心',
        'idk': '不知道',
        'not-interest': '我不關心',
      },
    }
  },
}
</script>

<style lang="stylus" scoped>
.interest
  side = 127px
  width side
  height side
  border-radius 10px
  cursor pointer
  background-color transparent
  transition background-color .25s
  border none
  // display flex
  // flex-direction column
  // justify-content center
  // align-items center
  padding 0
  &:focus
    outline none
  // &:hover
  //   background-color #26555f
  //   transition background-color .25s
  &--active
    background-color #26555f
    transition background-color .25s
  &__emotion
    side = 60px
    width side
    height side
    -webkit-mask-position center center
    -webkit-mask-size 100% 100%
    -webkit-mask-repeat no-repeat
    background-color white
    transition background-color .25s
    margin auto auto 0 auto
    ~/--active &
      background-color #b2dbd5
      transition background-color .25s
  &__emotion-hint
    font-size 24px
    line-height 1.28
    text-align center
    color #ffffff
    transition color .25s
    margin 16px auto auto auto
    ~/--active &
      color #b2dbd5
      transition color .25s

@media (max-width 425px)
  .interest
    side = 86px
    width side
    height side
    min-width side
    min-height side
    &__emotion
      side = 40px
      width side
      height side
    &__emotion-hint
      font-size 16px
      line-height 1.31
      margin 11px 0 0 0
</style>

