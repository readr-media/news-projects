<template>
  <AppLightbox @closeLightbox="resetLightbox">
    <div class="form" :key="'form'" v-show="lightboxPhase === 'form'">
      <LightboxTextarea :title="'還有一些政策...'"
                        :placeholder="'請輸入您的意見，經查證屬實後，會加入列表中。'"
                        :textareaContent.sync="textareaContent"
                        :alert="alertTextareaContent"/>
      <LightboxInput :title="'有消息請通知我！'"
                     :placeholder="'請輸入您的 email'"
                     :email.sync="email"
                     :alert="alertEmail"/>
      <LightboxRecaptcha v-if="showLightbox"
                         :isHuman.sync="isHuman"
                         :alert="alertIsHuman"/>
      <LightboxSubmit @click.native="submit"/>
    </div>
    <LightboxThank :key="'thank'"
                   v-show="lightboxPhase === 'thank'"
                   :remainingTimeBackToForm="remainingTimeBackToForm"/>
  </AppLightbox>
</template>

<script>
import { isEmail, isEmpty, } from 'validator'
import AppLightbox from '../../lightbox/AppLightbox.vue'
import LightboxTextarea from '../../lightbox/LightboxTextarea.vue'
import LightboxInput from '../../lightbox/LightboxInput.vue'
import LightboxRecaptcha from '../../lightbox/LightboxRecaptcha.vue'
import LightboxSubmit from '../../lightbox/LightboxSubmit.vue'
import LightboxThank from '../../lightbox/LightboxThank.vue'
import { PRESIDENT_PROMISE_FEEDBACK_SHEET_ID, } from 'api/config'

const DEFAULT_VALUEINPUTOPTION = 'RAW'
const appendSheet = (store, {
  spreadsheetId = PRESIDENT_PROMISE_FEEDBACK_SHEET_ID,
  range,
  valueInputOption = DEFAULT_VALUEINPUTOPTION,
  resource
}) => {
  return store.dispatch('APPEND_SHEET', {
    params: {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: valueInputOption,
      resource: resource,
    }
  })
}

export default {
  props: {
    showLightbox: {
      type: Boolean,
      required: true,
    }
  },
  components: {
    AppLightbox,
    LightboxTextarea,
    LightboxInput,
    LightboxRecaptcha,
    LightboxSubmit,
    LightboxThank,
  },
  watch: {
    showLightbox () {
      if (!this.showLightbox) this.resetLightbox()
    },
    remainingTimeBackToForm () {
      if (this.remainingTimeBackToForm <= 0) this.backToForm()
    },
    lightboxPhase () {
      if (this.lightboxPhase === 'thank') this.startCountDown()
    },
    '$store.state.PresidentPromise.emailKeepTracking' (value) {
      this.email = value
    }
  },
  data () {
    return {
      textareaContent: '',
      email: '',
      isHuman: false,
      alertTextareaContent: false,
      alertEmail: false,
      alertIsHuman: false,
      remainingTimeBackToForm: 3,
      lightboxPhase: 'form',
      countDownInterval: undefined,
    }
  },
  computed: {
    canSubmit () {
      return this.isHuman && this.textareaContent !== '' && (this.email !== '' ? isEmail(this.email) : true)
    }
  },
  methods: {
    submit () {
      if (this.canSubmit) {
        this.lightboxPhase = 'thank'
        this.sendSheetRequest()
      } else {
        if (this.textareaContent === '') this.alertTextareaContent = true
        if (this.email !== '' && !isEmail(this.email)) this.alertEmail = true
        if (!this.isHuman) this.alertIsHuman = true
      }
    },
    sendSheetRequest () {
      const DEFAULT_MAJORDIMENSION = 'ROWS'
      if (!isEmpty(this.email)) {
        appendSheet(this.$store, {
          range: 'feedback',
          resource: {
            'majorDimension': DEFAULT_MAJORDIMENSION,
            'values': [
              [ this.email, this.textareaContent ]
            ],
          }
        })
        appendSheet(this.$store, {
          range: 'follow',
          resource: {
            'majorDimension': DEFAULT_MAJORDIMENSION,
            'values': [
              [ this.email ]
            ],
          }
        })
      } else {
        appendSheet(this.$store, {
          range: 'feedback',
          resource: {
            'majorDimension': DEFAULT_MAJORDIMENSION,
            'values': [
              [ '', this.textareaContent ]
            ],
          }
        })
      }
    },
    startCountDown () {
      this.countDownInterval = setInterval(() => {
        this.remainingTimeBackToForm -= 1
      }, 1000)
    },
    resetCountDown () {
      clearInterval(this.countDownInterval)
      this.countDownInterval = undefined
    },
    resetForm () {
      this.textareaContent = ''
      this.email = ''
      // this.isHuman = false
      this.alertIsHuman = false
      this.alertTextareaContent = false
      this.alertEmail = false
      this.remainingTimeBackToForm = 3
      this.lightboxPhase = 'form'
    },
    backToForm () {
      this.resetForm()
      this.resetCountDown()
    },
    resetLightbox () {
      this.$emit('update:showLightbox', false)
      this.backToForm()
    }
  },
}
</script>

<style lang="stylus" scoped>
.form
  height 100%
  min-height 551px
  display flex
  flex-direction column
  justify-content center

.fade-enter-active, .fade-leave-active
  transition all .25s ease
.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 425px)
  .form
    min-height 500px
    justify-content flex-start
</style>
