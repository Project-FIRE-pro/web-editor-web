<template>

    <slot :handleShow="() => { showDialog = true }">
        <q-btn
            label="新增元件"
            color="primary"
            @click="showDialog = true"
        />
    </slot>



    <q-dialog
        v-model="showDialog"
        @hide="handleHideDialog"
       
    >
        <q-card  class="min-w-[90vw] sm:min-w-[80vw] md:min-w-[50vw]">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">新增站點</div>
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
                        v-model="siteDatum.showName"
                        label="站點名稱"
                        :rules="[val => !!val || '此欄位必填']"
                    />
                    <q-select
                        v-model="siteDatum.domains"
                        use-input
                        use-chips
                        multiple
                        hide-dropdown-icon
                        input-debounce="0"
                        new-value-mode="add-unique"
                        label="授權網域"
                    />

                    <q-input
                        v-model="siteDatum.note"
                        label="站點備註"
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
import { reactive, ref } from 'vue';
import { nanoid } from 'nanoid'
import { useNotify } from '@/composables/notify';
import { delay } from '@/api';
import { db } from '@/common/firebase';
import { SiteType } from '@/type/site.type';
import { cloneDeep, forOwn, keys, set, unset } from 'lodash';
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

const DomsDB = db().collection('Sites');
const Notify = useNotify()
// 載入狀態
const showDialog = ref(false)
const loading = ref(false)


// 元件資料
const siteDefaultDatum = <SiteType>{
    showName: "",
    domains: <Array<string>>[],
    note: "",
}
const siteDatum = reactive<SiteType>(cloneDeep(siteDefaultDatum))
// 驗證表單是否正確
const handleValidation = () => {
    if (siteDatum.showName == '') {
        Notify.handleWarnings("站點名稱為必填")
        return false
    } else if (siteDatum.domains.length == 0) {
        Notify.handleWarnings("授權網域為必填")
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
    DomsDB.add(siteDatum).then(() => {
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
    keys(siteDatum).forEach(key => {
        unset(siteDatum, key)
    })
    forOwn(siteDefaultDatum, (value, key) => {
        set(siteDatum, key, cloneDeep(value))
    })
}




</script>

<style scoped>
</style>