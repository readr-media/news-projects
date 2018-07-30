import { find, get, isEmpty } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  computed: {
    ...mapState({
      corpNameTaxIdMappingGroupByName: state => state.corpNameTaxIdMappingGroupByName
    }),
    ...mapGetters([
      'nameLightboxShown',
      'hasDataForceGraph',
      'isNameLightboxShownCorp',
      'ordinalUrlQuery',
    ])
  },
  methods: {
    highlightForceNode (name) {
      if (this.hasDataForceGraph) {
        const forceHighlightCircle = document.querySelector(`#circle-${name}`)
        const forceHighlightImage = document.querySelector(`#image-${name}`)
        if (forceHighlightCircle && forceHighlightImage) {
          let event = new MouseEvent('mouseover', {})
          forceHighlightCircle.dispatchEvent(event)
          forceHighlightImage.dispatchEvent(event)
        }
      }
    },
    resumeForceNode (name) {
      if (this.hasDataForceGraph) {
        const forceHighlightCircle = document.querySelector(`#circle-${name}`)
        const forceHighlightImage = document.querySelector(`#image-${name}`)
        if (forceHighlightCircle && forceHighlightImage) {
          let event = new MouseEvent('mouseout', {})
          forceHighlightCircle.dispatchEvent(event)
          forceHighlightImage.dispatchEvent(event)
        }
      }
    },
    highlightForceLink (id) {
      if (this.hasDataForceGraph) {
        if (this.isNameLightboxShownCorp) {
          const group = get(this.corpNameTaxIdMappingGroupByName, this.nameLightboxShown, [])
          const groupCurrentOrdinal = get(find(group, [ '屆數', String(this.ordinalUrlQuery) ]), '所屬集團', '')
          let groupNameOrTaxId = get(this.corpNameTaxIdMappingGroupByName, [ this.nameLightboxShown, 0, '名稱／統一編號' ], '')
          groupNameOrTaxId = isEmpty(groupCurrentOrdinal) ? groupNameOrTaxId : groupCurrentOrdinal

          const forceHighlightLink = document.querySelector(`#link-${groupNameOrTaxId}-${id}`)
          if (forceHighlightLink) {
            let event = new MouseEvent('mouseover', {})
            forceHighlightLink.dispatchEvent(event)
          }
        } else {
          const forceHighlightLink = document.querySelector(`#link-${id}-${this.nameLightboxShown}`)
          if (forceHighlightLink) {
            let event = new MouseEvent('mouseover', {})
            forceHighlightLink.dispatchEvent(event)
          }
        }
      }
    },
    resumeForceLink (id) {
      if (this.hasDataForceGraph) {
        if (this.isNameLightboxShownCorp) {
          const group = get(this.corpNameTaxIdMappingGroupByName, this.nameLightboxShown, [])
          const groupCurrentOrdinal = get(find(group, [ '屆數', String(this.ordinalUrlQuery) ]), '所屬集團', '')
          let groupNameOrTaxId = get(this.corpNameTaxIdMappingGroupByName, [ this.nameLightboxShown, 0, '名稱／統一編號' ], '')
          groupNameOrTaxId = isEmpty(groupCurrentOrdinal) ? groupNameOrTaxId : groupCurrentOrdinal

          const forceHighlightLink = document.querySelector(`#link-${groupNameOrTaxId}-${id}`)
          if (forceHighlightLink) {
            let event = new MouseEvent('mouseout', {})
            forceHighlightLink.dispatchEvent(event)
          }
        } else {
          const forceHighlightLink = document.querySelector(`#link-${id}-${this.nameLightboxShown}`)
          if (forceHighlightLink) {
            let event = new MouseEvent('mouseout', {})
            forceHighlightLink.dispatchEvent(event)
          }
        }
      }
    }
  },
}