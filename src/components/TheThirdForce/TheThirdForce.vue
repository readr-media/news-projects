<template>
  <div class="the-third-force">
    <HomeCover />
  </div>
</template>

<script>
import HomeCover from './components/HomeCover.vue'

export default {
  metaInfo: {
    title: '',
    description: '',
    metaUrl: 'the-third-force',
    metaImage: 'the-third-force/img/og.jpg',
    customScript: ''
  },
  components: {
    HomeCover
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus">
@import './util/reset.css'

img
  width 100%

</style>
