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
        <q-card class="min-w-[90vw] sm:min-w-[80vw] md:min-w-[50vw]">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">新增元件</div>
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
                    <q-select
                        filled
                        v-model="chooseDom"
                        input-debounce="0"
                        label="選擇元件"
                        :options="domOptions"
                        behavior="menu"
                    >
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                    No results
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>

                    <div
                        v-if="chooseDomId && designComponentsObj[chooseDomId]"
                        class="border"
                    >
                        <component :is='designComponentsObj[chooseDomId]' />
                    </div>

                    <q-btn
                        @click="clickCreate()"
                        color="primary"
                        class="full-width"
                        label="確定"
                        :loading="loading"
                    />


                </div>

            </q-card-section>
        </q-card>



    </q-dialog>


</template>

<script lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue';
import { nanoid } from 'nanoid'
import { useNotify } from '@/composables/notify';
import { delay } from '@/api';
import { db } from '@/common/firebase';
import { DomType, PageDomData, PageType } from '@/type';
import { cloneDeep, forOwn, keys, set, unset } from 'lodash';
import { useRoute, useRouter } from 'vue-router';
import { useSiteStore } from '@/stores/site.store';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { designComponentsObj } from '@/components/design/autoRegisterDesignComponents'

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
const router = useRouter()
const Notify = useNotify()
const siteStore = useSiteStore()
const PageDB = db().collection('Sites').doc(route.params.site_id as string).collection('Pages').doc(route.params.page_id as string);
const PageData = ref<PageType>()
if (siteStore.siteData === null) {
    router.push({ name: 'SitesItem' })
}
// 載入狀態
const showDialog = ref(false)
const loading = ref(false)




// 元件資料

const domOptions = computed(() => {
    if (siteStore.domsData) {
        return siteStore.domsData.map((dom) => ({ label: `${dom.showName} / ${dom.tags} / ${dom.id}`, value: dom }))
    }
    return []
})

const chooseDom = ref<{ label: string, value: DomType }>()
const chooseDomId = computed(() => {
    if (chooseDom.value) { return chooseDom.value.value.id }
    return null
})

// 初始值
const pageDomDefaultDatum = <PageDomData>{
    id: "",
    data: [],
}
const pageDomDatum = reactive<PageDomData>(cloneDeep(pageDomDefaultDatum))
// 驗證表單是否正確
const handleValidation = () => {
    if (pageDomDatum.id == '') {
        Notify.handleWarnings("元件為必填")
        return false
    }

    return true

}
// 當「送出」按鈕被點擊時
const clickCreate = async () => {
    pageDomDatum.id = chooseDomId.value ?? ''
    if (!handleValidation()) return false;
    loading.value = true
    // await delay(1.5);
    // console.log("要新增的Dom", domDatum);
    if (siteStore.pageData) {
        const pageData = cloneDeep(siteStore.pageData)
        pageData?.domsData?.push(pageDomDatum)
        console.log(pageData);

        PageDB.set(pageData).then(() => {
            Notify.handleSuccess("新增成功")
            loading.value = false
            emit("callback");
            if (props.afterCreateAutoHide) {
                showDialog.value = false
            }
        })
    }


}

// 當關閉時
const handleHideDialog = () => {
    console.log('handleHideDialog');
    resetDatum()
}
//reset datum 
const resetDatum = () => {
    chooseDom.value = void 0
}




</script>

<style scoped>
</style>