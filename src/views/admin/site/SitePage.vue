<template>
    <div class="p-5">

        <div class="flex gap-3 justify-between items-center">
            <q-breadcrumbs>
                <q-breadcrumbs-el
                    :label="siteStore.siteData?.showName"
                    :to="{ name: 'SitesItem' }"
                />
                <q-breadcrumbs-el
                    label="頁面管理"
                    :to="{ name: 'SitePages' }"
                />
                <q-breadcrumbs-el :label="siteStore.pageData?.showName" />
            </q-breadcrumbs>

            <div class="flex gap-3">
                <preview-page />
                <edit-page after-edit-auto-hide />
                <create-page-dom after-create-auto-hide />
                <q-btn
                    label="儲存"
                    @click="handleSave()"
                />
            </div>
        </div>



        <div>
            <template v-for="(dom, index) in pageDomsData" :key="dom.id+`${index}`">
                <div class="relative mx-5 pl-3">
                    <q-btn
                        @click="handleRemove(pageDomsData, index)"
                        class="absolute -left-[1rem] top-[1.3rem]"
                        color="red"
                        size="xs"
                        icon="close"
                        round
                    >
                        <q-tooltip
                            anchor="center end"
                            self="center left"
                        >刪除第{{ index + 1 }}元件</q-tooltip>
                    </q-btn>
                    <q-btn
                        @click="handleMove(pageDomsData, index, 'up')"
                        class="absolute -left-[1.2rem] top-[4rem]"
                        size="xs"
                        icon="expand_less"
                        round
                        flat
                    >
                        <q-tooltip
                            anchor="center end"
                            self="center left"
                        >上移元件</q-tooltip>
                    </q-btn>
                    <q-btn
                        @click="handleMove(pageDomsData, index, 'down')"
                        class="absolute -left-[1.2rem] top-[5.3rem]"
                        size="xs"
                        icon="keyboard_arrow_down"
                        round
                        flat
                    >
                        <q-tooltip
                            anchor="center end"
                            self="center left"
                        >下移元件</q-tooltip>
                    </q-btn>
                    <template v-for="e in dom.data">
                        <component
                            mode="show"
                            :is='editorElementsObjWithComponents[e.elementName].component'
                            :setting="e.setting"
                            v-model="e.value"
                        />
                    </template>
                </div>




            </template>
        </div>

    </div>
</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import EditPage from '@/components/admin/site/EditPage.vue';
import CreatePageDom from '@/components/admin/site/CreatePageDom.vue';
import PreviewPage from '@/components/admin/site/PreviewPage.vue';
import { useSiteStore } from '@/stores/site.store';
import { DomType, PageDomData, PageType } from '@/type';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useElementEditor } from '@/stores/elementEditor.store';
import { cloneDeep, find, get, has, isArray, isString, pick, set } from 'lodash';
import { editorElementsArray, editorElementsObjWithComponents } from '@/components/admin/editor/elements';
import { useNotify } from '@/composables/notify';
import { useDialog } from '@/composables/dialog';

const route = useRoute()
const router = useRouter()
const Notify = useNotify()
const Dialog = useDialog()



const siteStore = useSiteStore()
const PageDB = db().collection('Sites').doc(route.params.site_id as string).collection('Pages').doc(route.params.page_id as string);
const pageData = ref<PageType>(useFirestore(PageDB) as any)
watchEffect(() => {
    if (pageData.value) {
        siteStore.pageData = pageData.value
    } else if (pageData.value === null) {
        router.push({ name: 'SitePages' })

    }
})

const domsArray = ref<Array<DomType>>(useFirestore(db().collection('Doms').where('allowDomains', 'array-contains-any', [...(siteStore.siteData?.domains ?? []), 'ALL'])) as any)
watchEffect(() => {
    if (domsArray.value && domsArray.value != null) {
        siteStore.domsData = domsArray.value
    }
})

