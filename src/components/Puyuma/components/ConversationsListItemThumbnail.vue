<template>
  <div :class="[ 'thumbnail', `thumbnail--${character}` ]" v-html="characterName"></div>
</template>

<script>
export default {
  props: {
    character: {
      type: String,
      required: true,
      validator (value) {
        return [ 'driver', 'checker', 'scheduler', 'yilan' ].indexOf(value) !== -1 
      }
    }
  },
  computed: {
    characterName () {
      switch (this.character) {
        case 'driver':
          return '司'
        case 'checker':
          return '檢'
        case 'scheduler':
          return '調'
        case 'yilan':
          return '宜蘭<br>站長'
      }
    }
  }  
}
</script>

<style lang="stylus" scoped>
.thumbnail
  d = 40px
  width d
  height d
  border-radius 100%
  display flex
  justify-content center
  align-items center
  font-size 20px
  color white
  &--driver
    background-color #466ba0
  &--checker
    background-color #a55d5d
  &--scheduler
    background-color #89b287
  &--yilan
    background-color black
    font-size 13px
</style>

