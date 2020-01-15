<template>
  <ol class="list">
    <ConversationsListItem
      v-for="(conversation, i) in time.conversations"
      :key="i"
      class="list__list-item"
      :character="conversation.character"
      :message="conversation.message"
    />
  </ol>
</template>

<script>
import ConversationsListItem from './ConversationsListItem.vue'

export default {
  props: {
    time: {
      type: Object,
      required: true
    }
  },
  components: {
    ConversationsListItem
  }
}
</script>

<style lang="stylus" scoped>
.list
  &__list-item
    & + &
      margin 13px 0 0 0
</style>

