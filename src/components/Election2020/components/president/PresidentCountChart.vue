<template>
  <div class="e-p-c-c">
    <div class="e-p-c-c__prompt">
      <div class="prompt" />
      <div class="prompt" />
      <div class="prompt" />
    </div>
    <transition-group class="e-p-c-c__chart" tag="div">
      <span key="default" v-if="!startCounting">0%</span>
      <template v-else>
        <div
          key="pfpBar"
          class="bar pfp"
          :style="{ width: `${formatRatio(testData['1'].R)}%` }"
          @mouseenter="handleTooltip(true, $event)"
          @mouseleave="handleTooltip(false)"
          @click="handleTooltip(true, $event)"
          @close="handleTooltip(false)"
        />
        <div
          key="kmtBar"
          class="bar kmt"
          :style="{
            width: `${formatRatio(testData['2'].R)}%`,
            left: `${formatRatio(testData['1'].R)}%`
          }"
          @mouseenter="handleTooltip(true, $event)"
          @mouseleave="handleTooltip(false)"
          @click="handleTooltip(true, $event)"
          @close="handleTooltip(false)"
        />
        <div
          key="dppBar"
          class="bar dpp"
          :style="{
            width: `${formatRatio(testData['3'].R)}%`,
            left: `${formatRatio(testData['1'].R) + formatRatio(testData['2'].R)}%`
          }"
          @mouseenter="handleTooltip(true, $event)"
          @mouseleave="handleTooltip(false)"
          @click="handleTooltip(true, $event)"
          @close="handleTooltip(false)"
        />
      </template>
    </transition-group>
    <div class="e-p-c-c__label">
      <div class="label pfp">親民黨</div>
      <div class="label kmt">國民黨</div>
      <div class="label dpp">民進黨</div>
    </div>
    <Tooltip :showTooltip="showTooltip" :x="tooltipX" :y="tooltipY">
      <InfoDetailed
        title="宋楚瑜、余湘"
        subtitle="親民黨"
        :tableData="[
          { name: '得票數', tks: 429148 },
          { name: '得票率', R: 0.11123213 }
        ]"
      />
    </Tooltip>
  </div>
</template>
<script>
import { formatRatio } from '../../utility/common'
import { throttle } from 'lodash'
import InfoDetailed from '../InfoDetailed.vue'
import Tooltip from '../Tooltip.vue'

export default {
  name: 'PresidentCountChart',
  components: {
    InfoDetailed,
    Tooltip
  },
  data () {
    return {
      showTooltip: false,
      tooltipX: 0,
      tooltipY: 0,
      testData: {
        '1': {
          // R: 0,
          // tks: 0,
          R: 0.2587852392781253,
          tks: 10808489,
          isElected: false
        },
        '2': {
          // R: 0,
          // tks: 0,
          R: 0.37826896118277314,
          tks: 15798876,
          isElected: false
        },
        '3': {
          // R: 0,
          // tks: 0,
          R: 0.36294579953910155,
          tks: 15158885,
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
    handleTooltip (value, event) {
      this.showTooltip = value
      if (event) {
        this.tooltipX = event.clientX
        this.tooltipY = event.clientY
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.e-p-c-c
  &__prompt
    display flex
    justify-content space-between
  &__chart
    position relative
    height 35px
    margin-top 10px
    background-color rgba(216, 216, 216, .3)
    > span
      color $color-black-lighter
      font-size 1.5rem
      line-height 35px
  &__label
    display flex
    margin-top 20px
    border-top 1px solid rgba(0, 0, 0, .3)
  .prompt
    position relative
    width 1px
    height 8px
    background-color rgba(0, 0, 0, .3)
    &::after
      position absolute
      bottom calc(100% + 2px)
      left 0
      transform translateX(-50%)
      color rgba(0, 0, 0, .3)
      font-size .875rem
      font-family $font-family-serif
    &:nth-child(1)::after
      content '0%'
    &:nth-child(2)::after
      content '50%'
    &:nth-child(3)::after
      content '100%'

  .bar
    position absolute
    top 0
    left 0
    height 100%
    cursor pointer
    &.pfp
      background-color $color-orange
    &.kmt
      background-color $color-blue
    &.dpp
      background-color $color-green
  
  .label
    margin 0 0 0 auto
    padding-top 10px
    color $color-black-lighter
    line-height 20px
    & + .label
      margin-left 20px
    &::before
      content ''
      display inline-block
      width 20px
      height 20px
      margin-right 10px
      vertical-align bottom
    &.pfp
      &::before
        background-color $color-orange
    &.kmt
      &::before
        background-color $color-blue
    &.dpp
      &::before
        background-color $color-green

@media (min-width: 1024px)
  .e-p-c-c
    &__chart
      height 58px
      > span
        line-height 58px
</style>