import * as covid19Disinformation from './covid19-disinformation/en'
import * as electionNews from './election-news/en'
import * as politicalContribution from './political-contribution/en'

export default Object.assign({
  'DONATE_PREFIX': 'Donate',
  'DONATE_POSTFIX': 'reports',
}, covid19Disinformation, electionNews, politicalContribution)
