<template>
  <div class="info">
    <div class="info__picker picker">
      <select v-model="selectedRef">
        <option v-for="n in 10" v-text="$t(`REFERENDUM.ITEMS.${n - 1}`)" :value="`no${n + 6}`"></option>
      </select>          
    </div>
    <div class="info__detail">
      <div class="info__detail__value" :style="{ color, }">
        <span v-text="$t(`REFERENDUM.PK.INFO.${selectedItem.toUpperCase()}`)"></span>
        <div style="display: inline-block; line-height: normal">
          <span v-text="numFormaterize(val)" class="value"></span>
          <span v-text="unit(selectedItem)" class="unit"></span>
        </div>
      </div>
      <div class="info__detail__support" v-for="s in support">
        <span v-text="$t(`REFERENDUM.PK.INFO.${s.name.toUpperCase()}`)"></span>
        <span v-text="numFormaterize(s.value, '0,0')" class="value"></span>
        <span v-text="unit(s.name)" class="unit"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import { find, get, } from 'lodash'
  const debug = require('debug')('CLIENT:PkMechInfoDetail')
  const numeral = require('numeral')
  const setUpSelecteditem = (store, key, value) => store.dispatch('Referendum/SET_TARGETS', { key, value })
  export default {
    name: 'PkMechInfoDetail',
    computed: {
      raw () {
        return get(this.$store, `state.Referendum.applicationDetail`)
      },
      ref () {
        return get(this.raw, this.selectedRef)
      },
      support () {
        const targetCity = find(this.ref, c => c.city === this.activeCity)
        switch (this.selectedItem) {
          case 'rate_death': {
            return [
              { name: 'age_qualified', value: get(targetCity, 'issue_death')},
              { name: 'participant', value: get(targetCity, 'participant')},
            ]            
          }
          case 'rate_failure': {
            return [
              { name: 'sub_total', value: get(targetCity, 'sub_total')},
              { name: 'participant', value: get(targetCity, 'participant')},
            ]               
          }
          case 'rate_fake': {
            return [
              { name: 'issue_fake', value: get(targetCity, 'issue_fake')},
              { name: 'participant', value: get(targetCity, 'participant')},
            ]               
          }          
          case 'rate_participation': {
            return [
              { name: 'participant', value: get(targetCity, 'participant')},
              { name: 'age_qualified', value: get(targetCity, 'age_qualified')},
            ]              
          }
          default: {
            return []
          }
        }
      },
      val () {
        const targetCity = find(this.ref, c => c.city === this.activeCity)
        switch (this.selectedItem) {
          case 'rate_participation': {
            const participant = numeral(get(targetCity, 'participant') || '1').value()
            const ageQualified = numeral(get(targetCity, 'age_qualified') || '1').value()
            return Math.round((participant * 10000) / ageQualified) / 100
          }
          case 'rate_death': {
            const participant = numeral(get(targetCity, 'participant') || '1').value() || 1
            const issueDeath = numeral(get(targetCity, 'issue_death') || '0').value()
            return Math.round((issueDeath * 10000) / participant) / 100            
          }
          case 'rate_failure': {
            debug(`get(targetCity, 'participant')`, get(targetCity, 'participant'))
            debug(`get(targetCity, 'sub_total')`, get(targetCity, 'sub_total'))
            debug(`numeral(get(targetCity, 'participant') || '1')`, numeral(get(targetCity, 'participant') || '1'))
            debug(`numeral(get(targetCity, 'sub_total') || '0')`, numeral(get(targetCity, 'sub_total') || '0'))
            const participant = numeral(get(targetCity, 'participant') || '1').value() || 1
            const subTotal = numeral(get(targetCity, 'sub_total') || '0').value()
            return Math.round((subTotal * 10000) / participant) / 100
          }    
          case 'rate_fake': {
            const participant = numeral(get(targetCity, 'participant') || '1').value() || 1
            const issueFake = numeral(get(targetCity, 'issue_fake') || '0').value()
            return Math.round((issueFake * 10000) / participant) / 100   
          }      
          default: {
            return get(targetCity, this.selectedItem)
          }
        }         
      },
    },
    data () {
      return {
        selectedRef: 'no7'
      }
    },
    methods: {
      numFormaterize (num, format) {
        switch (this.selectedItem) {
          case 'rate_death': {}
          case 'rate_failure': {}
          case 'rate_fake': {}
          case 'rate_participation': {
            return numeral(num).format(format || '0,0.00')
          }
          default: {
            return numeral(num).format(format || '0,0')
          }
        }        
      },
      unit (type) {
        switch (type) {
          case 'rate_death': {}
          case 'rate_failure': {}
          case 'rate_fake': {}          
          case 'rate_participation': {
            return this.$t('REFERENDUM.UNIT.PERCENTAGE')
          }
          default: {
            return this.$t('REFERENDUM.UNIT.PERSON')
          }
        }
      },      
    },
    mounted () {
      // this.$forceUpdate()
      // debug('mounted', [ this.type, this.activeCity, this.selectedItem, this.selectedRef, this.raw, this.ref, this.val ])
    },
    props: {
      type: {
        type: String,
        default: 'base',
      },
      color: {
        type: String,
        defaul: '#996c33',
      },
      selectedItem: {
        type: String,
        default: 'participant',
      },
      activeCity: {
        type: String,
        default: '',
      },
    },
    watch: {
      selectedRef () {
        window.ga('send', 'event', 'projects', 'click', `referendum ${this.selectedRef}`, { nonInteraction: false })
        setUpSelecteditem(this.$store, this.type, this.selectedRef)
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .info
    &__detail 
      margin-top 55px
      text-align center
      &__value
        font-size 1rem
        line-height 2.77
        color #996c33
        .value, .unit
          font-size 1.5rem
          font-weight 600
        .value
          margin 0 10px
      &__support
        font-size 1rem
        font-weight normal
        line-height 1.88
        letter-spacing normal
        text-align center
        color #313131 
        .value
          margin 0 10px   
</style>