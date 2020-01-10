<template>
  <div class="bingo-cell"></div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { get } from 'lodash'
export default {
  props: {
    candidateid: String,
  },
}
</script>

<style lang="stylus" scoped>

  .bingo-cell
    margin-top -2px
    margin-left -2px
    box-shadow: inset 0 0 0 2px rgba(151, 151, 151, 0.25)
    background-color white
    width 9vw
    height 9vw


@media (min-width: 768px)
  .bingo-cell
    width calc((100vw - 230px - (10px * 4)) / 25)
    height calc((100vw - 230px - (10px * 4)) / 25)

</style>
