<template>
  <div class="table-top-ten" :style="{ height: `${currentHeight}px` }">
    <div
      class="table-top-ten-container"
      :style="{
        width: `${defaultWidth}px`,
        height: `${defaultHeight}px`,
        transform: `scale(${currentWidth / defaultWidth})`
      }"
    >
      <AppChartLegends
        class="table-top-ten-container__legends"
        :legends="legends"
      />
      <div class="table-row table-row--head">
        <div
          v-for="head in data.heads"
          :key="head"
          class="table-row__cell"
          v-html="head"
        >
        </div>
      </div>
      <div 
        v-for="(candidate, i) in data.candidates"
        :key="candidate.name"
        :class="[ 'table-row', { 'table-row--gray': i % 2 !== 0 } ]"
      >
        <div class="table-row__cell" v-text="i + 1"></div>
        <div class="table-row__cell table-row__cell--candidate-name">
          <div :class="`table-row__cell-party-icon table-row__cell-party-icon--${$t(`POLITICAL_CONTRIBUTION.PARTY['${candidate.party}']`)}`"></div>
          <div class="table-row__cell-name" v-text="candidate.name"></div>
        </div>
        <div class="table-row__cell table-row__cell--money" v-text="convertMoney(candidate.donatesTotal)"></div>
        <div class="table-row__cell" v-text="candidate.donatesCompanyPercentage"></div>
        <div class="table-row__cell">
          <img v-if="candidate.isWon" class="table-row__cell-won-stamp" v-lazy="'/proj-assets/political-contribution/elected.png'" alt="">
        </div>
        <div class="table-row__cell">
          <div v-if="candidate.isChecked" class="table-row__check-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppChartLegends from './AppChartLegends.vue'

export default {
  props: {
    legends: {
      type: Array,
      default () {
        return []
      },
    },
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    AppChartLegends,
  },
  data () {
    const defaultWidth = 900
    const defaultHeight = 600
    const defaultAspect = defaultWidth / defaultHeight

    return {
      defaultWidth,
      defaultHeight,
      defaultAspect,
      currentWidth: defaultWidth,
      currentHeight: defaultHeight,
    }
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
.table-top-ten-container
  transform-origin 0% 0%
  &__legends
    margin 0 0 40px 0

.table-row
  display flex
  align-items center
  font-size 18px
  font-weight 500
  min-height 48px
  &--head
    border-bottom 1px solid black
    padding 0 0 20px 0
  &--gray
    background-color #f3f3f3
  &__cell
    width calc(100% / 6)
    text-align center
    &--candidate-name
      text-align left
      display flex
      justify-content center
      align-items center
    &--money
      color #9e005d
  &__cell-party-icon
    r = 18px
    width r
    height r
    border-radius r
    background-color black
    position relative
    bottom 1px
    margin 0 5px 0 0
    &--dpp
      background-color #53a66f
    &--kmt
      background-color #0071bc
    &--npp
      background-color #fcc037
    &--npsu
      background-color #c7195c
    &--indie
      background-color #736357
    &--pfp
      background-color #eb6c1f
  &__cell-won-stamp
    r = 20px
    width r
    height r
  &__check-icon
    width 20px
    height 20px
    background-color black
    transform rotate(45deg)
    clip-path polygon(85% 0, 100% 0, 100% 100%, 43% 100%, 43% 85%, 85% 85%)
    position relative
    bottom 3px
    right 1px
    margin auto
</style>


