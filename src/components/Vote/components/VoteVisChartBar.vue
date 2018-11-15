<template>
  <div class="bar">
    <div class="bar__blue blue">
      <div
        v-for="(candidate, i) in blue"
        :key="candidate['姓名']"
        class="blue__candidate candidate"
      >
        <VoteVisChartBarCircle
          v-for="count in candidate['當選次數']"
          :key="`blue-${count}`"
          :backgroundColor="'#1aa6de'"
          :text="count === candidate['當選次數'] && i === blue.length - 1 ? blueTotal : ''"
          :data="candidate"
          :hasTooltip="false"
        />
      </div>
    </div>
    <div class="bar__yellow yellow">
      <div
        v-for="(candidate, i) in yellow"
        :key="candidate['姓名']"
        class="yellow__candidate candidate"
      >
        <VoteVisChartBarCircle
          v-for="count in candidate['當選次數']"
          :key="`yellow-${count}`"
          :backgroundColor="'#fda134'"
          :text="count === candidate['當選次數'] && i === yellow.length - 1 ? yellowTotal : ''"
          :data="candidate"
          @handleMouse="handleCandidate"
        />
      </div>
    </div>
    <div class="bar__orange orange">
      <div
        v-for="(candidate, i) in orange"
        :key="candidate['姓名']"
        class="orange__candidate candidate"
      >
        <VoteVisChartBarCircle
          v-for="count in candidate['當選次數']"
          :key="`orange-${count}`"
          :backgroundColor="'#ef5233'"
          :text="count === candidate['當選次數'] && i === orange.length - 1 ? orangeTotal : ''"
          :data="candidate"
          @handleMouse="handleCandidate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { sum, } from 'd3-array'
import { get, } from 'lodash'
import VoteVisChartBarCircle from './VoteVisChartBarCircle.vue'

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    VoteVisChartBarCircle,
  },
  computed: {
    blueTotal () {
      return sum(get(this.data, [ 'values', '0', 'values' ], []), item => sum(item.values, d => d['當選次數']))
    },
    yellowTotal () {
      return sum(get(this.data, [ 'values', '1', 'values' ], []), item => sum(item.values, d => d['當選次數']))
    },
    orangeTotal () {
      return sum(get(this.data, [ 'values', '2', 'values' ], []), item => sum(item.values, d => d['當選次數']))
    },
    blue () {
      return get(this.data, [ 'values', '0', 'values' ], []).map(item => item.values[0])
    },
    yellow () {
      return get(this.data, [ 'values', '1', 'values' ], []).map(item => item.values[0])
    },
    orange () {
      return get(this.data, [ 'values', '2', 'values' ], []).map(item => item.values[0])
    },
  },
  methods: {
    handleCandidate (e) {
      const { type, path } = e
      const candidateElement = path[1]
      if (type === 'mouseover') {
        candidateElement.classList.add('hover')
      } else {
        candidateElement.classList.remove('hover')
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.bar
  display flex
  &__blue
    display flex
  &__yellow
    display flex
  &__orange
    display flex

.candidate
  display flex

.hover
  & >>> .circle
    border 2px solid white
</style>

