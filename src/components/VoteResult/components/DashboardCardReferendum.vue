<template>
  <div class="content">
    <div class="content__titles titles">
      <div class="titles__number" v-text="currentReferendumNumber"></div>
      <p class="titles__title" v-text="currentReferendumTitle"></p>
    </div>
    <StackedBarReferendum
      class="content__stacked"
      :data="currentReferendumDataVote"
    />
    <div class="content__options options">
      <div class="options__referendum-info referendum-info">
        <p class="referendum-info__vote-rate">投票率：{{ currentReferendumVoteRate }}</p>
        <p class="referendum-info__vote-result">結果：<span :class="[ 'result', { 'result--pass': isCurrentReferendumPass } ]">{{ isCurrentReferendumPass ? '' : '未' }}通過</span></p>
      </div>
      <select
        v-model="currentReferendumKey"
        class="options__dropdown"
      >
        <option
          v-for="referendum in Object.entries(referendums)"
          :key="referendum[0]"
          :value="referendum[0]"
          v-text="referendum[0]"
        >
        </option>
      </select>
    </div>
    <div class="content__methodology">
      <p>比例計算方法：（不）同意票 / 公投有效票</p>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import { referendums } from '../constants'

import StackedBarReferendum from './charts/StackedBarReferendum.vue'

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
    StackedBarReferendum
  },
  data () {
    return {
      referendums,
      currentReferendumKey: '公投07'
    }
  },
  computed: {
    currentReferendumNumber () {
      return this.currentReferendumKey.replace('公投', '')
    },
    currentReferendumTitle () {
      const titleValue = get(referendums, [ this.currentReferendumKey, 'title' ], '')
      return titleValue.length !== 0 ? titleValue.slice(3, titleValue.length) : ''
    },
    currentReferendumDataVote () {
      return get(this.data, this.currentReferendumKey, {})
    },
    currentReferendumVoteRate () {
      return `${get(this.currentReferendumDataVote, 'voteRate', 0)}%`
    },
    isCurrentReferendumPass () {
      return get(referendums, [ this.currentReferendumKey, 'pass' ], false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  &__stacked
    margin 12px 0 0 0
  &__options
    width 150px
    // height 28px
    margin 17px 0 0 0
  &__methodology
    margin 18px 0 0 0
    border-top 1px solid #979797
    p
      font-size 14px
      color #979797
      margin 9px 0 0 0

.titles
  display flex
  &__number
    min-width 30px
    width 30px
    min-height 30px
    height 30px
    border-radius 100%
    color #979797
    border 1px solid #979797
    display flex
    justify-content center
    align-items center
    font-size 18px
    margin 2px 0 0 0
  &__title
    margin 0 0 0 14px
    font-size 16px
    line-height 1.5
    text-align justify

.options
  width 100%
  display flex
  justify-content space-between
  align-items flex-end
  &__dropdown
    width 150px
    height 28px

.referendum-info
  p
    margin 0
    font-size 16px
  p + p
    margin 10px 0 0 0

.result
  &--pass
    color #9e005d
</style>

