<template>
  <transition-group
    name="latestNews"
    :class="{ counting: startCounting }"
    class="e-p-c"
    tag="section"
  >
    <div
      v-for="(candidate, number) in realTimeData"
      :key="`candidate-${number}`"
      :class="[getClassName(number), getRank(number)]"
      class="candidate"
    >
      <div class="candidate__info">
        <picture class="candidate__image">
          <img :src="`/proj-assets/election-2020/images/${getClassName(number)}.png`" :alt="mapPresidentName($store, number)">
          <div class="candidate__number">{{ number }}</div>
        </picture>
        <div class="candidate__count">
          <p><span class="name" v-text="mapPresidentName($store, number)"></span><br><span class="label">得票數</span></p>
          <p><Counter class="count" :count="candidate.tks" /></p>
          <p class="ratio"><Counter :count="candidate.R" /><span class="percent">%</span></p>
        </div>
      </div>
      <div class="candidate__ratio">
        <span v-text="getPartyAbbr(number)" />
        <Counter :count="candidate.R" />
        <span>%</span>
        <div :style="{ width: `${candidate.R}%` }" class="candidate__progress" />
      </div>
    </div>
  </transition-group>
</template>
<script>
import { get, omit } from 'lodash'
import { mapPartyName, mapPartyNameAbbr, mapPresidentName, mapPresidentParty } from '../../utility/mappings'
import Counter from '../Counter.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('realtimePresidents')

export default {
  name: 'PresidentCount',
  components: {
    Counter
  },
  computed: {
    ...mapGetters({
      startCounting: 'startCounting'
    }),
    realTimeData () {
      return omit(get(this.$store, 'state.realtimePresidents.data'), [ 'id' ])
    },
    ranking () {
      const sorting = Object.keys(this.realTimeData)
        .sort((a, b) => this.realTimeData[b].tks - this.realTimeData[a].tks)
      const mapping = [ 'first', 'second', 'third' ]
      return Object.keys({ ...sorting }).reduce((a, c) => {
        a[sorting[c]] = mapping[Number(c)]
        return a
      }, {})
    }
  },
  methods: {
    getClassName (number) {
      const mapping = {
        1: 'soong',
        2: 'han',
        3: 'tsai'
      }
      return mapping[number]
    },
    getPartyAbbr (number) {
      const party = mapPresidentParty(this.$store, number)
      return mapPartyNameAbbr(mapPartyName(this.$store, party))
    },
    mapPresidentName,
    getRank (number) {
      if (this.startCounting) {
        return this.ranking[number]
      }
      return ''
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
    &:nth-child(1)
      transform translateY(0)
    &:nth-child(2)
      transform translateY(180px)
    &:nth-child(3)
      transform translateY(360px)
    &.first
      transform translateY(0) !important
    &.second
      transform translateY(180px) !important
    &.third
      transform translateY(360px) !important
    &.soong
      .candidate__number, .candidate__progress
        background-color $color-orange
    &.han
      .candidate__number, .candidate__progress
        background-color $color-blue
    &.tsai
      .candidate__number, .candidate__progress
        background-color $color-green
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
      cursor default
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

.latestNews-move
  transition all 1s

@media (max-width: 767px)
  .e-p-c
    .candidate__count
      p.ratio
        display none

@media (min-width: 1024px)
  .e-p-c
    height 170px
    .candidate
      top 50%
      width calc((100% - 80px) / 3)
      height 170px
      max-width 320px
      &:nth-child(1)
        transform translate(0, -50%) !important
      &:nth-child(2)
        transform translate(calc(100% + 40px), -50%) !important
      &:nth-child(3)
        transform translate(calc(200% + 80px), -50%) !important
      &__info
        display flex
        justify-content flex-end
        align-items flex-end
        height 100%
      &__image
        width 170px
        height 170px
      &__number
        font-size 1.25rem
      &__count
        display flex
        flex-direction column
        justify-content flex-end
        position static
        transform translateY(-10%)
        p
          &.ratio, br
            display none
          span
            &.name, &.label
              font-size 1.5rem
            &.count
              font-size 3rem
      &__ratio
        display none
      &.first
        top 0
        transform translateY(0) !important
        width 50%
        height 100%
        max-width 600px
        .candidate__info
          display block
        .candidate__image
          top 0
          bottom auto
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
          position absolute
          top auto
          left 0
          right auto
          bottom 0
          transform none
          width 100%
          p
            span
              &.name, &.label
                font-size 1.875rem
              &.count
                font-size 3rem
            &:first-child
              transform translateX(-20%)
            &.ratio
              display block
              position absolute
              top 0
              left 0
              transform translateX(-30%)
              font-size 3rem
              .percent
                font-size 1.875rem
      &.second, &.third
        top auto
        left auto
        right 0
        bottom 0
        width 45%
        max-width 400px
        height 170px
        border-bottom 1px solid rgba(0, 0, 0, .3)
        .candidate__image
          width 170px
          height 170px
        .candidate__count
          p
            &:first-child
              transform translateX(-20%)
      &.second
        transform translateY(-210px) !important
      &.third
        transform translateY(0) !important

@media (min-width: 1440px)
  .e-p-c
    .candidate
      &.first
        .candidate__count
          p.ratio
            font-size 6.875rem
            line-height 1
</style>