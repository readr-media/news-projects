<template>
  <div class="bar-wrapper">
    <div
      class="bar-wrapper__bar"
      :style="{ width: `${percentage}%` }"
      @mouseover="barMouseover"
      @mouseout="barMouseout"
    >
    </div>
    <div
      v-show="showTooltip"
      class="bar-wrapper__tooltip tooltip"
      :style="{
        bottom: `${tooltipY + 25}px`,
        left: `${tooltipX - 30}px`
      }"
    >
      <p class="tooltip__paragraph">當選議員：{{ candidatesElected.length === 0 ? '無' : '' }}</p>
      <p
        v-for="candidate in candidatesElected"
        :key="candidate.name"
        class="tooltip__paragraph"
      >
        {{ getCandidateName(candidate) }} {{ getCandidateAge(candidate) }} 歲  得票數：{{ getCandidateTks(candidate) }} 票
      </p>
    </div>
    <p class="bar-wrapper__percentage" v-text="`${percentage.toFixed(1)}%`"></p>
  </div>
</template>

<script>
import moment from 'moment'
import { get } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('VoteResult')

export default {
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    candidatesElected: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      showTooltip: false,
      tooltipX: 0,
      tooltipY: 0
    }
  },
  computed: {
    ...mapState({
      currentLocationLevel: state => state.map.currentLocation.level
    }),
    isLevelCounty () {
      return this.currentLocationLevel === 'county'
    }
  },
  methods: {
    barMouseover (e) {
      if (!this.isLevelCounty) {
        this.showTooltip = true
        this.tooltipX = e.clientX
        this.tooltipY = window.innerHeight - e.clientY
      }
    },
    barMousemove (e) {
      if (!this.isLevelCounty) {
        this.tooltipX = e.clientX
        this.tooltipY = window.innerHeight - e.clientY
      }
    },
    barMouseout (e) {
      if (!this.isLevelCounty) {
        this.showTooltip = false
      }
    },
    getCandidateName (candidate) {
      return get(candidate, 'name', '')
    },
    getCandidateAge (candidate) {
      const birthday = get(candidate, 'birthday', '')
      const birthdatFormatted = moment(birthday)
      const age = moment().diff(birthdatFormatted, 'years')
      return age
    },
    getCandidateTks (candidate) {
      return get(candidate, 'tks', 0).toLocaleString()
    }
  }
}
</script>

<style lang="stylus" scoped>
.bar-wrapper
  display flex
  align-items center
  &__bar
    height 24px
    background-color black
  &__tooltip
    position fixed
  &__percentage
    font-size 18px
    font-weight 600
    margin 0 0 0 10px

.tooltip
  background-color #fff
  border 1px solid #979797
  padding 5px 10px
  &__paragraph
    font-size 16px
    margin 5px 0
  &:before
    content ''
    width 0
    height 0
    border-style solid
    border-width 14.1px 8.15px 0 8.15px
    border-color #979797 transparent transparent transparent
    position absolute
    left 20px
    bottom -15.3px
  &:after
    content ''
    width 0
    height 0
    border-style solid
    border-width 13.3px 7.65px 0 7.65px
    border-color white transparent transparent transparent
    position absolute
    left 20px
    bottom -13.2px
</style>

