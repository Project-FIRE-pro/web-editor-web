<template>
    <div class="p-5">
        <q-breadcrumbs class="mb-3">
            <q-breadcrumbs-el :label="siteStore.siteData?.showName" />
            <q-breadcrumbs-el label="文章管理" />
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



                <q-btn
                    @click="createPost()"
                    color="primary"
                    :disable="loading"
                    label="新增文章"
                />
                <q-btn
                    @click="deleteSelectedPosts()"
                    class="q-ml-sm"
                    color="negative"
                    :disable="loading"
                    label="刪除所選文章"
                />
            </template>



            <template v-slot:header-selection="scope">

                <q-checkbox
                    class="ml-4"
                    v-model="scope.selected"
                    label="文章列表"
                    left-label
                />

            </template>

            <template v-slot:body-selection="scope">
                <router-link :to="{ name: 'PostItem', params: { post_id: scope.row.id } }">
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

            <template v-slot:body-cell-classificationId="props">
                <q-td :props="props">

                    <div>
                        {{getClassificationById(props.value)}}
                        <!-- {{ }} -->
                    </div>
                </q-td>
            </template>

        </q-table>

    </div>
</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import { useNotify } from '@/composables/notify';
import { useSiteStore } from '@/stores/site.store';
import { PageType } from '@/type';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { find } from 'lodash';
import { reactive, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const siteStore = useSiteStore()
const router = useRouter()
if (siteStore.siteData === null) {
    router.push({ name: 'SitesItem' })
}
const route = useRoute()
const PostDB = db().collection('Sites').doc(route.params.site_id as string).collection('Posts').doc('Articles');
const PostsDB = PostDB.collection('Datas');
const Notify = useNotify()


const postsClassification = ref<any>(useFirestore(PostDB) as any)

// 處理同步資料
const loading = ref(true)
const postsData = ref<Array<PageType>>(useFirestore(PostsDB) as any)
watchEffect(() => {
    if (postsData.value) {
        loading.value = false;
        pageTableParams.data = postsData.value
    }
})
// Table 的參數
const pageTableParams = reactive({
    columns: [
        { name: 'status', label: '狀態', field: 'status' },
        { name: 'title', label: '標題', field: 'title' },
        { name: 'classificationId', label: '分類', field: 'classificationId' },
        { name: 'updatePerson', label: '建立/更新人', field: 'updatePerson' },
        { name: 'updateTime', label: '更新時間', field: 'updateTime' },
        { name: 'viewCount', label: '觀看次數', field: 'viewCount' },

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


// 新增文章
const createPost = () => {
    PostsDB.add({
        "title": "標題",
        "updatePerson": "更新人",
        "updateTime": (new Date()).toLocaleString(),
        "content": "",
        "status": "未發布",
        "hashtags": [],
        "classificationId": "0",
        "viewCount": 0,
        "mainImage": ""
    }).then((post) => {
        router.push({ name: 'PostItem', params: { post_id: post.id } })
    })
}
// 刪除站點資料
const deleteSelectedPosts = () => {
    if (pageTableParams.selected.length == 0) {
        Notify.handleWarnings("請選擇要刪除的文章")
    }
    pageTableParams.selected.forEach(post => {
        PostsDB.doc(post['id']).delete().then(() => {
            Notify.handleSuccess(`成功刪除「${post['title']}」`)
        })
    });
}

// 取得文章分類
const getClassificationById = (id: string) => {
    const classification = find(postsClassification.value.classification, (o) => (o.id == id))
    if(classification){
        return classification.value
    }
    return '未分類'
 }

</script>


<style scoped>
</style>