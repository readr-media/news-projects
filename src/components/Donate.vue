<template>
  <div>
    <a
      v-if="donationActive && projectSlug"
      :href="`/series/${projectSlug}/donate`"
      class="donate"
      target="_blank"
      @click="sendGA">
      <span v-text="$t('DONATE_PREFIX')"></span>
      <span class="donate-icon"></span>
      <span v-text="$t('DONATE_POSTFIX')"></span>
    </a>
  </div>
</template>
<script>
import { get } from 'lodash' 

export default {
  name: 'Donate',
  props: {
    projectSlug: {
      type: String,
      required: true
    }
  },
  computed: {
    donationActive () {
      return get(this.$store, 'state.setting.DONATION_ACTIVE', false)
    },
  },
  methods: {
    sendGA () {
      window.ga && window.ga('send', 'event', 'projects', 'click', `donate`, { nonInteraction: false })
    }
  }
}
</script>
<style lang="stylus" scoped>

.donate
  display flex
  justify-content center
  align-items center
  padding 7px 10px
  color #000
  font-size 1rem
  text-decoration none
  background-color #ddcf21
  border-radius 4px
.donate-icon
  height 20px
  width 34px
  display inline-block
  margin 0 5px
  background-image url(/proj-assets/donate-black.png)
  background-repeat no-repeat
  background-size contain
  background-position center center

</style>

