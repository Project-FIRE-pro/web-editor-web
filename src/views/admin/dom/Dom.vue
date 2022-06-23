<template>
    <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
    >
        <q-tab
            v-for="item in tabs"
            @click="clickTab(item.name)"
            :name="item.name"
            :label="item.label"
        />
    </q-tabs>
    <router-view />
</template>

<script  lang="ts">
import { find } from 'lodash';
import { ref } from 'vue';
import { RouteRecordName, useRoute, useRouter } from 'vue-router';
</script>
<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const tabs = ref([
    {
        name: 'DomEdit',
        label: '編輯元件'
    }, {
        name: 'DomBlocks',
        label: '元件編輯器'
    }, {
        name: 'DomPreview',
        label: '元件預覽'
    },
])
const tab = ref(find(tabs.value, (tab: { name: RouteRecordName | null | undefined; }) => (tab.name == route.name))?.name)
const clickTab = (routeName: string) => {
    router.push({ name: routeName })
}
</script>

<style scoped>
</style>