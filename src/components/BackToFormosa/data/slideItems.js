export default {
  1: {
    canAnimate: true,
    bgImgs: [
      {
        name: 'slide1',
        animation: 'slide1 5s linear forwards',
      }
    ],
    content: {
      color: 'dark',
      texts: [ '1979 年 12 月 10 日', '高雄爆發美麗島事件', '單純的遊行活動', '演變成激烈的警民衝突' ],
      position: { bottom: '4.83%', left: '12.99%' }
    }
  },
  2: {
    bgColor: '#000',
    canAnimate: false,
    bgImgs: [
      {
        name: 'slide2-back',
        animation: 'slide2-back 5s linear forwards',
      },
      {
        name: 'slide2-front',
        animation: 'slide2-front 5s linear forwards',
      }
    ],
    content: {
      texts: [ '當時媒體批評黨外人士是', '「別有用心的陰謀份子」', '「製造暴力」', '把他們的行為解讀為', '破壞社會安定', '擾亂國家秩序' ],
      position: { top: '8.02%', left: '11.6%' }
    }
  }
}
