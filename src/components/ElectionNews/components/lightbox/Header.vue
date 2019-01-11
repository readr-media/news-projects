<template>
  <header class="header">
    <h1
      class="header__keyword"
      v-text="keyword"
    >
    </h1>
    <DateSwitcher
      class="header__date-switcher"
      v-on="$listeners"
    />
    <Switcher
      class="header__category-switcher"
      :options="[ '情緒分數', '媒體來源' ]"
      v-on="$listeners"
    />
  </header>
</template>

<script>
import Switcher from '../Switcher.vue'
import DateSwitcher from '../DateSwitcher.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    Switcher,
    DateSwitcher
  },
  computed: {
    keyword () {
      return this.$route.params.params
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  flex-direction column
  align-items center
  background-color #f0f0f0
  border-bottom 1px solid #999999
  padding 20px 0
  &__keyword
    margin 0 0 10px 0
    font-size 30px
    font-weight 400
  &__date-switcher
    margin 0 0 20px 0
</style>