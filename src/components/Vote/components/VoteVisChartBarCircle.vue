<template>
  <div
    class="circle"
    :style="{ backgroundColor }"
    @mouseover="handleMouse"
    @mouseout="handleMouse"
  >
    <p>{{ text }}</p>
    <transition name="fade" mode="out-in">
      <VoteVisChartTooltip
        v-if="hasTooltip"
        class="circle__tooltip"
        v-show="showTooltip"
        :data="data"
        :view="view"
      />
    </transition>
  </div>
</template>

<script>
import VoteVisChartTooltip from './VoteVisChartTooltip.vue'

export default {
  props: {
    backgroundColor: {
      type: String,
      default: 'white'
    },
    text: {
      type: [ String, Number ],
      required: true
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    view: {
      type: Number,
      required: true
    },
    hasTooltip: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    VoteVisChartTooltip,
  },
  data () {
    return {
      showTooltip: false
    }
  },
  methods: {
    handleMouse (e) {
      const { type } = e
      this.showTooltip = type === 'mouseover'
      this.$emit('handleMouse', type)
    }
  },
}
</script>

<style lang="stylus" scoped>
.circle
  d = 30px
  width d
  height d
  border-radius d
  display flex
  flex-direction column
  justify-content center
  align-items center
  font-size 20px
  font-weight 400
  position relative
  &__tooltip
    position absolute
    top 30px
    z-index 1000

.fade-enter-active, .fade-leave-active
  transition opacity .1s
.fade-enter, .fade-leave-to
  opacity 0

@media (max-width 768px)
  .circle
    position static
    &__tooltip
      top 40px
      left 0
</style>

