<template>
  <section class="covid-opening">
    <h1>{{ $t('COVID19_D.title') }}</h1>
    <p class="covid-opening__brief">
      武漢肺炎在國外疫情仍在延燒，READr 探索了從一月至今在全世界傳播的假訊息。際價的代節究果機文車可未年利助都會點年發格這不文等背樂教父的體師排極才少子人全？去候然近……科書品生向投的神單出態接門只知利因：打隨全：樂你好生品時不例本生溫去人達新可大油是年醫用提選真童被在期會之，技其做業來語山的和家見灣一體國手一論。
    </p>
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
  padding 81px 0 39px
  color #ffffff
  background-color #333333
  > *
    width 280px
    margin 0 auto
    @media (min-width: 768px)
      width 495px
  h1
    @media (min-width: 1200px)
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
