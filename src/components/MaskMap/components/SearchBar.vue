<template>
  <section class="search-bar">
    <div class="search-bar__search">
      <div :class="[ 'search-bar__address', { focus: isFocus } ]">
        <input id="address-input" type="text" :placeholder=" isFocus ? '' : '輸入地址搜尋附近藥局⋯'" v-model="address" @focus="isFocus = true" @blur="isFocus = false" @keypress.enter="search">
        <svg class="position" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" @click="$parent.getCurrentPosition"><path d="m23.6000156 11.6000156h-.8000156c-.205875-5.65631247-4.7437031-10.1941406-10.4000156-10.4000156v-.80001562c0-.22092188-.1790625-.39998438-.3999844-.39998438s-.3999844.1790625-.3999844.39998438v.80001562c-5.65631247.205875-10.1941406 4.74370313-10.4000156 10.4000156h-.80001562c-.22092188 0-.39998438.1790625-.39998438.3999844s.1790625.3999844.39998438.3999844h.80001562c.205875 5.6563125 4.74370313 10.1941406 10.4000156 10.4000156v.8000156c0 .2209219.1790625.3999844.3999844.3999844s.3999844-.1790625.3999844-.3999844v-.8000156c5.6562656-.205875 10.1940937-4.7437031 10.4000156-10.4000156h.8000156c.2209219 0 .3999844-.1790625.3999844-.3999844s-.1790625-.3999844-.3999844-.3999844zm-12.04446 8.8444288c-4.32617486-.2114307-7.7865132-3.671711-8.00000004-8h4.81602443c.18792293 1.6752726 1.50949248 2.9975023 3.18397561 3.1855661zm0-5.3333333c-1.3810797-.2008037-2.46586302-1.285587-2.66666671-2.6666667h2.66666671zm0-3.5555555h-2.66666671c.20080369-1.3810797 1.28558701-2.46586302 2.66666671-2.66666671zm0-3.18397561c-1.67527259.18792293-2.99750232 1.50949248-3.18556615 3.18397561h-4.81443389c.21143075-4.32617486 3.67171108-7.7865132 8.00000004-8.00000004zm.8888888-4.81602443c4.3262218.21143075 7.7865132 3.67171108 8 8.00000004h-4.8160244c-.1879229-1.67527259-1.5094925-2.99750232-3.1839756-3.18556615zm0 5.33333333c1.3810797.20080369 2.465863 1.28558701 2.6666667 2.66666671h-2.6666667zm0 3.55555551h2.6666667c-.2008037 1.3810797-1.285587 2.465863-2.6666667 2.6666667zm0 3.1839756c1.6752726-.1879229 2.9975023-1.5094925 3.1855661-3.1839756h4.8144339c-.2114307 4.3262218-3.671711 7.7865132-8 8z"/></svg>
      </div>
      <button type="button" @click="search">搜尋</button>
      <div class="search-bar__share-icon" @click="toggleShare">
        <svg height="16" viewBox="0 0 4 16" width="4" xmlns="http://www.w3.org/2000/svg"><path d="m291 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill-rule="evenodd" transform="translate(-289 -14)"/></svg>
      </div>
    </div>
    <transition name="fade">
      <div class="search-bar__share" v-if="isShare">
        <a class="fb" :href="`https://www.facebook.com/share.php?u=${shareLink}`" target="_blank">
          <svg height="15" viewBox="0 0 18 15" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m9 22 7 7v-4.1c4.999 0 8.5 1.6 11 5.1-1-5-4-10-11-11v-4z" fill-rule="evenodd" transform="matrix(-1 0 0 1 27 -15)"/></svg>
          <p>Facebook</p>
        </a>
        <a class="line" :href="`https://line.me/R/msg/text/?${shareLink}`" target="_blank">
          <svg height="15" viewBox="0 0 18 15" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m9 22 7 7v-4.1c4.999 0 8.5 1.6 11 5.1-1-5-4-10-11-11v-4z" fill-rule="evenodd" transform="matrix(-1 0 0 1 27 -15)"/></svg>
          <p>LINE</p>
        </a>
        <a class="readr" href="https://www.readr.tw/" target="_blank">
          <svg height="24" viewBox="0 0 26 24" width="26" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><mask id="a" fill="#fff"><path d="m0 24h26v-24h-26z" fill="#fff" fill-rule="evenodd"/></mask><g fill="#000" fill-opacity=".869027" fill-rule="evenodd"><path d="m14.0100852 20.2392717c0-.1715171-.0582599-.2959225-.1744992-.3733243-.1163095-.0773477-.2675001-.1160486-.4535719-.1160486h-.2529118v1.0493864h.1831495c.2093103 0 .3779181-.0470576.505917-.1412812.1278819-.0941154.1919164-.2337198.1919164-.4187323m.6105371-.015145c0 .2388584-.0581898.4398001-.1744291.6029064-.1163329.1631874-.2834912.2884311-.5015686.3758394l.9813013 1.3571275h-.7588755l-.8416831-1.2259609h-.196265v1.2259609h-.6105838v-3.36h.8679142c.1802037 0 .3459593.0210407.4971265.0630681.1511439.0420815.2812936.1059339.3903323.1917195.1090387.0857586.1941141.1925579.2551561.3203439.0610654.1278671.0915747.2774781.0915747.4489952"/><path d="m15.4074074 19.2h1.9115543v.5600135h-1.2425436v.812259h1.1851596v.5599865h-1.1851596v.8677545h1.2569152v.5599865h-1.9259259z"/><path d="m19.2592357 19.7650438-.4390241 1.5286447h.8780953zm1.444468 2.7949562h-.6366485l-.2063324-.706298h-1.2029741l-.2063324.706298h-.6366015l1.1107871-3.36h.6673148z"/><path d="m22.1874431 21.999991c.1736141 0 .3341386-.0253136.4814683-.0759949.147435-.0506812.2743008-.1241339.380808-.2204662.1063755-.0962511.1891266-.213651.2480953-.3522266.0589688-.1384945.0884663-.2955956.0884663-.4713033 0-.1756265-.0294975-.3327276-.0884663-.4713033-.0589687-.1384945-.1417198-.2558944-.2480953-.3522266-.1065072-.0962241-.233373-.1697038-.380808-.2203851-.1473297-.0507083-.3078542-.076076-.4814683-.076076h-.3143858v2.239982zm-1.0022579-2.799991h.9875355c.2882067 0 .5493916.0421082.78366.1261352.2341104.0841082.4339035.2009942.5993531.3506311.165397.1496909.2931318.3271294.3832047.5322343.0900728.2052132.1351356.4288436.1351356.6709994s-.0450628.4658674-.1351356.6709723c-.0900729.2052131-.2178077.3826517-.3832047.5322614-.1654496.149691-.3652427.266604-.5993531.3506311-.2342684.0841082-.4954533.1261352-.78366.1261352h-.9875355z"/><path d="m26 20.75511h-.111147c-.1642344 0-.3011223.0260711-.4106119.0780563-.1094896.0520636-.1964494.126825-.2608535.2243887v1.502445h-.661832v-2.3756287h.6376707v.4195163c.0450855-.1397691.1166888-.2487601.2150171-.3268163.0981988-.0780563.2294154-.1170713.3937275-.1170713.0740117 0 .1400473.0081586.1980291.0243713z"/><path d="m14.8724452 5.88999004h1.5851229v-.92999843h-1.5851229zm2.980029 8.99000996c-1.0996692-.2074798-2.5154556-.5794691-4.2481325-1.1159931l.5072362-.9300236c1.3949061.330277 2.789838.6402765 4.1847184.9300236zm-5.6430387-8.99000996h1.585123v-.92999843h-1.585123zm-2.0289707 6.01399486h5.6430644v-.6819888h-5.6430644zm0-1.4879824h5.6430644v-.68198877h-5.6430644zm0-1.42599254h5.6430644v-.74400378h-5.6430644zm-.5706505-3.10001992h1.4583203v-.92999843h-1.4583203zm-.88766988 6.94399326h8.55967938v-5.45598571h-8.55967938zm-.44382205-6.13799965h9.44734923v-2.47999581h-9.44734923zm-.19021681-4.77399696v-.99198826h4.12132994v-.92999843h1.585123v.92999843h4.2481326v.99198826h-4.2481326v.74400377h3.6140679v.8680086h-8.81328459v-.8680086h3.61409369v-.74400377zm.12680261 12.95801331c-.0426628-.0834749-.12680261-.2480096-.25360523-.4959941-.0852225-.2480097-.1694912-.4340043-.25363102-.5580091 1.30970942-.2897472 2.66300968-.5794691 4.05791578-.8680086l.5072362.8680086c-1.2680777.4125443-2.62137792.7642561-4.05791573 1.0540032zm-4.62856622-13.20602296h3.80431054v-1.17798291h-3.80431054zm-.31701943 6.69603397h4.37493521v-1.17800807h-4.37493521zm0-2.23201132h4.37493521v-1.17800808h-4.37493521zm-.38043363-2.17002149h5.13580247v-1.30198774h-5.13580247z" mask="url(#a)"/><path d="m4.66388073 13.7362338h1.81094606v-2.8790934h-1.81094606zm-1.29351036 1.1437662h4.33333333v-5.28h-4.33333333z" mask="url(#a)"/><path d="m11.83 16.4347826-5.85 4.0434783v-4.0434783h-4.42v-16.4347826h-1.56v18h4.29v6l8.45-6h13.26v-1.5652174z" mask="url(#a)"/><path d="m26 2.82857143h-2.8373016v-2.82857143h-1.547619v2.82857143h-2.8373016v1.54285714h2.8373016v2.82857143h1.547619v-2.82857143h2.8373016z" mask="url(#a)"/></g></svg>
        </a>
      </div>
    </transition>
  </section>
