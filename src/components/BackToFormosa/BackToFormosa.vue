<template>
  <div class="back-to-formosa">
    <SlideContainer />
  </div>
</template>

<script>
import SlideContainer from './components/SlideContainer.vue'

export default {
  name: 'BackToFormosa',
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'backtoformosa',
      metaImage: ''
    }
  },
  components: {
    SlideContainer
  }
}
</script>

<style lang="stylus">
@import '../../util/reset.css'

$ff-sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

html
  font-size 10px
  font-family $ff-sans-serif
</style>
