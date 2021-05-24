<template>
  <section class="covid-credit">
    <p>
      <span
        >{{ $t('COVID19_D.CREDIT_J') }}{{ $t('COVID19_D.CREDIT_J_1') }}</span
      >
    </p>
    <p>
      <span
        >{{ $t('COVID19_D.CREDIT_D') }}{{ $t('COVID19_D.CREDIT_D_1') }}</span
      >
      <span>{{ $t('COVID19_D.CREDIT_E') }}HY Tan</span>
    </p>
    <p>
      <span
        >{{ $t('COVID19_D.CREDIT_DA') }}{{ $t('COVID19_D.CREDIT_DA_1')
        }}{{ $t('COVID19_D.CREDIT_SEPARATOR') }}{{ $t('COVID19_D.CREDIT_DA_2')
        }}{{ $t('COVID19_D.CREDIT_SEPARATOR') }}{{ $t('COVID19_D.CREDIT_DA_3')
        }}{{ $t('COVID19_D.CREDIT_SEPARATOR') }}<br />{{
          $t('COVID19_D.CREDIT_DA_4')
        }}</span
      >
    </p>
    <br />
    <p>出版時間 2020/07/07</p>
  </section>
</template>

<script>
export default {
  name: 'TheCredit'
}
</script>

<style lang="stylus" scoped>
.covid-credit
  width 290px
  margin 0 auto
  padding 20px 0
  color #9f9f9f
  font-size 15px
  line-height normal
  p
    margin 0
    text-align center
  span
    + span
      margin-left 1em

.covid19-disinformation.en
  .covid-credit
    font-size 13px
</style>
