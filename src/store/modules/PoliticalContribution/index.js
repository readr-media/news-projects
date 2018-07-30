import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import { DATA, } from 'src/components/PoliticalContribution/constants'

export default {
  namespaced: true,
  // IMPORTANT: state must be a function so the module can be
  // instantiated multiple times
  state: () => ({
    data: DATA,
    corpNameTaxIdMapping: [],
    corpNameTaxIdMappingGroupByName: {},
    section: {
      explore: {
        navs: {
          radioPicked: 'ninth',
          sortedBy: 'GroupByParty',
        },
        force: {
          mouseoverGraphType: '',
          mouseoverIdentityType: '',
          mouseoverIdentityId: '',
        },
        duel: {
          candidatesOnStage: [],
        }
      }
    },
    currentLightboxShownName: '',
  }),
  actions,
  mutations,
  getters,
}