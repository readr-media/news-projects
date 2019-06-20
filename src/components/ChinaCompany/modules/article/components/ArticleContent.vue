<template>
  <article>
    <h1>
      錢出去，人進來，<br>中國讓你發大財！？
    </h1>
    <Credits class="credits" />
  </article>
</template>

<script>
import Credits from '../../../components/Credits.vue'

export default {
  components: {
    Credits
  }
}
</script>

<style lang="stylus" scoped>
article
  max-width 800px
  height 1000vh
  h1
    font-size 60px
    font-weight 500
    line-height 1.5
    margin 0

.credits
  margin 20px 0 0 0
</style>
