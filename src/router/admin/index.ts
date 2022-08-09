
import { RouteRecordRaw } from 'vue-router'
import { getRoutesMenu } from '../menu';
import doms from "./Doms"
import sites from "./Sites"
import pages from "./Page"
import posts from "./Post"


const routeChildren = [
    ...doms,
    sites,
    pages,
    posts
];

const routes: RouteRecordRaw =
{
    name: 'admin',
    path: '/admin',
    meta: {
        title: '後台管理'
    },
    component: () => import('@/views/admin/layout.vue'),
    children: routeChildren
};


export default { routes, routesMenu: getRoutesMenu(routes) }
