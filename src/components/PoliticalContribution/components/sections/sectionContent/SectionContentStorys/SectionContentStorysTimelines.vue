<template>
  <div class="timelines">
    <div v-show="showOrigin" class="timelines__government-legend government-legend">
      <span>政府相關回應或作為</span>
      <img class="government-legend__icon" src="/proj-assets/political-contribution/government.png" alt="">
    </div>
    <transition name="fade" mode="out-in">
      <SectionContentStorysTimeline
        v-show="showOrigin"
        :events="originEvents"
      />
    </transition>
    <button class="timelines__toggle-g0v" @click="toggleOrigin">{{ originHint }} g0v 零時政府專案起源</button>
    <div v-show="!showOrigin" class="timelines__government-legend government-legend">
      <span>政府相關回應或作為</span>
      <img class="government-legend__icon" src="/proj-assets/political-contribution/government.png" alt="">
    </div>
    <SectionContentStorysTimeline
      :class="[ 'timelines__timeline', { 'timelines__timeline--margin-top': showOrigin } ]"
      :events="actionEvents"
    />
  </div>
</template>

<script>
import SectionContentStorysTimeline from './SectionContentStorysTimeline.vue'
import { originEvents, actionEvents, } from '../../../../constants/chronicle'

export default {
  components: {
    SectionContentStorysTimeline,
  },
  data () {
    return {
      originEvents,
      actionEvents,
      showOrigin: false
    }
  },
  computed: {
    originHint () {
      return this.showOrigin ? '關閉' : '看'
    }
  },
  methods: {
    toggleOrigin () {
      this.showOrigin = !this.showOrigin
    },
  }
}
</script>

<style lang="stylus" scoped>
.timelines
  &__toggle-g0v
    width 100%
    height 50px
    background-color transparent
    border 1px solid #979797
    display flex
    justify-content center
    align-items center
    font-size 24px
    font-weight 500
    text-align center
    color #808080
    cursor pointer
    transition color .25s ease-out, background-color .25s ease-out
    &:focus
      outline none
    &:hover
      background-color #808080
      color white
  &__timeline
    margin 0
    &--margin-top
      margin 35px 0 0 0

.government-legend
  font-size 19px
  color #808080
  display flex
  align-items center
  margin 27px 0
  &__icon
    width 44px
    position relative
    bottom 7px
    margin 0 0 0 10px

@media (max-width 1024px)
  .timelines
    &__toggle-g0v
      font-size 18px  
      &:hover
        background-color transparent
        color #808080
  .government-legend
    font-size 22px
    &__icon
      width 30px
      bottom 4px
</style>

