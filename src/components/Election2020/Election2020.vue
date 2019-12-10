<template>
  <section
    id="election-2020"
  >
    <FirebaseRead />
  </section>
</template>

<script>
import storeModule from 'src/store/modules/Election2020'
import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapMutations } = createNamespacedHelpers('Election2020')

import FirebaseRead from './templates/FirebaseRead.vue'

export default {
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'election2020',
      metaImage: 'election2020/ogimage.png'
    }
  },
  components: {
    FirebaseRead
  },
  created() {
    this.$store.registerModule('Election2020', storeModule)
  },
  destroyed() {
    this.$store.unregisterModule('Election2020')
  }
}
</script>

<style lang="stylus">
</style>
