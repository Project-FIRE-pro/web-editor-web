<template>

    <slot :handleShow="() => { showDialog = true }">
        <q-btn
            label="編輯站點"
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
                <div class="text-h6">編輯站點</div>
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
import { reactive, ref, watchEffect } from 'vue';
import { nanoid } from 'nanoid'
import { useNotify } from '@/composables/notify';
import { delay } from '@/api';
import { db } from '@/common/firebase';
import { SiteType } from '@/type/site.type';
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
const DomsDB = db().collection('Sites').doc(route.params.id as string);
const Notify = useNotify()
// 載入狀態
const showDialog = ref(false)
const loading = ref(false)
const dataUpdateLock = ref(false)



// 元件資料
const siteDefaultDatum = reactive<SiteType>({
    showName: "",
    domains: <Array<string>>[],
    note: "",
})
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
//reset datum 
const resetDatum = (site: SiteType) => {
    keys(siteDatum).forEach(key => {
        unset(siteDatum, key)
    })
    forOwn(site, (value, key) => {
        set(siteDatum, key, cloneDeep(value))
    })
}

// 處理資料同步
const siteStore = useSiteStore()
watchEffect(() => {
    if (siteStore.siteData && !dataUpdateLock.value) {
        resetDatum(siteStore.siteData)
        dataUpdateLock.value = true
    }
})


// 當「送出」按鈕被點擊時
const clickCreate = async () => {
    if (!handleValidation()) return false;
    loading.value = true
    // await delay(1.5);
    // console.log("要新增的Dom", domDatum);
    DomsDB.set(siteDatum).then(() => {
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
    if (siteStore.siteData) {
        resetDatum(siteStore.siteData)
    }

}





</script>

<style scoped>
</style>