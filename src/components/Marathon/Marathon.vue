<template>
  <div class="marathon">
    <section class="map">
      <div class="map__menu">
        <div>
          <button class="boston" :class="[this.race === 'boston' ? 'selected' : '']" @click="$_marathon_changeRace('boston')">波士頓</button>
          <button class="chicago" :class="[this.race === 'chicago' ? 'selected' : '']" @click="$_marathon_changeRace('chicago')">芝加哥</button>
          <button class="newyork" :class="[this.race === 'newyork' ? 'selected' : '']" @click="$_marathon_changeRace('newyork')">紐約</button>
          <button class="berlin" :class="[this.race === 'berlin' ? 'selected' : '']" @click="$_marathon_changeRace('berlin')">柏林</button>
          <button class="london" :class="[this.race === 'london' ? 'selected' : '']" @click="$_marathon_changeRace('london')">倫敦</button>
          <button class="tokyo" :class="[this.race === 'tokyo' ? 'selected' : '']" @click="$_marathon_changeRace('tokyo')">東京</button>
        </div>
        <div>
          <span>我的全馬完賽時間</span>
          <div class="map__userTime">
            <input ref="userTimeTrack" type="range" @change="$_marathon_updateUserTime">
          </div>
        </div>
        <div class="map__userTimeInfo">
          <img src="https://www.mirrormedia.mg/projects/images/marathon/userTime.png">
          <span ref="userTimeInfo" v-text="raceAverageTime"></span>
        </div>
      </div>
      <div class="map__images">
        <img ref="mapImage" src="http://www.mirrormedia.mg/projects/images/marathon/berlin.png">
        <canvas id="js-pixi"></canvas>
        <img class="map__images--compass" src="https://www.mirrormedia.mg/projects/images/marathon/compass.png">
      </div>
      <div class="map__control">
        <div class="map__timeInfo">
          <div id="timerMobile" class="map__timeInfo--timerMobile">00:00:00</div>
          <div class="map__timeInfo--control">
            <button class="btn--img mobile-only" ref="togglePlayMobile" @click="$_marathon_togglePlay()"><img src="https://www.mirrormedia.mg/projects/images/marathon/pause.png"></button>
            <button class="btn--img mobile-only" @click="$_marathon_restart()"><img src="https://www.mirrormedia.mg/projects/images/marathon/restart.png"></button>
            <button class="btn--filter desktop-only" :class="[this.filterCountry === 'all' ? 'selected' : '']" ref="filterCountryall" @click="$_marathon_filterCountry('all')">全部</button>
            <button class="btn--filter desktop-only" :class="[this.filterCountry === 'twn' ? 'selected' : '']" ref="filterCountrytwn" @click="$_marathon_filterCountry('twn')">台灣</button>
            <button class="btn--filter desktop-only" :class="[this.filterCountry === 'other' ? 'selected' : '']" ref="filterCountryother" @click="$_marathon_filterCountry('other')">非台灣</button>
            <button class="btn--filter desktop-only" :class="[this.filterGender === 'all' ? 'selected' : '']" ref="filterGenderall" @click="$_marathon_filterGender('all')">全部</button>
            <button class="btn--filter desktop-only" :class="[this.filterGender === 'm' ? 'selected' : '']" ref="filterGenderm" @click="$_marathon_filterGender('m')">男</button>
            <button class="btn--filter desktop-only" :class="[this.filterGender === 'w' ? 'selected' : '']" ref="filterGenderw" @click="$_marathon_filterGender('w')">女</button>
          </div>
        </div>
        <div class="map__sliderBar">
          <div id="js-track" class="map__sliderBarTrack">
            <div class="map__sliderBarTrack--fullTime" @click="$_marathon_moveTrackBar"></div>
            <div id="js-currentTrackTime" class="map__sliderBarTrack--currentTime" @click="$_marathon_moveTrackBar"></div>
            <div id="js-trackbutton" class="map__sliderBarTrack--trackbutton"></div>
          </div>
          <div class="map__sliderBarControl">
            <div id="timerDesktop" class="map__timeInfo--timerDesktop">00:00:00</div>
            <div>
              <button class="btn--img desktop-only" ref="togglePlayDesktop" @click="$_marathon_togglePlay()"><img src="https://www.mirrormedia.mg/projects/images/marathon/pause.png"></button>
              <button class="btn--img desktop-only" @click="$_marathon_restart()"><img src="https://www.mirrormedia.mg/projects/images/marathon/restart.png"></button>
              <button :class="[this.speedRatio === 1 ? 'selected' : '']" @click="$_marathon_adjustSpeed(1)">60x</button>
              <button :class="[this.speedRatio === 2 ? 'selected' : '']" @click="$_marathon_adjustSpeed(2)">120x</button>
              <button :class="[this.speedRatio === 10 ? 'selected' : '']" @click="$_marathon_adjustSpeed(10)">600x</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="intro">
      <div class="intro__content">
        <p>看完了六大馬，台灣跑者的跑步習慣又是什麼呢？因為台北馬不願意提供資料，我們嘗試從 Garmin 的用戶資料來看看，跑台北馬的人都是什麼樣的人，如果你想要完成一個馬拉松，並在時限內完賽（台北馬限時 5 小時 30 分）又需要什麼樣的訓練呢？</p>
        <p>參加 2016 年台北馬拉松的 5560 名參賽者，有 34% 的人使用 Garmin 手錶紀錄。這些成功完賽的選手們⋯⋯</p>
        <span>這些成功完賽的選手們</span>
        <div class="triangle" @click="smoothScroll('.chart--01')"></div>
        <div class="intro__menu">
          <div @click="smoothScroll('.chart--1')">
            <img src="https://www.mirrormedia.mg/projects/images/marathon/intro-icon-01.png">
            <p>平常有運動習慣嗎？</p>
          </div>
          <div @click="smoothScroll('.chart--2')">
            <img src="https://www.mirrormedia.mg/projects/images/marathon/intro-icon-02.png">
            <p>平均每週跑多少公里？</p>
          </div>
          <div @click="smoothScroll('.chart--3')">
            <img src="https://www.mirrormedia.mg/projects/images/marathon/intro-icon-03.png">
            <p>臨時抱佛腳指數？</p>
          </div>
          <div @click="smoothScroll('.chart--5')">
            <img src="https://www.mirrormedia.mg/projects/images/marathon/intro-icon-04.png">
            <p>大家平常都在哪裡練習？</p>
          </div>
          <div @click="smoothScroll('.chart--6')">
            <img src="https://www.mirrormedia.mg/projects/images/marathon/intro-icon-05.png">
            <p>高手們都怎麼練習？</p>
          </div>
        </div>
        <img class="intro__decoration--mobile" src="https://www.mirrormedia.mg/projects/images/marathon/intro-m.png">
      </div>
      <div class="intro__decoration--desktop">
        <div class="intro__decoration--lroad"></div>
        <img class="intro__decoration--sroad" src="https://www.mirrormedia.mg/projects/images/marathon/intro-d.png">
      </div>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="1"
        :chartPosition="`right`"
        :chartPeopleImage="`01`"
        :chartSubtitle="`每週跑步次數`"
        :chartTitle="`平常有運動習慣嗎？`">
      </marathon-chart>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="2"
        :chartDescr="`小於10K的是零！看來每週都至少要有一點付出，才能成功完成全馬喔！`"
        :chartPeopleImage="`02`"
        :chartTitle="`平均每週跑多少公里？`">
      </marathon-chart>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="3"
        :chartPosition="`right`"
        :chartPeopleImage="`03`"
        :chartSubtitle="`每月跑量`"
        :chartTitle="`臨時抱佛腳指數？`">
      </marathon-chart>
      <marathon-chart
        :chart="4"
        :chartDescr="`愈靠近比賽，跑步的次數跟里程數果然愈高！`"
        :chartPosition="`right`">
      </marathon-chart>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="5"
        :chartPeopleImage="`04`"
        :chartSubtitle="`我也想加入！`"
        :chartTitle="`這些人平常都在哪裡練習呢？`">
      </marathon-chart>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="6"
        :chartPosition="`right`"
        :chartSubtitle="`我想要變更厲害！`"
        :chartTitle="`高手們平常是怎麼練習？`">
      </marathon-chart>
      <marathon-chart
        :chart="7"
        :chartPeopleImage="`05`"
        :chartPosition="`right`">
      </marathon-chart>
    </section>
    <section class="credit">
      <div class="mobile">
        <span>文字：李又如 視覺設計：許玲瑋、v_k 網頁製作：ttt</span>
        <img src="https://www.mirrormedia.mg/projects/images/marathon/credit-m.png">
      </div>
      <div class="desktop">
        <span>文字：李又如<br>視覺設計：許玲瑋、v_k<br>網頁製作：ttt</span>
        <img src="https://www.mirrormedia.mg/projects/images/marathon/credit-d.png">
      </div>
    </section>
    <section class="facebook">
      <div class="fb-comments" data-href="https://www.mirrormedia.mg/projects/rent-house/" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </section>
  </div>
