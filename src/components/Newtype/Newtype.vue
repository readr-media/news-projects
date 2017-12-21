<template>
  <div id="newtype">
    <AppHeader :shareUrl="url"></AppHeader>
    <Landing></Landing>
    <Story :index="1" :storyData="storyData.story1" @urlChange="urlChange"></Story>
    <Story :index="2" :storyData="storyData.story2" @urlChange="urlChange"></Story>
    <Story :index="3" :storyData="storyData.story3" @urlChange="urlChange"></Story>
    <Story :index="5" :storyData="storyData.story5" @urlChange="urlChange"></Story>
    <FBComment/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

import AppHeader from './components/AppHeader.vue'
import Landing from './components/Landing.vue'
import Story from './components/Story.vue'
import FBComment from './components/FBComment.vue'
import storyData from './story.json'

export default {
  components: {
    AppHeader,
    Landing,
    Story,
    FBComment
  },
  metaInfo () {
    if (this.$route.params.params) {
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
    },
    handler () {
      console.log('lazy load success!')
    }
  },
  mounted () {
    if (this.$route.params.params) {
      this.$scrollTo(`#${this.$route.params.params}`)
    }
  }
}
</script>

<style lang="stylus">
@import './styles/font.styl'
</style>

