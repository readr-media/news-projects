<template>
  <div class="search">
    <vue-autosuggest
      :suggestions="filteredOptions"
      :limit="10"
      :input-props="inputProps"
      :on-selected="onSelected"
    >
    </vue-autosuggest>
  </div>
</template>

<script>
import _ from 'lodash'
import { VueAutosuggest } from 'vue-autosuggest'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

import getKeywordLocale from 'src/components/ElectionNews/mixins/getKeywordLocale'

export default {
  components: {
    VueAutosuggest
  },
  mixins: [ getKeywordLocale ],
  data () {
    return {
      selected: '',
      filteredOptions: [],
      inputProps: {
        id: "autosuggest__input",
        onInputChange: this.onInputChange,
        placeholder: this.$i18n.locale === 'en' ? 'Key in other keywords' : "或輸入其他關鍵字"
      },
      limit: 10
    };
  },
  computed: {
    ...mapState({
      keywords: state => Object.values(state.mapping.keywords)
    }),
    keywordsLocale () {
      const result = this.$i18n.locale === 'en' ? this.keywords.map(w => this.getKeywordLocale(w)) : this.keywords
      return result.filter(d => d !== undefined)
    }
  },
  methods: {
    onSelected(option) {
      this.selected = this.$i18n.locale === 'en' ? _.findKey(this.keywordsEN, v => v === option.item) : option.item
      this.$router.push(`/project/election-news/${this.selected}${this.$i18n.locale === 'en' ? '?locale=en': ''}`)
    },
    onInputChange(text) {
      if (text === '' || text === undefined) {
        return;
      }
      
      /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
      const filteredData = this.keywordsLocale.filter(item => {
        return item.toLowerCase().indexOf(text.toLowerCase()) > -1;
      }).slice(0, this.limit);
      
      this.filteredOptions = [{
        data: filteredData
      }];
    },
  }
}
</script>

<style lang="stylus">
.search
  height 30px

#autosuggest
  height 100%

#autosuggest__input {
  outline: none;
  position: relative;
  display: block;
  font-size: 16px;
  border: 1px solid #999999;
  padding: 10px;
  width: 100%;
  height 100%
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px;
  overflow: scroll;
  max-height: 200px;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results_item {
  cursor: pointer;
  padding: 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results_title {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results_item:active,
.autosuggest__results .autosuggest__results_item:hover,
.autosuggest__results .autosuggest__results_item:focus,
.autosuggest__results .autosuggest__results_item.autosuggest__results_item-highlighted {
  background-color: #ddd;
}
</style>