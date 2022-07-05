
import { RouteRecordRaw } from 'vue-router'
import { prefixRoutes } from '../menu'

// const routes: Array<RouteRecordRaw> =
//     prefixRoutes('sites', [
//         {
//             name: 'ListSite',
//             path: '',
//             meta: {
//                 title: '站點管理',
//                 icon: 'auto_awesome_mosaic',
//                 showInMenu: true
//             },
//             component: () => import('../../views/admin/site/ListSite.vue'),
//         },
//         {
//             name: 'DomsItem',
//             path: ':id',
//             meta: {
//                 title: '元件資料',
//                 icon: 'note_add'
//             },
//             component: () => import('@/views/admin/dom/Dom.vue'),
//             redirect: {
//                 name: 'DomBlocks',
//             },
//             children: [
//                 {
//                     name: 'DomEdit',
//                     path: 'edit',
//                     meta: {
//                         title: '編輯元件',
//                     },
//                     component: () => import('@/views/admin/dom/DomEdit.vue'),
//                 }, {
//                     name: 'DomBlocks',
//                     path: 'blocks',
//                     meta: {
//                         title: '元件編輯器',
//                     },
//                     component: () => import('@/views/admin/dom/DomBlocks.vue'),
//                 }, {
//                     name: 'DomPreview',
//                     path: 'preview',
//                     meta: {
//                         title: '元件預覽',
//                     },
//                     component: () => import('@/views/admin/dom/DomPreview.vue'),
//                 },
//             ]
//         },

//     ])



// 當menu有兩層時
const routes: RouteRecordRaw =
{
    name: 'pages',
    path: ':site_id',
    meta: {
        title: '頁面管理',
        icon: 'nature',
        showInMenu: true
    },
    component: () => import('@/views/admin/layoutWithoutMenu.vue'),

    redirect: {
        name: 'SitePages',
    },
    children: [



        {
            name: 'PageCommonHeader',
            path: 'common/Header',
            meta: {
                title: '通用頁首',
                icon: 'note_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/SiteCommon.vue'),
        },
        {
            name: 'PageCommonFooter',
            path: 'common/Footer',
            meta: {
                title: '通用頁尾',
                icon: 'note_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/SiteCommon.vue'),
        },
        {
            name: 'SitePages',
            path: 'pages',
            meta: {
                title: '頁面列表',
                icon: 'note_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/SiteListPage.vue'),
        },
        {
            name: 'PageItem',
            path: 'pages/:page_id',
            meta: {
                title: '頁面資料',
                icon: 'note_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/SitePage.vue'),
        },
    ]
};


export default routes




