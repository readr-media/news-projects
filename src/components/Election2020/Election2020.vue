<template>
  <section
    id="election-2020"
  >
    <FirebaseCreateUpdate />
    <FirebaseRead />
  </section>
</template>

<script>
import storeModule from 'src/store/modules/Election2020'
import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapMutations } = createNamespacedHelpers('Election2020')

import FirebaseRead from './templates/FirebaseRead.vue'
import FirebaseCreateUpdate from './templates/FirebaseCreateUpdate.vue'

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
    FirebaseCreateUpdate,
    FirebaseRead,
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
