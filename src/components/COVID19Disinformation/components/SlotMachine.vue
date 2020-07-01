<template>
  <div
    :class="{ transitioning, isPlayed }"
    class="slot-machine"
  >
    <div class="slot-machine-container">
      <picture>
        <source
          media="(min-width: 1024px)"
          srcset="/proj-assets/covid19-disinformation/slot-machine-desktop.png"
        >
        <img src="/proj-assets/covid19-disinformation/slot-machine.png">
      </picture>
      <div class="slot-machine__content">
        <div class="slot">
          <div
            :class="[{transitioning }, `result-${column1}`]"
            class="scoll-container column1"
          >
            <div
              v-for="item in SLOT_MACHINE_COLUMN_1_TW"
              :key="item"
              class="option"
              v-text="item"
            />
          </div>
        </div>
        <div class="slot">
          <div
            :class="[{transitioning }, `result-${column2}`]"
            class="scoll-container column2"
          >
            <div
              v-for="item in SLOT_MACHINE_COLUMN_2_TW"
              :key="item"
              class="option"
              v-text="item"
            />
          </div>
        </div>
        <div class="slot">
          <div
            :class="[{transitioning }, `result-${column3}`]"
            class="scoll-container column3"
          >
            <div
              v-for="item in SLOT_MACHINE_COLUMN_3_TW"
              :key="item"
              class="option"
              v-text="item"
            />
          </div>
        </div>
      </div>
      <button
        :disabled="transitioning"
        class="slot-machine__btn"
        @click="handleClick"
      />
      <ShakeArrow class="slot-machine__arrow" />
    </div>
  </div>
</template>

<script>

import {
  SLOT_MACHINE_COLUMN_1_TW,
  SLOT_MACHINE_COLUMN_2_TW,
  SLOT_MACHINE_COLUMN_3_TW
} from '../const.js'
import ShakeArrow from './ShakeArrow.vue'

export default {
  name: 'SlotMachine',
  components: {
    ShakeArrow
  },
  props: {
    column1: {
      type: Number,
      default: undefined
    },
    column2: {
      type: Number,
      default: undefined
    },
    column3: {
      type: Number,
      default: undefined
    },
    isPlayed: {
      type: Boolean,
      default: false
    },
    transitioning: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      SLOT_MACHINE_COLUMN_1_TW,
      SLOT_MACHINE_COLUMN_2_TW,
      SLOT_MACHINE_COLUMN_3_TW
    }
  },
  methods: {
    handleClick () {
      this.$emit('play')
    }
  }
}
</script>

<style lang="stylus" scoped>
.slot-machine
  padding 50px 0
  background-image url(/proj-assets/covid19-disinformation/bg.png)
  background-size cover
  background-position top right
  background-repeat no-repeat
  @media (min-width: 1024px)
    padding 79px 0 0
    background-image none
  &-container
    position relative
    width 300px
    margin 0 auto
    @media (min-width: 1024px)
      width 660px
    picture
      display block
      img
        display block
        width 100%
  &__content
    display flex
    flex-direction column
    position absolute
    top 100px
    left 45px
    width 210px
    height 310px
    @media (min-width: 1024px)
      flex-direction row
      top 80px
      width 570px
      height 200px
    .slot
      flex 1
      display flex
      color #fff
      overflow hidden
      & + .slot
        margin 15px 0 0
        @media (min-width: 1024px)
          margin 0
    .scoll-container
      display flex
      transition transform .5s ease-in-out 2.5s
      @media (min-width: 1024px)
        flex 1 !important
        flex-direction column
      &.column1
        flex 0 0 2730px
        @media (min-width: 1024px)
          height 2600px
      &.column2
        flex 0 0 3570px
        @media (min-width: 1024px)
          height 3400px
      &.column3
        flex 0 0 2940px
        @media (min-width: 1024px)
          height 2800px
      &.transitioning
        animation rotateX 2.5s 30 ease-in-out backwards
        @media (min-width: 1024px)
          animation rotateY 2.5s 30 ease-in-out backwards
      .option
        flex 1
        display flex
        justify-content center
        align-items center
        padding 0 30px
        font-size 20px
        font-weight 500
        line-height 1.4
        text-align center
        @media (min-width: 1024px)
          padding 0 25px
  &__btn
    display block
    margin 10px auto 0
    padding 0
    width 200px
    height 50px
    background-color transparent
    background-image url(/proj-assets/covid19-disinformation/play.svg)
    background-size contain
    background-repeat no-repeat
    background-position center center
    border none
    cursor pointer
    @media (min-width: 1024px)
      transform translateY(-55px)
  &__arrow
    margin 50px auto 0
    visibility hidden
    @media (min-width: 1024px)
      display none
  &.isPlayed
    .slot-machine__btn
      background-image url(/proj-assets/covid19-disinformation/replay.svg)
    .slot-machine__arrow
      visibility visible
  &.transitioning
    .slot-machine__btn
      background-image url(/proj-assets/covid19-disinformation/playing.svg) !important
    .slot-machine__arrow
      visibility hidden !important
.result-0
  transform translateX(0)
  @media (min-width: 1024px)
    transform translateY(0)
.result-1
  transform translateX(-210px)
  @media (min-width: 1024px)
    transform translateY(-200px)
.result-2
  transform translateX(-420px)
  @media (min-width: 1024px)
    transform translateY(-400px)
.result-3
  transform translateX(-630px)
  @media (min-width: 1024px)
    transform translateY(-600px)
.result-4
  transform translateX(-840px)
  @media (min-width: 1024px)
    transform translateY(-800px)
.result-5
  transform translateX(-1050px)
  @media (min-width: 1024px)
    transform translateY(-1000px)
.result-6
  transform translateX(-1260px)
  @media (min-width: 1024px)
    transform translateY(-1200px)
.result-7
  transform translateX(-1470px)
  @media (min-width: 1024px)
    transform translateY(-1400px)
.result-8
  transform translateX(-1680px)
  @media (min-width: 1024px)
    transform translateY(-1600px)
.result-9
  transform translateX(-1890px)
  @media (min-width: 1024px)
    transform translateY(-1800px)
.result-10
  transform translateX(-2100px)
  @media (min-width: 1024px)
    transform translateY(-2000px)
.result-11
  transform translateX(-2310px)
  @media (min-width: 1024px)
    transform translateY(-2200px)
.result-12
  transform translateX(-2520px)
  @media (min-width: 1024px)
    transform translateY(-2400px)
.result-13
  transform translateX(-2730px)
  @media (min-width: 1024px)
    transform translateY(-2600px)
.result-14
  transform translateX(-2940px)
  @media (min-width: 1024px)
    transform translateY(-2800px)
.result-15
  transform translateX(-3150px)
  @media (min-width: 1024px)
    transform translateY(-3000px)
.result-16
  transform translateX(-3360px)
  @media (min-width: 1024px)
    transform translateY(-3200px)

@keyframes rotateX
  0%
    transform translateX(0)
  100%
    transform translateX(-100%)

@keyframes rotateY
  0%
    transform translateY(0)
  100%
    transform translateY(-100%)

</style>
