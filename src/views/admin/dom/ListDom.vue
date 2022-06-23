<template>
    <div>
        <q-table
            :loading="loading"
            :grid="$q.screen.xs"
            title="Treats"
            :rows="domTableParams.data"
            :columns="domTableParams.columns"
            row-key="id"
            v-model:pagination="domTableParams.pagination"
            selection="multiple"
            v-model:selected="domTableParams.selected"
            :filter="domTableParams.filter"
            @request="domTableParams.onRequest"
            binary-state-sort
        >


            <template v-slot:top>


                <create-dom
                    v-slot="{ handleShow }"
                    @callback="getDoms"
                    :afterCreateAutoHide="true"
                >
                    <q-btn
                        @click="handleShow()"
                        color="primary"
                        :disable="loading"
                        label="增加元件"
                    />
                </create-dom>
                <q-btn
                    @click="deleteSelectedDoms()"
                    class="q-ml-sm"
                    color="negative"
                    :disable="loading"
                    label="刪除所選元件"
                />
                <q-space />
                <q-input
                    debounce="300"
                    color="primary"
                    label="關鍵字搜尋"
                    v-model="domTableParams.filter"
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
                >
                    <q-tooltip>複製模板</q-tooltip>
                </q-btn>


                <router-link :to="{ name: 'DomsItem', params: { id: scope.row.id } }">
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


            <template v-slot:body-cell-allowDomains="props">
                <q-td :props="props">
                    <q-btn
                        dense
                        v-for="domain in (props.value)"
                        :key="domain"
                        @click="domTableParams.filter = `domain:${domain}`"
                        size="xs"
                        :label="domain"
                        color="blue"
                        class="ml-0.5"
                    />
                </q-td>
            </template>


            <template v-slot:body-cell-tags="props">
                <q-td :props="props">
                    <q-btn
                        dense
                        v-for="tag in (props.value)"
                        :key="tag"
                        @click="domTableParams.filter = `tag:${tag}`"
                        size="xs"
                        :label="tag"
                        color="grey"
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
import { DomType } from '@/type';
import { useRouterHistoryStore } from '@/stores';
import { delay } from '@/api';

import CreateDom from '@/components/admin/editor/dom/CreateDom.vue';
</script>

<script setup lang="ts">

const Notify = useNotify()
const RouterHistory = useRouterHistoryStore()

onMounted(() => {
    // 取得Doms資料
    getDoms()
    // 初始化 router history 用於麵包屑
    RouterHistory.initHistory()
})

const loading = ref(false)

// domTable 的參數
const domTableParams = reactive({
    columns: [
        { name: 'showName', label: '元件名稱', field: 'showName' },
        { name: 'allowDomains', label: '授權網域', field: 'allowDomains' },
        { name: 'id', label: '元件ID', field: 'id' },
        { name: 'tags', label: '元件標籤', field: 'tags' },
    ],
    data: [] as Array<DomType>,
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
        getDoms()
    }
})



// 取得Doms資料
const getDoms = async () => {
    loading.value = true
    await delay(1.5)
    domTableParams.data = [
        {
            showName: '經典Banner1',
            allowDomains: ['ALL'],
            id: 'WC-sdftGXR8_Z5jdHi6B-myT',
            tags: ['經典', 'Banner']
        }, {
            showName: '經典Banner2',
            allowDomains: ['ALL'],
            id: 'WC-V1StGXR8_Z5jdHedf6B-myT',
            tags: ['經典', 'Banner']
        }, {
            showName: '經典Banner3',
            allowDomains: ['ALL'],
            id: 'WC-V1StGXR8_Z5sdfsHi6B-myT',
            tags: ['經典', 'Banner']
        }
    ]
    loading.value = false

}


// 刪除Doms資料
const deleteSelectedDoms = () => {
    if (domTableParams.selected.length == 0) {
        Notify.handleWarnings("請選擇要刪除的元件")
    }
    const selectedWebComponentIds = domTableParams.selected.map(item => item['id'])
    console.log('selectedWebComponentIds', selectedWebComponentIds);


}


</script>

<style scoped>
</style>