<template>
  <section class="page">
    <PageStory
      class="page__story page__past-story"
      :title="'1980 年'"
      :description="`
        <span>中國向華資招手，</span><br>
        <span>台商變成中國經濟起飛的重要因素</span>
      `"
      :img="'poster1'"
    />
    <PageStory
      class="page__story page__current-story"
      :direction="'reverse'"
      :title="'2020 年'"
      :description="`
        <span>中國成為世界第二大經濟體，</span><br>
        <span>台商不再那麼重要，</span><br>
        <span>因政治因素向各行各業的台灣人</span><br>
        <span>（尤其青年）招手，</span><br>
        <span>而中國的強大也成為對台人的一股吸引力</span>
      `"
      :img="'poster2'"
    />
  </section>
</template>

<script>
import PageStory from './PageStory.vue'

export default {
  components: {
    PageStory
  }
}
</script>

<style lang="stylus" scoped>

</style>
