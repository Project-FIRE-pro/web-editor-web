<template>
    {{pageData.useCommonHeader?1:2}}
    {{pageData.value.useCommonHeader?3:4}}
    <div v-if="pageData">
        <!-- 通用頁首 -->
        <template v-if="pageData?.useCommonHeader && CommonHeaderData && CommonHeaderData.domsData">
            <template v-for="item in CommonHeaderData.domsData">
                <div v-if="designComponentsObj[item.id]">
                    <component
                        :is='designComponentsObj[item.id]'
                        :data="formatData2Preview(item.data)"
                    />
                </div>
            </template>
        </template>
        <!-- 頁面元件 -->
        <template v-for="item in pageData?.domsData">
            <div v-if="designComponentsObj[item.id]">
                <component
                    :is='designComponentsObj[item.id]'
                    :data="formatData2Preview(item.data)"
                />
            </div>

        </template>
        <!-- 通用頁尾 -->
        <template v-if="pageData?.useCommonFooter && CommonFooterData && CommonFooterData.domsData">
            <template v-for="item in CommonFooterData.domsData">
                <div v-if="designComponentsObj[item.id]">
                    <component
                        :is='designComponentsObj[item.id]'
                        :data="formatData2Preview(item.data)"
                    />
                </div>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { designComponentsObj } from '@/components/design/autoRegisterDesignComponents'
import { db } from '@/common/firebase';
import { PageType } from '@/type';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import firebase from 'firebase';
import { computedAsync } from '@vueuse/core';
import { get, isArray, isString } from 'lodash';
const route = useRoute()
// const CommonHeaderData = ref<PageType>(useFirestore(db().collection('Sites').doc(route.params.site_id as string).collection('Commons').doc('Header')) as any)
// const CommonFooterData = ref<PageType>(useFirestore(db().collection('Sites').doc(route.params.site_id as string).collection('Commons').doc('Footer')) as any)
const getSiteDB = () => {
    return new Promise<firebase.firestore.DocumentReference | string>(async (resolve, reject) => {
        const siteQuerySnapshot = await db().collection('Sites').where('domains', 'array-contains', window.location.host).get()
        if (siteQuerySnapshot.empty) { resolve('siteQuerySnapshot is empty') }
        const siteSnapshot = siteQuerySnapshot.docs[0]  // use only the first document, but there could be more
        resolve(siteSnapshot.ref)
        // const pageQuerySnapshot = await siteSnapshot.ref.collection('Pages').where('url', '==', route.path).get()
        // if (pageQuerySnapshot.empty) { resolve('pageQuerySnapshot is empty') }
        // const pageSnapshot = pageQuerySnapshot.docs[0]
        // resolve(pageSnapshot.ref)
    })

}
const getPageDB = () => {
    return new Promise<firebase.firestore.DocumentReference | string>(async (resolve, reject) => {
        const siteSnapshotRef = await getSiteDB()
        if (isString(siteSnapshotRef)) { resolve('siteQuerySnapshot is empty'); return null }
        const pageQuerySnapshot = await siteSnapshotRef.collection('Pages').where('url', '==', route.path).get()
        if (pageQuerySnapshot.empty) { resolve('pageQuerySnapshot is empty') }
        const pageSnapshot = pageQuerySnapshot.docs[0]
        resolve(pageSnapshot.ref)
    })

}
const CommonHeaderData = computedAsync(
    async () => {
        const SiteDB = await getSiteDB()
        if (isString(SiteDB)) {
            return null
        } else {
            return <PageType>(useFirestore(SiteDB.collection('Commons').doc('Header'))?.value as any)
        }
    },
    null, // initial state
)
const pageData = computedAsync(
    async () => {
        const PageDB = await getPageDB()
        console.log('PageDB', PageDB);
        if (isString(PageDB)) {
            return null
        } else {
            return reactive<PageType>(useFirestore(PageDB) as any)
        }
    },
    null, // initial state
)
const CommonFooterData = computedAsync(
    async () => {
        const SiteDB = await getSiteDB()
        if (isString(SiteDB)) {
            return null
        } else {
            return <PageType>(useFirestore(SiteDB.collection('Commons').doc('Footer')).value as any)
        }
    },
    null, // initial state
)
const formatData2Preview = (data: Array<any> | any): (Array<any> | any) => {
    if (isArray(data)) {
        return data.map((item: any) => (formatData2Preview(item)))
    }
    if (get(data, 'elementName') == 'EBlock') {
        const isLoop = get(data, 'setting.isLoop')

        return isLoop
            ? {
                isLoop: isLoop,
                // elementName: get(data, 'elementName'),
                key: get(data, 'setting.key'),
                value: formatData2Preview(Object.values(get(data, 'setting.value'))),
            }
            : {
                isLoop: isLoop,
                // elementName: get(data, 'elementName'),
                key: get(data, 'setting.key'),
                value: formatData2Preview(get(data, 'setting.value')),
            }

    }
    return {
        // elementName: get(data, 'elementName'),
        key: get(data, 'setting.key'),
        value: get(data, 'setting.value'),
        // propsSet: get(data, 'setting.propsSet'),
    }

}


</script>

<style scoped>
</style>