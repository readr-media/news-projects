<template>
  <section class="section">
    <HorizontalColumnBar
      :groupLimitToShow="1"
      :data="[
        {
          title: '台北市',
          bars: [
            {
              value: 1,
              color: 'red'
            },
            {
              value: 0.5,
              color: 'green'
            },
            {
              value: 0.8,
              color: 'blue'
            },
          ]
        },
        {
          title: '新北市',
          bars: [
            {
              value: 0.2,
              color: 'red'
            },
            {
              value: 0.56,
              color: 'green'
            },
            {
              value: 0.7,
              color: 'blue'
            },
          ]
        },
        {
          title: '基隆市',
          bars: [
            {
              value: 0.2,
              color: 'red'
            },
            {
              value: 0.56,
              color: 'green'
            },
            {
              value: 0.7,
              color: 'blue'
            },
          ]
        }
      ]"
    />
  </section>
</template>

<script>
import HorizontalColumnBar from '../charts/HorizontalColumnBar.vue'

export default {
  components: {
    HorizontalColumnBar
  }
}
</script>

<style lang="stylus" scoped>
@media (min-width 768px)
  .section
    max-width 1000px
    margin 0 auto
</style>
