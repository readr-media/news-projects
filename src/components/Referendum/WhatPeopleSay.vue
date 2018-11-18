<template>
  <div class="what-pp-say">
    <div class="what-pp-say__title"><h2><span v-text="$t('REFERENDUM.WHAT_PEOPLE_SAY.TITLE')"></span></h2></div>
    <div class="what-pp-say__vid vid"></div>
    <div class="what-pp-say__desc desc"><span v-text="$t('REFERENDUM.WHAT_PEOPLE_SAY.DESC')"></span></div>
  </div>
</template>
<script>
  export default {
    name: 'WhatPeopleSay',
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
  .what-pp-say
    padding 50px 0
    background-color #f9f9f7
    & > div
      &:not(.vid)
        padding 0 25px
        margin 20px 0
    &__title
      h2
        font-size 1.5rem
        font-weight 600
        font-style normal
        font-stretch normal
        line-height 1.42
        letter-spacing normal
        text-align justify
        color #a40035      
    &__vid
      height 180px
      background-color #000
    &__desc
      font-size 0.875rem
      font-weight normal
      font-style normal
      font-stretch normal
      line-height 1.71
      letter-spacing normal
      text-align justify
      color #a0a0a0
  @media screen and (min-width: 600px) 
    .what-pp-say   
      padding 130px 0
      & > div
        &:not(.desc):not(.vid)
          margin 50px auto 
        &.desc, &.vid
          padding 0
          margin 20px auto
      &__title
        h2
          font-size 1.875rem
          line-height 1.48
          text-align center
      &__vid
        max-width 600px
      &__desc
        max-width 600px
        line-height 1.57
</style>