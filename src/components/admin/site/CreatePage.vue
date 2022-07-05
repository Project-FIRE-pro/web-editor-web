<template>

    <slot :handleShow="() => { showDialog = true }">
        <q-btn
            label="新增頁面"
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
                <div class="text-h6">新增頁面</div>
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
import { reactive, ref } from 'vue';
import { nanoid } from 'nanoid'
import { useNotify } from '@/composables/notify';
import { delay } from '@/api';
import { db } from '@/common/firebase';
import { PageType } from '@/type';
import { cloneDeep, forOwn, keys, set, unset } from 'lodash';
import { useRoute } from 'vue-router';
</script>

<script setup lang="ts">
// Props
type Props = {
    afterCreateAutoHide?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    afterCreateAutoHide: false,
});

// Emit
const emit = defineEmits<{
    (e: 'callback'): void;
}>();
const route = useRoute()
const Notify = useNotify()
const PagesDB = db().collection('Sites').doc(route.params.id as string).collection('Pages');
// 載入狀態
const showDialog = ref(false)
const loading = ref(false)



// 頁面資料
const pageDefaultDatum = <PageType>{
    domsData: [],
    showName: "",
    url: "",
    useCommonHeader: true,
    useCommonFooter: true,
}
const pageDatum = reactive<PageType>(cloneDeep(pageDefaultDatum))
// 驗證表單是否正確
const handleValidation = () => {
    if (pageDatum.showName == '') {
        Notify.handleWarnings("頁面名稱為必填")
        return false
    } else if (pageDatum.url == '') {
        Notify.handleWarnings("頁面網址為必填")
        return false
    }

    return true

}
// 當「送出」按鈕被點擊時
const clickCreate = async () => {
    if (!handleValidation()) return false;
    loading.value = true
    // await delay(1.5);
    // console.log("要新增的Dom", domDatum);
    PagesDB.add(pageDatum).then(() => {
        Notify.handleSuccess("新增成功")
        loading.value = false
        emit("callback");
        if (props.afterCreateAutoHide) {
            showDialog.value = false
        }
    })

}

// 當關閉時
const handleHideDialog = () => {
    console.log('handleHideDialog');
    resetDatum()
}
//reset datum 
const resetDatum = () => {
    keys(pageDatum).forEach(key => {
        unset(pageDatum, key)
    })
    forOwn(pageDefaultDatum, (value, key) => {
        set(pageDatum, key, cloneDeep(value))
    })
}




</script>

<style scoped>
</style>