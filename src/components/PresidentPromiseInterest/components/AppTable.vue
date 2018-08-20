<template>
  <table class="table">
    <caption v-show="'caption' in rankData" class="table__caption" v-text="rankData.caption"></caption>
    <thead class="table__thead">
      <tr>
        <th v-for="column in rankData.columnName" :key="column" v-text="formatPercentagePollTitle(column)"></th>
      </tr>
    </thead>
    <tbody class="table__tbody">
      <tr v-for="(item, i) in rankData.data" :key="i">
        <td v-text="i + 1"></td>
        <td v-for="(value, j) in item" :key="value">
          <p>{{ value }}</p>
          <AppTagPromise
            v-if="isPromiseDoneIndexs.includes(i) && isLastColumn(j, item)"
            class="table__tag"
          />
          <p
            v-if="isPromiseStuckIndexs.includes(i) && isLastColumn(j, item)"
            class="table__stuck"
          >
            未提出具體方案
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { get, } from 'lodash'
import AppTagPromise from './AppTagPromise.vue'

export default {
  props: {
    rankData: {
      type: Object,
      required: true,
    },
  },
  components: {
    AppTagPromise,
  },
  data () {
    return {
      windowInnerWidth: undefined,
    }
  },
  computed: {
    isPromiseDoneIndexs () {
      return get(this.rankData, 'isPromiseDoneIndexs', [])
    },
    isPromiseStuckIndexs () {
      return get(this.rankData, 'isPromiseStuckIndexs', [])
    },
  },
  methods: {
    isLastColumn(index, item) {
      return index === item.length - 1
    },
    formatPercentagePollTitle (title) {
      if (title !== '票數佔總額比例') return title
      return this.windowInnerWidth > 425 ? title : '票數比'
    }
  },
  mounted () {
    this.windowInnerWidth = window.innerWidth
  }
}
</script>

<style lang="stylus" scoped>
.table
  width 100%
  border-spacing 0
  &__caption
    font-size 24px
    font-weight 400
    line-height 1.58
    text-align justify
    color #ffffff
    margin 0 0 43px 0
  &__thead
    background-color #2b616d
    th
      font-size 18px
      font-weight 900
      font-style normal
      font-stretch normal
      letter-spacing normal
      text-align center
      color #ffffff
      padding 12px 0 14px 0
  &__tbody
    tr
      &:nth-child(1)
        color #fa8d62
      &:nth-child(2)
        color #ffc1a9
      &:nth-child(3)
        color #ffc1a9
      &:nth-child(4)
        color #c9c9c9
      &:nth-child(5)
        color #c9c9c9
    td
      padding 20px 0 0 0
      font-size 18px
      font-weight 300
      text-align center
      vertical-align top
      &:nth-child(1)
        width 159px
      &:nth-child(2)
        width 189px
    p
      margin 0
  &__tag, &__stuck
    margin 10px 0 0 0 !important
  &__stuck
    color #c9c9c9

@media (max-width 425px)
  .table
    width calc(100% + 20px + 20px)
    position relative
    left -20px
    &__caption
      font-size 16px
      margin 0 0 24px 0
      padding 0 20px
    &__thead
      th
        font-size 16px
    &__tbody
      td
        font-size 16px
        &:nth-child(1)
          width calc(100% / 4)
        &:nth-child(2)
          width calc(100% / 4)
</style>

