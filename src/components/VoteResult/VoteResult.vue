<template>
  <section>
    <Map/>
  </section>
</template>

<script>
import Map from './components/Map.vue'
import module from 'src/store/modules/VoteResult'

export default {
  metaInfo () {
    return {
      title: '你全家都議員——議員家族勢力全解析',
      description: '選舉要到了，你熟悉選舉公報上的人嗎？READr 蒐集了從 1940 年代以來超過 9 千位地方議員資料，並追查他們的親屬關係，看看誰家的政治香火傳承最久。',
      metaUrl: 'vote2018',
      metaImage: 'vote2018/ogimage.jpg'
    }
  },
  components: {
    Map,
  },
  created () {
    this.$store.registerModule('VoteResult', module)
  },
  destroyed () {
    this.$store.unregisterModule('VoteResult')
  },
}
</script>

