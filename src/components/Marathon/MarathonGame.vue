<template>
  <section ref="marathonGame" class="marathonGame">
    <spinner class="marathonGame__loading" :show="loading"></spinner>
    <div class="marathonGame__menu">
      <div class="marathonGame__menu--raceName" v-html="raceN"></div>
      <div>
        <button class="boston" :class="[this.race === 'boston' ? 'selected' : '']" @click="$_marathon_changeRace('boston')">波士頓</button>
        <button class="chicago" :class="[this.race === 'chicago' ? 'selected' : '']" @click="$_marathon_changeRace('chicago')">芝加哥</button>
        <button class="newyork" :class="[this.race === 'newyork' ? 'selected' : '']" @click="$_marathon_changeRace('newyork')">紐約</button>
        <button class="berlin" :class="[this.race === 'berlin' ? 'selected' : '']" @click="$_marathon_changeRace('berlin')">柏林</button>
        <button class="london" :class="[this.race === 'london' ? 'selected' : '']" @click="$_marathon_changeRace('london')">倫敦</button>
        <button class="tokyo" :class="[this.race === 'tokyo' ? 'selected' : '']" @click="$_marathon_changeRace('tokyo')">東京</button>
      </div>
      <div>
        <div>
          <span>我的全馬完賽時間</span>
          <div class="marathonGame__selectedTimeInfo">
            <img src="/proj-assets/marathon/images/userTime.png">
            <span ref="selectedTimeInfo" v-text="convertedAverage"></span>
          </div>
        </div>
        <div class="marathonGame__selectedTimeControl">
          <input ref="selectedTimeControl" type="range" @change="$_marathon_updateSelectedTime">
        </div>
      </div>
      
    </div>
    <div class="marathonGame__map">
      <img ref="marathonGameMap" sizes="100vw" :src="`/proj-assets/marathon/images/${race}.png`" :srcset="`/proj-assets/marathon/images/${race}-m.png 1000w, /proj-assets/marathon/images/${race}.png 2560w`">
      <canvas id="js-pixi"></canvas>
      <div class="marathonGame__map--curtain"></div>
      <img class="marathonGame__map--compass" :class="this.race" src="/proj-assets/marathon/images/compass.png">
    </div>
    <div class="marathonGame__control">
      <div class="marathonGame__filterContainer">
        <div id="timerMobile" class="marathonGame__timerMobile">00:00:00</div>
        <div class="marathonGame__filter">
          <button ref="togglePlayMobile" class="btn--img mobile-only" @click="$_marathon_togglePlay()"><img src="/proj-assets/marathon/images/pause.png"></button>
          <button class="btn--img mobile-only" @click="$_marathon_restart()"><img src="/proj-assets/marathon/images/restart.png"></button>
          <button ref="filterCountryall" class="btn--filter desktop-only" :class="[this.filterCountry === 'all' ? 'selected' : '']" @click="$_marathon_filterCountry('all')">全部</button>
          <button ref="filterCountrytwn" class="btn--filter desktop-only" :class="[this.filterCountry === 'twn' ? 'selected' : '']" @click="$_marathon_filterCountry('twn')">台灣</button>
          <button ref="filterCountryother" class="btn--filter desktop-only" :class="[this.filterCountry === 'other' ? 'selected' : '']" @click="$_marathon_filterCountry('other')">非台灣</button>
          <button ref="filterGenderall" class="btn--filter desktop-only" :class="[this.filterGender === 'all' ? 'selected' : '']" @click="$_marathon_filterGender('all')">全部</button>
          <button ref="filterGenderm" class="btn--filter desktop-only" :class="[this.filterGender === 'm' ? 'selected' : '']" @click="$_marathon_filterGender('m')">男</button>
          <button ref="filterGenderw" class="btn--filter desktop-only" :class="[this.filterGender === 'w' ? 'selected' : '']" @click="$_marathon_filterGender('w')">女</button>
        </div>
      </div>
      <div class="marathonGame__sliderBarContainer">
        <div id="js-track" class="marathonGame__sliderBar">
          <div class="marathonGame__sliderBar--fullTime" @click="$_marathon_moveTrackBar"></div>
          <div id="js-currentTrackTime" class="marathonGame__sliderBar--currentTime" @click="$_marathon_moveTrackBar"></div>
          <div id="js-trackbutton" class="marathonGame__sliderBar--trackbutton"></div>
        </div>
        <div class="marathonGame__speedControl">
          <div id="timerDesktop" class="marathonGame__timerDesktop">00:00:00</div>
          <div>
            <button class="btn--img desktop-only" ref="togglePlayDesktop" @click="$_marathon_togglePlay()"><img src="/proj-assets/marathon/images/pause.png"></button>
            <button class="btn--img desktop-only" @click="$_marathon_restart()"><img src="/proj-assets/marathon/images/restart.png"></button>
            <button :class="[this.speedRatio === 1 ? 'selected' : '']" @click="$_marathon_changeSpeed(1)">60x</button>
            <button :class="[this.speedRatio === 2 ? 'selected' : '']" @click="$_marathon_changeSpeed(2)">120x</button>
            <button :class="[this.speedRatio === 10 ? 'selected' : '']" @click="$_marathon_changeSpeed(10)">600x</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { currentYPosition, elmYPosition } from 'kc-scroll'
  import _ from 'lodash'
  import Spinner from '../Spinner.vue'
  import moment from 'moment'
  import superagent from 'superagent'

  const groups = []
  const containers = []
  const colorSelected = '0x493b5c'
  const colorUnselected = '0xebe1fa'
  const pathAmount = 10

  let app
  let containerSelectedTime
  let dataRunners
  let isCompleted
  let paths
  let pathsRatioBySplit
  let pathsDeltaBySplit
  let raceTimeMax
  let raceTimeMin
  let runners
  let spriteSelectedTime
  let tickerTimer
  let tickerValue = 10

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

  function secondToHHMMSS(second) {
    return moment.utc(second * 1000).format('HH:mm:ss')
  }

  export default {
    name: 'MarathonGame',
    components: {
      'spinner': Spinner
    },
    data () {
      return {
        canvasW: 0,
        canvasH: 0,
        convertedAverage: '00:00:00',
        data: {
          berlin: {
            runners: [],
            map: {}
          },
          boston: {
            runners: [],
            map: {}
          },
          chicago: {
            runners: [],
            map: {}
          },
          london: {
            runners: [],
            map: {}
          },
          newyork: {
            runners: [],
            map: {}
          },
          tokyo: {
            runners: [],
            map: {}
          },
        },
        filterCountry: 'all',
        filterGender: 'all',
        hasChangeTime: false,
        isPause: false,
        loading: false,
        race: 'boston',
        raceN: '2017 年波士頓馬拉松',
        speedRatio: 1,
        viewWidth: 0,
      }
    },
    mounted () {
      window.PIXI = require('pixi.js')
      window.noUiSlider = require('nouislider')
      this.viewWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.canvasW = this.$refs.marathonGameMap.offsetWidth
      this.canvasH = this.$refs.marathonGameMap.offsetHeight
      this.$_marathon_detectWebGLSupported()
      this.$_marathon_setRace('boston')
      window.addEventListener('resize', this.$_marathon_resize)
      window.addEventListener('scroll', this.$_marathon_detectScroll)
    },
    methods: {
      $_marathon_calculateCurrentSplit(second, timeAccumulativePerSplit) {
        const splitAmount = _.get(timeAccumulativePerSplit, ['length'])
        let currentSplit
        for (let i = 0; i < splitAmount; i += 1) {
          if (timeAccumulativePerSplit[i] > second) {
            return i
          }
        }
        return splitAmount
      },
      $_marathon_calculateDeltaPerSplitBySecond(timePerSplit, pathsDeltaBySplit) {
        const splitAmount = _.get(timePerSplit, ['length'])
        const deltaPerSecondBySplit = []
        for (let i = 0; i < splitAmount; i += 1) {
          const deltaXPerSecond = pathsDeltaBySplit[i][0] / timePerSplit[i]
          const deltaYPerSecond = pathsDeltaBySplit[i][1] / timePerSplit[i]
          deltaPerSecondBySplit.push([deltaXPerSecond, deltaYPerSecond])
        }
        return deltaPerSecondBySplit
      },
      $_marathon_calculatePathDistanceBySplit(paths) {
        const splitAmount = _.get(paths, [ 0, 'length' ]) - 1
        const distancePerSplit = []
        for (let i = 0; i < pathAmount; i += 1) {
          const distances = []
          for (let j = 0; j < splitAmount; j += 1) {
            distances.push(this.$_marathon_calculatePythagoreanValue(paths[i][j], paths[i][j + 1]))
          }
          distancePerSplit.push(distances)
        }
        return distancePerSplit
      },
      $_marathon_calculatePathsTotalDistance(pathDistances) {
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
      },
      $_marathon_calculatePythagoreanValue(startPoint, endPoint) {
        return Number(Math.sqrt(((startPoint[0] - endPoint[0]) ** 2) + ((startPoint[1] - endPoint[1]) ** 2)).toFixed(4))
      },
      $_marathon_calculatePathsDeltaBySplit(paths) {
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
      },
      $_marathon_calculatePathsRatioBySplit(pathDistances, pathsTotalDistance) {
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
      },
      $_marathon_calculateSelectedTimeIndex(second) {
        const origin = _.map(dataRunners, r => r[4])
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
      },
      $_marathon_calculateTimeAccumulativePerSplit(timePerSplit, totalTime) {
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
      },
      $_marathon_calculateTimePerSplit(pathsRatioBySplit, totalTime) {
        const splitAmount = _.get(pathsRatioBySplit, ['length'])
        const timePerSplit = []
        for (let i = 0; i < splitAmount; i += 1) {
          const time = Math.round(pathsRatioBySplit[i] * totalTime)
          timePerSplit.push(time)
        }
        return timePerSplit
      },
      $_marathon_changePointColor() {
        const greyPoint = new PIXI.Graphics()
        greyPoint.beginFill(colorUnselected)
        greyPoint.drawCircle(0, 0, 2)
        const redPoint = new PIXI.Graphics()
        redPoint.beginFill(colorSelected)
        redPoint.drawCircle(0, 0, 2)
        const twnMaleIndex = groups[0].length
        const twnFemaleIndex = 0
        const otherMaleIndex = groups[0].length + groups[1].length + groups[2].length
        const otherFemaleIndex = groups[0].length + groups[1].length
        app.ticker.stop()
        if (this.filterCountry === 'all' && this.filterGender === 'all') {
          containers[0].visible = true
          containers[1].visible = true
          containers[2].visible = true
          containers[3].visible = true
        }
        if (this.filterCountry === 'twn' && this.filterGender === 'all') {
          containers[0].visible = true
          containers[1].visible = true
          containers[2].visible = false
          containers[3].visible = false
        }
        if (this.filterCountry === 'other' && this.filterGender === 'all') {
          containers[0].visible = false
          containers[1].visible = false
          containers[2].visible = true
          containers[3].visible = true
        }
        if (this.filterCountry === 'all' && this.filterGender === 'm') {
          containers[0].visible = false
          containers[1].visible = true
          containers[2].visible = false
          containers[3].visible = true
        }
        if (this.filterCountry === 'all' && this.filterGender === 'w') {
          containers[0].visible = true
          containers[1].visible = false
          containers[2].visible = true
          containers[3].visible = false
        }
        if (this.filterCountry === 'twn' && this.filterGender === 'm') {
          containers[0].visible = false
          containers[1].visible = true
          containers[2].visible = false
          containers[3].visible = false
        }
        if (this.filterCountry === 'twn' && this.filterGender === 'w') {
          containers[0].visible = true
          containers[1].visible = false
          containers[2].visible = false
          containers[3].visible = false
        }
        if (this.filterCountry === 'other' && this.filterGender === 'm') {
          containers[0].visible = false
          containers[1].visible = false
          containers[2].visible = false
          containers[3].visible = true
        }
        if (this.filterCountry === 'other' && this.filterGender === 'w') {
          containers[0].visible = false
          containers[1].visible = false
          containers[2].visible = true
          containers[3].visible = false
        }
        app.ticker.start()
      },
      $_marathon_changeRace(race) {
        
        if (this.race !== race) {
          app.ticker.stop()
          this.loading = true

          window.ga('send', 'event', 'projects', 'click', `select ${race}`, { nonInteraction: true })
          for (let i = 0; i < groups.length; i += 1) {
            app.stage.removeChild(containers[i])
          }
          this.$_marathon_setRace(race)
        }
      },
      $_marathon_changeSpeed(speed) {
        tickerValue = speed
        this.speedRatio = speed
      },
      $_marathon_convertCoordinates(data, zoomRatio) {
        return _.map(data, d => [Number((d[0] * zoomRatio).toFixed(4)), Number((d[1] * zoomRatio).toFixed(4))])
      },
      $_marathon_createPaths(innerTrack, outerTrack) {
        const splitAmount = innerTrack.length
        const paths = []
        for (let i = 0; i < pathAmount; i += 1) {
          const path = []
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
            }
          }
          paths.push(path)
        }
        return paths
      },
      $_marathon_detectScroll(e) {
        const marathonGameTop = this.$refs.marathonGame.offsetHeight
        if (this.currentYPosition() > marathonGameTop) {
          app.ticker.stop()
          this.$refs.togglePlayMobile.querySelector('img').src = `/proj-assets/marathon/images/play.png`
          this.$refs.togglePlayDesktop.querySelector('img').src = `/proj-assets/marathon/images/play.png`
        }
      },
      $_marathon_detectWebGLSupported() {
        let type = 'WebGL'
        if (!PIXI.utils.isWebGLSupported()) {
          type = 'canvas'
        }
        PIXI.utils.sayHello(type)
      },
      $_marathon_filter(data, category) {
        switch (category) {
          case 'twnmale':
            return _.filter(data, (r) => {
              return (r[2] === 'TWN') && (r[3] === 'M')
            })
          case 'twnfemale':
            return _.filter(data, (r) => {
              return (r[2] === 'TWN') && (r[3] === 'W' || r[3] === 'F')
            })
          case 'otmale':
            return _.filter(data, (r) => {
              return (r[2] !== 'TWN') && (r[3] === 'M')
            })
          case 'otfemale':
            return _.filter(data, (r) => {
              return (r[2] !== 'TWN') && (r[3] === 'W' || r[3] === 'F')
            })
          default:
            return
        }
      },
      $_marathon_filterCountry(option) {
        this.filterCountry = option
        window.ga('send', 'event', 'projects', 'click', `filter ${option}`, { nonInteraction: true })
        this.$_marathon_changePointColor()
      },
      $_marathon_filterGender(option) {
        this.filterGender = option
        if (option === 'all') {
          window.ga('send', 'event', 'projects', 'click', `filter allsex`, { nonInteraction: true })
        }
        if (option === 'm') {
          window.ga('send', 'event', 'projects', 'click', `filter male`, { nonInteraction: true })
        }
        if (option === 'w') {
          window.ga('send', 'event', 'projects', 'click', `filter female`, { nonInteraction: true })
        }
        
        this.$_marathon_changePointColor()
      },
      $_marathon_initRace() {
        const slider = document.querySelector('#js-track')
        const dataMap = _.get(this.data, [ this.race, 'map' ])
        dataRunners = _.get(this.data, [ this.race, 'runners' ])
        runners = []
        tickerTimer = 0
        isCompleted = false
        raceTimeMax = _.max(_.map(dataRunners, r => r[4]))
        raceTimeMin = _.min(_.map(dataRunners, r => r[4]))

        this.isPause = false
        this.$refs.togglePlayMobile.querySelector('img').src = `/proj-assets/marathon/images/pause.png`
        this.$refs.togglePlayDesktop.querySelector('img').src = `/proj-assets/marathon/images/pause.png`
        this.filterCountry = 'all'
        this.filterGender = 'all'
        tickerValue = 1
        this.speedRatio = 1

        groups[0] = this.$_marathon_filter(dataRunners, 'twnfemale')
        groups[1] = this.$_marathon_filter(dataRunners, 'twnmale')
        groups[2] = this.$_marathon_filter(dataRunners, 'otfemale')
        groups[3] = this.$_marathon_filter(dataRunners, 'otmale')
        
        for (let i = 0; i < groups.length; i += 1) {
          const amount = groups[i].length + 1000
          containers[i] = new PIXI.particles.ParticleContainer(amount, {
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
        const innerTrack = this.$_marathon_convertCoordinates(_.get(dataMap, ['inner']), this.canvasW / 2560)
        const outerTrack = this.$_marathon_convertCoordinates(_.get(dataMap, ['outer']), this.canvasW / 2560)
        paths = this.$_marathon_createPaths(innerTrack, outerTrack)
        const pathDistances = this.$_marathon_calculatePathDistanceBySplit(paths)
        const pathsTotalDistance = this.$_marathon_calculatePathsTotalDistance(pathDistances)
        pathsRatioBySplit = this.$_marathon_calculatePathsRatioBySplit(pathDistances, pathsTotalDistance)
        pathsDeltaBySplit = this.$_marathon_calculatePathsDeltaBySplit(paths)

        for (let i = 0; i < groups.length; i += 1) {
          const amount = groups[i].length
          for (let j = 0; j < amount; j += 1) {
            const point = new PIXI.Sprite(texture)
            point.anchor.set(0.5)
            point.scale.set(0.5)
            point.totalTime = _.get(groups[i], [j, 4])
            point.pathIndex = _.get(groups[i], [j, 0]) % pathAmount
            point.timePerSplit = this.$_marathon_calculateTimePerSplit(pathsRatioBySplit[point.pathIndex], point.totalTime)
            point.timeAccumulativePerSplit = this.$_marathon_calculateTimeAccumulativePerSplit(point.timePerSplit, point.totalTime)
            point.deltaPerSplitBySecond = this.$_marathon_calculateDeltaPerSplitBySecond(point.timePerSplit, pathsDeltaBySplit[point.pathIndex])
            point.speedData = _.slice(groups[i][j], 4)
            point.currentSplit = 0
            point.isFinished = false
            runners.push(point)
            containers[i].addChild(point)
          }
        }

        const runnerAmount = runners.length
        const raceTimeAverage = _.floor(_.sum(_.map(dataRunners, r => r[4])) / runners.length)
        this.convertedAverage = secondToHHMMSS(raceTimeAverage)
        this.$refs.selectedTimeControl.max = raceTimeMax
        this.$refs.selectedTimeControl.value = raceTimeAverage
        this.$refs.selectedTimeControl.min = raceTimeMin

        const highlightIndex =  this.$_marathon_calculateSelectedTimeIndex(raceTimeAverage)
        
        // set selected time point
        containerSelectedTime = new PIXI.Container()
        app.stage.addChild(containerSelectedTime)
        const textureSelectedTime = PIXI.Texture.fromImage('/proj-assets/marathon/images/userTime-icon.png')
        spriteSelectedTime = new PIXI.Sprite(textureSelectedTime)
        spriteSelectedTime.anchor.set(0.5, 1)
        spriteSelectedTime.scale.set(0.25)
        spriteSelectedTime.totalTime = _.get(dataRunners, [highlightIndex, 4])
        spriteSelectedTime.pathIndex = _.get(dataRunners, [highlightIndex, 0]) % pathAmount
        spriteSelectedTime.timePerSplit = this.$_marathon_calculateTimePerSplit(pathsRatioBySplit[spriteSelectedTime.pathIndex], spriteSelectedTime.totalTime)
        spriteSelectedTime.timeAccumulativePerSplit = this.$_marathon_calculateTimeAccumulativePerSplit(spriteSelectedTime.timePerSplit, spriteSelectedTime.totalTime)
        spriteSelectedTime.deltaPerSplitBySecond = this.$_marathon_calculateDeltaPerSplitBySecond(spriteSelectedTime.timePerSplit, pathsDeltaBySplit[spriteSelectedTime.pathIndex])
        spriteSelectedTime.speedData = _.slice(dataRunners[highlightIndex], 4)
        spriteSelectedTime.currentSplit = 0
        spriteSelectedTime.isFinished = false
        containerSelectedTime.addChild(spriteSelectedTime)
        
        this.loading = false

        app.ticker.add(() => {
          if (!isCompleted) {
            tickerTimer += tickerValue
            if (tickerTimer >= raceTimeMax && !isCompleted) {
              isCompleted = true
            }
            if (tickerTimer < raceTimeMax && isCompleted) {
              isCompleted = false
            }
            document.querySelector('#timerMobile').innerText = secondToHHMMSS(tickerTimer)
            document.querySelector('#timerDesktop').innerText = secondToHHMMSS(tickerTimer)
            document.querySelector('#js-currentTrackTime').style.width = `${(tickerTimer / raceTimeMax) * 100}%`
            document.querySelector('#js-trackbutton').style.left = `${(tickerTimer / raceTimeMax) * 100}%`

            if (tickerTimer < spriteSelectedTime.speedData[0]) {
              let secondInSplit
              if (tickerTimer > spriteSelectedTime.timeAccumulativePerSplit[spriteSelectedTime.currentSplit]) {
                spriteSelectedTime.currentSplit += 1
              }
              if (spriteSelectedTime.currentSplit === 0) {
                secondInSplit = tickerTimer
              } else {
                secondInSplit = tickerTimer - spriteSelectedTime.timeAccumulativePerSplit[spriteSelectedTime.currentSplit - 1]
              }
              const splitOrigin = paths[spriteSelectedTime.pathIndex][spriteSelectedTime.currentSplit]
              const deltaMoveX = secondInSplit * spriteSelectedTime.deltaPerSplitBySecond[spriteSelectedTime.currentSplit][0]
              const deltaMoveY = secondInSplit * spriteSelectedTime.deltaPerSplitBySecond[spriteSelectedTime.currentSplit][1]
              spriteSelectedTime.x = splitOrigin[0] + deltaMoveX
              spriteSelectedTime.y = splitOrigin[1] + deltaMoveY
            } else {
              spriteSelectedTime.x = -1
              spriteSelectedTime.y = -1
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
              }
            }
          }
        })
      },
      $_marathon_moveTrackBar (e) {
        app.ticker.stop()
        if (!this.hasChangeTime) {
          this.hasChangeTime = true
          window.ga('send', 'event', 'projects', 'click', `progress bar`, { nonInteraction: true })
        }
        const newPercentageTime = e.layerX / e.target.parentNode.offsetWidth
        tickerTimer = Math.floor(raceTimeMax * newPercentageTime)
        this.$_marathon_updatePointPos(tickerTimer)
      },
      $_marathon_resize() {
        this.viewWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (this.viewWidth >= 900) {
          app.ticker.stop()
          const current = tickerTimer
          this.canvasW = this.$refs.marathonGameMap.offsetWidth
          this.canvasH = this.$refs.marathonGameMap.offsetHeight
          this.$_marathon_setRace(this.race, current)
        }
      },
      $_marathon_restart() {
        app.ticker.stop()
        this.$_marathon_setRace(this.race)
      },
      $_marathon_setRace(race) {
        const raceRunners = _.get(this.data, [ race, 'runners', 0 ])
        const raceMap = _.get(this.data, [ race, 'map', 'race' ])
        app = new PIXI.Application(this.canvasW, this.canvasH, { antialias: false, transparent: true, view: document.querySelector('#js-pixi') })

        switch(race) {
          case 'chicago':
            this.raceN = '2016 年芝加哥馬拉松'
            break
          case 'newyork':
            this.raceN = '2016 年紐約馬拉松'
            break
          case 'berlin':
            this.raceN = '2017 年柏林馬拉松'
            break
          case 'london':
            this.raceN = '2017 年倫敦馬拉松'
            break
          case 'tokyo':
            this.raceN = '2017 年東京馬拉松'
            break
          default:
            this.raceN = '2017 年波士頓馬拉松'
        }

        if (!raceRunners || !raceMap) {
          Promise.all([fetchData(`/proj-assets/marathon/data/${race}Map.json`), fetchData(`/proj-assets/marathon/data/${race}Data.json`)])
          .then((data) => {
            this.data[race]['map'] = data[0]
            this.data[race]['runners'] = data[1]
            this.race = race
            this.$emit('detectFirstLoaded')
            this.$_marathon_initRace()
          })
          .catch(() => {
            this.$emit('detectFirstLoaded')
            this.loading = false
          })
        } else {
          this.race = race
          this.$_marathon_initRace()
        }
      },
      $_marathon_setSlider() {
        const slider = document.querySelector('#js-track')
        noUiSlider.create(slider, {
          start: 0,
          connect: true,
          range: {
            min: 0,
            max: raceTimeMax,
          },
        })

        slider.noUiSlider.on('start', () => {
          app.ticker.stop()
        })
        slider.noUiSlider.on('end', (e) => {
          const second = Math.floor(e[0])
          this.$_marathon_updatePointPos(second)
          // app.ticker.start()
        })
      },
      $_marathon_togglePlay() {
        this.isPause = !this.isPause
        if (this.isPause) {
          app.ticker.stop()
          this.$refs.togglePlayMobile.querySelector('img').src = `/proj-assets/marathon/images/play.png`
          this.$refs.togglePlayDesktop.querySelector('img').src = `/proj-assets/marathon/images/play.png`
        } else {
          app.ticker.start()
          this.$refs.togglePlayMobile.querySelector('img').src = `/proj-assets/marathon/images/pause.png`
          this.$refs.togglePlayDesktop.querySelector('img').src = `/proj-assets/marathon/images/pause.png`
        }
      },
      $_marathon_updatePointPos(tickerTimer) {
        const runnersAmount = _.get(runners, ['length'], 0)

        spriteSelectedTime.currentSplit = this.$_marathon_calculateCurrentSplit(tickerTimer, spriteSelectedTime.timeAccumulativePerSplit)
        if (tickerTimer < spriteSelectedTime.speedData[0]) {
          let secondInSplit
          if (spriteSelectedTime.currentSplit === 0) {
            secondInSplit = tickerTimer
          } else {
            secondInSplit = tickerTimer - spriteSelectedTime.timeAccumulativePerSplit[spriteSelectedTime.currentSplit - 1]
          }
          const splitOrigin = paths[spriteSelectedTime.pathIndex][spriteSelectedTime.currentSplit]
          const deltaMoveX = secondInSplit * spriteSelectedTime.deltaPerSplitBySecond[spriteSelectedTime.currentSplit][0]
          const deltaMoveY = secondInSplit * spriteSelectedTime.deltaPerSplitBySecond[spriteSelectedTime.currentSplit][1]
          spriteSelectedTime.x = splitOrigin[0] + deltaMoveX
          spriteSelectedTime.y = splitOrigin[1] + deltaMoveY
        } else {
          spriteSelectedTime.x = -1
          spriteSelectedTime.y = -1
        }
        for (let i = 0; i < runnersAmount; i += 1) {
          runners[i].currentSplit = this.$_marathon_calculateCurrentSplit(tickerTimer, runners[i].timeAccumulativePerSplit)
          if (tickerTimer < runners[i].speedData[0]) {
            let secondInSplit
            if (runners[i].currentSplit === 0) {
              secondInSplit = tickerTimer
            } else {
              secondInSplit = tickerTimer - runners[i].timeAccumulativePerSplit[runners[i].currentSplit - 1]
            }
            const splitOrigin = paths[runners[i].pathIndex][runners[i].currentSplit]
            const deltaMoveX = secondInSplit * runners[i].deltaPerSplitBySecond[runners[i].currentSplit][0]
            const deltaMoveY = secondInSplit * runners[i].deltaPerSplitBySecond[runners[i].currentSplit][1]
            runners[i].x = splitOrigin[0] + deltaMoveX
            runners[i].y = splitOrigin[1] + deltaMoveY
          } else {
            runners[i].x = -1
            runners[i].y = -1
          }
        }
        app.ticker.start()
      },
      $_marathon_updateSelectedTime(e) {
        const selectedTime = e.target.value
        const highlightIndex =  this.$_marathon_calculateSelectedTimeIndex(selectedTime)
        const shareLink = `/${this.race}-${selectedTime}-${highlightIndex}`
        this.convertedAverage = secondToHHMMSS(selectedTime)
        this.$_marathon_updateSelectedTimePoint(highlightIndex)
        this.$emit('changeSelectedTime', shareLink)
        window.ga('send', 'event', 'projects', 'drag', `select time`, { nonInteraction: true })
      },
      $_marathon_updateSelectedTimePoint(highlightIndex) {
        app.ticker.stop()
        spriteSelectedTime.totalTime = _.get(dataRunners, [highlightIndex, 4])
        spriteSelectedTime.pathIndex = _.get(dataRunners, [highlightIndex, 0]) % pathAmount
        spriteSelectedTime.timePerSplit = this.$_marathon_calculateTimePerSplit(pathsRatioBySplit[spriteSelectedTime.pathIndex], spriteSelectedTime.totalTime)
        spriteSelectedTime.timeAccumulativePerSplit = this.$_marathon_calculateTimeAccumulativePerSplit(spriteSelectedTime.timePerSplit, spriteSelectedTime.totalTime)
        spriteSelectedTime.deltaPerSplitBySecond = this.$_marathon_calculateDeltaPerSplitBySecond(spriteSelectedTime.timePerSplit, pathsDeltaBySplit[spriteSelectedTime.pathIndex])
        spriteSelectedTime.speedData = _.slice(dataRunners[highlightIndex], 4)
        spriteSelectedTime.currentSplit = this.$_marathon_calculateCurrentSplit(tickerTimer, spriteSelectedTime.timeAccumulativePerSplit)
        if (tickerTimer < spriteSelectedTime.speedData[0]) {
          let secondInSplit
          if (spriteSelectedTime.currentSplit === 0) {
            secondInSplit = tickerTimer
          } else {
            secondInSplit = tickerTimer - spriteSelectedTime.timeAccumulativePerSplit[spriteSelectedTime.currentSplit - 1]
          }
          const splitOrigin = paths[spriteSelectedTime.pathIndex][spriteSelectedTime.currentSplit]
          const deltaMoveX = secondInSplit * spriteSelectedTime.deltaPerSplitBySecond[spriteSelectedTime.currentSplit][0]
          const deltaMoveY = secondInSplit * spriteSelectedTime.deltaPerSplitBySecond[spriteSelectedTime.currentSplit][1]
          spriteSelectedTime.x = splitOrigin[0] + deltaMoveX
          spriteSelectedTime.y = splitOrigin[1] + deltaMoveY
        } else {
          spriteSelectedTime.x = -1
          spriteSelectedTime.y = -1
        }
        app.ticker.start()
      },
      currentYPosition,
      elmYPosition
    },
  }
