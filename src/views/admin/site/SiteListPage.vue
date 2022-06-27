<template>

    <div class="p-5">
        <q-breadcrumbs class="mb-3">
            <q-breadcrumbs-el :label="siteStore.siteData?.showName" />
            <q-breadcrumbs-el label="頁面管理" />
        </q-breadcrumbs>
        <q-table
            :loading="loading"
            :grid="$q.screen.xs"
            title="Treats"
            :rows="pageTableParams.data"
            :columns="pageTableParams.columns"
            row-key="id"
            v-model:pagination="pageTableParams.pagination"
            selection="multiple"
            v-model:selected="pageTableParams.selected"
            :filter="pageTableParams.filter"
            binary-state-sort
            hide-bottom
        >


            <template v-slot:top>


                <create-page
                    v-slot="{ handleShow }"
                    :afterCreateAutoHide="true"
                >
                    <q-btn
                        @click="handleShow()"
                        color="primary"
                        :disable="loading"
                        label="新增頁面"
                    />
                </create-page>
                <q-btn
                    @click="deleteSelectedPages()"
                    class="q-ml-sm"
                    color="negative"
                    :disable="loading"
                    label="刪除所選頁面"
                />
            </template>



            <template v-slot:header-selection="scope">

                <q-checkbox
                    class="ml-4"
                    v-model="scope.selected"
                    label="頁面列表"
                    left-label
                />

            </template>

            <template v-slot:body-selection="scope">



                <router-link :to="{ name: 'PageItem', params: { page_id: scope.row.id } }">
                    <q-btn
                        class="ml-1"
                        :disable="loading"
                        round
                        color="primary"
                        icon="edit"
                        size="sm"
                    >
                        <q-tooltip>編輯</q-tooltip>
                    </q-btn>
                </router-link>

                <q-checkbox v-model="scope.selected" />

            </template>

            <template v-slot:body-cell-url="props">

                <q-td :props="props">
                    <a
                        class="text-blue-600 hover:text-blue-400"
                        :href="`${siteStore.siteData?.domains[0]}/${props.value}`"
                    >
                        {{ props.value }}
                    </a>
                </q-td>
            </template>





        </q-table>

    </div>
</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import CreatePage from '@/components/admin/site/CreatePage.vue';
import { useNotify } from '@/composables/notify';
import { useSiteStore } from '@/stores/site.store';
import { PageType } from '@/type';
import { watchOnce } from '@vueuse/core';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { reactive, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const siteStore = useSiteStore()
const router = useRouter()
if (siteStore.siteData === null) {
    router.push({ name: 'SitesItem' })
}
const route = useRoute()
const PagesDB = db().collection('Sites').doc(route.params.site_id as string).collection('Pages');
const Notify = useNotify()
// 處理同步資料
const loading = ref(true)
const pagesData = ref<Array<PageType>>(useFirestore(PagesDB) as any)
watchEffect(() => {
    if (pagesData.value) {
        loading.value = false;
        pageTableParams.data = pagesData.value
    }
})
// pageTable 的參數
const pageTableParams = reactive({
    columns: [
        { name: 'showName', label: '頁面名稱', field: 'showName' },
        { name: 'url', label: '頁面連結', field: 'url' },
    ],
    data: [] as Array<PageType>,
    selected: [],
    filter: '',
    pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 1,
        rowsNumber: 10 //if getting data from a server
    },
})


// 刪除站點資料
const deleteSelectedPages = () => {
    if (pageTableParams.selected.length == 0) {
        Notify.handleWarnings("請選擇要刪除的頁面")
    }
    pageTableParams.selected.forEach(site => {
        PagesDB.doc(site['id']).delete().then(() => {
            Notify.handleSuccess(`成功刪除「${site['showName']}」`)
        })
    });


}


</script>

<style scoped>
</style>