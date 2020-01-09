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
    width 7vw
    height 7vw


@media (min-width: 768px)
  .bingo-cell
    width 3vw
    height 3vw

</style>
