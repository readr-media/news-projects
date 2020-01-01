<template>
  <div class="bingo-selector lagislator">
    <span class="name" v-text="name"/>
    <span class="party" v-text="party"/>
  </div>
</template>

<script>
export default {
  props: {
    candidate: Object,
  },
  computed: {
    name: function(){return this.candidate.name},
    party: function(){return this.candidate.party},
  }
}
</script>
<style lang="stylus" scoped>
  .lagislator
    display none

  .bingo-selector:hover
    background-color #ffffff
    border solid 1px rgba(216, 216, 216, 0.5)

  .expanded
    display flex

</style>
