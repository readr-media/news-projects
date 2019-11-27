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
    >
      義守大學回應：「義守大學是一所國際化的綜合型大學，校內有來自 45 個國家或地區的師生，目前與美、英、澳、亞約 400 所大學簽訂姐妹校……為邁向國際化的大學，義大長期持續鼓勵師生與全球姐妹校，進行雙向學術教育文化交流，並持續注意各項活動屬性，謹遵守政府相關規定。」
    </span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      showHintContent: false
    }
  },
  methods: {
    toggle() {
      this.showHintContent = !this.showHintContent
      this.$emit('toggle')
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
