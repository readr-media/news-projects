<template>
  <div :class="[ 'project' ]">
    <div :is="currProj"></div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import { PROJECTS } from '../constants'
  const projectComps = _.map(PROJECTS, (proj, k) => {
    const obj = new Object()
    obj[ k ] = process.env.NODE_ENV !== 'production'
      ? () => import(`../components/${proj}/${proj}.vue`)
      : () => Promise.resolve(require(`../components/${proj}/${proj}.vue`) )
    return obj
  })

  export default {
    components: Object.assign({}, ...projectComps),
    computed: {
      currProj () {
        return _.get(this.$route, [ 'params', 'project' ])
      }
    },
    name: 'project',
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped></style>