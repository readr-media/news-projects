<template>
  <div class="switcher" @click="toggle">
    <div :class="[ 'switcher__toggle', { 'switcher__toggle--right': !isLeft } ]"></div>
    <div class="switcher__option switcher__option--left" v-text="options[0]"></div>
    <div class="switcher__option switcher__option--right" v-text="options[1]"></div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: ['', ''],
      validator (value) {
        return value.length === 2
      }
    }
  },
  watch: {
    isLeft () {
      this.isLeft ? this.$emit('switcherToggle', 'left') : this.$emit('switcherToggle', 'right')
    }
  },
  data () {
    return {
      isLeft: true
    }
  },
  methods: {
    toggle () {
      this.isLeft = !this.isLeft
    }
  }
}
</script>

<style lang="stylus" scoped>
.switcher
  width 290px
  height 35px
  border-radius 22.5px
  background-color #4a90e2
  cursor pointer
  -webkit-tap-highlight-color transparent
  position relative
  display flex
  justify-content space-around
  align-items center
  user-select none
  &__toggle
    z-index 1
    position absolute
    top 2px
    left 2px
    width 145px
    height 31px
    border-radius 22.5px
    box-shadow 1px 1px 4px 0 rgba(0, 0, 0, 0.5)
    background-color #ffffff
    transform translate(0, 0)
    transition transform .2s ease-in-out
    &--right
      transform translate(141px, 0)
  &__option
    z-index 2
    font-size 16px

@media (min-width 1024px)
  .switcher
    &__option
      font-size 20px
</style>