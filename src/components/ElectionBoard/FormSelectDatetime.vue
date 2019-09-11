<template>
  <div class="select-datetime">
    <select v-model.number="year">
      <option value="2019">2019 年</option>
      <option value="2020">2020 年</option>
    </select>
    <select v-model.number="month">
      <template v-for="n in monthCurrent">
        <option :key="`month-${n}`" :value="n" v-text="`${n} 月`"></option>
      </template>
    </select>
    <select v-model.number="day">
      <template v-for="n in daysInMonth">
        <option :key="`day-${n}`" :value="n" v-text="`${n} 日`"></option>
      </template>
    </select>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'FormSelectDatetime',
  props: {
    datetime: {
      type: Number,
    }
  },
  data () {
    return {
      year: moment(this.datetime * 1000).year(),
      month: moment(this.datetime * 1000).month() + 1,
      monthCurrent: moment().month() + 1,
      day: moment(this.datetime * 1000).date(),
      dayCurrent: moment().date()
    }
  },
  computed: {
    daysInMonth () {
      if (this.month === this.monthCurrent) {
        return this.dayCurrent
      }
      return moment(`${this.year}-${this.month}`, 'YYYY-M').daysInMonth()
    },
    datetimeSelected () {
      return moment(`${this.year}-${this.month}-${this.day}`, 'YYYY-M-D').unix() 
    }
  },
  watch: {
    month (value) {
      if (value === this.monthCurrent && this.day > this.dayCurrent) {
        this.day = 1
      } else if (this.day > this.daysInMonth) {
        this.day = this.daysInMonth
      }
    },
    datetime (value) {
      this.year = moment(value * 1000).year()
      this.month = moment(value * 1000).month() + 1
      this.day = moment(value * 1000).date()
    },
    datetimeSelected (value) {
      this.$emit('updateDatetime', value)
    }
  }
}
</script>
<style lang="stylus" scoped>
.select-datetime
  display flex
  justify-content space-between
  // margin-top .5em
  > select
    width calc(33.33% - 6px)
    height 32px
    // text-indent .5em
    padding 0 0 0 12px
    background-color #a0a0a0
    border none
    border-radius 2px
    appearance none
</style>
