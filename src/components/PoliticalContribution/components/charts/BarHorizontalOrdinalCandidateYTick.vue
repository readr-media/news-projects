<template>
  <div class="bar-horizontal-current-ordinal-candidate-y-tick">
    <h1 class="bar-horizontal-current-ordinal-candidate-y-tick__order" v-text="order"></h1>
    <div class="bar-horizontal-current-ordinal-candidate-y-tick__container">
      <h1 class="bar-horizontal-current-ordinal-candidate-y-tick__candidate-name" v-text="candidateName"></h1>
      <h2 class="bar-horizontal-current-ordinal-candidate-y-tick__candidate-division" v-text="candidateDivision"></h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: [ Number, String ],
      require: true,
    },
    candidateName: {
      type: String,
      required: true,
    },
    candidateDivision: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang="stylus">
.bar-horizontal-current-ordinal-candidate-y-tick
  display flex
  width max-content
  height max-content
  &__order, &__candidate-name, &__candidate-division
    margin 0
  &__order
    font-size 56px
    font-weight 900
    text-align center
    color #d3d3d3
    line-height 1
    padding 5px 0 0 0
  &__container
    margin 0 0 0 10px
  &__candidate-name
    font-size 56px
    text-align center
    font-weight 400
  &__candidate-division
    font-size 23px
    text-align center
    color #808080
    font-weight 400
</style>


