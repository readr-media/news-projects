<template>
  <div class="slot-machine">
    <div class="slot-machine-container">
      <picture>
        <source
          media="(min-width: 1024px)"
          srcset="/proj-assets/covid19-disinformation/slot-machine-desktop.png"
        >
        <img src="/proj-assets/covid19-disinformation/slot-machine.png">
      </picture>
      <div
        class="slot-machine__content"
      >
        <div class="slot">
          <div :class="[{transitioning }, `result-${column1}`]" class="scoll-container column1">
            <div
              v-for="item in SLOT_MACHINE_COLUMN_1_TW"
              :key="item"
              class="option"
              v-text="item"
            />
          </div>
        </div>
        <div class="slot">
          <div :class="[{transitioning }, `result-${column2}`]" class="scoll-container column2">
            <div
              v-for="item in SLOT_MACHINE_COLUMN_2_TW"
              :key="item"
              class="option"
              v-text="item"
            />
          </div>
        </div>
        <div class="slot">
          <div :class="[{transitioning }, `result-${column3}`]" class="scoll-container column3">
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
      >
        <img src="/proj-assets/covid19-disinformation/play.svg" alt="">
      </button>
    </div>
  </div>
</template>

<script>

import {
  SLOT_MACHINE_COLUMN_1_TW,
  SLOT_MACHINE_COLUMN_2_TW,
  SLOT_MACHINE_COLUMN_3_TW
} from '../const.js'

export default {
  name: 'SlotMachine',
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
    transitioning: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      SLOT_MACHINE_COLUMN_1_TW,
      SLOT_MACHINE_COLUMN_2_TW,
      SLOT_MACHINE_COLUMN_3_TW,
      isPlayed: false
    }
  },
  methods: {
    handleClick () {
      this.isPlayed = true
      this.$emit('play')
    }
  }
}
</script>

<style lang="stylus" scoped>
.slot-machine
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
        animation rotate 2.5s 30 ease-in-out backwards
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
    background-color transparent
    border none
    cursor pointer
    @media (min-width: 1024px)
      transform translateY(-55px)

.result-0
  transform translateX(0)
.result-1
  transform translateX(-210px)
.result-2
  transform translateX(-420px)
.result-3
  transform translateX(-630px)
.result-4
  transform translateX(-840px)
.result-5
  transform translateX(-1050px)
.result-6
  transform translateX(-1260px)
.result-7
  transform translateX(-1470px)
.result-8
  transform translateX(-1680px)
.result-9
  transform translateX(-1890px)
.result-10
  transform translateX(-2100px)
.result-11
  transform translateX(-2310px)
.result-12
  transform translateX(-2520px)
.result-13
  transform translateX(-2730px)
.result-14
  transform translateX(-2940px)
.result-15
  transform translateX(-3150px)
.result-16
  transform translateX(-3360px)

@keyframes rotate
  0%
    transform translateX(0)
  100%
    transform translateX(-100%)

</style>
