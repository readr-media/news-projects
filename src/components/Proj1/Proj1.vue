<template>
  <div>
    proj1
  </div>
</template>
<script>
  import titleMeta from '../../util/titleMeta'
  export default {
    name: '',
    mixins: [ titleMeta ],
    metaInfo () {
      let description = 'proj 1 description'
      let ogImage = 'marathon/images/og.jpg'
      let metaUrl = 'proj1'
      if (this.$route.query.q1) {
        ogImage = 'marathon/images/og-chicago.jpg'
        description = 'proj 1 q1'
      }
      return {
        title: 'proj 1',
        description: description,
        metaUrl: metaUrl,
        metaImage: ogImage
      }
    },
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped></style>