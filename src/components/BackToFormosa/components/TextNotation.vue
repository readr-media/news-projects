<template>
  <span class="text-notation">
    <!-- <img :src="`/proj-assets/food-delivery/img/icon/notation-${isText ? 'close' : 'default'}.svg`" alt="" loading="lazy"> -->
    <!-- <div class="text-notation__icon" @click="toggleText"></div> -->
    <div class="text-notation__text" v-if="isText">
      <p v-html="text" />
    </div>
  </span>
</template>

<script>
export default {
  name: 'TextNotation',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isText: false
    }
  },
  methods: {
    toggleText () {
      this.isText = !this.isText
    } 
  }
}
</script>

<style lang="stylus">
.text-notation
  padding-right 4px
  padding-left 4px
  // &__icon
  //   width 18px
  //   height 18px
  //   box-shadow 0 2px 4px rgba(#000, 0.5)
  //   background-color #fff
  //   border-radius 50%
  //   position relative
  //   top 2px
  //   cursor pointer
  //   display inline-block
  //   &::after
  //     content ''
  //     display block
  //     width 0
  //     height 0
  //     border-style solid
  //     border-width 8px 5px 0 5px
  //     border-color #a56c6a transparent transparent transparent
  &__text
    display inline-block
    width 100%
    padding 10px 20px
    box-shadow 0 2px 4px rgba(#000, 0.5)
    background-color #fff
    font-size 1.4rem
    line-height normal
</style>
