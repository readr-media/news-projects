<template>
  <div class="map-history">
    <nav class="map-history__nav">
      <button
        v-for="item in countyNav"
        :key="item"
        :class="{ active: item === countyName }"
        @click="$emit('changeCounty', item)"
        v-text="item">
      </button>
      <button @click="$emit('closeLightbox')"><img src="/proj-assets/vote2018-result-city-council/close.png" alt=""></button>
    </nav>
    <div class="map-history__info">
      <div class="yaer-controller">
        <button v-if="currentYear !== yearList[0]" class="prev" @click="$emit('minusYear')"></button>
        <span v-text="currentYear"></span>
        <button v-if="currentYear !== yearList[yearList.length - 1]" class="next" @click="$emit('addYear')"></button>
      </div>
      <div class="speaker-history">
        <div>
          <p v-for="(item, index) in councilSpeaker" :key="`${item['姓名']}-speaker`">
            <span v-text="item['姓名']"></span>
          議長{{ index > 0 ? '（遞補）' : '' }}</p>
        </div>
        <div>
          <p v-for="(item, index) in deputySpeaker" :key="`${item['姓名']}-deputy-speaker`">
            <span v-text="item['姓名']"></span>
          副議長{{ index > 0 ? '（遞補）' : '' }}</p>
        </div>
      </div>
      <div class="gantt">
        <GanttChart
          v-for="(item, index) in ganttList"
          :key="`${item['年份']}-${item['姓名']}-gantt`"
          :councilCsv="councilCsv"
          :councilor="item"
          :currentYear="currentYear"
          :index="index"
          :yearList="yearList" />
      </div>
      <p>※ 此處當選次數與「你全家都議員」專題當選次數略有不同，為呈現縣市特色，這裡拿來計算的資料不包含臺灣省議會。</p>
      <p>※ 此處的「家族」成員是指不分親等的所有親屬，且在同縣市擔任過議員的人。</p>
      <p>※ 家族命名方式是以家族成員中最新一次當選議員者。</p>
    </div>
  </div>
</template>
<script>

import GanttChart from './GanttChart.vue'
import { uniq } from 'lodash'

export default {
  name: 'ProjectHistory',
  props: {
    councilCsv: {
      type: Array
    },
    countyName: {
      type: String
    },
    currentYear: {
      type: Number
    },
    yearList: {
      type: Array
    }
  },
  components: {
    GanttChart
  },
  computed: {
    councilSpeaker () {
      return this.councilCsv.filter(councilor => (Number(councilor['年份']) === this.currentYear)
        && councilor['地區'] === this.countyName 
        && councilor['議長']).sort((a, b) => Number(a['議長順序']) - Number(b['議長順序']))
    },
    deputySpeaker () {
      return this.councilCsv.filter(councilor => (Number(councilor['年份']) === this.currentYear)
        && councilor['地區'] === this.countyName 
        && councilor['副議長']).sort((a, b) => Number(a['副議長順序']) - Number(b['副議長順序']))
    },
    countyNav () {
      const isNewTaipei = /臺北縣|新北/
      const regex = /桃園|臺中|臺南|高雄/
      if (this.countyName.match(isNewTaipei)) {
        return [ '新北市', '臺北縣' ]
      } else if (this.countyName.match(regex)) {
        const county = this.countyName.substring(0, 2)
        return [ `${county}市`, `${county}縣` ]
      } 
      return [ this.countyName ]
    },
    ganttList () {
      return uniq(this.councilSpeaker.concat(this.deputySpeaker))
    }
  },
}
</script>
<style lang="stylus" scoped>
.map-history
  position relative
  width 100%
  height 100%
  padding 0 0 40px
  text-align center
  background-color rgba(103, 94, 86, .95)
  button
    outline none
    cursor pointer
  &__nav
    display flex
    height 55px
    > button
      flex 1
      display block
      padding 0
      color #a0a0a0
      font-size 1.3125rem
      background-color #000000
      border none
      opacity .3
      &:last-child
        max-width 55px
        width 55px
        background-color #313131
        opacity 1
      &.active
        color #fff
        background-color transparent
        opacity 1
        cursor default
      img
        width 25px
        height 25px
        object-fit contain
        object-position center center
  &__info
    height calc(100% - 55px)
    padding 0 15px
    overflow-y auto
    > p
      margin 45px auto 0
      color #dcdcdc
      font-size .875rem
      text-align left
      line-height 1.7
      & + p
        margin-top 1em
  .yaer-controller
    position relative
    display inline-flex
    align-items center
    justify-content center
    margin-top 35px
    color #fff
    font-size 1.625rem
    > button
      position absolute
      display block
      width 0
      height 0
      padding 0
      background-color transparent
      border-style solid
      &.prev
        left -70px
        border-width 10px 17.3px 10px 0
        border-color transparent #fff transparent transparent
      &.next
        right -70px
        border-width 10px 0 10px 17.3px
        border-color transparent transparent transparent #fff
    > span
      margin 0
      user-select none
  
  .speaker-history
    display flex
    flex-wrap wrap
    margin-top 20px
    > div
      width 50%
      & + div
        border-left 1px solid #dcdcdc
      > p
        margin 0
        color #dcdcdc
        & + p
          margin-top .5em
        > span
          margin-right 1em
  .gantt
    margin-top 50px
    color #fff
    h3
      margin 0
      padding .5em 0
      letter-spacing 1px
      background-color #48423c
    p
      margin 1em 0 0
    .chart
      margin-top 20px

@media (min-width: 768px)
  .map-history
    &__info
      width 60%
      margin 0 auto
      padding 0
@media (min-width: 1200px)
  .map-history
    &__nav
      > button
        &:last-child
          display none
    &__info
      width auto
      > p
        width 60%
        text-align justify
</style>
