
import { RouteRecordRaw } from 'vue-router'
import { prefixRoutes } from '../menu'

const routes: Array<RouteRecordRaw> =
    prefixRoutes('doms', [
        {
            name: 'DomsList',
            path: '',
            meta: {
                title: '元件列表',
                icon: 'auto_awesome_mosaic',
                showInMenu: true
            },
            component: () => import('../../views/admin/dom/DomList.vue'),
        },
        {
            name: 'DomsCreate',
            path: 'create',
            meta: {
                title: '新增元件',
                icon: 'note_add',
                // showInMenu: true
            },
            component: () => import('@/views/admin/dom/DomCreate.vue'),
        },
        {
            name: 'DomsItem',
            path: ':id',
            meta: {
                title: '元件資料',
                icon: 'note_add'
            },
            component: () => import('@/views/admin/dom/Dom.vue'),
        },

    ])



export default routes 