</template>
<script>
  import { smoothScroll } from 'kc-scroll'
  import _ from 'lodash'
  import Highcharts from 'highcharts'
  import MarathonChart from './MarathonChart.vue'
  import moment from 'moment'

  import superagent from 'superagent'
  const currentSplit = []
  const timeAccumulativePerSplit = []
  const deltaPerSplitBySecond = []
  const speedData = []
  const point = []
  const group = []
  const colorSelected = '0x493b5c'
  const colorUnselected = '0xb7a3d1'
  const pathAmount = 10
  const containers = []
  // 0xF45B69
  let runners = []
  let canvasW
  let canvasH
  let tickerTimer
  let tickerValue = 1
  let isPause = false
  let isCompleted = false
  let app
  let container
  let containerUserTime
  let containerTwnMale
  let containerTwnFemale
  let containerOtherMale
  let containerOtherFemale
  

  let dataRunner
  let maxRunnerTime
  let minRunnerTime
  let averageTime
  let paths
  let pathIndex
  let spriteUserTime

  let pathsTotalDistance
  let pathsRatioBySplit
  let pathsDeltaBySplit

  function fetchData(url) {
    return new Promise((resolve, reject) => {
      superagent
      .get(url)
      .end((err, res) => {
        if (!err && res) {
          return resolve(JSON.parse(res.text))
        } else {
          return reject(err)
        }
      })
    })
  }

  function convertCoordinates(data, zoomRatio) {
    return _.map(data, d => [Number((d[0] * zoomRatio).toFixed(4)), Number((d[1] * zoomRatio).toFixed(4))])
  }

  function createPaths(innerTrack, outerTrack, pathAmount = 10) {
    const splitAmount = innerTrack.length
    const paths = []
    // let diffX
    for (let i = 0; i < pathAmount; i += 1) {
      const path = []
      // console.log('-------')
      for (let j = 0; j < splitAmount; j += 1) {
        if (i === 0) {
          path.push(innerTrack[j])
        } else if (i === (pathAmount - 1)) {
          path.push(outerTrack[j])
        } else {
          const shiftX = (outerTrack[j][0] - innerTrack[j][0]) / (pathAmount - 1)
          const shiftY = (outerTrack[j][1] - innerTrack[j][1]) / (pathAmount - 1)
          const coordinate = [(innerTrack[j][0] + (i * shiftX)), (innerTrack[j][1] + (i * shiftY))]
          path.push(coordinate)
          // diffX = Math.abs(outerTrack[j][0] - innerTrack[j][0]) / (pathAmount - 1)
          // path.push(getLI(innerTrack[j], outerTrack[j], (diffX * (i + 1))))
        }
      }
      paths.push(path)
    }
    return paths
  }

  function getPathDistanceBySplit(paths, pathAmount, splitAmount) {
    const distancePerSplit = []
    for (let i = 0; i < pathAmount; i += 1) {
      const distances = []
      for (let j = 0; j < splitAmount - 1; j += 1) {
        distances.push(getPythagoreanValue(paths[i][j], paths[i][j + 1]))
      }
      distancePerSplit.push(distances)
    }
    return distancePerSplit
  }

  function calculatePathsTotalDistance(pathDistances, pathAmount) {
    const distancePerPath = []
    for (let i = 0; i < pathAmount; i += 1) {
      const splitAmount = pathDistances[i].length
      let distance = 0
      for (let j = 0; j < splitAmount; j += 1) {
        distance += pathDistances[i][j]
      }
      distancePerPath.push(distance)
    }
    return distancePerPath
  }

  function calculatePathsRatioBySplit(pathDistances, pathsTotalDistance, pathAmount) {
    const ratioPerPath = []
    for (let i = 0; i < pathAmount; i += 1) {
      const splitAmount = pathDistances[i].length
      const ratioPerSplit = []
      for (let j = 0; j < splitAmount; j += 1) {
        const ratio = pathDistances[i][j] / pathsTotalDistance[i]
        ratioPerSplit.push(ratio)
      }
      ratioPerPath.push(ratioPerSplit)
    }
    return ratioPerPath
  }

  function calculateTimePerSplit(pathsRatioBySplit, totalTime) {
    const splitAmount = _.get(pathsRatioBySplit, ['length'])
    const timePerSplit = []
    for (let i = 0; i < splitAmount; i += 1) {
      const time = Math.round(pathsRatioBySplit[i] * totalTime)
      timePerSplit.push(time)
    }
    return timePerSplit
  }

  function calculateTimeAccumulativePerSplit(timePerSplit, totalTime) {
    const splitAmount = _.get(timePerSplit, ['length'])
    const timeAccumulativePerSplit = []
    for (let i = 0; i < splitAmount; i += 1) {
      if (i === 0) {
        timeAccumulativePerSplit.push(timePerSplit[i])
      } else if (i === (splitAmount - 1)) {
        timeAccumulativePerSplit.push(totalTime)
      } else {
        timeAccumulativePerSplit.push(timeAccumulativePerSplit[i - 1] + timePerSplit[i])
      }
    }
    return timeAccumulativePerSplit
  }

  function calculatePathsDeltaBySplit(paths) {
    const pathAmount = _.get(paths, ['length'])
    const pathsDeltaBySplit = []
    for (let i = 0; i < pathAmount; i += 1) {
      const splitAmount = _.get(paths, [i, 'length'])
      const deltaBysplit = []
      for (let j = 0; j < splitAmount - 1; j += 1) {
        const deltaX = paths[i][j + 1][0] - paths[i][j][0]
        const deltaY = paths[i][j + 1][1] - paths[i][j][1]
        deltaBysplit.push([deltaX, deltaY])
      }
      pathsDeltaBySplit.push(deltaBysplit)
    }
    return pathsDeltaBySplit
  }

  function calculateDeltaPerSplitBySecond(timePerSplit, pathsDeltaBySplit) {
    const splitAmount = _.get(timePerSplit, ['length'])
    const deltaPerSecondBySplit = []
    for (let i = 0; i < splitAmount; i += 1) {
      const deltaXPerSecond = pathsDeltaBySplit[i][0] / timePerSplit[i]
      const deltaYPerSecond = pathsDeltaBySplit[i][1] / timePerSplit[i]
      deltaPerSecondBySplit.push([deltaXPerSecond, deltaYPerSecond])
    }
    return deltaPerSecondBySplit
  }

  function calculateCurrentSplit(second, timeAccumulativePerSplit) {
    const splitAmount = _.get(timeAccumulativePerSplit, ['length'])
    let currentSplit
    for (let i = 0; i < splitAmount; i += 1) {
      if (timeAccumulativePerSplit[i] > second) {
        return i
      }
    }
    return splitAmount
  }

  function updatePoint(second) {
    const runnerAmount = _.get(runners, [ 'length' ])
    // const runnerPoint = new PIXI.Graphics()
    // runnerPoint.beginFill(0xF45B69)
    // runnerPoint.drawCircle(0, 0, 2)
    // const texture = app.renderer.generateTexture(runnerPoint)
    // runners = []
    // for (let i = 0; i < runnerAmount; i += 1) {
    //   if (second < speedData[i][0]) {
    //     const point = new PIXI.Sprite(texture)
    //     point.anchor.set(0.5)
    //     point.scale.set(0.6)
    //     currentSplit[i] = calculateCurrentSplit(tickerTimer, timeAccumulativePerSplit[i])
    //     let secondInSplit
    //     if (currentSplit[i] === 0) {
    //       secondInSplit = second
    //     } else {
    //       secondInSplit = second - timeAccumulativePerSplit[i][currentSplit[i] - 1]
    //     }
    //     const splitOrigin = paths[pathIndex[i]][currentSplit[i]]
    //     const deltaMoveX = secondInSplit * deltaPerSplitBySecond[i][currentSplit[i]][0]
    //     const deltaMoveY = secondInSplit * deltaPerSplitBySecond[i][currentSplit[i]][1]
    //     point.x = splitOrigin[0] + deltaMoveX
    //     point.y = splitOrigin[1] + deltaMoveY
    //     runners.push(point)
    //     container.addChild(point)
    //   } else {
    //     runners.push('')
    //   }
    // }
  }

  function getPythagoreanValue(startPoint, endPoint) {
    return Number(Math.sqrt(((startPoint[0] - endPoint[0]) ** 2) + ((startPoint[1] - endPoint[1]) ** 2)).toFixed(4))
  }

  function secondToHHMMSS(second) {
    return moment.utc(second * 1000).format('HH:mm:ss')
  }

  function setSlider(maxRunnerTime) {
    const slider = document.querySelector('#js-track')
    noUiSlider.create(slider, {
      start: 0,
      connect: true,
      range: {
        min: 0,
        max: maxRunnerTime,
      },
    })
    slider.noUiSlider.on('start', () => {
      app.ticker.stop()
    })
    slider.noUiSlider.on('end', (e) => {
      tickerTimer = e[0]
      app.ticker.start()
    })
  }

  function getHighlightIndex(second) {
    // points = _.map(_.filter(dataRunner, r => r[2] === 'TWN'), r => r[0])
    // points = points.map(i => _.findIndex(dataRunner, d => d[0] === i))
    const origin = _.map(dataRunner, r => r[4])
    origin.push(second)
    const sorted = _.sortBy(origin)
    let index
    let finded
    for (let i = 0; i < sorted.length; i += 1) {
      if (sorted[i] === second) {
        index = i
        break
      }
    }
    // console.log('origin', origin)
    // console.log('second', second)
    // console.log('sorted', sorted)
    if (!(index === 0 || index === (sorted.length - 2))) {
      let before = sorted[index - 1]
      let after = sorted[index + 1]
      if (Math.abs(after - second) < Math.abs(before - second)) {
        finded = after
      } else {
        finded = before
      }
    } else {
      finded = sorted[index]
    }
    return _.findIndex(origin, d => d === finded)
  }

  export default {
    name: 'MarathonProject',
    components: {
      'marathon-chart': MarathonChart
    },
    data () {
      return {
        chart01: undefined,
        filterCountry: 'all',
        filterGender: 'all',
        loading: true,
        race: 'berlin',
        raceAverageTime: '00:00:00',
        speedRatio: 1
      }
    },
    beforeMount () {
      // this.$_marathon_setRaceInfo('berlin')
      
    },
    mounted () {
      window.PIXI = require('pixi.js')
      window.filters = require('pixi-filters')
      // window.superagent = require('superagent')
      this.$_marathon_detectWebGLSupported()
      canvasW = document.querySelector('.map__images').offsetWidth
      canvasH = document.querySelector('.map__images').offsetHeight

      app = new PIXI.Application(canvasW, canvasH, { antialias: false, transparent: true, view: document.querySelector('#js-pixi') })
      this.$_marathon_setRaceInfo('berlin')
      // this.$_marathon_resize()
      window.addEventListener('resize', this.$_marathon_resize)
    },
    methods: {
      calculateRunnerTrack(data) {
        const dataMap = data[0]
        dataRunner = data[1]
        tickerTimer = 0
        
        const splitAmount = _.get(dataMap, ['coordinates', 'length'])
        maxRunnerTime = _.max(_.map(dataRunner, r => r[4]))
        minRunnerTime = _.min(_.map(dataRunner, r => r[4]))

        group[0] = this.$_marathon_filter('twnmale')
        group[1] = this.$_marathon_filter('twnfemale')
        group[2] = this.$_marathon_filter('otmale')
        group[3] = this.$_marathon_filter('otfemale')
        console.log('group', group)
        const total = group[0].length + group[1].length + group[2].length + group[3].length

        for (let i = 0; i < 4; i += 1) {
          containers[i] = new PIXI.particles.ParticleContainer(total, {
            scale: true,
            position: true,
            uvs: true,
            tint: true,
          })
          app.stage.addChild(containers[i])
        }

        const runnerPoint = new PIXI.Graphics()
        runnerPoint.beginFill(colorSelected)
        runnerPoint.drawCircle(0, 0, 2)
        const texture = app.renderer.generateTexture(runnerPoint)
        const innerTrack = convertCoordinates(_.get(dataMap, ['inner']), canvasW / 2560)
        const outerTrack = convertCoordinates(_.get(dataMap, ['outer']), canvasW / 2560)
        paths = createPaths(innerTrack, outerTrack, pathAmount)
        const pathDistances = getPathDistanceBySplit(paths, pathAmount, splitAmount)
        pathsTotalDistance = calculatePathsTotalDistance(pathDistances, pathAmount)
        pathsRatioBySplit = calculatePathsRatioBySplit(pathDistances, pathsTotalDistance, pathAmount)
        pathsDeltaBySplit = calculatePathsDeltaBySplit(paths)

        for (let i = 0; i < 4; i += 1) {
          const amount = group[i].length
          for (let j = 0; j < amount; j += 1) {
            const point = new PIXI.Sprite(texture)
            point.anchor.set(0.5)
            point.scale.set(0.6)
            point.totalTime = _.get(group[i], [j, 4])
            point.pathIndex = _.get(group[i], [j, 0]) % pathAmount
            point.timePerSplit = calculateTimePerSplit(pathsRatioBySplit[point.pathIndex], point.totalTime)
            point.timeAccumulativePerSplit = calculateTimeAccumulativePerSplit(point.timePerSplit, point.totalTime)
            point.deltaPerSplitBySecond = calculateDeltaPerSplitBySecond(point.timePerSplit, pathsDeltaBySplit[point.pathIndex])
            point.speedData = _.slice(group[i][j], 4)
            point.currentSplit = 0
            point.isFinished = false
            runners.push(point)
            containers[i].addChild(point)
          }
        }

        const runnerAmount = runners.length
        // const runnerAmount = 3
        averageTime = _.floor(_.sum(_.map(dataRunner, r => r[4])) / runners.length)
        this.raceAverageTime = secondToHHMMSS(averageTime)
        this.$refs.userTimeTrack.max = maxRunnerTime
        this.$refs.userTimeTrack.value = averageTime
        this.$refs.userTimeTrack.min = minRunnerTime
        const highlightIndex =  getHighlightIndex(averageTime)
        containerUserTime = new PIXI.Container()
        app.stage.addChild(containerUserTime)
        const textureUserTime = PIXI.Texture.fromImage('/projects/images/marathon/userTime-icon.png')
        spriteUserTime = new PIXI.Sprite(textureUserTime)
        spriteUserTime.anchor.set(0.5, 1)
        spriteUserTime.scale.set(0.25)
        spriteUserTime.totalTime = _.get(dataRunner, [highlightIndex, 4])
        spriteUserTime.pathIndex = _.get(dataRunner, [highlightIndex, 0]) % pathAmount
        spriteUserTime.timePerSplit = calculateTimePerSplit(pathsRatioBySplit[spriteUserTime.pathIndex], spriteUserTime.totalTime)
        spriteUserTime.timeAccumulativePerSplit = calculateTimeAccumulativePerSplit(spriteUserTime.timePerSplit, spriteUserTime.totalTime)
        spriteUserTime.deltaPerSplitBySecond = calculateDeltaPerSplitBySecond(spriteUserTime.timePerSplit, pathsDeltaBySplit[spriteUserTime.pathIndex])
        spriteUserTime.speedData = _.slice(dataRunner[highlightIndex], 4)
        spriteUserTime.currentSplit = 0
        spriteUserTime.isFinished = false
        
        // console.log('spriteUserTime', spriteUserTime)

        containerUserTime.addChild(spriteUserTime)
        this.loading = false

        app.ticker.add(() => {

          if (!isCompleted) {
            tickerTimer += tickerValue
            if (tickerTimer >= maxRunnerTime) {
              isCompleted = true
            } else {
              isCompleted = false
            }
            document.querySelector('#timerMobile').innerText = secondToHHMMSS(tickerTimer)
            document.querySelector('#timerDesktop').innerText = secondToHHMMSS(tickerTimer)
            document.querySelector('#js-currentTrackTime').style.width = `${(tickerTimer / maxRunnerTime) * 100}%`
            document.querySelector('#js-trackbutton').style.left = `${(tickerTimer / maxRunnerTime) * 100}%`

            if (tickerTimer < spriteUserTime.speedData[0]) {
              let secondInSplit
              if (tickerTimer > spriteUserTime.timeAccumulativePerSplit[spriteUserTime.currentSplit]) {
                spriteUserTime.currentSplit += 1
              }
              if (spriteUserTime.currentSplit === 0) {
                secondInSplit = tickerTimer
              } else {
                secondInSplit = tickerTimer - spriteUserTime.timeAccumulativePerSplit[spriteUserTime.currentSplit - 1]
              }
              const splitOrigin = paths[spriteUserTime.pathIndex][spriteUserTime.currentSplit]
              const deltaMoveX = secondInSplit * spriteUserTime.deltaPerSplitBySecond[spriteUserTime.currentSplit][0]
              const deltaMoveY = secondInSplit * spriteUserTime.deltaPerSplitBySecond[spriteUserTime.currentSplit][1]
              spriteUserTime.x = splitOrigin[0] + deltaMoveX
              spriteUserTime.y = splitOrigin[1] + deltaMoveY
            } else {
              spriteUserTime.x = -1
              spriteUserTime.y = -1
            }

            for (let i = 0; i < runnerAmount; i += 1) {
              const runner = runners[i]
              if (tickerTimer < runner.speedData[0]) {
                let secondInSplit
                if (tickerTimer > runner.timeAccumulativePerSplit[runner.currentSplit]) {
                  runner.currentSplit += 1
                }
                if (runner.currentSplit === 0) {
                  secondInSplit = tickerTimer
                } else {
                  secondInSplit = tickerTimer - runner.timeAccumulativePerSplit[runner.currentSplit - 1]
                }
                const splitOrigin = paths[runner.pathIndex][runner.currentSplit]
                const deltaMoveX = secondInSplit * runner.deltaPerSplitBySecond[runner.currentSplit][0]
                const deltaMoveY = secondInSplit * runner.deltaPerSplitBySecond[runner.currentSplit][1]
                runner.x = splitOrigin[0] + deltaMoveX
                runner.y = splitOrigin[1] + deltaMoveY
              } else {
                runner.x = -1
                runner.y = -1
                // console.log(runner)
                // runner.visible = 0
                // runner.updateTransform()
                // runner.destroy()
              }
            }
          }
        })
      },
      $_marathon_adjustSpeed(speed) {
        tickerValue = speed
        this.speedRatio = speed
      },
      $_marathon_changeRace(race) {
        for (let i = 0; i < 4; i += 1) {
          app.stage.removeChild(containers[i])
        }
        app.stage.removeChild(containerUserTime)
        this.race = race
        this.$refs.mapImage.src = `http://www.mirrormedia.mg/projects/images/marathon/${race}.png`
        this.$_marathon_setRaceInfo(race)
        // setRace
      },
      $_marathon_detectWebGLSupported() {
        let type = 'WebGL'
        if (!PIXI.utils.isWebGLSupported()) {
          type = 'canvas'
        }
        PIXI.utils.sayHello(type)
      },
      $_marathon_filter(category) {
        switch (category) {
          case 'twnmale':
            return _.filter(dataRunner, (r) => {
              return (r[2] === 'TWN') && (r[3] === 'M')
            })
          case 'twnfemale':
            return _.filter(dataRunner, (r) => {
              return (r[2] === 'TWN') && (r[3] === 'W' || r[3] === 'F')
            })
          case 'otmale':
            return _.filter(dataRunner, (r) => {
              return (r[2] !== 'TWN') && (r[3] === 'M')
            })
          case 'otfemale':
            return _.filter(dataRunner, (r) => {
              return (r[2] !== 'TWN') && (r[3] === 'W' || r[3] === 'F')
            })
          default:
            return
        }
      },
      $_marathon_filterCountry(option) {
        this.filterCountry = option
        this.$_marathon_adjustCategory()
      },
      $_marathon_filterGender(option) {
        this.filterGender = option
        this.$_marathon_adjustCategory()
      },
      $_marathon_adjustCategory() {
        const greyPoint = new PIXI.Graphics()
        greyPoint.beginFill(colorUnselected)
        greyPoint.drawCircle(0, 0, 2)
        const redPoint = new PIXI.Graphics()
        redPoint.beginFill(colorSelected)
        redPoint.drawCircle(0, 0, 2)
        const twnFemaleIndex = group[0].length
        const otherMaleIndex = group[0].length + group[1].length
        const otherFemaleIndex = group[0].length + group[1].length + group[2].length
        app.ticker.stop()
        if (this.filterCountry === 'all' && this.filterGender === 'all') {
          runners[0].texture = app.renderer.generateTexture(redPoint)
          runners[twnFemaleIndex].texture = app.renderer.generateTexture(redPoint)
          runners[otherMaleIndex].texture = app.renderer.generateTexture(redPoint)
          runners[otherFemaleIndex].texture = app.renderer.generateTexture(redPoint)
        }
        if (this.filterCountry === 'twn' && this.filterGender === 'all') {
          runners[0].texture = app.renderer.generateTexture(redPoint)
          runners[twnFemaleIndex].texture = app.renderer.generateTexture(redPoint)
          runners[otherMaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
        }
        if (this.filterCountry === 'other' && this.filterGender === 'all') {
          runners[0].texture = app.renderer.generateTexture(greyPoint)
          runners[twnFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherMaleIndex].texture = app.renderer.generateTexture(redPoint)
          runners[otherFemaleIndex].texture = app.renderer.generateTexture(redPoint)
        }
        if (this.filterCountry === 'all' && this.filterGender === 'm') {
          runners[0].texture = app.renderer.generateTexture(redPoint)
          runners[twnFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherMaleIndex].texture = app.renderer.generateTexture(redPoint)
          runners[otherFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
        }
        if (this.filterCountry === 'all' && this.filterGender === 'w') {
          runners[0].texture = app.renderer.generateTexture(greyPoint)
          runners[twnFemaleIndex].texture = app.renderer.generateTexture(redPoint)
          runners[otherMaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherFemaleIndex].texture = app.renderer.generateTexture(redPoint)
        }
        if (this.filterCountry === 'twn' && this.filterGender === 'm') {
          runners[0].texture = app.renderer.generateTexture(redPoint)
          runners[twnFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherMaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
        }
        if (this.filterCountry === 'twn' && this.filterGender === 'w') {
          runners[0].texture = app.renderer.generateTexture(greyPoint)
          runners[twnFemaleIndex].texture = app.renderer.generateTexture(redPoint)
          runners[otherMaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
        }
        if (this.filterCountry === 'other' && this.filterGender === 'm') {
          runners[0].texture = app.renderer.generateTexture(greyPoint)
          runners[twnFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherMaleIndex].texture = app.renderer.generateTexture(redPoint)
          runners[otherFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
        }
        if (this.filterCountry === 'other' && this.filterGender === 'w') {
          runners[0].texture = app.renderer.generateTexture(greyPoint)
          runners[twnFemaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherMaleIndex].texture = app.renderer.generateTexture(greyPoint)
          runners[otherFemaleIndex].texture = app.renderer.generateTexture(redPoint)
        }
        app.ticker.start()
      },
      $_marathon_moveTrackBar(e) {
        app.ticker.stop()
        const runnersAmount = _.get(runners, [ 'length' ])
        const newPercentageTime = e.layerX / e.target.parentNode.offsetWidth
        tickerTimer = Math.floor(maxRunnerTime * newPercentageTime)
        for (let i = 0; i < runnersAmount; i += 1) {
          runners[i].currentSplit = calculateCurrentSplit(tickerTimer, runners[i].timeAccumulativePerSplit)
        }
        // updatePoint(tickerTimer)
        app.ticker.start()
      },
      $_marathon_resize() {
        canvasW = document.querySelector('.map__images').offsetWidth
        canvasH = document.querySelector('.map__images').offsetHeight
        const ratio = Math.min(canvasW / app.renderer.width, canvasH / app.renderer.height)
        app.stage.scale.x = ratio
        app.stage.scale.y = ratio
      },
      $_marathon_restart() {
        const runnerAmount = _.get(dataRunner, ['length'], 0)
        tickerTimer = 0
        for (let i = 0; i < runnerAmount; i += 1) {
          currentSplit[i] = 0
        }
      },
      $_marathon_setRaceInfo(race) {
        Promise.all([fetchData(`/projects/data/marathon/${race}Map.json`), fetchData(`/projects/data/marathon/${race}Data.json`)])
        .then((data) => {
          console.log(data)
          this.race = race
          this.$refs.mapImage.src = `http://www.mirrormedia.mg/projects/images/marathon/${race}.png`
          this.calculateRunnerTrack(data)
        })
      },
      $_marathon_togglePlay() {
        isPause = !isPause
        if (isPause) {
          app.ticker.stop()
          this.$refs.togglePlayMobile.querySelector('img').src = `https://www.mirrormedia.mg/projects/images/marathon/play.png`
          this.$refs.togglePlayDesktop.querySelector('img').src = `https://www.mirrormedia.mg/projects/images/marathon/play.png`
        } else {
          app.ticker.start()
          this.$refs.togglePlayMobile.querySelector('img').src = `https://www.mirrormedia.mg/projects/images/marathon/pause.png`
          this.$refs.togglePlayDesktop.querySelector('img').src = `https://www.mirrormedia.mg/projects/images/marathon/pause.png`
        }
      },
      $_marathon_updateUserTime(e) {
        const selectedTime = e.target.value
        const highlightIndex =  getHighlightIndex(selectedTime)
        this.raceAverageTime = secondToHHMMSS(selectedTime)
        this.$_marathon_updateUserTimePoint(highlightIndex)
      },
      $_marathon_updateUserTimePoint(highlightIndex) {
        app.ticker.stop()
        spriteUserTime.totalTime = _.get(dataRunner, [highlightIndex, 4])
        spriteUserTime.pathIndex = _.get(dataRunner, [highlightIndex, 0]) % pathAmount
        spriteUserTime.timePerSplit = calculateTimePerSplit(pathsRatioBySplit[spriteUserTime.pathIndex], spriteUserTime.totalTime)
        spriteUserTime.timeAccumulativePerSplit = calculateTimeAccumulativePerSplit(spriteUserTime.timePerSplit, spriteUserTime.totalTime)
        spriteUserTime.deltaPerSplitBySecond = calculateDeltaPerSplitBySecond(spriteUserTime.timePerSplit, pathsDeltaBySplit[spriteUserTime.pathIndex])
        spriteUserTime.speedData = _.slice(dataRunner[highlightIndex], 4)
        spriteUserTime.currentSplit = calculateCurrentSplit(tickerTimer, spriteUserTime.timeAccumulativePerSplit)
        if (tickerTimer < spriteUserTime.speedData[0]) {
          let secondInSplit
          if (spriteUserTime.currentSplit === 0) {
            secondInSplit = tickerTimer
          } else {
            secondInSplit = tickerTimer - spriteUserTime.timeAccumulativePerSplit[spriteUserTime.currentSplit - 1]
          }
          const splitOrigin = paths[spriteUserTime.pathIndex][spriteUserTime.currentSplit]
          const deltaMoveX = secondInSplit * spriteUserTime.deltaPerSplitBySecond[spriteUserTime.currentSplit][0]
          const deltaMoveY = secondInSplit * spriteUserTime.deltaPerSplitBySecond[spriteUserTime.currentSplit][1]
          spriteUserTime.x = splitOrigin[0] + deltaMoveX
          spriteUserTime.y = splitOrigin[1] + deltaMoveY
        } else {
          spriteUserTime.x = -1
          spriteUserTime.y = -1
        }
        app.ticker.start()
      },
      smoothScroll
    },
  }
</script>
<style lang="stylus" scoped>

h1, h2, h3
  margin 0

p
  font-size 18px
  font-weight 300
  text-align justify
  line-height 1.5
  &:first-of-type
    margin-top 0
  &:last-of-type
    margin-bottom 0

button
  cursor pointer
img
  width 100%
  height auto
  vertical-align middle

.btn--img
  font-size 0 !important

.btn--filter
  width 64px
  height 20px
  font-size 14px
  background-color #fff !important
  border-radius 3px
  &.selected
    border 2px solid #333
  &:nth-last-of-type(4)
    margin-right 20px
.marathon
  width 100%
  background-image url(https://www.mirrormedia.mg/projects/images/marathon/bg.png)
  background-repeat repeat
  background-size 36px 768px
  overflow hidden
.map
  display flex
  flex-direction column
  position relative
  width 100%
  height 100vh
  max-height 736px
  color #333
  font-size 18px
  background-color #cbc6bf
  &__menu
    position relative
    padding 38px 0 0
    padding-left calc((100% - 300px) / 2)
    padding-right calc((100% - 300px) / 2)
    background-image url(https://www.mirrormedia.mg/projects/images/marathon/road-02.png)
    background-repeat repeat-x
    background-size 19px 38px
    
    > div
      display flex
      flex-wrap wrap
      justify-content space-between
      margin 5px auto
      span
        margin 10px auto 0
    button
      display flex
      justify-content center
      align-items center
      position relative
      width 80px
      height 80px
      margin 5px 0
      padding 0
      color #fff
      font-size 20px
      text-align center
      background-color #333
      border none
      border-radius 5px
      &.selected
        &:after
          content ""
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          width 100%
          height 100%
          background-color #fff
          background-size 60px 60px
          background-repeat no-repeat
          background-position center center
          border-radius 5px
      &.boston
        &.selected
          &:after
            background-image url(https://www.mirrormedia.mg/projects/images/marathon/logo-boston.jpg)    
      &.chicago
        &.selected
          &:after
            background-image url(https://www.mirrormedia.mg/projects/images/marathon/logo-chicago.jpg)
      &.newyork
        &.selected
          &:after
            background-image url(https://www.mirrormedia.mg/projects/images/marathon/logo-newyork.jpg)
      &.berlin
        &.selected
          &:after
            background-image url(https://www.mirrormedia.mg/projects/images/marathon/logo-berlin.jpg)
      &.london
        &.selected
          &:after
            background-image url(https://www.mirrormedia.mg/projects/images/marathon/logo-london.jpg)
      &.tokyo
        &.selected
          &:after
            background-image url(https://www.mirrormedia.mg/projects/images/marathon/logo-tokyo.jpg)
  &__userTime
    display flex
    align-items center
    position relative
    width 100%
    height 18px
    margin 5px 0
    input[type="range"]
      -webkit-appearance none
      appearance none
      width 100%
      margin 0 auto
      background transparent
    input[type=range]:focus
      outline none
    input[type=range]::-ms-track
      width 100%
      cursor pointer
      background transparent
      border-color transparent
      color transparent
    input[type=range]::-webkit-slider-thumb
      -webkit-appearance none
      width 8px
      height 16px
      padding 2.5px
      margin-top -5px
      background #e9edf3
      border 2px solid #333
      cursor pointer
      pointer-events auto
    input[type=range]::-moz-range-thumb
      width 8px
      height 16px
      padding 2.5px
      background #e9edf3
      border 2px solid #333
      cursor pointer
      pointer-events auto
    input[type=range]::-ms-thumb
      width 8px
      height 16px
      padding 2.5px
      background #e9edf3
      border 2px solid #333
      cursor pointer
      pointer-events auto
    input[type=range]::-webkit-slider-runnable-track
      width: 100%
      height 5px
      cursor pointer
      background: #fff
      border-radius 5px
    input[type="range"]::-moz-range-track
      width: 100%
      height 5px
      cursor pointer
      background: #fff
      border-radius 5px
    input[type=range]::-ms-track
      width: 100%
      height 5px
      cursor pointer
      background: #fff
      border-radius 5px
    // &--full
    //   position absolute
    //   top 5px
    //   left 0
    //   right 0
    //   width 100%
    //   height 5px
    //   background-color #fff
    //   border-radius 5px
    // &--current
    //   position absolute
    //   top 5px
    //   left 0
    //   right 0
    //   width 50%
    //   height 5px
    //   background-color #000
    //   border-radius 5px
    // &--btn
    //   position absolute
    //   top 0
    //   left 50%
    //   right 0
    //   width 8px
    //   height 15px
    //   background-color #e9edf3
    //   border 2px solid #333
    //   transform translateX(-50%)
  &__userTimeInfo
    display flex
    justify-content center !important
    align-items center
    img
      width 29px
      height 20px
    span
      margin 0 0 0 10px !important
  &__images
    flex-grow 1
    display flex
    align-items center
    position relative
    width 100%
    canvas
      position absolute
      top 0
      left 0
      right 0
      bottom 0
    &--compass
      position absolute
      bottom 5%
      right calc((100% - 300px) / 2)
      width 30px
      height auto
  &__control
    padding 10px 0
    padding-left calc((100% - 300px) / 2)
    padding-right calc((100% - 300px) / 2)
    button
      padding 0
      margin 0 5px
      background none
      border none
      img
        width auto
        height 18px
    button:last-of-type
      margin-right 0
  &__timeInfo
    display flex
    justify-content space-between
    &--timerMobile
      font-size 18px
    &--timerDesktop
      display none
    &--control
      display flex
    
  &__sliderBar
    display flex
    flex-direction column
    margin-top 5px
  &__sliderBarTrack
    display flex
    align-items center
    position relative
    width 100%
    height 20px
    &--fullTime
      position absolute
      top 5px
      left 0
      right 0
      width 100%
      height 5px
      background-color #000
      border-radius 5px
      cursor pointer
    &--currentTime
      position absolute
      top 5px
      left 0
      width 0
      height 5px
      background-color #ffad5e
      cursor pointer
    &--trackbutton
      position absolute
      top 2px
      left 0
      width 11px
      height 11px
      background-color #ffad5e
      border-radius 11px
  &__sliderBarControl
    display flex
    align-self flex-end
    button
      padding 0
      margin 0 5px
      font-size 14px
      background none
      border none
      &.selected
        color #ffad5e
    button:last-of-type
      margin-right 0

.intro
  display flex
  justify-content center
  align-items center
  position relative
  height 100vh
  max-height 736px
  padding 76px 5%
  color #fff
  text-align center
  &::before
    content ""
    position absolute
    top 0
    left 0
    right 0
    z-index 10
    width 100%
    height 38px
    background-image url(https://www.mirrormedia.mg/projects/images/marathon/road-02.png)
    background-repeat repeat-x
    background-size 19px 38px
  &::after
    content ""
    position absolute
    bottom 0
    left 0
    right 0
    z-index 10
    width 100%
    height 38px
    background-image url(https://www.mirrormedia.mg/projects/images/marathon/road-02.png)
    background-repeat repeat-x
    background-size 19px 38px
  span
    display block
    margin 1em 0
    font-size 22px
  .triangle
    width 0
    height 0
    margin 0 auto
    background none
    border-style solid
    border-width 15px 15px 0 15px
    border-color #fff transparent transparent transparent
    cursor pointer
  &__decoration
    &--mobile
      position absolute
      bottom 36px
      left 0
      right 0
      z-index 11
      width 80%
      margin 0 auto
    &--desktop
      display none
    &--road
      display none
  &__menu
    display none
    > div
      cursor pointer
.chart
  position relative
  padding 5% 5% 48px
  background-color #fff
  &::after
    content ""
    position absolute
    bottom 0
    left 0
    right 0
    z-index 10
    width 100%
    height 38px
    background-image url(https://www.mirrormedia.mg/projects/images/marathon/road-02.png)
    background-repeat repeat-x
    background-size 19px 38px

.credit
  position relative
  span
    display block
    color #fff
    font-size 12px
    font-weight 300
  .desktop
    display none
    span
      position absolute
      top 10px
      left 50%
      transform translateX(-50%)
  .mobile
    margin 20px 0 40px
    text-align center
    img
      display block
      width 60px
      margin 10px auto
.facebook
  width 90%
  margin 0 auto 20px
@media (max-width: 899px)
  .desktop-only
    display none

@media (min-width: 375px)
  .map__menu
    button
      width 90px
      height 90px
@media (min-width: 600px)
  .map
    height auto
    max-height none
    &__menu
      flex-grow 0
      padding-left calc((100% - 360px) / 2)
      padding-right calc((100% - 360px) / 2)
      > div
        width 360px
        margin 5px auto
      button
        width 100px
        height 100px
        margin 5px 10px
    &__images
      margin 2% 0
      &--compass
        width 50px
        right calc((100% - 360px) / 2)
    
    &__control
      padding-top 0
      padding-bottom 0
      padding-left calc((100% - 360px) / 2)
      padding-right calc((100% - 360px) / 2)
      margin 2% 0
  .intro
    height auto
    padding 30% 20%
  .chart
    padding-left 10%
    padding-right 10%
    padding-bottom calc(48px + 5%)
    
  
  .credit
    > div
      margin 40px 0
    span
      font-size 16px
    .mobile
      width 100px
      margin 20px auto
  .facebook
    width 80%
@media (min-width: 900px)
  section:not(:first-of-type)
    // padding 20% 0 40%
    &::before
      display none
    &::after
      display none
  .mobile-only
    display none
  .map
    height auto
    &__menu
      position absolute
      top 0
      left 70px
      z-index 10
      padding 16px 12px
      background-image none
      background-color rgba(233,237,243, .6)
      > div
        span
          margin 0
          font-size 16px
      > div:nth-of-type(2)
        margin-top 10px
      button
        width 50px
        height 50px
        margin 0 5px
        font-size 14px
        border-radius 5px
        &.selected
          &:after
            background-size 40px 40px
            border-radius 5px
      button:first-of-type
        margin-left 0
      button:last-of-type
        margin-right 0
    &__images
      max-width 1500px
      margin 0 auto 70px
      &--compass
        right 10%
        bottom 10%
    &__userTime
      flex-grow 1
      display flex
      align-items center
      width auto
      margin 0 0 0 10px
    &__userTimeInfo
      margin 10px auto 0 !important
      justify-content flex-end !important
    &__control
      position absolute
      left auto
      right 10%
      bottom 5%
      z-index 10
      width auto
      padding 0
      margin 0
      button
        img
          height 14px
    &__timeInfo
      &--control
        width 100%
        button:nth-of-type(3)
          margin-left 0
      &--timerMobile
        display none
      &--timerDesktop
        display block
    &__sliderBarControl
      display flex
      justify-content space-between
      align-items center
      width 100%
      > div
        display flex
  .intro
    max-height none
    padding 0
    &__content
      width 50%
      margin-top 10vh
      margin-bottom 350px
    &__decoration
      &--mobile
        display none
      &--desktop
        display flex
        flex-direction column
        position absolute
        top 0
        left 50%
        right 0
        bottom 0
        width 800px
        height 100%
        margin 0
        transform translateX(-50%)
      &--lroad
        display block
        width 100%
        flex-grow 1
        background-image url(https://www.mirrormedia.mg/projects/images/marathon/road-03.png)
        background-repeat repeat-y
        background-size 35px auto
      &--sroad
        width 100%
      // &--rroad
      //   display block
      //   width 100%
      //   height 50px
      //   flex-grow 1
      //   background-image url(/public/Marathon/bg-road-03.png)
      //   background-repeat repeat-y
      //   background-size 29px auto
      //   background-position right bottom
      // &--desktop
      //   display block
      //   position absolute
      //   bottom 0
      //   left 50%
      //   width 800px
      //   height auto
      //   transform translateX(-50%)
      //   z-index 10
      // &--road
      //   display block
      //   position absolute
      //   top 0
      //   left 50%
      //   width 800px
      //   height 380px
      //   transform translateX(-50%)
      //   background-image url(/public/Marathon/bg-road-03.png)
      //   background-repeat repeat-y
      //   background-size 35px auto
    &__menu
      position absolute
      left 50%
      bottom 50px
      z-index 20
      display flex
      justify-content space-between
      width 600px
      transform translateX(-50%)
      img
        width 100px
        height 100px
      p
        width 100px
        height 110px
        margin 20px 0 0
        padding 0 23px
        writing-mode vertical-rl
      > div
        position relative
        z-index 20
    // &__decoration--desktop
    //   position absolute
    //   top 0
    //   left 10%
    //   right 10%
    //   bottom 0
    //   width 80%
    //   height 100%
    //   background-image url(/public/Marathon/bg-intro-desktop.png)
    //   background-size contain
  .chart
    position relative
    padding-top 0
    padding-bottom 0
  
  .credit
    position relative
    margin-bottom 100px
    
    .desktop
      display block
      width 800px
      margin 0 auto
      img
        width 100%
      span
        text-align center
        line-height 1.5
      &::after
        content ""
        position absolute
        bottom 2px
        right 0
        z-index 10
        width calc((100% - 800px) / 2)
        height 33px
        background-image url(https://www.mirrormedia.mg/projects/images/marathon/road-02.png)
        background-repeat repeat-x
        background-size auto 33px
    .mobile
      display none
    
  .facebook
    width 60%

@media (min-width: 1100px)
  .intro
    &__decoration
      &--desktop
        width 900px !important
      &--lroad
        background-size 39px auto
  
  .credit
    .desktop
      width 900px
      &::after
        bottom 3px
        height 36px
        width calc((100% - 900px) / 2)
        background-size auto 36px

@media (min-width: 1300px)
  .intro
    &__content
      width 50%
    &__menu
      bottom 60px

@media (min-width: 1500px)
  .intro__decoration--desktop
    width 1100px !important
  .intro__decoration--lroad
    background-size 48px auto
  .intro
    span
      margin-top 5em
    &__content
      width 45%
      margin-bottom 400px
    &__menu
      bottom 120px
      width 700px
      img
        width 110px
        height 110px
      p
        width 110px
        padding 0 28px
  .map
    &__control
      right 20%
    &__images
      margin-bottom 0
      &--compass
        bottom 15%
  
  .credit
    .desktop
      width 1100px
      &::after
        bottom 3px
        height 45px
        width calc((100% - 1100px) / 2)
        background-size auto 45px

</style>