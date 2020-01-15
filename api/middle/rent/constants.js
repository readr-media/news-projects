const CITIES = {
  TAIPEI: 'TAIPEI',
  TAOYUAN: 'TAOYUAN',
  NEWTAIPEI: 'NEWTAIPEI',
  TAICHUNG: 'TAICHUNG',
  TAINAN: 'TAINAN',
  KAOHSIUNG: 'KAOHSIUNG',
}

const VIEW_SIZE = {
  S: {
    WIDTH: 320,
    HEIGHT: 250,
  },
  L: {
    WIDTH: 665,
    HEIGHT: 420,
  },
}

const AXIS = {
  X: 'rent',
  Y: 'unit',
}

const RENT_LOCALE = {
  'TAIPEI': '臺北市',
  'TAOYUAN': '桃園市',
  'NEWTAIPEI': '新北市',
  'TAICHUNG': '臺中市',
  'TAINAN': '臺南市',
  'KAOHSIUNG': '高雄市',
  'UNIT': '坪數',
  'RENT': '房租',
}

const DATA_LIMIT = {
  MAX: {
    RENT: 210000,
    UNIT: 105,  
    // RENT: 110000,
    // UNIT: 85,  
    // RENT: 55000,
    // UNIT: 75,  
  },
}

module.exports = {
  CITIES,
  VIEW_SIZE,
  AXIS,
  RENT_LOCALE,
  DATA_LIMIT,
}