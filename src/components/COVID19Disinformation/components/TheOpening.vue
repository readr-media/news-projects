<template>
  <section class="covid-opening">
    <img
      class="covid-opening__img"
      src="/proj-assets/covid19-disinformation/title-tw.png"
      :alt="$t('COVID19_D.TITLE')"
    >
    <h1 v-text="$t('COVID19_D.TITLE')" />
    <p
      class="covid-opening__brief"
      v-text="$t('COVID19_D.DESCRIPTION')"
    />
    <div class="covid-opening__arrow" />
  </section>
</template>

<script>
export default {
  name: 'TheOpening'
}
</script>

<style lang="stylus" scoped>
.covid-opening
  display flex
  flex-direction column
  justify-content center
  min-height calc(100vh - 40px)
  color #ffffff
  background-color #333333
  background-image url(/proj-assets/covid19-disinformation/bg.png)
  background-size cover
  background-position center right
  background-repeat no-repeat
  @media (min-width: 1024px)
    min-height calc(100vh - 50px)
  > *
    width 280px
    margin 0 auto
    @media (min-width: 768px)
      width 495px
  h1
    display none
  &__img
    display block
    @media (min-width: 1200px)
      width 600px
      transform translateX(-40%)
  &__brief
    margin 30px auto 0
    font-size 16px
    font-weight 500
    line-height 1.75
    text-align justify
    @media (min-width: 768px)
      margin-top 32px
    @media (min-width: 1200px)
      transform translateX(-25%)
  &__arrow
    width 25px
    height 25px
    margin 70px auto 0
    border-left 3px solid #fff
    border-bottom 3px solid #fff
    transform rotate(-45deg)
    animation updown .8s infinite alternate
    @media (min-width: 768px)
      margin-top 160px

@keyframes updown
    0%
      transform translateY(0) rotate(-45deg)
    100%
      transform translateY(-20px) rotate(-45deg)

</style>
