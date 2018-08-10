<template>
  <div class="infographic-body-container">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'InfographicLayout',
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
  .infographic
    position relative
    width 674px
    height 430px
    display flex
    justify-content center
    align-items center
    border 1px solid #e5e5e5
    &__loading
      position absolute
      top 0
      left 0
      z-index 11
      width 100%
      height 100%
      display flex
      justify-content center
      align-items center
      background-color rgba(255, 255, 255, 0.8)
    &__tip
      position absolute
      right 20px
      bottom 75px
      background-color #ffdccb
      opacity 0.8
      border-radius 2px
      width 256px
      // height 180px
      padding 23px 26px

    &__svg
      // display none
      // &.active
      //   display inline
      &__wrapper
        position absolute
        top 0
        left 0
        z-index 10
        width 100%
        height 100%
      &__default
        background-image url(/proj-assets/rent/infographic-default.png)
      &__default, &__static
        background-position center center
        background-repeat no-repeat
        background-size contain
        width 100%
        height 100%

      &.no-required
        & >>> .spot
          display inline

      & >>> .spot
        fill #f6613f
        display none
        &.hover
          fill #000
      & >>> text
        font-size 14px
        fill #000
      & >>> #xAxis path,
      & >>> #yAxis path,
      & >>> #xAxis line,
      & >>> #yAxis line
        stroke #000
        fill none
        shape-rendering crispEdges
      & >>> .tick line
        stroke #d3d3d3
      & >>> .domain
        stroke #d3d3d3

      &.ya-only,
      &.tao-only,
      &.share-tao-only,
      &.household-only,
      &.student-only,
      &.family-only,
      &.daily-worker-only,
      &.pettable-needed,
      &.cookable-needed,
      &.less-than-6600-only
        & >>> .spot
          display inline
        &.ya-only
          & >>> .spot
            &:not(.obj-type-3)
              display none
        &.share-tao-only
          & >>> .spot
            &:not(.obj-type-2)
              display none
        &.tao-only
          & >>> .spot
            &:not(.obj-type-1)
              display none
        &.household-only
          & >>> .spot
            &:not(.obj-type-0)
              display none
        &.student-only
          & >>> .spot
            &:not(.student)
              display none
        &.family-only
          & >>> .spot
            &:not(.family)
              display none

        &.daily-worker-only
          & >>> .spot
            &:not(.daily-worker)
              display none

        &.pettable-needed
          & >>> .spot
            &:not(.pettable)
              display none 
        &.cookable-needed
          & >>> .spot
            &:not(.cookable)
              display none 
        &.less-than-6600-only            
          & >>> .spot
            &:not(.less-than-6600)
              fill #d3d3d3
              opacity 0.6
          &.ya-only
            & >>> .spot
              &:not(.less-than-6600)
                display none
              &:not(.obj-type-3)
                &.less-than-6600
                  fill #666666
                  opacity 0.6
                  display inline
          &.pettable-needed
            & >>> .spot
              &:not(.pettable)
                fill #d3d3d3
                opacity 0.3
                display inline
          &.female-only
            & >>> .spot
              &:not(.female-limit)
                fill #d3d3d3
                opacity 0.4
          &.top-minus-1-only
            & >>> .spot
              &:not(.from-top-minus-1)
                fill #d3d3d3
                opacity 0.2
              &:not(.less-than-6600)
                fill #d3d3d3
                opacity 0.2   
          &.top-0-only
            & >>> .spot
              &:not(.from-top-minus-1):not(.from-top-0)
                fill #d3d3d3
                opacity 0.2
              &:not(.less-than-6600)
                fill #d3d3d3
                opacity 0.2 
  @media screen and (min-width: 0px) and (max-width: 767px)
    .infographic
      width 100%
      height 220px
      &__svg
        &__wrapper
          display flex
          justify-content center
          align-items center
        &__default
          background-image url(/proj-assets/rent/infographic-mobile-default.png)
        &__default, &__static
          width 320px
          height 200px
</style>