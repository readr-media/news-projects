<template>
  <div class="section-content-explore-lightbox-info-donates-from-legend">
    <div class="section-content-explore-lightbox-info-donates-from-legend__row">
      <div class="section-content-explore-lightbox-info-donates-from-legend__legend-icon"></div>
      <p class="section-content-explore-lightbox-info-donates-from-legend__legend-hint" v-text="get(legendHints, 1, '')"></p>
    </div>
    <div class="section-content-explore-lightbox-info-donates-from-legend__row">
      <div class="section-content-explore-lightbox-info-donates-from-legend__legend-icon"></div>
      <p class="section-content-explore-lightbox-info-donates-from-legend__legend-hint" v-text="get(legendHints, 2, '')"></p>
    </div>
    <div class="section-content-explore-lightbox-info-donates-from-legend__row">
      <div class="section-content-explore-lightbox-info-donates-from-legend__legend-icon"></div>
      <p class="section-content-explore-lightbox-info-donates-from-legend__legend-hint" v-text="get(legendHints, 3, '')"></p>
    </div>
    <div class="section-content-explore-lightbox-info-donates-from-legend__row">
      <div class="section-content-explore-lightbox-info-donates-from-legend__legend-icon"></div>
      <p class="section-content-explore-lightbox-info-donates-from-legend__legend-hint">其他項目總和</p>
    </div>
  </div>
</template>

<script>
import { get, } from 'lodash'

export default {
  props: {
    legendHints: {
      type: Array,
      required: true,
    },
  },
  methods: {
    get,
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-info-donates-from-legend
  display flex
  flex-direction column
  &__row
    display flex
    align-items center
    margin 4px 0
    &:nth-child(1)
      .section-content-explore-lightbox-info-donates-from-legend__legend-icon
        background-color #9e005d
    &:nth-child(2)
      .section-content-explore-lightbox-info-donates-from-legend__legend-icon
        background-color #f768a1
    &:nth-child(3)
      .section-content-explore-lightbox-info-donates-from-legend__legend-icon
        background-color #fbb4b9
    &:nth-child(4)
      .section-content-explore-lightbox-info-donates-from-legend__legend-icon
        background-color #feebe2
  &__legend-icon
    width 20px
    height 20px
  &__legend-hint
    font-size 17px
    margin 0 0 0 12px
    line-height 1
</style>

