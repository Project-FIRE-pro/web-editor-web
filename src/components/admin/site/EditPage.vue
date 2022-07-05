<template>

    <slot :handleShow="() => { showDialog = true }">
        <q-btn
            label="編輯頁面"
            color="primary"
            @click="showDialog = true"
        />
    </slot>



    <q-dialog
        v-model="showDialog"
        @hide="handleHideDialog"
    >
        <q-card class="min-w-[90vw] sm:min-w-[80vw] md:min-w-[50vw]">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">編輯頁面</div>
                <q-space />
                <q-btn
                    icon="close"
                    flat
                    round
                    dense
                    v-close-popup
                />
            </q-card-section>
            <q-card-section>

                <div class="q-gutter-y-md column   p-5 rounded-sm mx-auto">
                    <q-input
                        v-model="pageDatum.showName"
                        label="頁面名稱"
                        :rules="[val => !!val || '此欄位必填']"
                    />

                    <q-input
                        v-model="pageDatum.url"
                        label="頁面連結"
                        :rules="[val => !!val || '此欄位必填']"
                    />
                    <q-toggle
                        v-model="pageDatum.useCommonHeader"
                        label="使用通用頁首"
                    />

                    <q-toggle
                        v-model="pageDatum.useCommonFooter"
                        label="使用通用頁尾"
                    />
                    <q-input
                        v-model="pageDatum.description"
                        label="頁面簡介"
                    />


                    <q-input
                        v-model="pageDatum.note"
                        label="頁面備註"
                        type="textarea"
                    />


                    <q-btn
                        @click="clickCreate()"
                        color="primary"
                        class="full-width"
                        label="送出"
                        :loading="loading"
                    />


                </div>

            </q-card-section>
        </q-card>



    </q-dialog>


</template>

<script lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import { nanoid } from 'nanoid'
import { useNotify } from '@/composables/notify';
import { delay } from '@/api';
import { db } from '@/common/firebase';
import { PageType } from '@/type/site.type';
import { cloneDeep, forOwn, keys, set, unset } from 'lodash';
import { useSiteStore } from '@/stores/site.store';
import { useRoute } from 'vue-router';
</script>

<script setup lang="ts">
// Props
type Props = {
    afterEditAutoHide?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    afterEditAutoHide: false,
});

// Emit
const emit = defineEmits<{
    (e: 'callback'): void;
}>();

const route = useRoute()
const PageDB = db().collection('Sites').doc(route.params.site_id as string).collection('Pages').doc(route.params.page_id as string);
const Notify = useNotify()
// 載入狀態
const showDialog = ref(false)
const loading = ref(false)
const dataUpdateLock = ref(false)



// 元件資料
const pageDefaultDatum = reactive<PageType>({
    showName: "",
    url: "",
    description: "",
    note: ""
})
const pageDatum = reactive<PageType>(cloneDeep(pageDefaultDatum))
// 驗證表單是否正確
const handleValidation = () => {
    if (pageDatum.showName == '') {
        Notify.handleWarnings("頁面名稱為必填")
        return false
    } else if (pageDatum.url == '') {
        Notify.handleWarnings("頁面連結為必填")
        return false
    }

    return true

}
//reset datum 
const resetDatum = (site: PageType) => {
    keys(pageDatum).forEach(key => {
        unset(pageDatum, key)
    })
    forOwn(site, (value, key) => {
        set(pageDatum, key, cloneDeep(value))
    })
}

// 處理資料同步
const siteStore = useSiteStore()
watchEffect(() => {
    if (siteStore.pageData &&(!dataUpdateLock.value||!showDialog.value)) {
        resetDatum(siteStore.pageData)
        dataUpdateLock.value = true
    }
})


// 當「送出」按鈕被點擊時
const clickCreate = async () => {
    if (!handleValidation()) return false;
    loading.value = true
    // await delay(1.5);
    // console.log("要新增的Dom", domDatum);
    PageDB.set(pageDatum).then(() => {
        Notify.handleSuccess("更新成功")
        loading.value = false
        dataUpdateLock.value = false
        emit("callback");
        if (props.afterEditAutoHide) {
            showDialog.value = false
        }
    })

}

// 當關閉時
const handleHideDialog = () => {
    console.log('handleHideDialog');
    if (siteStore.pageData) {
        resetDatum(siteStore.pageData)
    }

}





</script>

<style scoped>
</style>