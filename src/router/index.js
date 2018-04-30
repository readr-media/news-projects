import { PROJECTS, READR_GA_ID } from '../constants'
import _ from 'lodash'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Router from 'vue-router'

Vue.use(Router)
Vue.use(VueLazyload, {
  preLoad: 1.5,
  attempt: 1
})

// route-level code splitting
const Project = () => import('../views/Project.vue')
const ProjectList = () => import('../views/ProjectList.vue')

export function createRouter () {
  if (process.env.VUE_ENV === 'client') {
    window.ga('create', READR_GA_ID, 'auto')
  }
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/project/:project/:params?', component: Project, beforeEnter: (to, from, next) => {
        if (!PROJECTS[ _.get(to, [ 'params', 'project' ]) ]) {
          const e = new Error()
          e.massage = 'Page Not Found'
          e.code = '404'
          throw e
        } else {
          next()
        }
        
      } },
      { path: '/', component: ProjectList  }
    ]
  })
}
