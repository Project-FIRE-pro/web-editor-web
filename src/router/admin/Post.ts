
import { RouteRecordRaw } from 'vue-router'





// 當menu有兩層時
const routes: RouteRecordRaw =
{
    name: 'posts',
    path: ':site_id',
    meta: {
        title: '文章管理',
        icon: 'nature',
        showInMenu: true
    },
    component: () => import('@/views/admin/layoutWithoutMenu.vue'),

    redirect: {
        name: 'SitePosts',
    },
    children: [

        // {
        //     name: 'PostCommonHeader',
        //     path: 'common/Header',
        //     meta: {
        //         title: '通用文章列表',
        //         icon: 'note_add',
        //         showInMenu: true
        //     },
        //     component: () => import('@/views/admin/site/SiteCommon.vue'),
        // },
        // {
        //     name: 'PostCommonFooter',
        //     path: 'common/Footer',
        //     meta: {
        //         title: '通用文章單頁',
        //         icon: 'note_add',
        //         showInMenu: true
        //     },
        //     component: () => import('@/views/admin/site/SiteCommon.vue'),
        // },
        {
            name: 'SitePosts',
            path: 'posts',
            meta: {
                title: '文章列表',
                icon: 'note_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/post/PostList.vue'),
        },
        {
            name: 'PostItem',
            path: 'posts/:post_id',
            meta: {
                title: '頁面資料',
                icon: 'note_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/site/post/EditPost.vue'),
        },
    ]
};


export default routes




