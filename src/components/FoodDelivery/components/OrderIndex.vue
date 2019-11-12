<template>
  <div class="order-index">
    <MapMarker :num="id" v-for="id in reportIds" :key="`index-${id}`" class="order-index__marker" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('FoodDelivery')

import MapMarker from './MapMarker.vue'

export default {
  name: 'OrderIndex',
  components: {
    MapMarker
  },
  computed: {
    ...mapState([
      'reportIds'
    ])
  }
}
</script>

<style lang="stylus">
.order-index
  position absolute
  top 50px
  width calc((100% - 600px) / 2)
  display flex
  flex-direction column
  align-items center
  // z-index 199
  &__marker
    width 25.42px
    height 35.8px
    cursor pointer
    // position relative
    & + .order-index__marker
      margin-top 20px
</style>