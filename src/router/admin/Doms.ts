
import { RouteRecordRaw } from 'vue-router'
import { prefixRoutes } from '../menu'

const routes: Array<RouteRecordRaw> =
    prefixRoutes('doms', [
        {
            name: 'ListDom',
            path: '',
            meta: {
                title: '元件列表',
                icon: 'auto_awesome_mosaic',
                showInMenu: true
            },
            component: () => import('../../views/admin/dom/ListDom.vue'),
        },
        {
            name: 'DomsItem',
            path: ':id',
            meta: {
                title: '元件資料',
                icon: 'note_add'
            },
            component: () => import('@/views/admin/dom/Dom.vue'),
            redirect: {
                name: 'DomBlocks',
            },
            children: [
                {
                    name: 'DomEdit',
                    path: 'edit',
                    meta: {
                        title: '編輯元件',
                    },
                    component: () => import('@/views/admin/dom/DomEdit.vue'),
                }, {
                    name: 'DomBlocks',
                    path: 'blocks',
                    meta: {
                        title: '元件編輯器',
                    },
                    component: () => import('@/views/admin/dom/DomBlocks.vue'),
                }, {
                    name: 'DomPreview',
                    path: 'preview',
                    meta: {
                        title: '元件預覽',
                    },
                    component: () => import('@/views/admin/dom/DomPreview.vue'),
                },
            ]
        },

    ])



// 當menu有兩層時
// const routes: RouteRecordRaw =
// {
//     name: 'doms',
//     path: 'doms',
//     meta: {
//         title: '元件模組',
//         icon: 'nature',
//         showInMenu: true
//     },
//     component: () => import('@/views/admin/layout.vue'),

//     redirect: {
//         name: 'DomsList',
//     },
//     children: [
//         {
//             name: 'DomsList',
//             path: '',
//             meta: {
//                 title: '元件列表',
//                 icon: 'auto_awesome_mosaic',
//                 showInMenu: true
//             },
//             component: () => import('../../views/admin/dom/ListDom.vue'),
//         },
//         {
//             name: 'DomsCreate',
//             path: 'create',
//             meta: {
//                 title: '新增元件',
//                 icon: 'note_add',
//                 // showInMenu: true
//             },
//             component: () => import('@/views/admin/dom/CreateDom.vue'),
//         },
//         {
//             name: 'DomsItem',
//             path: ':id',
//             meta: {
//                 title: '元件資料',
//                 icon: 'note_add'
//             },
//             component: () => import('@/views/admin/dom/Dom.vue'),
//         },

//     ]
// };


export default routes




