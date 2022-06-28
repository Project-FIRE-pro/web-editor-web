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
import { db } from '@/common/firebase';
import { useElementEditor } from '@/stores/elementEditor.store';
import { DomType } from '@/type';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { cloneDeep, find, isEqual } from 'lodash';
import { ref, watchEffect } from 'vue';
import { RouteRecordName, useRoute, useRouter } from 'vue-router';
</script>
<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const DomDB = db().collection('Doms').doc(route.params.id as string);
const elementEditorStore = useElementEditor()
elementEditorStore.dom = <DomType>(useFirestore(DomDB) as any)
watchEffect(() => {
    if (elementEditorStore.dom && elementEditorStore.dom.elements && elementEditorStore.elements.length == 0) {
        elementEditorStore.elements = cloneDeep(elementEditorStore.dom.elements)
    }
})
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

//處理動態儲存編輯器內容
watchEffect(() => {
    if (elementEditorStore.elements && elementEditorStore.dom && !isEqual(elementEditorStore.dom.elements, elementEditorStore.elements)) {
        DomDB.set({ ...elementEditorStore.dom, elements: elementEditorStore.elements })
    }
})
</script>

<style scoped>
</style>