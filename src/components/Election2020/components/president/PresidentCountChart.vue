<template>
  <div class="e-p-c-c">
    <div class="e-p-c-c__prompt">
      <div class="prompt" />
      <div class="prompt" />
      <div class="prompt" />
    </div>
    <transition-group name="p-c-effect" class="e-p-c-c__chart" tag="div">
      <span key="default" v-if="!startCounting">0%</span>
      <template v-else v-for="(candidate) in sortedData">
        <div
          :key="`${candidate.party}-bar`"
          :class="candidate.party"
          class="bar"
          :style="{ width: `${candidate.R}%` }"
          @mouseenter="handleTooltip(true, candidate.number, $event)"
          @mouseleave="handleTooltip(false)"
          @click="handleTooltip(true, candidate.number, $event)"
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
        :title="tooltipData.name"
        :subtitle="tooltipData.party"
        :tableData="[
          { name: '得票數', tks: tooltipData.tks },
          { name: '得票率', R: tooltipData.R }
        ]"
      />
    </Tooltip>
  </div>
</template>
<script>
import { formatRatio } from '../../utility/common'
import { get, throttle } from 'lodash'
import { mapPartyName, mapPartyNameAbbr, mapPresidentParty } from '../../utility/mappings'
import InfoDetailed from '../InfoDetailed.vue'
import Tooltip from '../Tooltip.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('realtimePresidents')

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
      tooltipNumber: '1'
    }
  },
  computed: {
    ...mapGetters({
      startCounting: 'startCounting',
      dataWithoutId: 'dataWithoutId'
    }),
    sortedData () {
      const mapping = {
        '1': 'pfp',
        '2': 'kmt',
        '3': 'dpp'
      }
      return Object.entries(this.dataWithoutId)
        .sort((a, b) => b[1].R - a[1].R)
        .map(c => ({ number: c[0], R: c[1].R, tks: c[1].tks, party: mapping[c[0]] }))
    },
    tooltipData () {
      const mapping = {
        '1': '宋楚瑜、余湘',
        '2': '韓國瑜、張善政',
        '3': '蔡英文、賴清德'
      }
      const party = mapPresidentParty(this.$store, this.tooltipNumber)
      
      return ({
        name: mapping[this.tooltipNumber],
        party: mapPartyNameAbbr(mapPartyName(this.$store, party)),
        tks: get(this.dataWithoutId, `${this.tooltipNumber}.tks`),
        R: get(this.dataWithoutId, `${this.tooltipNumber}.R`) / 100 
      }) 
    }
  },
  methods: {
    formatRatio,
    handleTooltip (value, number, event) {
      this.showTooltip = value
      if (number && event) {
        this.tooltipNumber = number
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
    display flex
    height 35px
    margin-top 10px
    background-color rgba(216, 216, 216, .3)
    overflow hidden
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

.p-c-effect-enter-active, .p-c-effect-leave-active, .p-c-effect-move
  transition all 1s

.p-c-effect-enter, .p-c-effect-leave-to
  opacity 0

@media (min-width: 1024px)
  .e-p-c-c
    &__chart
      height 58px
      > span
        line-height 58px
</style>