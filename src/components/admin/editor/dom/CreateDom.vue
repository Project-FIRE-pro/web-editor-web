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
        <q-card>
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


const Notify = useNotify()
// 載入狀態
const showDialog = ref(false)
const loading = ref(false)
// Dom Id
const domId = `WC-${nanoid()}`

// 授權網域
const domainOptions = ref([{ value: 'ALL', label: '全部授權' }, { value: 'bgpower.com.tw', label: '背景模式' }]);
const chooseDomains = ref<Array<{ label: string, value: string }>>([]);
// 標記hashtag
const domHashtagsOptions = ref<Array<string>>(['Classic', 'Banner']);
// 元件資料
const domDatum = reactive({
    showName: "",
    allowDomains: <Array<string>>[],
    id: domId,
    tags: <Array<string>>[],
})
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
// 當「送出」按鈕被點擊時
const clickCreate = async () => {
    if (!handleValidation()) return false;
    loading.value = true
    domDatum.allowDomains = chooseDomains.value.map((item) => (item.value))
    await delay(1.5);
    Notify.handleSuccess("新增成功")
    console.log("要新增的Dom", domDatum);
    loading.value = false
    emit("callback");
    if (props.afterCreateAutoHide) {
        showDialog.value = false
    }
}

// 當關閉時
const handleHideDialog = () => {
    console.log('handleHideDialog');
    domDatum.showName = ""
    domDatum.allowDomains = <Array<string>>[]
    domDatum.id = `WC-${nanoid()}`
    domDatum.tags = <Array<string>>[]

    chooseDomains.value.splice(0)
}




</script>

<style scoped>
</style>