</script>
<style lang="stylus" scoped>

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

.marathonGame
  // display flex
  // flex-direction column
  position relative
  width 100%
  height 100vh
  max-height 736px
  color #333
  font-size 18px
  background-color #cbc6bf
  &__loading
    position absolute
    top 50%
    left calc(50% - 40px)
    z-index 510
    width 80px
    height 80px
  &__menu
    position relative
    padding 48px 0 0
    padding-left calc((100% - 300px) / 2)
    padding-right calc((100% - 300px) / 2)
    background-image url(/proj-assets/marathon/images/road-02.png)
    background-repeat repeat-x
    background-size 19px 38px
    &::before
      content ""
      position absolute
      top 18px
      left 50%
      z-index 10
      transform translateX(-50%)
      width 255px
      height 30px
      background-image url(/proj-assets/marathon/images/raceName.png)
      background-repeat no-repeat
    > div
      display flex
      flex-wrap wrap
      justify-content space-between
      width 220px
      margin 0 auto
      > div
        display flex
        justify-content space-between
        align-items center
        width 100%
        margin-top 10px
      span
        display block
        font-size 12px
    button
      display flex
      justify-content center
      align-items center
      position relative
      width 70px
      height 70px
      margin 2.5px 0
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
          cursor auto
      &.boston
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-boston.jpg)    
      &.chicago
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-chicago.jpg)
      &.newyork
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-newyork.jpg)
      &.berlin
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-berlin.jpg)
      &.london
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-london.jpg)
      &.tokyo
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-tokyo.jpg)

    &--raceName
      position absolute
      top 21px
      left 50%
      transform translateX(-50%)
      z-index 500
      width 160px !important
      height 20px
      margin 0 !important
      color #4d4d4d
      font-size 16px
  &__selectedTimeControl
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
  
  &__selectedTimeInfo
    display flex
    justify-content center !important
    align-items center
    img
      width 29px
      height 20px
    span
      margin 0 0 0 10px !important
  &__map
    flex-grow 1
    display flex
    align-items center
    position relative
    width 100%
    margin 10px 0
    canvas
      position absolute
      top 50%
      left 0
      right 0
      bottom 0
      z-index 100
      transform translateY(-50%)
    &--curtain
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      z-index 110
      width 100%
      height 100%

    &--compass
      position absolute
      bottom 5%
      right calc((100% - 300px) / 2)
      width 30px
      height auto
      &.newyork
        transform rotate(90deg)
      &.chicago
        transform rotate(-90deg)
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
  &__filterContainer
    display flex
    justify-content space-between
  &__timerMobile
    font-size 18px
  &__timerDesktop
    display none
  &__filter
    display flex
  &__sliderBarContainer
    display flex
    flex-direction column
    margin-top 5px
  &__sliderBar
    display flex
    align-items center
    position relative
    width 100%
    height 15px
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
  &__speedControl
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

