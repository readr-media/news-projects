<template>
  <span class="notation-unfolded">
    <svg @click="toggleNotation" :class="{ open: shouldOpenNotaiton }" fill="none" height="8" viewBox="0 0 13 8" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m7.28214 7.28189c-.39135.3954-1.03015.3954-1.42149 0l-5.026349-5.07844c-.624963-.63144-.177681-1.703451.710739-1.703451l10.05266.000001c.8885 0 1.3358 1.07201.7108 1.70345z" fill="#5f6c11"/></svg>
    <span
      v-if="shouldOpenNotaiton"
      class="notation-unfolded__content"
    >
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  name: 'NotationUnfolded',
  data () {
    return {
      shouldOpenNotaiton: false
    }
  },
  methods: {
    toggleNotation () {
      this.shouldOpenNotaiton = !this.shouldOpenNotaiton
    }
  }
}
</script>

<style lang="stylus">
.notation-unfolded
  color rgba(#000, 0.66)
  font-size 13px
  line-height 1.5
  letter-spacing 2.5px
  svg
    cursor pointer
    user-select none
    display inline-block
    margin-bottom 2px
    padding-left 4px
    padding-right 6.5px
    box-sizing content-box
    &.open
      transform rotate(180deg)
  &__content
    display inline-block
    background-color rgba(234, 231, 224, 0.5)
    border-radius 4px
    *:last-child
      margin-bottom 0 !important
</style>
