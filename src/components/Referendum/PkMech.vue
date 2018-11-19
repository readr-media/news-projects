<template>
  <div class="pk-mech">
    <div class="info">
      <PkMechInfo
        :activeCity="activeCity"
        :activeAll.sync="activeAll"></PkMechInfo>
    </div>
    <div class="map">
      <PkMechMap :activeCity.sync="activeCity" :activeAll="activeAll" :pkData="pkData"></PkMechMap>
    </div>
  </div>
</template>
<script>
  import PkMechInfo from './PkMechInfo.vue'
  import PkMechMap from './PkMechMap.vue'
  import verge from 'verge'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  import { filter, get, map, max as lmax, } from 'lodash'

  const debug = require('debug')('CLIENT:PkMech')

  export default {
    name: 'PkMech',
    components: {
      PkMechInfo,
      PkMechMap,
    },
    computed: {
      raw () {
        return get(this.$store, `state.Referendum.applicationDetail`)
      },
      base () {
        return get(this.$store, `state.Referendum.targets.base`)
      },
      comparison () {
        return get(this.$store, `state.Referendum.targets.comparison`)
      },
      item () {
        return get(this.$store, `state.Referendum.targets.item`)
      },
      pkData () {
        const baseData = get(this.raw, this.base)
        const comparisonData = get(this.raw, this.comparison)
        const data = {}

        map(baseData, c => { data[ c.city ] = { base: this.constructRawItem(c) } })
        map(comparisonData, c => { data[ c.city ].comparison = this.constructRawItem(c) })

        const max = lmax([
          get(data, `${this.$t('REFERENDUM.TAIWAN')}.base`, 1),
          get(data, `${this.$t('REFERENDUM.TAIWAN')}.comparison`, 1),
        ]) || 1
        debug('max', max)
        map(data, (c, name) => {
          data[ name ].base = (data[ name ].base * this.scaler) / max
          data[ name ].comparison = (data[ name ].comparison * this.scaler) / max
        })

        debug('new data', data)
        return data
      },
      isDesktop () {
        return get(this.$store, 'state.useragent.isDesktop')
      },   
      scaler () {
        switch (this.item) {
          case 'rate_death': {}
          case 'rate_fake': {}
          case 'rate_failure': {}
          case 'rate_participation': {
            return 25
          }
          default: {
            return 300
          }
        }        
      },   
    },
    data () {
      return {
        activeCity: '臺灣',
        activeAll: false,
        isActive: false,
      }
    },
    methods: {
      constructRawItem (rawObj) {
        switch (this.item) {
          case 'rate_participation': {
            const participant = Number(get(rawObj, 'participant') || '0')
            const ageQualified = Number(get(rawObj, 'age_qulified') || '1') || 1
            return participant / ageQualified
          }
          case 'rate_death': {
            const participant = Number(get(rawObj, 'participant') || '1') || 1
            const issueDeath = Number(get(rawObj, 'issue_death') || '0')
            return issueDeath / participant
          }
          case 'rate_failure': {
            const participant = Number(get(rawObj, 'participant') || '1') || 1
            const subTotal = Number(get(rawObj, 'sub_total') || '0')
            return subTotal / participant
          }
          case 'rate_fake': {
            const participant = Number(get(rawObj, 'participant') || '1') || 1
            const issueFake = Number(get(rawObj, 'issue_fake') || '0')
            return issueFake / participant
          }          
          default: {
            return Number(get(rawObj, this.item) || '0')
          }
        }        
      },
      setUpHandler () {
        this.isDesktop && window.addEventListener('scroll', () => {
          if (this.isActive) { return }
          const current_top_y = currentYPosition()
          const content_top_Y = elmYPosition('.pk-mech')
          const device_height = verge.viewportH()
          if (content_top_Y < current_top_y + device_height / 3) {
            this.isActive = true
            this.activeAll = true
          }
        })        
      }
    },
    mounted () {
      this.setUpHandler()
    },
    watch: {
      activeCity () {
        window.ga('send', 'event', 'projects', 'click', `county ${this.activeCity}`, { nonInteraction: false })
      },
    }
  }
</script>
<style lang="stylus" scoped>
  .pk-mech
    display flex
    justify-content center
    align-items flex-start
    .ingo, .map
      flex 1
</style>