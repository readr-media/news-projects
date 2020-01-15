<template>
  <a class="donation-hint"
    :class="[ theme, isActive ? 'active' : '', ]"
    :href="`/series/${currentProjectSlug}/donate`"
    target="_blank" v-if="currentProjectSlug && donationActive">
    <span v-text="$t('DONATE_PREFIX')"></span>
    <span class="donate-icon"></span>
    <span v-text="$t('DONATE_POSTFIX')"></span>  
  </a>
</template>
<script>
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  import { get, find, } from 'lodash'
  export default {
    name: 'DonateHint',
    computed: {
      currentSlug () {
        return get(this.$route, 'params.project', '')
      },
      currentProjectSlug () {
        return get(find(get(this.$store, 'state.reports'), { slug: this.currentSlug }), 'project.slug')
      },    
      donationActive () {
        return get(this.$store, 'state.setting.DONATION_ACTIVE', false)
      },        
    },
    data () {
      return {
        lastTopY: 0,
        isActive: false,
      }
    },
    methods: {},
    mounted () {
      window.addEventListener('scroll', () => {
        const currentPos = currentYPosition()
        if (this.lastTopY > currentPos) {
          this.isActive = true
        } else {
          this.isActive = false
        }
        this.lastTopY = currentPos
      })
    },
    props: {
      theme: {
        type: String,
        default: 'dark',
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .donation-hint
    position fixed
    right 50px
    bottom -50px
    width 140px
    height 40px
    font-size 0.75rem
    text-shadow none
    display flex
    justify-content center
    align-items flex-end
    padding 5px 0
    cursor pointer
    border 1px solid #000
    z-index 99999
    background-color #fff
    opacity 0
    transition bottom 0.5s, opacity 1s
    &.active
      bottom 30px
      opacity 0.7
    &, &:hover, &:link, &:visited
      text-decoration none  
      color #000
    &:hover
      opacity 0.85
    &.dark
      color #ddcf21
      border 1px solid #ddcf21
      background-color rgba(255, 255, 255, 0.3)
      &:hover
        background-color #fff

    .donate-icon
      height 28px
      width 28px
      display inline-block
      margin 0 5px
      background-image url(/proj-assets/donate.png)
      background-repeat no-repeat
      background-size contain
      background-position center center   
  @media (max-width: 768px)
    .donation-hint
      width 300px
      right 50%
      margin-right -150px
      &.active
        bottom 15px
</style>