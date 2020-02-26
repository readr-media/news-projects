<template>
  <router-link
    class="tag"
    :to="to"
    v-text="text"
    @click.native="handleClick"
  />
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {
      window.ga(
        'send', 
        'event', 
        'projects',
        'click',
        `tag ${this.text}`,
        { nonInteraction: false }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.tag
  border-radius 22px
  background-color #caebd3
  font-size 15px
  color rgba(0, 0, 0, 0.87)
  text-decoration none
  padding 5px 13px
  transition background-color .1s ease-out, color .1s ease-out
  max-width 100%
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing 1px
  &:hover, &.router-link-active
    background-color #429057
    color white
</style>
