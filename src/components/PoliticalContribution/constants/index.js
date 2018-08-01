import { flatten, } from 'lodash'
import { CORP_NAMES, } from './namesCorp'
import { CANDIDATES_SEVENTH, CANDIDATES_EIGHTH, CANDIDATES_NINTH, } from './namesCandidate'

export const SLUG_CONTENT_SECTION_EXPLORE = 'explore'
export const SLUG_CONTENT_SECTION_DASHBOARD = 'dashboard'
export const SLUG_CONTENT_SECTION_STORYS = [
  'story1',
  'story2',
  'story3',
  'story4',
  'story5',
  'story6',
]
export const SLUGS_SHOW_CONTENT_SECTION = flatten([
  SLUG_CONTENT_SECTION_DASHBOARD,
  SLUG_CONTENT_SECTION_EXPLORE,
  SLUG_CONTENT_SECTION_STORYS,
])

export const DEFAULT_SHEET_RANGE = 'sheet1'
export const CORP_NAME_TAXID_MAPPING_SHEETID = '1ez6J2GpiawI1m-zyfehpPeIBDimbbziixH57LuqXRWg'
export const DATA = {
  seventh: {
    ordinal: 'seventh',
    oridinalNum: 7,
    spreadsheetIdBasic: '1NsK-zleOz4nUvrkx4iAfeHTy7FU6Puh8aOyIChoCDrA',
    spreadsheetIdCompanyDonate: '1UnntluUcK7KRrkC7rUBjMiPG71YJCWtDb8NvF6ipqfI',
    candidateNames: CANDIDATES_SEVENTH
  },
  eighth: {
    ordinal: 'eighth',
    oridinalNum: 8,
    spreadsheetIdBasic: '1qlJz3dXyA5YjugzUK2hj0bYPz8xXBjlUCIwrAoGu7A8',
    spreadsheetIdCompanyDonate: '1Rp4L-VZAGopLi2TeNbLlsz8qPYlFcKiXJcClSPdJvT0',
    candidateNames: CANDIDATES_EIGHTH
  },
  ninth: {
    ordinal: 'ninth',
    oridinalNum: 9,
    spreadsheetIdBasic: '1ytZDez78Qbp9eTKwkbVWdFYYtYQ-0-RJQ3ZEBGzTTw0',
    spreadsheetIdCompanyDonate: '1j_4biqRjYCcnCBELsafrk6Ocm046cwqvPfwY8SHQUyk',
    candidateNames: CANDIDATES_NINTH
  },
}

export const SEVENTH_EIGHT_NINTH_VALID_CORP_NAMES = CORP_NAMES

export const COUNTY_SORT = [
  '基隆市',
  '臺北市',
  '新北市',
  '臺北縣',
  '桃園市',
  '桃園縣',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '臺中市',
  '臺中縣',
  '南投縣',
  '彰化縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '臺南市',
  '臺南縣',
  '高雄市',
  '高雄縣',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '臺東縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
  '平原原住民',
  '山原原住民',
]

export const RELATED_TOPICS = [
  [
    {
      href: 'http://www.cw.com.tw/article/article.action?id=5086097',
      imgsrc: 'https://cw1.tw/CW/images/article/201711/article-5a0520593968d.jpg',
      meta: {
        title: '《數據看天下》揭露2016立委選舉5大金主：遠東、裕隆、台泥、潤泰、仰德 - 林佳賢',
        date: '2017-11-10',
        source: '天下雜誌',
      },
    },
    {
      href: 'https://www.facebook.com/notes/%E5%8D%9E%E4%B8%AD%E4%BD%A9/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E8%B3%87%E6%96%99%E6%8C%96%E5%87%BA%E4%BB%80%E9%BA%BC%E8%99%B9%E8%86%9C%E7%94%9F%E7%89%A9%E8%BE%A8%E8%AD%98%E8%8D%89%E6%A1%88%E8%83%8C%E5%BE%8C%E7%9A%84%E6%94%BF%E5%95%86%E9%97%9C%E4%BF%82%E9%96%80%E9%81%93/10155438440707639/',
      imgsrc: 'https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.0-9/23519056_10155438679272639_5620726681130512789_n.jpg?oh=e8648aeae08f43dbc0e5ea29c35a3456&oe=5AABD92E',
      meta: {
        title: '政治獻金資料挖出什麼〈虹膜生物辨識草案〉背後的政商關係門道 - 卞中佩',
        date: '2017-11-17',
        source: 'Facebook',
      },
    },
  ],
  [
    {
      href: 'https://www.facebook.com/notes/claire-tsao/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E4%B9%8B%E9%81%B8%E5%8D%80%E6%84%9B%E4%BD%A0%E6%9C%89%E5%A4%9A%E5%B0%91/1946938758655360/',
      imgsrc: 'https://scontent.ftpe7-4.fna.fbcdn.net/v/t31.0-0/p600x600/23669162_1947125261970043_1720772919611582672_o.jpg?oh=3c4fb520dfe5fe6be085c781e76f737d&oe=5A97001E',
      meta: {
        title: '政治獻金之選區愛你有多少 - Claire Tsao',
        date: '2017-11-19',
        source: 'Facebook',
      },
    },
    {
      href: 'https://medium.com/@amossclaire/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E4%B9%8B%E7%84%A1%E7%94%A8%E5%9C%96%E5%A4%A7%E5%85%A8-21890c23409b',
      imgsrc: 'https://cdn-images-1.medium.com/max/1200/1*YUL3AOUeNqU4hzMY2u1m2w.png',
      meta: {
        title: '政治獻金之無用圖大全 - Claire Tsao',
        date: '2017-11-21',
        source: 'Medium',
      },
    },
  ],
  [
    {
      href: 'https://medium.com/@austinwang_23988/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91-%E4%BD%A0%E6%8E%8C%E6%8F%A1%E4%BA%86%E5%B0%8F%E9%A1%8D%E6%8D%90%E6%AC%BE-%E7%84%B6%E5%BE%8C%E5%91%A2-b61086e46e28',
      imgsrc: 'https://cdn-images-1.medium.com/max/1200/0*jaMVitINX6v5m3sM.',
      meta: {
        title: '政治獻金：你掌握了小額捐款，然後呢？ - 王宏恩',
        date: '2017-11-21',
        source: 'Medium',
      },
    },
    {
      href: 'https://www.facebook.com/photo.php?fbid=10207812115739143&set=a.1273921706451.32156.1782190861&type=3&theater',
      imgsrc: 'https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.0-9/23755170_10207812115739143_4812201328584751937_n.jpg?oh=ac7a24ce790f4939b3ea95068b0c4b5f&oe=5A947254',
      meta: {
        title: '個人捐款比例與實際得票率散布圖 - 王銘宏',
        date: '2017-11-22',
        source: 'Facebook',
      },
    },
  ],
]