</template>

<script>
import { get } from 'axios'
import { READR_SITE_URL } from 'src/constants'

export default {
  name: 'SearchBar',
  data () {
    return {
      address: '',
      isShare: false,
      isFocus: false,
      blurSearch: false,
      currentAddress: ''
    }
  },
  computed: {
    shareLink () {
      return `${READR_SITE_URL}maskmap`
    }
  },
  methods: {
    search () {
      if (!this.address || this.currentAddress === this.address) { return }
      this.$parent.showLoading()
      this.currentAddress = this.address
      get(`/project-api/election-board/google_map?address=${this.address}`).then((res) => {
        const { status, results } = res.data
        if (status === 'OK') {
          const { map } = this.$parent
          const { location } = results[ 0 ].geometry
          map.setCenter(location)
          this.$parent.manMarker.setMap(null)
          this.$parent.manMarker = new google.maps.Marker({
            map,
            position: location,
            icon: '/proj-assets/maskmap/img/man.svg'
          })
          this.$parent.closePopupInfo()
        } else {
          this.$emit('showPopupInfo', {
            status: 'search error',
            question: '抱歉，系統找不到這個地址',
            optionA: '輸入新的地址',
            optionB: '取得現在位置'
          })
          console.error(status)
        }
      })
    },
    toggleShare () {
      this.isShare = !this.isShare
    }
  }
}
</script>

