<template>
  <div v-show="showChart" class="ec-chart">
    <transition-group name="square" tag="div">
      <div key="has-group">
        <div
          v-for="d in 87"
          :key="`has-group-${d}`"
          :class="{ last: d == 87 }"
          class="square has-group separate"
        />
      </div>
      <div v-if="current === 0" key="not-group">
        <div
          v-for="d in 164"
          :key="`not-group-${d}`"
          :class="{ last: d == 164 }"
          class="square not-group separate"
        />
      </div>
      
      <!-- <div
        v-for="d in 14"
        v-if="current === 0"
        :key="`no-data-${d}`"
        :class="{ last: d == 14 }"
        class="square no-data separate"
      /> -->
    </transition-group>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { throttle } from 'lodash'

const { mapGetters } = createNamespacedHelpers('ExtraCurriculum')

export default {
  name: 'EcChart',
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
  },
  mounted () {
    this.showChart = true
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
  // display flex
  // justify-content: center
  // align-items center
  position fixed
  top 50%
  left 5%
  z-index 0 !important
  transform translateY(-50%)
  width 90%
  height 75vh
  // max-height calc(100% - 50px)
  > div
    position relative
    top 50%
    transform translateY(-50%)
.square
  display inline-block
  width 10px
  height 10px

.has-group
  background-color #2c585e
  &.last
    width 4px
    margin-right 11px

.not-group
  background-color #d5cc9d
  &.last
    width 3px
    margin-right 12px

.no-data
  background-color #9b9b9b

.separate
  margin-right 5px

.square-enter-active, .square-leave-active
  transition all 1s

.square-enter, .square-leave-to
  opacity 0
  // transform translateY(-50%)

.square-move
  transition all 1s

@media (min-width: 768px)
  .ec-chart
    left calc( (100% - 300px) * 0.05 + 300px)
    width calc( (100% - 300px) * 0.9 )
@media (min-width: 1200px)
  .ec-chart
    left calc( (100% - 400px) * 0.1 + 400px)
    width calc( (100% - 400px) * 0.8 )
</style>