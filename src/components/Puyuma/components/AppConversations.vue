<template>
  <section class="conversations">
    <div class="conversations__list-container list-container">
      <!-- steps here -->
      <!-- <ConversationsList class="list-container__list"/> -->
      <!-- <ConversationsList class="list-container__list"/> -->
      <ConversationsList
        v-for="(time, i) in timeline"
        :key="i"
        class="list-container__list"
        :time="time"
      />
    </div>
    <!-- <AppConversationsLegends class="conversations__legends"/> -->
  </section>
</template>

<script>
// import AppConversationsLegends from './AppConversationsLegends.vue'
import ConversationsList from './ConversationsList.vue'

export default {
  props: {
    timeline: {
      type: Array,
      required: true
    }
  },
  components: {
    ConversationsList,
    // AppConversationsLegends
  },
}
</script>

<style lang="stylus" scoped>
.conversations
  background-color #e6e6e6
  padding 0 10px
  padding-top calc(70px + 10px)
  position relative
  &__list-container
    height 100%
    overflow-y scroll
    padding 0 0 38px 0 !important
  &__legends
    width calc(100% - 20px)
    position absolute
    bottom 0

.list-container
  &__list
    & + &
      margin 13px 0 0 0 !important
</style>

