<template>
  <section class="legend-field">
    <div class="legend-field__wrapper" v-for="legend in legends" :key="legend.color">
      <div class="legend-field__icon" :style="{ backgroundColor: legend.color }"></div>
      <p class="legend-field__text">{{ legend.text }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LegendField',
  data () {
    return {
      legends: [
        {
          color: '#269f84',
          text: '庫存＞50'
        },
        {
          color: '#f5a623',
          text: '庫存＜50'
        },
        {
          color: '#9b9b9b',
          text: '無庫存'
        },
        {
          color: '#fff',
          text: '無資料'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
.legend-field
  position absolute
  top 66px
  left 10px
  font-size 1.3rem
  font-weight 500
  z-index 9
  user-select none
  &__wrapper
    display flex
    align-items center
    & + .legend-field__wrapper
      margin-top 12px
  &__icon
    width 16px
    height 16px
    margin-right 5px
    box-shadow 0 1px 2px rgba(#000, 0.25)
  &__text
    text-shadow 0 1px 2px rgba(#000, 0.15)
</style>
