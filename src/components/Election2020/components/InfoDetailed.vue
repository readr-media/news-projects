<template>
  <div class="i-d">
    <div class="i-d__title">
      <span v-if="title" class="title" v-text="title" />
      <span v-if="subtitle" class="subtitle" v-text="subtitle" />
    </div>
    <p v-if="description" class="i-d__description" v-text="description" />
    <table class="i-d__table">
      <tr v-if="Object.keys(tableHeading).length > 0">
        <th
          v-for="(value, name) in tableHeading"
          :key="value"
          :class="name"
          v-text="value"
        />
      </tr>
      <tr v-for="(item, i) in tableData" :key="`${(new Date()).valueOf}-${i}`">
        <template v-for="(value, name, index) in item">
          <td
            v-if="name === 'R'"
            :key="`d-${index}-${name}`"
            :class="name"
            v-text="`${formatRatio(value)}%`"
          />
          <td
            v-else-if="name === 'tks'"
            :key="`d-${index}-${name}`"
            :class="name"
          >
            {{ value | currency }}
          </td>
          <td
            v-else-if="name === 'P'"
            :key="`d-${index}-${name}`"
          >
            <Square :color="value" />
          </td>
          <td
            v-else
            :key="`d-${index}-${name}`"
            :class="name"
            v-text="value"
          />
        </template>
      </tr>
    </table>
  </div>
</template>

<script>

import { formatRatio } from '../utility/common'
import Square from './Square.vue'

export default {
  name: 'InfoDetailed',
  components: {
    Square
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    tableHeading: {
      type: Object,
      default: () => ({})
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    currency (value) {
      return value ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''
    }
  },
  methods: {
    formatRatio
  }
}
</script>

<style lang="stylus" scoped>
.i-d
  white-space nowrap
  > *
    & + *
      margin-top 20px
  &__title
    display flex
    justify-content space-between
    align-items flex-end
    color $color-black-light
    .title
      font-size 1.625rem

  &__description
    color $color-black-lighter
    font-size .875rem
    text-align justify
    line-height 1.7
    white-space normal

  &__table
    width 100%
    border-collapse collapse
    th, td
      &.c
        text-align left
      &.tks, &.R
        text-align right
    th
      padding-bottom 5px
      color $color-black-light
      font-weight normal
      border-bottom 1px solid rgba(0, 0, 0, .3)
    td
      padding 10px 0
      text-align center
      &.name
        text-align left
      &.tks, &.R
        font-family $font-family-serif
      >>> .square
        margin 0 auto
</style>