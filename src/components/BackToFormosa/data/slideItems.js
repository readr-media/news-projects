export default {
  1: {
    // bgStyle: { backgroundColor: '#000' },
    animationPlayState: 'running',
    pictures: [
      {
        name: 'slide1-back',
        className: 'slide-item__picture--cover'
        // animation: 'slide-img-front 3s ease-in forwards'
      },
      {
        name: 'slide1-front',
        className: 'slide-item__picture--cover'
        // animation: 'slide-img-back 3s ease-in forwards'
      }
    ],
    content: {
      classNames: [ 'slide-item__text--caption', 'slide-item__text--caption--dark' ],
      texts: [ '1979 年 12 月 10 日', '高雄爆發美麗島事件', '單純的遊行活動', '演變成激烈的警民衝突' ],
      position: { bottom: '4.83%', left: '12.99%' },
      // animation: 'slide-content 1s 2s ease-in forwards'
    }
  },
  2: {
    // bgStyle: { backgroundColor: '#000' },
    animationPlayState: 'paused',
    pictures: [
      {
        name: 'slide2-back',
        className: 'slide-item__picture--cover'
        // animation: 'slide-img-back 3s ease-in forwards'
      },
      {
        name: 'slide2-front',
        className: 'slide-item__picture--cover'
        // animation: 'slide-img-front 3s ease-in forwards'
      }
    ],
    content: {
      classNames: [ 'slide-item__text--caption', 'slide-item__text--caption--light' ],
      texts: [ '當時媒體批評黨外人士是', '「別有用心的陰謀份子」', '「製造暴力」', '把他們的行為解讀為', '破壞社會安定', '擾亂國家秩序' ],
      position: { top: '8.02%', left: '11.6%' },
      // animation: 'slide-content 1s 2s ease-in forwards'
    }
  },
  3: {
    // bgStyle: { backgroundColor: '#000' },
    animationPlayState: 'paused',
    pictures: [
      {
        name: 'slide3-bg',
        className: 'slide-item__picture--cover'
        // animation: 'slide-img-back 3s ease-in forwards'
      }
    ],
    content: {}
  },
  4: {
    // bgStyle: { backgroundColor: '#000' },
    animationPlayState: 'paused',
    pictures: [
      {
        name: 'slide4-back',
        className: 'slide-item__picture--cover'
        // animation: 'slide-img-back 3s ease-in forwards'
      },
      {
        name: 'slide4-front',
        className: 'slide-item__picture--cover'
        // animation: 'slide-img-front 3s ease-in forwards'
      }
    ],
    content: {
      classNames: [ 'slide-item__text--caption', 'slide-item__text--caption--light' ],
      texts: [ '輿論一面倒譴責黨外人士', '警總則發動大逮捕', '並於隔年 2 月 20 日', '以《懲治叛亂條例》第二條第一項叛亂罪', '起訴黃信介、施明德、張俊宏、姚嘉文、林義雄、陳菊、呂秀蓮、林弘宣等 8 人' ],
      position: { top: '7.9%', left: '10%' },
      // animation: 'slide-content 1s 2s ease-in forwards'
    }
  },
  5: {
    bgStyle: { backgroundImage: 'linear-gradient(to bottom, #000000, #a56c6a)' },
    animationPlayState: 'paused',
    pictures: [],
    content: {
      classNames: [ 'slide-item__text--single' ],
      texts: [ '在戒嚴時期，判刑二條一的結果，幾乎是唯一死刑⋯' ],
      position: { top: '50%', transform: 'translateY(-50%)' },
      // animation: 'slide-content 1s 2s ease-in forwards'
    }
  },
  5: {
    bgStyle: { backgroundColor: '#a56c6a' },
    animationPlayState: 'paused',
    pictures: [
      {
        name: 'slide6-bg',
        // animation: 'slide-img-back 3s ease-in forwards'
      },
      {
        name: 'slide6-title',
        // animation: 'slide-img-front 3s ease-in forwards'
      }
    ],
    content: {
      classNames: [ 'slide-item__text--description' ],
      texts: [ '3/18 到 3/28', '軍事法庭首次公開過程', '審理 8 名政治犯', '原本想藉此揭開', '美麗島謀反的真面目', '沒想到卻給民眾上了一堂民主大課⋯' ],
      position: { bottom: '6.11%', left: '6.94%' },
      // animation: 'slide-content 1s 2s ease-in forwards'
    }
  },
}
