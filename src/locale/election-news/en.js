export const ELECTION_NEWS = {
  'LANDING': {
    'TITLE': '選舉新聞風向球',
    'SUBTITLES': [
      'Is there specific political inclination on media toward elections?',
      'Here is Google artificial intelligence’s answer'
    ],
    'CREDITS': {
      'DATA': {
        'WORDING': 'Data: ',
        'MEMBER': [
          'Chen Yen-Yu',
          'Lee Yu-Ju',
          'Li Chao-Yen'
        ]
      },
      'WRITER': {
        'WORDING': 'Journalist: ',
        'MEMBER': 'Lee Yu-Ju'
      },
      'FE': {
        'WORDING': 'Web-developing: ',
        'MEMBER': 'Hsiung Kai-Wen'
      },
      'DESIGN': {
        'WORDING': 'Design: ',
        'MEMBER': 'Chen Yi-Chian'
      }
    },
    'INTRO': 'Does media have different sentiment when reported on different political figures? For the same candidate, the media reported sentiment before and after the elections will be changed? We use Google artificial intelligence to try to answer these questions and will continue to track until 2020.',
    'NAVS': {
      'SINGLE': 'Single keyword',
      'DUEL': 'Compare two keywords'
    },
    'EXTERNAL_LINKS': {
      'MANUAL': 'Introduction',
      'INSIGHT': 'What we found'
    }
  },
  'LEGENDS': {
    'TITLE': 'How we analyze the sentiment',
    'SUBTITLE': "We gather news from October 19, 2018 (and will continue to 2020), with Google's Cloud Natural Language API computing sentiment score of news, and the score is converted to 0--10, and then divided into three emotions range."
  },
  'DASHBOARD': {
    'FETCH_FAIL': 'Fail',
    'EXTERNAL_LINKS': {
      'MANUAL': 'Introduction',
      'INSIGHT': 'What we found'
    },
    'CHART_TITLE': '所有媒體總新聞數量',
    'RELATED_KEYWORDS': 'Related keywords',
    'NAVS': {
      'DUEL': 'Compare two keywords'
    }
  },
  'DASHBOARD_SIDEBAR': {
    'TITLE': 'Media source',
    'ALL': 'All'
  },
  'DASHBOARD_TOOLTIP': {
    'NUM_MEDIA': 'Number of media: ',
    'NUM_NEWS': 'Number of news: '
  }
}