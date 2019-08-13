<template>
  <div :is="currentComponent"></div>
</template>
<script>

import LennonWall from './components/LennonWall.vue'

export default {
  name: 'HongKongProtests2019',
  components: {
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
