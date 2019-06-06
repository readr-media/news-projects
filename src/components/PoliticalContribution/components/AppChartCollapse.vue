<template>
  <div
    :class="[ 'app-chart-collapse', { 'app-chart-collapse--collapsed': isCollapse } ]"
    :style="{ height: !isCollapse ? `${195 + chartContainerHeight + 40}px` : '195px' }"
    @click="toogleCollapse"
  >
    <h1 class="app-chart-collapse__title" v-html="title"></h1>
    <div class="app-chart-collapse__arrow">
      <div :class="[ 'app-chart-collapse__arrow-icon', { 'app-chart-collapse__arrow-icon--up': !isCollapse } ]"></div>
    </div>
    <div :class="[ 'app-chart-collapse__chart-container', { 'app-chart-collapse__chart-container--hide': isCollapse } ]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      isCollapse: true,
      chartContainerHeight: undefined
    }
  },
  methods: {
    toogleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  mounted () {
    // Workaround for transition to height: auto
    setTimeout(() => {
      this.chartContainerHeight = this.$el.querySelector('.app-chart-collapse__chart-container').offsetHeight    
    }, 1000)
  }
}
</script>

<style lang="stylus" scoped>
.app-chart-collapse
  width 100%
  display flex
  flex-direction column
  align-items center
  // height auto
  transition height .25s ease-out
  border-bottom 1px solid #d3d3d3
  cursor pointer
  overflow hidden
  padding 0 10px 40px 10px
  position relative
  &:nth-child(1)
    border-top 1px solid #d3d3d3
  &--collapsed
    height 195px
  &__title
    font-size 26px
    text-align center
    line-height 1.25
    font-weight 400
    margin 0
    display inline-block
    min-height 195px
    display flex
    align-items center
  &__arrow
    width 100%
    height 40px
    position absolute
    left 0
    bottom 0
    display flex
    justify-content center
    align-items center
  &__arrow-icon
    d = 16px
    width d
    height d
    border-left 4px solid #808080
    border-bottom 4px solid #808080
    transform rotate(-45deg)
    transition transform .25s ease-out 
    &--up
      transform rotate(-225deg)
  &__chart-container
    width 100%
    height max-content
    opacity 1
    transition opacity .25s ease-out .25s
    background-color #fff
    &--hide
      opacity 0
      transition opacity .25s ease-out 0s
</style>


