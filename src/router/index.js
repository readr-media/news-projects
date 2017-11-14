import { PROJECTS } from '../constants'
import _ from 'lodash'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Router from 'vue-router'

Vue.use(Router)
Vue.use(VueLazyload, {
  preLoad: 1.3,
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
      { path: '/project/:project', component: Project, beforeEnter: (to, from, next) => {
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
