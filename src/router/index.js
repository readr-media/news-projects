import { PROJECTS, PROJECTS_GAID_BELONGS_MM, READR_GA_ID, GA_ID } from '../constants'
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
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/project/:project/:params?', component: Project, beforeEnter: (to, from, next) => {
          if (!PROJECTS[ _.get(to, [ 'params', 'project' ]) ]) {
            const e = new Error()
            e.massage = 'Page Not Found'
            e.code = '404'
            throw e
          } else {
            if (process.env.VUE_ENV === 'client') {
              const GAID = PROJECTS_GAID_BELONGS_MM.includes(_.get(to, [ 'params', 'project' ])) ? GA_ID : READR_GA_ID
              window.ga('create', GAID, 'auto')
            }
            next()
          }
        } 
      },
      { path: '/', component: ProjectList  }
    ]
  })
}
