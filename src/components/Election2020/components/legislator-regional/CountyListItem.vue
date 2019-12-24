<template>
  <li class="list-item">
    <h1
      class="list-item__title"
      v-text="countyName"
    />
    <div class="list-item__regions regions">
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
        :number="12"
      />
      <Square
        class="regions__region"
        :color="'purple'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
        :number="7"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
      <Square
        class="regions__region"
        :color="'blue'"
        :shouldAnimate="true"
      />
    </div>
  </li>
</template>

<script>
import Square from '../Square.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('Election2020')

export default {
  props: {
    countyName: {
      type: String,
      required: true
    }
  },
  components: {
    Square
  },
  computed: {
    ...mapGetters({
      isElectionBoxOpeningStart: 'timer/isElectionBoxOpeningStart'
    })
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  display flex
  align-items center
  &__title
    font-size 15px
    color $color-black-light
    font-weight normal
    max-width 45px
    min-width 45px
    overflow hidden
    white-space nowrap
    margin 0 10px
    text-align left

.regions
  display flex
  border-left solid 1px rgba(0, 0, 0, 0.4)
  padding 12px 10px
  flex-wrap wrap
  padding 8px 5px
  &__region
    margin 4px 5px

@media (min-width 768px)
  .list-item
    &__title
      font-size 16px
      margin 0 50px 0 0
      max-width 90px
      min-width 90px
  
  .regions
    border-left none
</style>
