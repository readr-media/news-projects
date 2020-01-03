<template>
  <p>
    {{ toggled ? text : truncatedText }}
    <span
      class="more"
      @click="toggle"
    >
      {{ toggled ? lessText : moreText }}
    </span>
  </p>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ReadMore',
  props: {
    text: { type: String, default: '' },
    limit: { type: Number, default: 70 },
    moreText: { type: String, default: '……閱讀更多' },
    lessText: { type: String, default: '顯示更少' },
  },
  data() {
    return {
      toggled: false,
    };
  },
  computed: {
    truncatedText() {
      if (this.countWords(this.text) < this.limit) { return this.text; }
      const matches = this.text.match(/[\u00ff-\uffff]|\S+/g);
      return _.slice(matches, 0, this.limit).join('');
    },
  },
  methods: {
    toggle() {
      this.$emit('toggled');
      this.toggled = !this.toggled;
      this.$emit('toggled');
    },
    countWords(str = '') {
      const matches = str.match(/[\u00ff-\uffff]|\S+/g);
      return matches ? matches.length : 0;
    },
  },
};
</script>
