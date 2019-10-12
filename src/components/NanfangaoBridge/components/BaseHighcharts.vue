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
  margin 30px auto
  max-width 650px
</style>