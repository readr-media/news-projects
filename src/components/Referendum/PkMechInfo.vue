<template>
  <div class="pk-mech-info">
    <div class="pk-mech-info__city">
      <div class="name"><span v-text="activeCity"></span></div>
      <div class="hint"><span v-text="$t('REFERENDUM.PK.SWITCHER.HINT')"></span></div>
      <div class="switcher" @click="switchToAll">
        <span v-text="activeAll ? $t('REFERENDUM.PK.SWITCHER.TITLE_HIDE') : $t('REFERENDUM.PK.SWITCHER.TITLE')"></span>
      </div>
    </div>
    <div class="pk-mech-info__target-item">
      <select v-model="selectedItem">
        <option v-for="(item, key) in TARGET_ITEM" v-text="$t(`REFERENDUM.PK.INFO.${key}`)" :value="item"></option>
      </select>
    </div>
    <div class="pk-mech-info__wrapper">
      <div class="left">
        <PkMechInfoDetail class="pk-mech-info__base" type="base"
          :selectedItem="selectedItem"
          :activeCity="activeCity"></PkMechInfoDetail>
      </div>
      <div class="middle"><div class="vs"><span>VS</span></div></div>
      <div class="right">
        <PkMechInfoDetail class="pk-mech-info__comparison" type="comparison"
          :selectedItem="selectedItem"
          :activeCity="activeCity" color="#006e78"></PkMechInfoDetail>
      </div>
    </div>
  </div>
</template>
<script>
  import PkMechInfoDetail from './PkMechInfoDetail.vue'
  const debug = require('debug')('CLIENT:PkMechInfo')
  const TARGET_ITEM = {
    PARTICIPANT: 'participant',
    QUALIFIED: 'qualified',
    ISSUE_AGE: 'issue_age',
    ISSUE_RESIDENT: 'issue_resident',
    ISSUE_ADOPT: 'issue_adopt',
    ISSUE_DEATH: 'issue_death',
    ISSUE_DUPLICATION: 'issue_duplication',
    ISSUE_INCORRECT_NAME: 'issue_incorrect_name',
    ISSUE_INCORRECT_ID: 'issue_incorrect_id',
    ISSUE_INCORRECT_ADDRESS: 'issue_incorrect_address',
    ISSUE_MISSING_SIGNATURE: 'issue_missing_signature',
    ISSUE_FAKE: 'issue_fake',
    SUB_TOTAL: 'sub_total',
    AGE_QUALIFIED: 'age_qualified',
    RATE_PARTICIPATION: 'rate_participation',
    RATE_DEATH: 'rate_death',
    RATE_FAILURE: 'rate_failure',
    RATE_FAKE: 'rate_fake'
  }
  const setUpSelecteditem = (store, value) => store.dispatch('Referendum/SET_TARGETS', { key: 'item', value })
  export default {
    name: 'PkMechInfo',
    components: {
      PkMechInfoDetail,
    },
    data () {
      return {
        TARGET_ITEM,
        baseRefNo: '',
        comparisonRefNo: '',
        selectedItem: 'participant',
      }
    },
    methods: {
      switchToAll () {
        this.$emit('update:activeAll', !this.activeAll)
      },
    },
    mounted () {},
    props: {
      activeCity: {
        type: String,
        default: '',
      },
      activeAll: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      selectedItem () {
        window.ga('send', 'event', 'projects', 'click', `index ${this.selectedItem}`, { nonInteraction: false })
        setUpSelecteditem(this.$store, this.selectedItem)
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .pk-mech-info
    max-width 600px
    > div
      margin 30px 0
    &__city
      display flex
      // justify-content center
      align-items center
      .name
        font-size 1.5rem
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.85
        letter-spacing normal
        text-align left
        color #a40035
      .hint
        margin-left 25px
        flex 1
        font-size 1rem
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 2.77
        letter-spacing normal
        text-align left
        color #a0a0a0
      .switcher
        font-size 1rem
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 2.77
        letter-spacing normal
        text-align left
        color #1a1a1a
        cursor pointer
    &__wrapper
      display flex
      .left, .right
        flex 1
        >>> .picker
          height 45px
      .middle
        width 21px
        margin 0 20px
        font-size 1rem
        font-weight 600
        color #b4001e
        position relative
        .vs
          height 45px
          display flex
          justify-content center
          align-items center
        &:after
          content ''
          height calc(100% - 90px)
          display block
          border-right 2px solid #f2f2f2
          bottom 0
          left 10
          position absolute
    &__target-item
      height 45px
    >>> select
      background-position calc(100% - 10px) center
      background-repeat no-repeat
      background-size 9px 16px
      background-image url(/proj-assets/referendum/icons/icon-select.png)
      background-color #f2f2f2
      border none
      border-radius 0
      width 100%
      height 100%
      outline none
      appearance none
      padding 5px 25px 5px 15px

</style>