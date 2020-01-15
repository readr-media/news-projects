<template>
  <div class="table-duel" :style="{ height: `${currentHeight}px` }">
    <div
      class="table-duel-container"
      :style="{
        width: `${defaultWidth}px`,
        height: `${defaultHeight}px`,
        transform: `scale(${currentWidth / defaultWidth})`
      }"
    >
      <img class="table-duel-container__duel-img table-duel-container__duel-img--left" v-lazy="'/proj-assets/political-contribution/explore/pk-left.png'" alt="">
      <img class="table-duel-container__duel-img table-duel-container__duel-img--right" v-lazy="'/proj-assets/political-contribution/explore/pk-right.png'" alt="">
      <div
        :class="[ 'table-duel-container__dominate',
                  { 'table-duel-container__dominate--left': dataCurrentOrdinal.dominate === 'left' },
                  { 'table-duel-container__dominate--right': dataCurrentOrdinal.dominate === 'right' },
                ]"
      >
        完勝
      </div> 
      <div class="duel-row duel-row--head">
        <div class="duel-row__cell duel-row__cell--head" v-html="dataCurrentOrdinal.left.title"></div>
        <div class="duel-row__cell duel-row__cell--center duel-row__cell--head">VS.</div>
        <div class="duel-row__cell duel-row__cell--head" v-html="dataCurrentOrdinal.right.title"></div>
      </div>
      <div class="duel-row">
        <div class="duel-row__cell" v-text="dataCurrentOrdinal.left.countCandidates"></div>
        <div class="duel-row__cell duel-row__cell--center">參選人數</div>
        <div class="duel-row__cell" v-text="dataCurrentOrdinal.right.countCandidates"></div>
      </div>
      <div class="duel-row duel-row--gray">
        <div class="duel-row__cell" v-text="dataCurrentOrdinal.left.countWon"></div>
        <div class="duel-row__cell duel-row__cell--center">當選人數</div>
        <div class="duel-row__cell" v-text="dataCurrentOrdinal.right.countWon"></div>
      </div>
      <div class="duel-row">
        <div class="duel-row__cell" v-text="wonChanceLeft"></div>
        <div class="duel-row__cell duel-row__cell--center">當選率</div>
        <div class="duel-row__cell" v-text="wonChanceRight"></div>
      </div>
      <div class="duel-row duel-row--gray">
        <div class="duel-row__cell" v-text="convertMoney(dataCurrentOrdinal.left.donatesAverage)"></div>
        <div class="duel-row__cell duel-row__cell--center">收入獻金平均數</div>
        <div class="duel-row__cell" v-text="convertMoney(dataCurrentOrdinal.right.donatesAverage)"></div>
      </div>
      <div class="duel-row">
        <div class="duel-row__cell" v-text="convertMoney(dataCurrentOrdinal.left.donatesQ3)"></div>
        <div class="duel-row__cell duel-row__cell--center">收入獻金第三四分位數(Q3)</div>
        <div class="duel-row__cell" v-text="convertMoney(dataCurrentOrdinal.right.donatesQ3)"></div>
      </div>
      <div class="duel-row duel-row--gray">
        <div class="duel-row__cell" v-text="convertMoney(dataCurrentOrdinal.left.donatesQ2)"></div>
        <div class="duel-row__cell duel-row__cell--center">收入獻金第中位數(Q2)</div>
        <div class="duel-row__cell" v-text="convertMoney(dataCurrentOrdinal.right.donatesQ2)"></div>
      </div>
      <div class="duel-row">
        <div class="duel-row__cell" v-text="convertMoney(dataCurrentOrdinal.left.donatesQ1)"></div>
        <div class="duel-row__cell duel-row__cell--center">收入獻金第一四分位數(Q1)</div>
        <div class="duel-row__cell" v-text="convertMoney(dataCurrentOrdinal.right.donatesQ1)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    ordinal: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    const defaultWidth = 1136
    const defaultHeight = 800
    const defaultAspect = defaultWidth / defaultHeight

    return {
      defaultWidth,
      defaultHeight,
      defaultAspect,
      currentWidth: defaultWidth,
      currentHeight: defaultHeight,
    }
  },
  computed: {
    ...mapGetters([
      'ordinalRadioPicked',
    ]),
    shouldVisualizeOrdinal () {
      return this.ordinal === '' ? this.ordinalRadioPicked : this.ordinal
    },
    dataCurrentOrdinal () {
      return this.data[this.shouldVisualizeOrdinal]
    },
    wonChanceLeft () {
      return `${(this.dataCurrentOrdinal.left.countWon / this.dataCurrentOrdinal.left.countCandidates * 100).toFixed(0)}%`
    },
    wonChanceRight () {
      return `${(this.dataCurrentOrdinal.right.countWon / this.dataCurrentOrdinal.right.countCandidates * 100).toFixed(0)}%`
    },
  },
  methods: {
    convertMoney (money) {
      return money.toLocaleString()
    },
    calculateCurrentDimensions () {
      const containerWidth = this.$el.getBoundingClientRect().width
      this.currentWidth = containerWidth
      this.currentHeight = Math.round(containerWidth / this.defaultAspect)
    },
  },
  mounted () {
    this.calculateCurrentDimensions()
  }
}
</script>

<style lang="stylus" scoped>
.table-duel-container
  transform-origin 0% 0%
  position relative
  padding 140px 0 0 0
  &__duel-img
    position absolute
    top 0px
    width 240px
    &--left
      left 50px
    &--right
      right 50px
  &__dominate
    position absolute
    font-size 40px
    font-weight 600
    color white
    background-color #9e005d
    padding 10px
    transform rotate(-25deg)
    &--left
      top 250px
      left 200px
    &--right
      top 250px
      right 240px

.duel-row
  display flex
  // width 1136px
  height 60px
  padding 16px 0
  &--head
    height 180px
  &--gray
    background-color #f3f3f3
  &__cell
    text-align center
    font-size 30px
    width 304px
    line-height 1.25
    display flex
    justify-content center
    align-items center
    color #9e005d
    font-weight 500
    &--head
      font-size 40px
      color black
    &--center
      width 528px
      color black
      font-weight 400
</style>

