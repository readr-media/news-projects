<template>
  <transition-group
    :class="{ default: !startCounting }"
    name="latestNews"
    class="e-p-c"
    tag="section"
  >
    <div
      v-for="(candidate, name) in testData"
      :key="`candidate-${name}`"
      :class="getRankClassName(name)"
      class="candidate"
    >
      <div class="candidate__info">
        <picture class="candidate__image">
          <img src="/proj-assets/election-2020/images/sung.png" alt="">
          <div class="candidate__number">{{ name }}</div>
        </picture>
        <div class="candidate__count">
          <p><span class="name">宋楚瑜</span><br><span class="label">得票數</span></p>
          <p><Counter class="count" :count="candidate.tks" /></p>
          <p class="ratio"><Counter :count="formatRatio(candidate.R, 0)" /><span class="percent">%</span></p>
        </div>
      </div>
      <div class="candidate__ratio">
        <span>親民黨</span>
        <Counter :count="formatRatio(candidate.R)" />
        <span>%</span>
        <div :style="{ width: `${formatRatio(candidate.R)}%` }" class="candidate__progress" />
      </div>
    </div>
    <button key="butt" @click="add(1)">test 1</button>
  </transition-group>
</template>
<script>
import { formatRatio } from '../utility/common'
import Counter from './Counter.vue'

export default {
  name: 'PresidentCount',
  components: {
    Counter
  },
  data () {
    return {
      testData: {
        '1': {
          R: 0,
          tks: 0,
          // R: 0.2587852392781253,
          // tks: 10808489,
          isElected: false
        },
        '2': {
          R: 0,
          tks: 0,
          // R: 0.37826896118277314,
          // tks: 15798876,
          isElected: false
        },
        '3': {
          R: 0,
          tks: 0,
          // R: 0.36294579953910155,
          // tks: 15158885,
          isElected: false
        }
      }
    }
  },
  computed: {
    startCounting () {
      return Object.values(this.testData).reduce((a, c) => a + c.tks, 0) > 0
    }
  },
  methods: {
    formatRatio,
    // 暫時
    getRankClassName (rank) {
      if (!this.startCounting) {
        return 'default'
      }
      const className = {
        1: 'first',
        2: 'second',
        3: 'third'
      }
      return className[rank]
    },
    add (index) {
      this.testData[`${index}`].tks += 1
    }
  }
}
</script>
<style lang="stylus" scoped>
.e-p-c
  position relative
  height 540px
  margin-top 20px
  .candidate
    position absolute
    top 0
    left 0
    width 100%
    height 180px
    &.first,  &.default:nth-child(1)
      transform translateY(0)
    &.second, &.default:nth-child(2)
      transform translateY(180px)
    &.third, &.default:nth-child(3)
      transform translateY(360px)
    &__info
      position relative
      height 160px
      > *
        position absolute
    &__number
      position absolute
      display flex
      justify-content center
      align-items center
      left 0
      bottom 10px
      z-index 10
      width 32px
      height 32px
      color #fff
      font-family $font-family-serif
      background-color red // 暫時
    &__image
      display block
      left 0
      bottom 0
      width 169px
      height 169px
      img
        width 100%
        height 100%
        object-fit contain
        object-position center center
    &__count
      right 5%
      top 50%
      transform translateY(-50%)
      font-family $font-family-serif
      font-weight 700
      text-align right
      p
        margin 0
        color #333
        span
          display inline-block
          &.name
            font-size 1.3125rem
          &.label
            margin 10px 0
            font-size .9375rem
          &.count
            color $color-black-light
            font-size 2.25rem
    
    &__ratio
      position relative
      display flex
      justify-content space-between
      align-items center
      height 20px
      padding 0 5%
      background-color rgba(216, 216, 216, .3)
      span
        color $color-black-lighter
        font-size .8125rem
        &:nth-child(2)
          margin 0 0 0 auto
    &__progress
      position absolute
      top 0
      left 0
      z-index -1
      height 20px
      background-color red // 暫時

