<template>
  <div>
    <Header />
    <div :is="currentComponent" class="hong-kong"></div>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import LennonWall from './components/LennonWall.vue'
import Timeline from './components/Timeline.vue'

export default {
  name: 'HongKongProtests2019',
  components: {
    Header,
    LennonWall,
    Timeline
  },
  metaInfo() {
    return {
      title: '',
      description: '',
      metaUrl: '',
      metaImage: '',
    }
  },
  computed: {
    currentComponent () {
      if (this.$route.params.params === 'timeline') {
        return 'Timeline'
      }
      return 'LennonWall'
    }
  }
}
</script>
<style lang="stylus" scoped>
.hong-kong
  padding 60px 0 0 0
</style>

