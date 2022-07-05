import AdminRouter from './admin';

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useRouterHistoryStore } from '@/stores';


export interface RouteMeta {
  name: string;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'siteViewer',
    }
  },

  // {
  //   path: `/home`,
  //   name: 'home',
  //   component: () => import('../views/the-home.vue')
  // },

  AdminRouter.routes,

  {
    path: `/:pathMatch(.*)*`,
    name: 'siteViewer',
    component: () => import('../views/SiteViewer.vue')
  },


  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/'
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



const DEFAULT_TITLE = "編輯器"
router.beforeResolve( to => {
  window.document.title = `${DEFAULT_TITLE}${to.meta.title ? ' ' + to.meta.title : ''}`
})

router.beforeEach((to, from, next) => {
  const routerStore = useRouterHistoryStore()
  routerStore.updateHistory(from, to)
  next()
})

export default router
