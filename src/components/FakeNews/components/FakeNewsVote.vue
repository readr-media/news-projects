<template>
  <div class="vote">
    <h3>對抗假訊息，你支持什麼樣的行為？</h3>
    <p>聽起來是個嚴肅的議題，但其實大家都會用臉書、用 LINE、看 youtube，言論管制應該會讓很多人有感。但如何讓大家感受到？</p>
    <div>
      <template v-for="(item, index) in CHOICES">
        <FakeNewsVoteChoice :key="`choice-${index}`" :id="`choice-${index + 1}`" :text="item" :totalVote="totalVote" :voted="voted" @vote="vote" />
      </template>
    </div>
  </div>
</template>
<script>
import FakeNewsVoteChoice from './FakeNewsVoteChoice.vue'
import { get } from 'lodash'

const CHOICES = [
  '散播假訊息者，最高罰 50 萬',
  '散播假訊息者，關三天',
  '臉書（或其他網路平台業者）要將的假訊息在 24 小時內下架',
  '臉書（或其他網路平台業者）應該跟第三方單位合作，在假訊息上面標註澄清訊息',
  '我不在乎比較慢看到消息，請媒體先查證',
  '政府應該扶植第三方查核單位'
]

const fetchVotesAmount = (store) => {
  const ids = CHOICES.map((choice, index) => `choice-${index + 1}`)
  return store.dispatch('FakeNews/FETCH_VOTES_AMOUNT', ids)
}

const updateVoteAmount = (store, { id }) => store.dispatch('FakeNews/UPDATE_VOTE_AMOUNT', { id })


export default {
  name: 'FakeNewsVote',
  components: {
    FakeNewsVoteChoice
  },
  props: {
    voted: {
      type: String
    }
  },
  data () {
    return {
      CHOICES
    }
  },
  computed: {
    choiceIds () {
      return CHOICES.map((choice, index) => `choice-${index + 1}`) || []
    },
    totalVote () {
      return this.choiceIds.reduce((acc, cur) => {
        const amount = get(this.$store, [ 'state', 'FakeNews', 'votes', cur ], 0)
        return acc + amount
      }, 0)
    }
  },
  beforeMount () {
    fetchVotesAmount(this.$store)
  },
  methods: {
    vote (id) {
      updateVoteAmount(this.$store, { id })
      this.$emit('updateVoteCookie', id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.vote
  padding 1em
  background-color #fff
  border 1px solid #dddfe2
  border-left none
  border-right none
  h3 + p, p + div
    margin-top .5em
  
@media (min-width: 1024px)
  .vote
    border-left 1px solid #dddfe2
    border-right 1px solid #dddfe2
    border-radius 4px

</style>
