<template>
  <Subscription
    :errorMessage="errorMessage"
    :isError="isError"
    :isLoading="isLoading"
    :isSuccess="isSuccess"
    @submit="subscribe"
  />
</template>
<script>

import Subscription from '@readr-ui/subscription/src/readr-ui-subscription.vue'
import moment from 'moment'

export default {
  name: 'CommonSubscription',
  components: {
    Subscription
  },
  data () {
    return {
      errorMessage: '',
      isError: false,
      isLoading: false,
      isSuccess: false
    }
  },
  methods: {
    subscribe (email) {
      this.isError = false
      this.isSuccess = false
      this.isLoading = true
      this.$store.dispatch('ADD_SUBSCRIPTION', {
        email,
        datetime: moment().format('YYYYMMDDHHmm'),
        slug: this.$route.params.project,
        url: this.$route.path
      })
        .then(() => {
          this.isLoading = false
          this.isSuccess = true
        })
        .catch(err => {
          this.isLoading = false
          this.isError = true
          this.errorMessage = err
        })
    }
  }
}
</script>
