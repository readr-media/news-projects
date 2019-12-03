<template>
  <span class="hint">
    <span
      class="hint__toggler toggler"
      @click="toggle"
    >
      <span
        v-show="!showHintContent"
        v-text="'註'"
      />
      <span
        v-show="showHintContent"
        class="toggler__close-icon"
      />
    </span>
    <span
      v-show="showHintContent"
      class="hint__content"
      v-html="content"
    />
  </span>
</template>

<script>
export default {
  props: {
    content: {
      type: String
    }
  },
  data() {
    return {
      showHintContent: false
    }
  },
  methods: {
    toggle() {
      this.showHintContent = !this.showHintContent
      this.$emit('toggle')
      if (this.showHintContent) {
        window.ga('send', 'event', 'projects', 'click', 'hint', { nonInteraction: false })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.hint
  &__toggler
    display inline-block
    width 24px
    height 24px
    border-radius 100%
    background-color #4a4a4a
    color white
    text-align center
    line-height 24px
    cursor pointer
    box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
    margin 0 2px
  &__content
    display block
    background-color #4a4a4a
    color white
    padding 11px 25px
    margin 10px 0
    text-align justify
    box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)

.toggler
  &__close-icon
    clip-path polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)
    background-color white
    display inline-block
    width 50%
    height 50%
</style>
