<template>
  <div class="city-council">
    <Foreword />
    <Map />
    <Article />
  </div>
</template>
<script>

import Article from './Article.vue'
import Foreword from './Foreword.vue'
import Map from './Map.vue'
import module from 'src/store/modules/VoteResultCityCouncil'

const fetchTWJSON = (store) => {
  return store.dispatch('VoteResultCityCouncil/FETCH_TAIWAN_JSON')
}

export default {
  name: 'VoteResultCityCouncil',
  components: {
    Article,
    Foreword,
    Map
  },
  metaInfo() {
    return {
      title: '議會議會',
      description: '議會議會議會議會議會議會議會議會議會議會',
      metaUrl: 'vote2018-result-city-council',
      metaImage: 'vote2018-result-city-council/og.jpg',
    };
  },
  beforeCreate () {
    this.$store.registerModule('VoteResultCityCouncil', module)
  },
  created () {
    fetchTWJSON(this.$store)
  },
  mounted () {
    // ga('send', 'pageview')
  },
  destroyed () {
    this.$store.unregisterModule('VoteResultCityCouncil')
  },
}
</script>
<style lang="stylus" scoped>

</style>
