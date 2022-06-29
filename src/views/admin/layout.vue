
<template>

    <q-layout view="hHh lpR fFf">

        <q-header
            elevated
            class="bg-primary text-white"
        >
            <q-toolbar>
                <q-btn
                    dense
                    flat
                    round
                    icon="menu"
                    @click="toggleLeftDrawer"
                />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Title
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer
            show-if-above
            v-model="leftDrawerOpen"
            side="left"
            bordered
        >
            <!-- drawer content -->
            <q-scroll-area class="fit menu-area">


                <q-list>
                    <template
                        v-for="routes in adminRoutes.childrenArray"
                        :key="routes.routerName"
                    >
                        <template v-if="(routes.childrenArray?.length ?? 0) > 0">
                            <q-expansion-item
                                v-if="routes.showInMenu"
                                :content-inset-level="0.5"
                                expand-separator
                                :label="routes.title"
                                default-opened
                                :icon="routes.icon"
                                :to="{ name: routes.routerName }"
                                :active="route.name == routes.routerName"
                            >
                                <template
                                    v-for="item in routes.childrenArray"
                                    :key="item.routerName"
                                >
                                    <q-item
                                        v-if="item.showInMenu"
                                        :to="{ name: item.routerName }"
                                        exact
                                        clickable
                                        :active="route.name == item.routerName"
                                    >
                                        <q-item-section avatar>
                                            <q-icon :name="item.icon" />
                                        </q-item-section>
                                        <q-item-section>
                                            {{ item.title }}
                                        </q-item-section>
                                    </q-item>
                                    <!-- <q-separator
                                :key="'sep' + index"
                                v-if="menuItem.separator"
                            /> -->
                                </template>
                            </q-expansion-item>
                        </template>
                        <template v-else>
                            <q-item
                                v-if="routes.showInMenu"
                                :to="{ name: routes.routerName }"
                                exact
                                clickable
                                :active="route.name == routes.routerName"
                            >
                                <q-item-section avatar>
                                    <q-icon :name="routes.icon" />
                                </q-item-section>
                                <q-item-section>
                                    {{ routes.title }}
                                </q-item-section>
                            </q-item>
                        </template>
                    </template>

                </q-list>

            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <div
                v-if="route.name == 'admin'"
                class="flex justify-center items-center h-[85vh]"
            >
                這裡是後台管理，點擊旁邊的選項開始工作吧

            </div>
            <q-scroll-area
                class="h-[calc(100vh-50px)]"
                v-else
            >
                <router-view />
            </q-scroll-area>

        </q-page-container>

    </q-layout>



</template>


<script lang="ts">
export default {
    name: 'AdminLayout',
}
</script>


<script lang="ts" setup>
import AdminRoutes from '@/router/admin'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const adminRoutes = ref(AdminRoutes.routesMenu)

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
};

</script>




<style scoped>
:deep() .menu-area div.q-item.q-link {
    display: none
}
</style>
