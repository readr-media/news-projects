<template>
  <div class="select-position">
    <div class="row">
      <div class="select-container">
        <select
          v-model="countySelected"
          @blur="handleSelectBlur"
          @change="handleSelectChange"
          @focus="handleSelectFocus">
          <option v-for="county in counties" :key="county" :value="county" v-text="`${county}`"></option>
        </select>
      </div>
      <div class="select-container">
        <select
          v-model="districtSelected"
          @blur="handleSelectBlur"
          @change="handleSelectChange"
          @focus="handleSelectFocus">
          <option v-for="district in districts" :key="district" :value="district" v-text="`${district}`"></option>
        </select>
      </div>
    </div>
    <template v-if="showAdvanced">
      <input v-model="road" type="text" placeholder="請填寫地址" @keyup="showBtn = true">
      <button v-show="showBtn" @click="validateAddress">更新地圖位置</button>
    </template>
    <span v-show="errors.length > 0" class="error">請選擇/輸入正確的{{ errors.includes('district') ? ' 行政區' : '' }}{{ errors.includes('road') ? ' 街道路名' : '' }} </span>
  </div>
</template>

<script>
import axios from 'axios'
import { ADMINISTRATIVE_DISTRICT } from './constants'

const REGEX_ADDRESS = /(\D+[縣市])(\D+?(市區|鎮區|鎮市|[鄉鎮市區]))(.+)/
const REGEX_ADDRESS_FOR_DATA = /(\D+[縣市])(\D+?(市區|鎮區|鎮市|[鄉鎮市區]))/

export default {
  name: 'FormSelectPosition',
  props: {
    address: {
      type: String,
    },
    showAdvanced: {
      default: false
    }
  },
  data () {
    return {
      countySelected: this.getCounty(this.address),
      districtSelected: this.getDistrict(this.address),
      errors: [],
      road: this.getRoad(this.address),
      showBtn: false,
    }
  },
  computed: {
    addressSelected () {
      return `${this.countySelected}${this.districtSelected}${this.road}`
    },
    counties () {
      const list = ADMINISTRATIVE_DISTRICT || []
      return list.map(item => item.county)
    },
    districts () {
      const county = ADMINISTRATIVE_DISTRICT.filter(item => item.county === this.countySelected) || []
      return county[0].districts || []
    },
  },
  watch: {
    address (value) {
      this.showBtn = false
      this.countySelected = this.getCounty(value)
      this.districtSelected = this.getDistrict(value)
      this.road = this.getRoad(value)
    },
    addressSelected (value) {
      this.$emit('updateAddressForData', value)
    },
    countySelected (value) {
      this.districtSelected = this.districts[0]
    }
  },
  methods: {
    formatAddress (address) {
      let output = address
      const index = output.indexOf('台灣')
      if (index > -1) {
        output = output.slice(index + 2)
      }
      return output
    },
    getCounty (address) {
      if (this.showAdvanced && address.match(REGEX_ADDRESS) && address.match(REGEX_ADDRESS).length > 4) {
        return address.match(REGEX_ADDRESS)[1]
      } else if (address.match(REGEX_ADDRESS_FOR_DATA) && address.match(REGEX_ADDRESS_FOR_DATA).length > 3) {
        return address.match(REGEX_ADDRESS_FOR_DATA)[1]
      }
      return '台北市'
    },
    getDistrict (address) {
      if (this.showAdvanced && address.match(REGEX_ADDRESS) && address.match(REGEX_ADDRESS).length > 4) {
        return address.match(REGEX_ADDRESS)[2]
      } else if (address.match(REGEX_ADDRESS_FOR_DATA) && address.match(REGEX_ADDRESS_FOR_DATA).length > 3) {
        return address.match(REGEX_ADDRESS_FOR_DATA)[2]
      }
      return '信義區'
    },
    getRoad (address) {
      if (this.showAdvanced && address.match(REGEX_ADDRESS) && address.match(REGEX_ADDRESS).length > 4) {
        return address.match(REGEX_ADDRESS)[4]
      }
      return ''
    },
    handleSelectBlur (e) {
      e.target.parentNode.classList.remove('open')
    },
    handleSelectChange (e) {
      this.showBtn = true
      e.target.parentNode.classList.remove('open')
    },
    handleSelectFocus (e) {
      e.target.parentNode.classList.add('open')
    },
    validateAddress () {
      this.errors = []
      if (!this.road) {
        this.errors.push('road')
      }
      if (!this.districts.includes(this.districtSelected)) {
        this.errors.push('district')
      }
      if (this.errors.length === 0) {
        const geocoder = new google.maps.Geocoder()
        axios.get(`/project-api/election-board/google_map?address=${this.addressSelected}`)
          .then((res) => {
            if (res.data.status === 'OK' && res.data.results.length > 0) {
              const addressFormatted = this.formatAddress(res.data.results[0].formatted_address)
              const coordinate = [ res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng ]
              this.$emit('updateAddress', addressFormatted)
              this.$emit('updateCoordinate', coordinate)
            } else {
              this.errors.push('district')
            }
          })
          .catch((err) => {
            this.errors.push('district')
          })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.select-position
  margin-top 10px
  text-align right
  @media (min-width 768px)
    margin-top 12px
  > input
    width 100%
    height 32px
    margin-top 10px
    padding 0 0 0 12px
    line-height 32px
    background-color #a0a0a0
    border none
    border-radius 2px
    &::-webkit-input-placeholder
      font-size 1rem
      color #4c4c4c
  & > button
    width 100%
    margin-top 10px
    padding 0
    height 32px
    line-height 32px
    font-weight 500
    background-color #fa6e59
    border none
    border-radius 2px
    cursor pointer
  .row
    display flex
    justify-content space-between
  .select-container
    position relative
    width calc(50% - 5px)
    background-color #a0a0a0
    border-radius 2px
    &.open::after
      transform rotate(180deg)
    &::after
      content ''
      position absolute
      top 0
      right 0
      width 30px
      height 30px
      background-image url(/proj-assets/election-board/images/filter.png)
      background-size 16px auto
      background-position center center
      background-repeat no-repeat
      transition transform .5s
    & select
      position relative
      z-index 10
      width 100%
      height 32px
      padding 0 0 0 12px
      line-height 32px
      background-color transparent
      border none
      -webkit-appearance none
      -moz-appearance none
      appearance none
  .error
    color #fa6e59
    font-size .875rem
    margin-top 10px
    display block
    @media (min-width 768px)
      font-size 1rem
      margin-top 12px
</style>