@media (max-width: 899px)
  .desktop-only
    display none

// @media (min-width: 375px)
//   .marathonGame
//     &__menu
//       button
//         width 90px
//         height 90px

@media (min-width: 600px)
  .marathonGame
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
    &__map
      &--compass
        width 50px
        right calc((100% - 360px) / 2)
    &__control
      padding-top 0
      padding-bottom 10px
      padding-left calc((100% - 360px) / 2)
      padding-right calc((100% - 360px) / 2)

@media (min-width: 900px)
  .mobile-only
    display none
  .marathonGame
    height auto
    &__menu
      position absolute
      top 10px
      left 70px
      z-index 110
      padding 20px 12px 8px
      background-image none
      background-color rgba(233,237,243, .6)
      &::before
        top -5px
      > div
        > div
          margin-top 5px
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
      &--raceName
        top -1px
    &__selectedTimeControl
      flex-grow 1
      display flex
      align-items center
      width auto
      margin 0
    
    &__map
      margin 0 auto
      canvas
        top 0
        transform none
        width 100%
      &--curtain
        display none
      &--compass
        right 20px
        bottom 100px
      
    &__control
      position absolute
      left auto
      right 10%
      bottom 5%
      z-index 110
      width auto
      padding 0
      margin 0
      button
        img
          height 14px
    &__timerMobile
      display none
    &__filter
      width 100%
      button:nth-of-type(3)
        margin-left 0
    &__speedControl
      display flex
      justify-content space-between
      align-items center
      width 100%
      > div
        display flex

@media (min-width: 1500px)
  .marathonGame
    &__control
      right 20%

@media (min-width: 1700px)
  .marathonGame
    &__map
      &--compass
        right 100px
        bottom 300px
    &__control
      bottom 15%
</style>