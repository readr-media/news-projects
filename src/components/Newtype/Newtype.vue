<template>
  <div id="newtype">
    <AppHeader :shareUrl="url"></AppHeader>
    <Landing></Landing>
    <Story v-if="($route.params.params === 'story1' && $route.query.single === 'true') || !$route.query.single" :index="1" :storyData="storyData.story1" @urlChange="urlChange"></Story>
    <Story v-if="($route.params.params === 'story2' && $route.query.single === 'true') || !$route.query.single" :index="2" :storyData="storyData.story2" @urlChange="urlChange"></Story>
    <Story v-if="($route.params.params === 'story3' && $route.query.single === 'true') || !$route.query.single" :index="3" :storyData="storyData.story3" @urlChange="urlChange"></Story>
    <Story v-if="($route.params.params === 'story4' && $route.query.single === 'true') || !$route.query.single" :index="4" :storyData="storyData.story4" @urlChange="urlChange"></Story>
    <Story v-if="($route.params.params === 'story5' && $route.query.single === 'true') || !$route.query.single" :index="5" :storyData="storyData.story5" @urlChange="urlChange"></Story>
  </div>
</template>

<script>
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

import AppHeader from './components/AppHeader.vue'
import Landing from './components/Landing.vue'
import Story from './components/Story.vue'
import storyData from './story.json'

import scrollEvent from './mixins/scrollmagic/scrollEvent.js'

export default {
  mixins: [ scrollEvent ],
  components: {
    AppHeader,
    Landing,
    Story
  },
  metaInfo () {
    if (this.$store.state.route.query.single === 'true' && this.$route.params.params) {
      return {
        title: this.storyData[this.$route.params.params].meta.title,
        description: this.storyData[this.$route.params.params].meta.description,
        metaUrl: this.storyData[this.$route.params.params].meta.metaUrl,
        metaImage: this.storyData[this.$route.params.params].meta.metaImage
      }
    } else {
      return {
        title: this.storyData.meta.title,
        description: this.storyData.meta.description,
        metaUrl: this.storyData.meta.metaUrl,
        metaImage: this.storyData.meta.metaImage
      }
    }
  },
  data () {
    return {
      storyData,
      url: this.$route.path
    }
  },
  methods: {
    urlChange (url) {
      this.url = url
    }
  },
  mounted () {
    window.ga('send', 'pageview')
    if (this.$route.params.params) {
      this.$scrollTo(`#${this.$route.params.params}`)
    }
  }
}
</script>

<style lang="stylus">
@import './styles/font.styl'
</style>

