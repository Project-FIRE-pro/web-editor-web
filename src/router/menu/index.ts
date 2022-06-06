import { RouteRecordRaw, RouteRecordName } from 'vue-router'
import { get } from "lodash";


type RoutesMenu = {
    routerName: string | RouteRecordName;
    title: string;
    childrenArray?: Array<RoutesMenu>,
    icon?: string,
    showInMenu?: boolean

}



export const getRoutesMenu = (routes: RouteRecordRaw): RoutesMenu => {
    console.log('getRoutesMenu', routes.name);
    let childrenArray: Array<RoutesMenu> =
        (routes.children && routes.children.length > 0)
            ? routes.children?.map((item: RouteRecordRaw): RoutesMenu => {
                return {
                    routerName: get(item, ['name'], ''),
                    title: get(item, ['meta', 'title'], ''),
                    icon: get(item, ['meta', 'icon'], ''),
                    childrenArray: getRoutesMenu(item).childrenArray,
                    showInMenu: get(item, ['meta', 'showInMenu'], false)
                }
            })
            : [];


    return {
        routerName: get(routes, ['name'], ''),
        title: get(routes, ['meta', 'title'], ''),
        icon: get(routes, ['meta', 'icon'], ''),
        childrenArray
    }

}

export const prefixRoutes = (prefix: string, routes: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
    return routes.map((route: RouteRecordRaw) => {
        route.path = prefix + '/' + route.path;
        return route;
    })
}
