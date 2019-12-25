<template>
  <div class="bar-wrapper">
    <div
      :class="[
        'bar-wrapper__bar',
        `bar-wrapper__bar--${color}`
      ]"
      :style="{
        height: `${barHeight}px`
      }"
      @click="handleClick"
    />
    <div
      class="bar-wrapper__tick tick"
      @click="handleClick"
    >
      <p
        class="tick__text"
        v-text="partyName"
      />
    </div>
    <LightboxWrapper
      :showLightbox.sync="showLightbox"
    >
      this is a lightbox
    </LightboxWrapper>
  </div>
</template>

<script>
import LightboxWrapper from '../LightboxWrapper.vue'

import { scaleLinear } from 'd3-scale'

export default {
  props: {
    partyName: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'green',
          'blue',
          'others',
          'default'
        ].includes(value)
      }
    },
    votePercentage: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 0 && value <= 0.5
      }
    }
  },
  components: {
    LightboxWrapper
  },
  data() {
    return {
      showLightbox: false
    }
  },
  computed: {
    barHeight() {
      const scale =
        scaleLinear()
          .domain([0, 0.5])
          .range([0, 238])
      
      return scale(this.votePercentage)
    }
  },
  methods: {
    handleClick() {
      this.showLightbox = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.bar-wrapper
  display flex
  flex-direction column
  align-items center
  justify-content flex-end
  min-width calc(100vw / 5.6)
  max-width calc(100vw / 5.6)
  height 288px
  &__bar
    width 20px
    transition height 1s ease-out
    &--green
      background-color $color-green
    &--blue
      background-color $color-blue
    &--others
      background-color $color-purple
    &--default
      background-color rgba(0, 0, 0, 0.3)

.tick
  width 100%
  min-height 50px
  max-height 50px
  border-top 1px solid rgba(0, 0, 0, 0.3)
  display flex
  justify-content center
  align-items center
  &__text
    margin 0
    font-size 13px
    color $color-black-light
    line-height 1.38
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;

@media (min-width 768px)
  .bar-wrapper
    min-width calc(100% / 19)
    max-width calc(100% / 19)
    &__bar
      &:active // disable click, but allow hover
        pointer-events none

  .tick
    &:active // disable click, but allow hover
      pointer-events none
</style>
