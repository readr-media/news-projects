import articles from './articles'
import nav from './modules/nav'

export default {
  namespaced: true,
  modules: {
    nav
  },
  state: () => ({
    articles
  })
}
