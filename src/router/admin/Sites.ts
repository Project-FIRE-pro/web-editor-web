
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
    name: 'sites',
    path: 'sites',
    meta: {
        title: '站點管理',
        icon: 'nature',
        showInMenu: true
    },
    component: () => import('@/views/admin/layoutWithoutMenu.vue'),

    redirect: {
        name: 'ListSite',
    },
    children: [
        {
            name: 'ListSite',
            path: '',
            meta: {
                title: '站點列表',
                icon: 'auto_awesome_mosaic',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/ListSite.vue'),
        },

        {
            name: 'SitesItem',
            path: ':site_id',
            meta: {
                title: '站點資料',
                icon: 'note_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/Site.vue'),
        },
        {
            name: 'SitePages',
            path: ':site_id/pages',
            meta: {
                title: '頁面管理',
                icon: 'note_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/SiteListPage.vue'),
        },
        {
            name: 'PageItem',
            path: ':site_id/pages/:page_id',
            meta: {
                title: '頁面資料',
                icon: 'note_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/SitePage.vue'),
        },
        // {
        //     name: 'SiteItem',
        //     path: ':id',
        //     meta: {
        //         title: '部落格管理',
        //         icon: 'note_add',
        //         showInMenu: true
        //     },
        //     component: () => import('@/views/admin/dom/Dom.vue'),
        // },
        // {
        //     name: 'SiteItem',
        //     path: ':id',
        //     meta: {
        //         title: '表單管理',
        //         icon: 'note_add',
        //         showInMenu: true
        //     },
        //     component: () => import('@/views/admin/dom/Dom.vue'),
        // },
        // {
        //     name: 'SiteItem',
        //     path: ':id',
        //     meta: {
        //         title: '電商管理',
        //         icon: 'note_add',
        //         showInMenu: true
        //     },
        //     component: () => import('@/views/admin/dom/Dom.vue'),
        // },
        // {
        //     name: 'SiteItem',
        //     path: ':id',
        //     meta: {
        //         title: '數據管理',
        //         icon: 'note_add',
        //         showInMenu: true
        //     },
        //     component: () => import('@/views/admin/dom/Dom.vue'),
        // },
    ]
};


export default routes




