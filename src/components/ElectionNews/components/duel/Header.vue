<template>
  <header class="header">
    <Dropdown
      :position="'left'"
      :keyword="keywords[0]"
    />
    <Dropdown
      :position="'right'"
      :keyword="keywords[1]"
    />
  </header>
</template>

<script>
import Dropdown from './Dropdown.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    Dropdown
  },
  computed: {
    keywords () {
      const { params = '', subparams = '' } = this.$route.params
      return [ params, subparams ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  justify-content space-between
  align-items center
</style>