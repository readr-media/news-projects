<template>
  <div class="intro">
    <div class="intro__wrapper">
      <div class="intro__heroimg"><img src="/proj-assets/referendum/referendum-index.png"></div>
      <div class="intro__title">
        <img src="/proj-assets/referendum/icons/stamp.png">
        <div class="hero"><span v-text="$t('REFERENDUM.INTRO.HERO_TITLE')"></span></div>
      </div>
    </div>
    <div class="intro__subtitle"><span v-text="$t('REFERENDUM.INTRO.TITLE')"></span></div>
    <div class="intro__brief brief"><span v-html="$t('REFERENDUM.INTRO.BRIEF')"></span></div>
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
      &:not(.brief)
        text-align center
    &__wrapper
      & > div
        &:not(.intro__heroimg)
          margin-bottom 20px
    &__heroimg
      img
        width 270px
        height 132px
    &__title
      img
        display none
      span
        text-shadow 1.4px 1.4px 2px rgba(0, 0, 0, 0.1)
        font-family "Noto Sans CJK TC","Noto Sans TC","source-han-sans-traditional","source-sans-serif-tc",NotoSansCJKtc
        font-size 132px
        font-weight 900
        font-style normal
        font-stretch normal
        line-height 1
        letter-spacing 1.3px
        text-align center
        color #a40035
    &__subtitle
      span
        text-shadow 1.4px 1.4px 2px rgba(0, 0, 0, 0.1)
        font-family PingFangTC
        font-size 42px
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.1
        letter-spacing normal
        text-align center
        color #a40035
    &__brief
      padding 25px
      text-align justify
      >>> a
        &:hover, &:link, &:visited
          color #000
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
        justify-content flex-end
        // align-items center
      &__heroimg
        display flex
        justify-content center
        align-items center
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
          font-size 2rem
          font-style normal
          font-stretch normal
          letter-spacing normal
          text-align justify
          color #a40035   
      &__subtitle
        margin-top 40px
        span
          font-size 3.375rem
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
          font-size 3rem   
      &__subtitle
        span
          font-size 4.375rem       
      &__brief
        width 500px
  @media screen and (min-width: 700px) 
    .intro
      &__title
        img
          margin-bottom 20px
        span
          font-size 4rem
      &__brief
        width 550px          
  @media screen and (min-width: 800px) 
    .intro
      &__title
        img
          margin-bottom 20px
        span
          font-size 5rem
      &__brief
        width 600px            
  @media screen and (min-width: 900px) 
    .intro
      &__title
        img
          margin-bottom 30px
        span
          font-size 6rem
</style>