<template>
    <div>
        <q-table
            :loading="loading"
            :grid="$q.screen.xs"
            title="Treats"
            :rows="siteTableParams.data"
            :columns="siteTableParams.columns"
            row-key="id"
            v-model:pagination="siteTableParams.pagination"
            selection="multiple"
            v-model:selected="siteTableParams.selected"
            :filter="siteTableParams.filter"
            @request="siteTableParams.onRequest"
            binary-state-sort
            hide-bottom
        >


            <template v-slot:top>


                <create-site
                    v-slot="{ handleShow }"
                    @callback="getSites"
                    :afterCreateAutoHide="true"
                >
                    <q-btn
                        @click="handleShow()"
                        color="primary"
                        :disable="loading"
                        label="新增站點"
                    />
                </create-site>
                <q-btn
                    @click="deleteSelectedSites()"
                    class="q-ml-sm"
                    color="negative"
                    :disable="loading"
                    label="刪除所選站點"
                />
                <q-space />
                <q-input
                    debounce="300"
                    color="primary"
                    label="關鍵字搜尋"
                    v-model="siteTableParams.filter"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>



            <template v-slot:header-selection="scope">

                <q-checkbox
                    class="ml-4"
                    v-model="scope.selected"
                    label="元件列表"
                    left-label
                />

            </template>

            <template v-slot:body-selection="scope">



                <q-btn
                    :disable="loading"
                    round
                    color="grey"
                    icon="text_snippet"
                    size="sm"
                    @click="Dialog.create({ title: scope.row.showName, message: scope.row.note })"
                >
                    <q-tooltip>檢視備註</q-tooltip>
                </q-btn>


                <router-link :to="{ name: 'SitesItem', params: { site_id: scope.row.id } }">
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


            <template v-slot:body-cell-domains="props">
                <q-td :props="props">
                    <q-btn
                        dense
                        v-for="domain in (props.value)"
                        :key="domain"
                        @click="siteTableParams.filter = `domain:${domain}`"
                        size="xs"
                        :label="domain"
                        color="blue"
                        class="ml-0.5"
                    />
                </q-td>
            </template>



        </q-table>

    </div>
</template>
<script  lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useNotify } from '@/composables/notify';
import { SiteType } from '@/type';
import { useRouterHistoryStore } from '@/stores';
import { delay } from '@/api';

import CreateSite from '@/components/admin/site/CreateSite.vue';
import { db } from '@/common/firebase';
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { useDialog } from '@/composables/dialog';

</script>

<script setup lang="ts">
const SitesDB = db().collection('Sites');


const Notify = useNotify()
const Dialog = useDialog()
const RouterHistory = useRouterHistoryStore()

onMounted(() => {
    // 取得Sites資料
    getSites()
    // 初始化 router history 用於麵包屑
    RouterHistory.initHistory()
})

const loading = ref(false)

// siteTable 的參數
const siteTableParams = reactive({
    columns: [
        { name: 'showName', label: '站點名稱', field: 'showName' },
        { name: 'domains', label: '授權網域', field: 'domains' },
    ],
    data: [] as Array<SiteType>,
    selected: [],
    filter: '',
    pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 1,
        rowsNumber: 10 //if getting data from a server
    },
    onRequest: (props: any) => {
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter
        console.log(page, props.pagination);

        getSites(filter)
    }
})



// 取得Sites資料
const getSites = async (keyword?: string) => {
    let _SitesDB = null
    if (keyword) {
        if (keyword.indexOf('domain:') > -1) {
            keyword = keyword.replace('domain:', '')
            _SitesDB = SitesDB.where('domains', 'array-contains', keyword)
        } else {
            _SitesDB = SitesDB.where('showName', '>=', keyword)
                .where('showName', '<=', keyword + '\uf8ff')
        }
    }

    const sites = <Array<SiteType>>(useFirestore(_SitesDB ?? SitesDB) as any)
    loading.value = true
    siteTableParams.data = sites
    loading.value = false

}


// 刪除站點資料
const deleteSelectedSites = () => {
    if (siteTableParams.selected.length == 0) {
        Notify.handleWarnings("請選擇要刪除的站點")
    }
    siteTableParams.selected.forEach(site => {
        SitesDB.doc(site['id']).delete().then(() => {
            Notify.handleSuccess(`成功刪除「${site['showName']}」`)
        })
    });


}


</script>

<style scoped>
</style>