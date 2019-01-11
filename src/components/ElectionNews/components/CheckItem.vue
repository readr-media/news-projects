<template>
  <div class="check-item">
    <div
      :class="[
        'check-item__checkbox',
        { 'check-item__checkbox--checked': isChecked && checkboxColor !== 'black' },
        { 'check-item__checkbox--checked-black': isChecked && checkboxColor === 'black' }
      ]"
      :style="{ backgroundColor: isChecked ? checkboxColor : 'transparent' }"
    >
    </div>
    <p class="check-item__text">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    checkboxColor: {
      type: String,
      default: 'black'
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  // data () {
  //   return {
  //     checked: false
  //   }
  // },
  // methods: {
  //   toggleCheck () {
  //     this.checked = !this.checked
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
.check-item
  display flex
  align-items center
  &__checkbox
    d = 10px
    width d
    min-width d
    height d
    border 1px solid #999999
    transition height .1s ease-out
    &--checked
      width 10px
      height 5px
      border none
    &--checked-black
      border none
  &__text
    font-size 10px
    margin 0 0 0 6px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>