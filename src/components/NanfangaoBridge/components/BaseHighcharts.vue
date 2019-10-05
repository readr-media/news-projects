<template>
  <div class="base-highcharts">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseHighcharts'
}
</script>

<style lang="stylus">
.base-highcharts
  margin-top 30px
  margin-bottom 30px
  // &__img
  //   margin-left -15px
  //   margin-right -15px
  // & img
  //   width 100%
  //   display block
</style>