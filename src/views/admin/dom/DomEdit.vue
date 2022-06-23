<template>
    <div class="q-pa-md">
        <div
            class="q-gutter-y-md column  shadow m-5 p-5 rounded-sm mx-auto"
            style="max-width: 600px"
        >
            <h1 class="font-bold text-lg">元件ID：{{ domDatum.id }}</h1>
            <q-input
                v-model="domDatum.showName"
                label="元件名稱"
                :rules="[val => !!val || '此欄位必填']"
            />
            <q-select
                filled
                v-model="chooseDomains"
                multiple
                :options="domainOptions"
                counter
                hint="已選"
                label="授權網域"
                use-chips
                :rules="[val => val.length > 0 || '此欄位必填']"
            >
                <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                    <q-item v-bind="itemProps">
                        <q-item-section>
                            <q-item-label v-text="opt.label" />
                            <q-item-label
                                v-text="opt.value"
                                caption
                            />
                        </q-item-section>
                        <q-item-section side>
                            <q-toggle
                                :model-value="selected"
                                @update:model-value="toggleOption(opt)"
                            />
                        </q-item-section>
                    </q-item>
                </template>

            </q-select>
            <q-select
                filled
                v-model="domDatum.tags"
                multiple
                :options="domHashtagsOptions"
                counter
                hint="已選"
                label="元件標籤"
                use-chips
            />

            <q-btn
                @click="clickSave()"
                color="primary"
                class="full-width"
                label="儲存"
                :loading="loading"
            />



        </div>
    </div>
</template>
<script lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useNotify } from '@/composables/notify';
import { delay } from '@/api';
import { includes } from 'lodash';
</script>
<script setup lang="ts">
const Notify = useNotify()
onMounted(() => {
    // 取得Dom資料
    getDom()

})
// 載入狀態
const loading = ref(false)
// 授權網域
const domainOptions = ref([{ value: 'ALL', label: '全部授權' }, { value: 'bgpower.com.tw', label: '背景模式' }]);
const chooseDomains = ref<Array<{ label: string, value: string }>>([]);
// 標記hashtag
const domHashtagsOptions = ref<Array<string>>(['Classic', 'Banner']);
// 元件資料
const domDatum = reactive({
    showName: "",
    allowDomains: <Array<string>>[],
    id: ``,
    tags: <Array<string>>[],
})
// 取得Dom資料
const getDom = async () => {
    loading.value = true
    await delay(1.5)
    domDatum.showName = '經典Banner1'
    domDatum.allowDomains = ['ALL']
    domDatum.id = 'WC-sdftGXR8_Z5jdHi6B-myT'
    domDatum.tags = ['經典', 'Banner']
    loading.value = false
    chooseDomains.value=domainOptions.value.filter(item=>(includes(domDatum.allowDomains,item.value)))
}
// 驗證表單是否正確
const handleValidation = () => {
    if (domDatum.showName == '') {
        Notify.handleWarnings("元件名稱為必填")
        return false
    }
    else if (chooseDomains.value.length == 0) {
        Notify.handleWarnings("必須選擇授權的網域")
        return false
    }
    return true

}
// 當「處存」按鈕被點擊時
const clickSave = async () => {
    if (!handleValidation()) return false;
    loading.value = true
    domDatum.allowDomains = chooseDomains.value.map((item) => (item.value))
    await delay(1.5);
    Notify.handleSuccess("更新成功")
    console.log("要更新的Dom", domDatum);
    loading.value = false
}

</script>

<style scoped>
</style>