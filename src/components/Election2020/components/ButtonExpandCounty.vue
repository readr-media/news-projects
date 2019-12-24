<template>
  <button
    class="button"
    @click="handleClick"
  >
    <p
      class="button__text"
      v-text="text"
    />
    <div
      :class="[
        'button__triangle',
        { 'button__triangle--reverse': isToggled }
      ]"
    />
  </button>
</template>

<script>
export default {
  data() {
    return {
      isToggled: false
    }
  },
  computed: {
    text() {
      const textToggled = '收合'
      const textUnToggled = '展開看全台 22 縣市'
      return this.isToggled ? textToggled : textUnToggled
    }
  },
  methods: {
    handleClick() {
      this.isToggled = !this.isToggled
      this.$emit('toggle', this.isToggled)
    }
  }
}
</script>

<style lang="stylus" scoped>
.button
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 0
  &__text
    font-size 15px
    color $color-black-light
    text-align center
    margin 0 0 10px 0
  &__triangle
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #000000 transparent transparent transparent;
    &--reverse
      transform rotate(180deg)
</style>
