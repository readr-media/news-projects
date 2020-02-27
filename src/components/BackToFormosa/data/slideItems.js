export default {
  1: {
    animationPlayState: 'running',
    imgs: [
      {
        name: 'slide1',
        animation: 'slide1-img 3s ease-in forwards'
      }
    ],
    content: {
      color: 'dark',
      texts: [ '1979 年 12 月 10 日', '高雄爆發美麗島事件', '單純的遊行活動', '演變成激烈的警民衝突' ],
      position: { bottom: '4.83%', left: '12.99%' },
      animation: 'slide-content 1s 2s ease-in forwards'
    }
  },
  2: {
    bgColor: '#000',
    animationPlayState: 'paused',
    imgs: [
      {
        name: 'slide2-back',
        animation: 'slide2-img-back 3s ease-in forwards'
      },
      {
        name: 'slide2-front',
        animation: 'slide2-img-front 3s ease-in forwards'
      }
    ],
    content: {
      texts: [ '當時媒體批評黨外人士是', '「別有用心的陰謀份子」', '「製造暴力」', '把他們的行為解讀為', '破壞社會安定', '擾亂國家秩序' ],
      position: { top: '8.02%', left: '11.6%' },
      animation: 'slide-content 1s 2s ease-in forwards'
    }
  }
}