const formatPageDomElements = (data: Array<any> | any): (Array<any> | any) => {
    if (isArray(data)) {
        return data.map((item: any, index: number) => (formatPageDomElements(item)))
    }
    if (get(data, 'elementName') == 'EBlock') {
        const isLoop = get(data, 'setting.isLoop')

        return isLoop
            ? {
                elementName: get(data, 'elementName'),

                setting: {
                    isLoop: isLoop,
                    key: get(data, 'setting.key'),
                    default: formatPageDomElements(get(data, 'setting.value')),
                    value: [],
                    name: get(data, 'setting.name'),

                },
            }
            : {
                elementName: get(data, 'elementName'),
                setting: {
                    isLoop: isLoop,
                    key: get(data, 'setting.key'),
                    value: formatPageDomElements(get(data, 'setting.value')),
                    name: get(data, 'setting.name'),

                },
            }

    }
    return {
        elementName: get(data, 'elementName'),
        setting: {
            name: get(data, 'setting.name'),
            key: get(data, 'setting.key'),
            value: get(data, 'setting.value'),
            propsSet: get(data, 'setting.propsSet') ?? '',
        }

    }

}
const formatPageDom2DB = (data: Array<any> | any): (Array<any> | any) => {
    if (isArray(data)) {
        return data.map((item: any) => (formatPageDom2DB(item)))
    }
    if (get(data, 'elementName') == 'EBlock') {
        const isLoop = get(data, 'setting.isLoop')

        return isLoop
            ? {
                elementName: get(data, 'elementName'),
                setting: {
                    isLoop: isLoop,
                    key: get(data, 'setting.key'),
                    default: formatPageDom2DB(get(data, 'setting.default')),
                    value: { ...formatPageDom2DB(get(data, 'setting.value')) },
                    name: get(data, 'setting.name'),

                },
            }
            : {
                elementName: get(data, 'elementName'),
                setting: {
                    isLoop: isLoop,
                    key: get(data, 'setting.key'),
                    value: formatPageDom2DB(get(data, 'setting.value')),
                    name: get(data, 'setting.name'),

                },
            }

    }
    return data

}
const formatPageDom2Local = (data: Array<any> | any): (Array<any> | any) => {
    if (isArray(data)) {
        return data.map((item: any) => (formatPageDom2Local(item)))
    }
    if (get(data, 'elementName') == 'EBlock') {
        const isLoop = get(data, 'setting.isLoop')

        return isLoop
            ? {
                elementName: get(data, 'elementName'),
                setting: {
                    isLoop: isLoop,
                    key: get(data, 'setting.key'),
                    default: formatPageDom2Local(get(data, 'setting.default')),
                    value: Object.values(formatPageDom2Local(get(data, 'setting.value'))),
                    name: get(data, 'setting.name'),

                },
            }
            : {
                elementName: get(data, 'elementName'),
                setting: {
                    isLoop: isLoop,
                    key: get(data, 'setting.key'),
                    value: formatPageDom2Local(get(data, 'setting.value')),
                    name: get(data, 'setting.name'),

                },
            }

    }
    return data

}


const pageDomsData = ref<Array<PageDomData>>([])
watchEffect(() => {
    if (siteStore.pageData && siteStore.pageData?.domsData && domsArray.value && domsArray.value != null) {
        console.log("pageDomsData SET");
        pageDomsData.value = (siteStore.pageData?.domsData?.map(item => {
            return ({ id: item.id, data: (item.data && item.data.length > 0) ? formatPageDom2Local(item.data) : formatPageDomElements(find(domsArray.value, ['id', item.id])?.elements) } as PageDomData)
        }))
    }
})


const handleSave = () => {
    if (siteStore.pageData) {
        const pageData = cloneDeep(siteStore.pageData)
        pageData.domsData = pageDomsData.value.map(item => ({ id: item.id, data: formatPageDom2DB(item.data) }))
        console.log(pageData);

        PageDB.set(pageData).then(() => {
            Notify.handleSuccess("儲存成功")
        })
    }
}

const handleRemove = async (data: Array<any>, index: number) => {
    Dialog.create({
        title: '刪除確認',
        message: '是否要刪除?',
        cancel: true,
        persistent: true
    }).onOk(() => {
        data.splice(index, 1)
    })
}

const handleMove = (data: Array<any>, index: number, action: string) => {
    if (action == "up" && index >= 1) {
        [data[index], data[index - 1]] = [data[index - 1], data[index]]
    } else if (action == "down" && index + 1 < data.length) {
        [data[index], data[index + 1]] = [data[index + 1], data[index]]
    }
}


</script>

<style scoped>
</style>