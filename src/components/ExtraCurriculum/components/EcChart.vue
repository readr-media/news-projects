<template>
  <div v-show="showChart" class="ec-chart">
    <transition-group name="square" tag="div">
      <div key="ec-chart__info" class="ec-chart__info">
        <h2 v-text="chartTitle" />
        <div class="legend">
          <template v-if="current === 0">
            <div>
              <div class="square has-group"></div>
              <span>有：864 間</span>
            </div>
            <div>
              <div class="square no-group"></div>
              <span>無：1633 間</span>
            </div>
            <div>
              <div class="square no-data"></div>
              <span>無資料：135 間</span>
            </div>
          </template>
          <template v-if="current === 2">
            <div>
              <div class="square has-group daai"></div>
              <span>佛教慈濟慈善事業基金會（大愛媽媽）：205 間</span>
            </div>
            <div>
              <div class="square has-group rainbowkids"></div>
              <span>彩虹愛家生命教育協會（彩虹媽媽）：195 間</span>
            </div>
          </template>
          <template v-if="current >= 1">
            <div>
              <div class="square has-group religion"></div>
              <span>宗教團體：{{ current === 1 ? 488 : 88 }} 間</span>
            </div>
          </template>
          <template v-if="current === 1">
            <div>
              <div class="square has-group"></div>
              <span>其他團體：376 間</span>
            </div>
          </template>
          <div>
            <div class="square default"></div>
            <span>= 10 所小學</span>
          </div>
        </div>
      </div>
      <div key="has-group" :class="{ 'religion-group': current >= 1, 'detailed-group': current === 2  }">
        <div
          v-for="d in 87"
          v-show="!(current === 2 && d > 49)"
          :key="`has-group-${d}`"
          :class="{
            last: d == 87,
            religion: d <= 49,
            'religion-last': d === 49,
            daai: d <= 21,
            'daai-last': d ===  21,
            rainbowkids: (d > 21 && d <= 40),
            'rainbowkids-last': d ===  40
          }"
          class="square has-group separate"
        />
      </div>
      <div v-if="current === 0" key="no-group">
        <div
          v-for="d in 164"
          :key="`no-group-${d}`"
          :class="{ last: d == 164 }"
          class="square no-group separate"
        />
      </div>
      <div v-if="current === 0" key="no-data">
        <div
          v-for="d in 14"
          :key="`no-data-${d}`"
          :class="{ last: d == 14 }"
          class="square no-data separate"
        />
      </div>
      
    </transition-group>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { throttle } from 'lodash'

const { mapGetters } = createNamespacedHelpers('ExtraCurriculum')

export default {
  name: 'EcChart',
  props: {
    currentChapter: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      current: 0,
      showChart: false
    }
  },
  computed: {
    ...mapGetters({
      schoolDataFormated: 'schoolDataFormated'
    }),
    chartTitle () {
      if (this.current === 1) {
        return '這些團體是哪些團體'
      } else if (this.current === 2) {
        return '宗教團體中，最主要是彩虹媽媽和大愛媽媽'
      }
      return '晨光時間有無校外團體'
    }
  },
  watch: {
    currentChapter (value) {
      if (value > 0) {
        this.showChart = true
      } else {
        this.showChart = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    detectContent () {
      const content = [ ...document.querySelectorAll('.ec-c-c__text') ]
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      
      content.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        if (rect.top < viewportHeight) {
          this.current = index
        }
      })
    },
    handleScroll: throttle(function () {
      this.detectContent()
    }, 300)
  },
}
</script>
<style lang="stylus" scoped>
.ec-chart
  position fixed
  top 50%
  left 5%
  z-index 0 !important
  transform translateY(-50%)
  width 90%
  height 75vh
  > div
    position relative
    top 50%
    transform translateY(-50%)
  &__info
    margin-bottom 25px
    h2
      color #4d4d4d
      font-size .875rem
      text-align center
    .legend
      display flex
      flex-wrap wrap
      justify-content center
      > div
        display flex
        align-items center
        margin .2em 0
        & + div
          margin-left 10px
      span
        margin-left 5px
        font-size .75rem
      .square
        &.religion
          &:after
            background-image url(/proj-assets/extra-curriculum/heart-white.svg)
      .daai
        &:after
          background-image url(/proj-assets/extra-curriculum/heart-green.svg)
      .rainbowkids
        &:after
          background-image url(/proj-assets/extra-curriculum/heart-yellow.svg)
.square
  position relative
  display inline-block
  width 10px
  height 10px
  &:after
    content ''
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    height 100%
    background-size 8px 8px
    background-position center center
    background-repeat no-repeat

.default
  border 1px solid #979797

.has-group
  background-color #2c585e
  &.last
    background linear-gradient(to right, #2c585e 40%, #fff 41%, #fff)
.no-group
  background-color #d5cc9d
.no-data
  background-color #9b9b9b
.separate
  margin-right 5px
.religion-group
  .religion
    &:after
      background-image url(/proj-assets/extra-curriculum/heart-white.svg)
    &-last
      background linear-gradient(to right, #2c585e 80%, #fff 81%, #fff)
  .last
    background linear-gradient(to right, #2c585e 60%, #fff 61%, #fff)
.detailed-group
  .square.daai
    &:after
      background-image url(/proj-assets/extra-curriculum/heart-green.svg)
  .square.rainbowkids
    &:after
      background-image url(/proj-assets/extra-curriculum/heart-yellow.svg)
  .daai-last
    background linear-gradient(to right, #2c585e 50%, #fff 51%, #fff)
  .rainbowkids-last
    background linear-gradient(to right, #2c585e 50%, #fff 51%, #fff)
  .religion-last
    background linear-gradient(to right, #2c585e 80%, #fff 81%, #fff)

.square-enter-active, .square-leave-active
  transition all 1s

.square-enter, .square-leave-to
  opacity 0

.square-move
  transition transform 1s

@media (min-width: 768px)
  .ec-chart
    left calc( (100% - 300px) * 0.1 + 300px)
    width calc( (100% - 300px) * 0.8 )
    &__info
      h2
        font-size 1.3125rem
      .legend
        span
          font-size .875rem
  .square
    width 25px
    height 25px
    &:after
      background-size 15px 15px
  
@media (min-width: 1200px)
  .ec-chart
    left calc( (100% - 400px) * 0.15 + 400px)
    width calc( (100% - 400px) * 0.7 )
</style>