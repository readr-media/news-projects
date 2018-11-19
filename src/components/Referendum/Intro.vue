<template>
  <div class="intro">
    <div class="intro__wrapper">
      <div class="intro__heroimg"><img src="/proj-assets/referendum/referendum-index.png"></div>
      <div class="intro__title">
        <img src="/proj-assets/referendum/icons/stamp.png">
        <span v-text="$t('REFERENDUM.INTRO.TITLE')"></span>
      </div>
    </div>
    <div class="intro__brief brief"><span v-text="$t('REFERENDUM.INTRO.BRIEF')"></span></div>
  </div>
</template>
<script>
  export default {
    name: 'Intro',
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
  .intro
    background-color #f9f9f7
    padding 65px 0 45px
    min-height 100vh
    
    & > div
      margin-bottom 20px
      &:not(.brief)
        text-align center
    &__wrapper
      & > div
        margin-bottom 20px
    &__heroimg
      img
        width 270px
        height 132px
    &__title
      img
        display none
      span
        color #a40035
        font-size 2.625rem
        font-weight 600
        line-height normal
        text-shadow 1.4px 1.4px 2px rgba(0, 0, 0, 0.1)
    &__brief
      padding 25px
      text-align justify
      span
        font-size 1rem
        line-height 1.88
  @media screen and (min-width: 415px)
    .intro
      padding 120px 25px 45px
      display flex
      flex-direction column
      justify-content center
      align-items center
      &__wrapper
        display flex
        justify-content center
      &__heroimg
        img
          flex 1
          width 85%
          height auto
          max-height 279px
          max-width 587px
      &__title
        margin-left 10px
        display flex
        flex-direction column
        justify-content flex-end
        align-items center
        img
          display block
          width 100%
          max-height 137px
          max-width 137px
          margin-bottom 20px
        span
          font-size 1.375rem
          font-style normal
          font-stretch normal
          letter-spacing normal
          text-align justify
          color #a40035   
    &__brief
      flex 1
      padding 0
      span
        font-size 1.25rem
        line-height 2
  @media screen and (min-width: 600px) 
    .intro
      &__title
        margin-left 20px
        img
          width 90%
        span
          font-size 2rem          
      &__brief
        width 500px
  @media screen and (min-width: 700px) 
    .intro
      &__title
        img
          margin-bottom 20px
        span
          font-size 2.5rem
      &__brief
        width 550px          
  @media screen and (min-width: 800px) 
    .intro
      &__title
        img
          margin-bottom 20px
        span
          font-size 3rem
      &__brief
        width 600px            
  @media screen and (min-width: 900px) 
    .intro
      &__title
        img
          margin-bottom 40px
        span
          font-size 4.325rem
</style>