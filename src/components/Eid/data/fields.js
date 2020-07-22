const fields = [
  {
    name: '照片',
    percentage: '80%'
  },
  {
    name: '姓名',
    percentage: '80%'
  },
  {
    name: '身分證字號',
    percentage: '80%'
  },
  {
    name: '出生別',
    detail: '家中排行，例如：長男',
    percentage: '80%'
  },
  {
    name: '身份編號',
    detail: '非身分證字號的編號方法',
    percentage: '80%'
  },
  {
    name: '口號',
    detail: '居住地簡寫加編號',
    percentage: '80%'
  },
  {
    name: '出生年月日',
    percentage: '80%'
  },
  {
    name: '父姓名',
    percentage: '80%'
  },
  {
    name: '母姓名',
    percentage: '80%'
  },
  {
    name: '配偶姓名',
    percentage: '80%'
  },
  {
    name: '本籍',
    detail: '祖籍、原籍',
    percentage: '80%'
  },
  {
    name: '寄籍',
    detail: '寄居地',
    percentage: '80%'
  },
  {
    name: '職業',
    percentage: '80%'
  },
  {
    name: '教育程度',
    percentage: '80%'
  },
  {
    name: '住址',
    percentage: '80%'
  },
  {
    name: '役別',
    percentage: '80%'
  },
  {
    name: '公民資格',
    detail: '是否有投票資格的註記',
    percentage: '80%'
  },
  {
    name: '國民義務勞動',
    percentage: '80%'
  },
  {
    name: '指紋符號',
    percentage: '80%'
  },
  {
    name: '戶籍記事欄',
    detail: '變動（畢業、搬家）註記',
    percentage: '80%'
  },
  {
    name: '發證日期與機關',
    percentage: '80%'
  },
  {
    name: '戶長姓名',
    percentage: '80%'
  },
  {
    name: '備蓋戳記',
    detail: '領完選票蓋章註記的欄位',
    percentage: '80%'
  },
  {
    name: '血型',
    percentage: '80%'
  },
  {
    name: '蓋戶口校正章欄位',
    percentage: '80%'
  },
  {
    name: '出生地',
    percentage: '80%'
  },
  {
    name: '卡片序號',
    percentage: '80%'
  },
  {
    name: '統一編號條碼',
    percentage: '80%'
  }
]

const fieldsOfIdCards = {
  // 36 43 54 65 75 94
  身分證字號: [false, false, true, true, true, true],
  出生別: [true, true, true, true, false, false],
  身份編號: [true, false, false, false, false, false],
  口號: [false, true, true, false, false, false],
  本籍: [true, true, true, true, true, false],
  寄籍: [true, false, false, false, false, false],
  職業: [true, true, true, true, true, false],
  教育程度: [true, true, true, true, false, false],
  公民資格: [true, false, false, false, false, false],
  國民義務勞動: [true, false, false, false, false, false],
  指紋符號: [true, false, false, false, false, false],
  戶籍記事欄: [true, true, true, true, false, false],
  戶長姓名: [false, true, false, false, false, false],
  備蓋戳記: [false, true, true, true, false, false],
  血型: [false, true, true, true, false, false],
  蓋戶口校正章欄位: [false, false, false, true, false, false],
  出生地: [false, false, false, false, true, true],
  卡片序號: [false, false, false, false, false, true],
  統一編號條碼: [false, false, false, false, false, true]
}

export { fields, fieldsOfIdCards }
