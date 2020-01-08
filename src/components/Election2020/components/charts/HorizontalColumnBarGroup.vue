<template>
  <div class="group-wrapper">
    <div
      class="group"
      @click="handleClick"
      @mouseenter="handleTooltip(true, $event)"
      @mouseleave="handleTooltip(false)"
    >
      <div class="group__title title">
        <p
          class="title__text"
          v-text="data.title"
        />
      </div>
      <div class="group__bars bars">
        <div
          v-for="(bar, i) in data.bars"
          :key="i"
          :class="[
            'bars__bar',
            'bar',
            `bar--${bar.color}`
          ]"
          :style="{
            width: `${bar.rate * 100}%`
          }"
        />
      </div>
    </div>
    <LightboxWrapper
      :showLightbox.sync="showLightbox"
    >
      <InfoDetailed
        :title="data.title"
        :tableHeading="tableHeading"
        :tableData="tableData"
      />
    </LightboxWrapper>
    <Tooltip :showTooltip="showTooltip" :x="tooltipX" :y="tooltipY">
      <InfoDetailed
        :title="data.title"
        :tableHeading="tableHeading"
        :tableData="tableData"
      />
    </Tooltip>
  </div>
</template>

<script>
import LightboxWrapper from '../LightboxWrapper.vue'
import Tooltip from '../Tooltip.vue'
import InfoDetailed from '../InfoDetailed.vue'

import { mapState as mapStateRoot } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true,
      validator(data) {
        const bars = data.bars
        const isBarsValid = bars.reduce((acc, curr) => {
          const isNameValid = 'name' in curr && typeof curr.name === 'string'
          const isRateValid = 'rate' in curr && (curr.rate >= 0 && curr.rate <= 1)
          const isCountValid = 'count' in curr && typeof curr.count === 'number'
          const isColorValid = 'color' in curr && typeof curr.color === 'string'
          const isPropertiesValid = isNameValid && isRateValid && isCountValid && isColorValid
          return acc && isPropertiesValid
        }, true)
        return isBarsValid
      }
    },
    showDetailDataColor: {
      type: Boolean,
      default: true
    }
  },
  components: {
    LightboxWrapper,
    Tooltip,
    InfoDetailed
  },
  data() {
    return {
      showLightbox: false,
      showTooltip: false,
      tooltipX: 0,
      tooltipY: 0
    }
  },
  computed: {
    ...mapStateRoot({
      vw: state => state.viewport[0]
    }),
    tableHeading() {
      if (this.showDetailDataColor) {
        return { P: '政黨', c: '候選人', R: '得票數', tks: '得票率' }
      } else {
        return { party: '政黨', R: '得票數', tks: '得票率' }
      }
    },
    tableData() {
      const bars = this.data.bars
      return bars.map(bar => {
        if (this.showDetailDataColor) {
          return {
            P: bar.color,
            c: bar.name,
            tks: bar.count,
            R: bar.rate
          }
        } else {
          return {
            party: bar.party,
            tks: bar.count,
            R: bar.rate
          }
        }
      })
    }
  },
  methods: {
    handleClick() {
      this.showLightbox = true
    },
    handleTooltip (showTooltip, event) {
      if (this.vw < 768) {
        return
      }

      this.showTooltip = showTooltip

      if (event) {
        this.tooltipX = event.clientX
        this.tooltipY = event.clientY
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.group
  display flex
  padding 8px 0

.title
  min-width calc(73px + 20.22px / 2) // 19.17
  max-width calc(73px + 20.22px / 2)
  display flex
  justify-content center
  align-items center
  &__text
    margin 0
    font-size 15px
    color $color-black-light

.bars
  flex 1 1 auto
  padding-right calc(10px + 35.41px / 2) // 33.19
  &__bar
    & + &
      margin 2px 0 0 0

.bar
  height 10px
  &--blue
    background-color $color-blue
  &--green
    background-color $color-green
  &--orange
    background-color $color-orange
  &--purple
    background-color $color-purple
  &--gray
    background-color $color-gray

@media (min-width 768px)
  .group
    &:hover
      background-color rgba(216, 216, 216, 0.3)
    &:active // disable click, but allow hover
      pointer-events none

  .title
    min-width calc(145px + 19.17px / 2)
    max-width calc(145px + 19.17px / 2)
    &__text
      font-size 16px

  .bars
    padding-right calc(40px + 33.19px / 2)
</style>
