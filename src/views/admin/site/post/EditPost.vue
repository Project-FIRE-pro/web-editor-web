<template>
    <div
        v-if="_post"
        class="p-5"
    >

        <q-page-sticky
            position="top-right"
            :offset="[18, 18]"
            class="z-10"
        >
            <div class="text-right ">
                <q-btn
                    @click="handlePostUpdate()"
                    :color="postIsLatest ? 'secondary' : 'negative'"
                    :label="postIsLatest ? '已儲存' : '未儲存'"
                >
                    <q-tooltip> 上次存檔時間：{{ _post.updateTime }}，更新人：{{
                            _post.updatePerson
                    }}</q-tooltip>
                </q-btn>

            </div>

        </q-page-sticky>
        <q-breadcrumbs class="mb-3">
            <q-breadcrumbs-el :label="siteStore.siteData?.showName" />
            <q-breadcrumbs-el label="文章管理" />
            <q-breadcrumbs-el :label="`${_post.title}（${_post.updatePerson}：${_post.updateTime}）`" />
        </q-breadcrumbs>

        <div>


            <div class="p-3 w-full flex justify-between ">
                <div class="flex items-center gap-3">
                    <div class="text-2xl font-bold ">狀態</div>
                    <q-option-group
                        v-model="_post.status"
                        :options="[
                            {
                                label: '已發布',
                                value: '已發布'
                            },
                            {
                                label: '未發布',
                                value: '未發布'
                            },
                        ]"
                        color="primary"
                        inline
                    />
                </div>
                <div class=" flex gap-3 w-full">
                    <div class="w-full">
                        <div class="text-2xl font-bold mt-6">標題</div>
                        <q-input
                            filled
                            v-model="_post.title"
                        />
                    </div>
                </div>

                <div
                    v-if="_basePost"
                    class=" flex gap-3 w-[49%]"
                >
                    <div class="w-full">
                        <div class="text-2xl font-bold mt-6">分類</div>
                        <q-select
                            filled
                            option-label="value"
                            option-value="id"
                            v-model="chooseClassification"
                            :options="[{
                                id: '0',
                                value: '未分類'
                            }, ..._basePost.classification]"
                        />
                    </div>
                </div>

                <div class=" flex gap-3 w-[49%]">
                    <div class="w-full">
                        <div class="text-2xl font-bold mt-6">標籤</div>
                        <q-select
                            filled
                            v-model="_post.hashtags"
                            use-input
                            use-chips
                            multiple
                            hide-dropdown-icon
                            input-debounce="0"
                            new-value-mode="add-unique"
                        />
                    </div>
                </div>


                <EImageUploader
                    v-model="_post.mainImage"
                    :setting="{
                        key: '',
                        value: '',
                        name: '主圖片',
                    }"
                />
                <EQEditor
                    mode="view"
                    v-model="_post.content"
                    :setting="{
                        key: '',
                        value: '',
                        name: '內文',
                    }"
                />


            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '@/stores/site.store';
import { db } from '@/common/firebase';
import { useRoute } from 'vue-router';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { computed, ref, watch, watchEffect } from 'vue';
import { cloneDeep, find } from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import EQEditor from '@/components/admin/editor/elements/EQEditor.vue';
import EImageUploader from '@/components/admin/editor/elements/EImageUploader.vue';



const siteStore = useSiteStore()
const route = useRoute()
const PostId: string = route.params['post_id'] as string ?? ''
const BasePostDB = db().collection('Sites').doc(route.params.site_id as string).collection('Posts').doc('Articles');
type BasePost = {
    classification: {
        id: string,
        value: string,
    }[]
}
const basePost = ref<BasePost>(useFirestore(BasePostDB) as any)
const _basePost = ref<BasePost | null>(null)
watch(() => basePost.value, (val) => {
    if (val) {
        _basePost.value = cloneDeep(val)
    }
})

const PostDB = BasePostDB.collection('Datas').doc(PostId);
type PostType = {
    viewCount: number,
    status: string,
    title: string,
    mainImage: string,
    updateTime: string,
    hashtags: string[],
    content: string,
    classificationId: string,
    updatePerson: string,
}
const post = ref<PostType>(useFirestore(PostDB) as any)
const postOriginalMd5 = ref<string | null>(null)
const _post = ref<PostType | null>(null)
watch(() => post.value, (POST) => {
    if (postOriginalMd5.value === null && POST) {
        _post.value = cloneDeep(POST)
        postOriginalMd5.value = Md5.hashStr(JSON.stringify(POST))
    }
})

// 是否需要儲存
const postIsLatest = computed(() => (Md5.hashStr(JSON.stringify(_post.value)) == postOriginalMd5.value))

// 文章分類
const chooseClassification = ref()
watch(() => chooseClassification.value, (classification) => {
    if (classification && _post.value) {
        _post.value.classificationId = classification['id']
    }
})
watchEffect(() => {
    if (_basePost.value?.classification &&
        _basePost.value?.classification.length > 0 &&
        _post.value?.classificationId
    ) {
        const _chooseClassification = find(
            _basePost.value?.classification, (o) => o.id == _post.value?.classificationId)
        if (_chooseClassification) {
            chooseClassification.value = _chooseClassification
        } else {
            chooseClassification.value = {
                id: '0',
                value: '未分類'
            }
        }
    }
})

// 儲存
const handlePostUpdate = () => {
    if (postIsLatest.value) {
        return;
    }
    if (_post.value === null) {
        return;
    }
    console.log(1);

    const data = cloneDeep(_post.value)
    data.updatePerson = "路人甲"
    data.updateTime = (new Date()).toLocaleString();
    postOriginalMd5.value = null
    PostDB.update(data)
}


</script>

<style scoped>
</style>