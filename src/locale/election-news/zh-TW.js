export const ELECTION_NEWS = {
  'LANDING': {
    'TITLE': '選舉新聞風向球',
    'SUBTITLES': [
      '媒體報導看風向？',
      'Google 人工智慧來解答'
    ],
    'CREDITS': {
      'DATA': {
        'WORDING': '資料整理：',
        'MEMBER': [
          '陳彥宇',
          '李又如',
          '李昭妟'
        ]
      },
      'WRITER': {
        'WORDING': '文字：',
        'MEMBER': '李又如'
      },
      'FE': {
        'WORDING': '網頁：',
        'MEMBER': '熊凱文'
      },
      'DESIGN': {
        'WORDING': '設計：',
        'MEMBER': '陳怡蒨'
      }
    },
    'INTRO': '媒體在報導不同的政治人物時會有情緒差異嗎？針對同一位候選人，媒體報導的情緒在選舉前後會不會有所轉變？我們借助 Google 人工智慧來嘗試解答這些問題，並將持續追蹤至 2020 年。',
    'NAVS': {
      'SINGLE': '看關鍵字風向',
      'DUEL': '多關鍵字 PK'
    },
    'EXTERNAL_LINKS': {
      'MANUAL': '使用說明書',
      'INSIGHT': '我們發現了什麼'
    }
  },
  'LEGENDS': {
    'TITLE': '情緒計算方式說明',
    'SUBTITLE': "我們蒐集的新聞從 2018 年 10 月 19 日開始（並將持續至 2020年），以 Google's Cloud Natural Language API 計算新聞文本的情緒分數，並將分數轉換成 0 - 10 分，再區分為三個情緒區間。"
  },
  'DASHBOARD': {
    'FETCH_FAIL': '發生錯誤，請檢查網址是否給錯關鍵字',
    'EXTERNAL_LINKS': {
      'MANUAL': '使用說明書',
      'INSIGHT': '我們發現了什麼'
    },
    'CHART_TITLE': '所有媒體總新聞數量',
    'RELATED_KEYWORDS': '相關關鍵字',
    'NAVS': {
      'DUEL': '多關鍵字<br>PK'
    }
  },
  'DASHBOARD_SIDEBAR': {
    'TITLE': '媒體來源',
    'ALL': '全選'
  },
  'DASHBOARD_TOOLTIP': {
    'NUM_MEDIA': '媒體數量：',
    'NUM_NEWS': '新聞則數：'
  }
}