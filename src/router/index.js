import { PROJECTS, PROJECTS_BELONGS_MM, PROJECTS_USE_DEPRECATED_GA, READR_GA_ID, READR_GA_ID_DEPRECATED, MM_GA_ID, PROJECTS_PREVENT_SCROLL_BEHAVIOR } from '../constants'
import { get } from 'lodash'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const Project = () => import('src/views/Project.vue')
const ProjectList = () => import('src/views/ProjectList.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: (to, from) => {
      if (!PROJECTS_PREVENT_SCROLL_BEHAVIOR.includes(to.params.project)) {
        return { y: 0 }
      }
    },
    routes: [
      {
        path: '/project/:project/:params?', component: Project, beforeEnter: (to, from, next) => {
          if (!PROJECTS[ get(to, [ 'params', 'project' ]) ]) {
            const e = new Error()
            e.massage = 'Page Not Found'
            e.code = '404'
            throw e
          } else {
            if (process.env.VUE_ENV === 'client') {
              let GAID = READR_GA_ID
              if (PROJECTS_BELONGS_MM.includes(get(to, 'params.project'))) {
                GAID = MM_GA_ID
              } else if (PROJECTS_USE_DEPRECATED_GA.includes(get(to, 'params.project'))) {
                GAID = READR_GA_ID_DEPRECATED
              }
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