.latestNews-move
  transition all 1s

@media (max-width: 767px)
  .e-p-c
    .candidate__count
      p.ratio
        display none

@media (min-width: 768px)
  .e-p-c
    .candidate
      height 110px
      &.first, &.default:nth-child(1)
        width 50%
        height 100%
        .candidate__info
          display block
          height 100%
        .candidate__number
          width 40px
          height 40px
          font-size 1.5rem
        .candidate__image
          width 100%
          height auto
          padding-top 100%
          border-bottom 1px solid rgba(0, 0, 0, .3)
          img
            position absolute
            top 5px
            left 0
            right 0
            bottom 0
        .candidate__count
          width 100%
          p
            span
              &.name, &.label
                font-size 1.875rem
              &.count
                font-size 3rem
            &.ratio
              display block
              position absolute
              top 0
              left 0
              transform translateX(-30%)
              font-size 3rem
              .percent
                font-size 1.875rem

      &.second, &.third, &.default:nth-child(2), &.default:nth-child(3)
        top auto
        left auto
        right 0
        width 45%
        border-bottom 1px solid rgba(0, 0, 0, .3)
        .candidate__count
          padding-bottom 1em
          p
            &:first-child
              text-align left
            &.ratio
              display none
        
      &.second, &.default:nth-child(2)
        bottom 0
        transform translateY(-150px)
      &.third, &.default:nth-child(3)
        bottom 0
        transform translateY(0)
      &__info
        display flex
        position static
        height auto
      &__number
        width 25px
        height 25px
      &__image
        position relative
        width 110px
        height 110px
      &__count
        flex 1
        display flex
        flex-direction column
        justify-content flex-end
        position static
        transform translateY(0)
        p
          &:first-child
            margin 10px 0
          &.ratio
            display none
          span
            &.name, &.label
              font-size 1.25rem
            &.label
              margin 0
            &.count
              font-size 1.875rem
          br
            display none
      &__ratio
        display none

@media (min-width: 1024px)
  .e-p-c
    .candidate
      height 170px
      &.second, &.third, &.default:nth-child(2), &.default:nth-child(3)
        max-width 400px
        .candidate__count
          transform translateY(-10%)
          padding-bottom .5em
      &.first, &.default:nth-child(1)
        max-width 600px
        .candidate__count
          p
            &:first-child
              transform translateX(0)
            &.ratio
              font-size 3.75rem
      &.second, &.default:nth-child(2)
        transform translateY(-210px)
      &__image
        width 170px
        height 170px
      &__number
        width 35px
        height 35px
        font-size: 1.25rem
      &__count
        align-self flex-end
        p
          &:first-child
            text-align right !important
            transform translateX(-30%)

@media (min-width: 1440px)
  .e-p-c
    &.default
      height 170px
    .candidate
      &.default
        left 0 !important
        right auto !important
        width calc((100% - 80px) / 3) !important
        max-width 320px !important
        &:nth-child(1)
          border-bottom 1px solid rgba(0, 0, 0, .3)
          .candidate__info
            display flex
          .candidate__image
            width 170px
            height 170px
            padding-top 0
            border-bottom none
            img
              top 0
          .candidate__count
            transform translateY(-10%)
            padding-bottom .5em
            p
              span
                &.name, &.label
                  font-size 1.25rem
                &.count
                  font-size 1.875rem
              &.ratio
                display none
        &:nth-child(2)
          transform translateX(calc(100% + 40px))
        &:nth-child(3)
          transform translateX(calc(200% + 80px))
        .candidate__count
          p
            &:nth-child(1)
              transform translateX(0)
      &.first
        .candidate__count
          p
            &:first-child
              transform translateX(-30%)
          p.ratio
            font-size 6.875rem
            line-height 1
      
</style>