<template>
  <div class="bingobox">
    <BingoCell v-for="(cell, index) in cells" :key="index" :cell="cell"/>
  </div>
</template>

<script>
import BingoCell from './BingoCell.vue'
export default {
  props: {
    cells: Array
  },
  components: {
    BingoCell
  },
}
</script>

<style lang="stylus" scoped>
  .bingobox
    padding-inline-start 0
    margin-block-start 0
    margin-block-end 0
    display grid
    grid-template-columns repeat(5, 1fr)
    box-sizing border-box
</style>