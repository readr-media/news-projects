<template>
  <div>
    <Header />
    <div :is="currentComponent" class="hong-kong"></div>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import LennonWall from './components/LennonWall.vue'

export default {
  name: 'HongKongProtests2019',
  components: {
    Header,
    LennonWall
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
      // 替換成大事紀要用的 url 
      if (this.$route.params.params === '大事記') {
        return ''
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

