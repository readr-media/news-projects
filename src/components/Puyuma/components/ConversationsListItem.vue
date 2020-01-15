<template>
  <li :class="[ 'list-item', { 'list-item--right': character !== 'driver' } ]">
    <ConversationsListItemThumbnail :character="character"/>
    <ConversationsListItemMessage
      :class="[ 'list-item__message', { 'list-item__message--right': character !== 'driver' } ]"
      :character="character"
      :message="message"
    />
  </li>
</template>

<script>
import ConversationsListItemThumbnail from './ConversationsListItemThumbnail.vue'
import ConversationsListItemMessage from './ConversationsListItemMessage.vue'

export default {
  props: {
    character: {
      type: String,
      required: true,
      validator (value) {
        return [ 'driver', 'checker', 'scheduler', 'yilan' ].indexOf(value) !== -1 
      }
    },
    message: {
      type: String,
      required: true,
    }
  },
  components: {
    ConversationsListItemThumbnail,
    ConversationsListItemMessage
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  display flex
  &--right
    flex-direction row-reverse
  &__message
    margin 0 0 0 20px
    &--right
      margin 0 20px 0 0
</style>

