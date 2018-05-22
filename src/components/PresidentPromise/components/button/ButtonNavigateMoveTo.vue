<template>
  <button 
    :class="[ 'move-to', { 'move-to--active': isActive } ]"
    @mouseover="toggleActive"
    @mouseout="toggleActive"
    @touchstart="toggleActive"
    @touchend="toggleActive"
    @click="sendGA"
  >
    <div 
      :class="[ 'move-to__icon', `move-to__icon--${navigateType}`]"
      :style="{ maskImage: `url(/proj-assets/president-promise/icon/icon_${navigateType === 'see-statistic' ? 'see-statistic' : 'more'}.png)` }"
    >
    </div>
    <div class="move-to__hint-container">
      <p 
        class="move-to__hint"
        v-for="(hintParagraph, i) in NAVIGATE_HINT_WORDING[navigateType]"
        :key="`${navigateType}-${i}`"
        v-text="hintParagraph"
      >
      </p>
    </div>
  </button>
</template>

<script>
import buttonToogleActive from '../../mixins/buttonToogleActive'

export default {
  props: {
    navigateType: {
      type: String,
      required: true,
    },
  },
  mixins: [ buttonToogleActive ],
  data () {
    return {
      NAVIGATE_HINT_WORDING: {
        'more': [ '再來十題', ],
        'see-statistic': [ '哪些政策', '大家最關心', ],
        'take-survey' : [ '篩選政策', '（10 題）' ],
      },
    }
  },
  methods: {
    sendGA () {
      window.ga('send', 'event', 'projects', 'click', `${this.navigateType}`, { nonInteraction: false })
    }
  }
}
</script>

<style lang="stylus" scoped>
.move-to
  width 201px
  height 104px
  border-radius 10px
  cursor pointer
  background-color transparent
  border 2px solid white
  transition border .25s
  padding 0 18px 0 24px
  display flex
  justify-content space-around
  align-items center
  &:focus
    outline none
  &--active
    border 2px solid #b2dbd5
    transition border .25s
  &__icon
    max-width 42px
    height 44px
    -webkit-mask-position center center
    -webkit-mask-size 100% 100%
    -webkit-mask-repeat no-repeat
    background-color white
    transition background-color .25s
    &--more, &--take-survey
      width 35px
    &--see-statistic
      width 42px
    ~/--active &
      background-color #b2dbd5
      transition background-color .25s
  &__hint-container
    display flex
    flex-direction column
    align-items flex-start
  &__hint
    font-size 18px
    color white
    transition color .25s
    line-height 1.33
    margin 0
    ~/--active &
      color #b2dbd5
      transition color .25s

@media (max-width 425px)
  .move-to
    width 130px
    height 114px
    min-width 130px
    min-height 114px
    flex-direction column
    justify-content flex-start
    align-items center
    padding 16px 0 10px 0
    &__icon
      max-width 36px
      height 38px
      // margin 0 0 8px 0
      &--more
        width 30px
        margin 0 auto 18px auto
      &--see-statistic
        width 36px
        margin 0 auto 8px auto
      &--take-survey
        width 30px
        margin 0 auto 8px auto
    &__hint-container
      align-items center
    &__hint
      font-size 16px
      line-height 1.31
</style>


