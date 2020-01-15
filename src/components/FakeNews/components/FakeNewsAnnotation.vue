
<script>
export default {
  name: 'FakeNewsAnnotation',
  props: {
    content: {
      type: Object
    }
  },
  data () {
    return {
      showAnnotation: false
    }
  },
  render: function (createElement) {
    return createElement(
      'div',
      {
        attrs: {
          class: 'annotation'
        }
      },
      [
        createElement('p', {}, [
          this.content.content.map(text => {
            if (text === '（註）') {
              return createElement(
                'button',
                {
                  class: { active: this.showAnnotation, },
                  on: {
                    click: this.handleClick
                  }
                },
                '（註）'
              )
            }
            return text
          })
        ]),
        createElement('p', { style: { display: this.showAnnotation ? 'block' : 'none', }, attrs: { class: 'hide-text' } }, this.content.annotation)
      ]
    )
  },
  methods: {
    handleClick () {
      this.showAnnotation = !this.showAnnotation
    }
  }
}
</script>
<style lang="stylus" scoped>
  .annotation
    p
      &.hide-text
        color #616770
        font-size .8125rem
    p + p
      margin-top 1em
    button
      position relative
      height 1em
      padding 0 10px 0 0
      &::after
        content ''
        position absolute
        top 50%
        right 2.5px
        transform translateY(-50%)
        width 0
        height 0
        border-style solid
        border-width 8.7px 5px 0 5px
        border-color #616770 transparent transparent transparent
      &.active
        &::after
          border-width 0 5px 8.7px 5px
          border-color transparent transparent #616770 transparent
</style>
