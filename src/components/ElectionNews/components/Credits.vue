<template>
  <div class="credit">
    <img class="credit__mm" src="/proj-assets/logo_mm_white.png" alt="" @click="toMM">
    <p>{{ $t('ELECTION_NEWS.LANDING.CREDITS.DATA.WORDING') }}：{{ $t('ELECTION_NEWS.LANDING.CREDITS.DATA.MEMBER[0]') }}、{{ $t('ELECTION_NEWS.LANDING.CREDITS.DATA.MEMBER[1]') }}、{{ $t('ELECTION_NEWS.LANDING.CREDITS.DATA.MEMBER[2]') }}</p>
    <p>{{ $t('ELECTION_NEWS.LANDING.CREDITS.WRITER.WORDING') }}：{{ $t('ELECTION_NEWS.LANDING.CREDITS.WRITER.MEMBER') }}</p>
    <p>{{ $t('ELECTION_NEWS.LANDING.CREDITS.FE.WORDING') }}：{{ $t('ELECTION_NEWS.LANDING.CREDITS.FE.MEMBER') }}</p>
    <p>{{ $t('ELECTION_NEWS.LANDING.CREDITS.DESIGN.WORDING') }}：{{ $t('ELECTION_NEWS.LANDING.CREDITS.DESIGN.MEMBER') }}</p>
    <p>2019/01/30</p>
  </div>
</template>

<script>
export default {
  methods: {
    toMM () {
      window.open('https://www.mirrormedia.mg')
    }
  }
}
</script>

<style lang="stylus" scoped>
.credit
  display flex
  flex-direction column
  align-items center
  &__mm
    width 30px
    height 30px
    margin 0 0 10px 0
    cursor pointer
  p
    margin 3px 0
    color white
    font-size 14px

@media (min-width 1024px)
  .credit
    &__mm
      width 40px
      height 40px
      margin 0 0 20px 0
    p
      font-size 16px
</style>