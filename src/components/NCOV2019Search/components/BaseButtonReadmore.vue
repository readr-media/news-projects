<template>
  <button class="button-readmore">
    <span
      class="button-readmore__wording"
      v-text="wording"
    />
    <span
      :class="[
        'button-readmore__icon',
        { 'button-readmore__icon--reverse': isToggled }
      ]"
    />
  </button>
</template>

<script>
export default {
  props: {
    isToggled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      wordingIsNotToggled: '看完整回答',
      wordingIsToggled: '看完了收折'
    }
  },
  computed: {
    wording() {
      return this.isToggled ? this.wordingIsToggled : this.wordingIsNotToggled
    }
  }
}
</script>

<style lang="stylus" scoped>
.button-readmore
  cursor pointer
  border none
  background-color transparent
  padding 0
  font-size 13px
  font-weight 600
  color #429057
  display flex
  align-items center
  letter-spacing 1px
  &__icon
    display inline-block
    margin 0 0 0 4px
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #429057 transparent transparent transparent;
    transition transform .25s ease-out
    &--reverse
      transform rotate(180deg)
</style>
