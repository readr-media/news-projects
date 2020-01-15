<template>
  <div class="bingo-selector lagislator" v-on:click="CLICK_HANLDER">
    <span class="name" v-text="name"/>
    <span class="party" v-text="party"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    candidate: Object,
    candidateid: String,
    districtid: String,
    freezed: Object,
  },
  computed: {
    name: function(){return this.candidate.name},
    party: function(){return this.candidate.party},
  },
  methods: {
    CLICK_HANLDER: function () {
      if (!this.freezed) {
        this.UPDATE_BINGO_CELL(`${this.districtid}-${this.candidateid}`);
        this.TOGGLE_SELECTOR({districtid: this.districtid, status: false});
        this.TOGGLE_SELECTOR_PANEL();
      }
    },
    ...mapMutations({
      UPDATE_BINGO_CELL: 'Election2020/bingo/UPDATE_BINGO_CELL',
      TOGGLE_SELECTOR_PANEL: 'Election2020/bingo/TOGGLE_SELECTOR_PANEL',
      TOGGLE_SELECTOR: 'Election2020/bingo/TOGGLE_SELECTOR'
    }),
  }
}
</script>
<style lang="stylus" scoped>
  .lagislator
    display none

  .bingo-selector:hover
    background-color #ffffff
    border solid 1px rgba(216, 216, 216, 0.5)

  .expanded
    display flex

  .freezed
    color rgba(0, 0, 0, 0.31)
</style>