<style lang="stylus">
.search-bar
  position absolute
  top 10px
  left 0
  width 100%
  padding-left 10px
  padding-right 10px
  font-size 1.5rem
  user-select none
  &__search
    display flex
    justify-content space-between
    height 44px
    & > *
      border-radius 4px
      border solid 2px #000
      height 100%
  &__address
    background-color #fff
    width 68%
    display flex
    align-items center
    padding-left 8px
    padding-right 3px
    &.focus
      background-color #d6d6d6
    & input
      padding 0 9px 0 0
      border none
      flex 1 1 auto
      width 100%
      outline 0
      background-color transparent
      color rgba(0, 0, 0, 0.87)
      height 100%
      // line-height 44px
      &::-webkit-input-placeholder
        font-size 1.5rem
        color #9b9b9b
    & .position
      flex 0 0 auto
      cursor pointer
      padding 3px
  & button
    background-color #f5a623
    font-weight 700
    width 22.67%
    padding 0
    display flex
    justify-content center
    align-items center
    outline 0
    cursor pointer
    color rgba(0, 0, 0, 0.87)
    &:active
      background-color #d98c0f
  &__share-icon
    background-color #9b9b9b
    width 6%
    display flex
    justify-content center
    align-items center
    cursor pointer
    &:active
      background-color #4a4a4a
  &__share
    margin-left auto
    & > a
      border-radius 4px
      text-decoration none
      color rgba(0, 0, 0, 0.87)
      border solid 2px #000000
      display flex
      align-items center
      justify-content center
      height 44px
      font-size 1.5rem
      font-weight 600
      cursor pointer
      margin-left auto
      margin-top 5px
    & p
      margin-left 8px
    & .fb
      background-color #5da8ff
      width 114px
      &:active
        background-color #2c78d0
    & .line
      background-color #a5e163
      width 80px
      &:active
        background-color #76b72f
    & .readr
      background-color #f8e71c
      width 56px
      &:active
        background-color #d6c712
</style>
