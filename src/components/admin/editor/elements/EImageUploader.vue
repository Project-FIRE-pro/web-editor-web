<template>
    <div v-if="props.mode == 'view'">
        <div class="mt-3 text-2xl font-bold">{{ props.setting.name }}</div>
        <div class="flex justify-around">
            <div
                ref="ComponentRef"
                class="w-full"
            >


                <div class="shadow p-5 ">
                    <q-file
                        filled
                        v-model="model"
                        label="上傳圖片"
                        accept="image/*"
                        clearable
                        @clear="mvalue = ''"
                    >
                        <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                        </template>
                    </q-file>

                    <template v-if="mvalue">
                        <q-img :src="mvalue" />
                        <q-btn
                            class="mt-2"
                            @click="showEditDialog = true"
                            color="primary"
                            label="編輯圖片"
                        />

                        <!-- 圖片 編輯器 -->
                        <q-dialog
                            v-model="showEditDialog"
                            full-width
                        >
                            <q-card class="p-5">
                                <q-card-section>
                                    <div class="text-h6">圖片編輯器</div>
                                </q-card-section>

                                <q-field
                                    label="圖片壓縮比"
                                    stack-label
                                    class="px-5"
                                >
                                    <template v-slot:control>
                                        <q-slider
                                            v-model="cropperOption.size"
                                            :min="0.1"
                                            :max="1.0"
                                            :step="0.05"
                                            markers
                                            :marker-labels="objMarkerLabel"
                                        />
                                    </template>
                                </q-field>

                                <div class="h-[60vh]  w-full flex">

                                    <vue-cropper
                                        v-if="showEditDialog"
                                        ref="cropperRef"
                                        :img="cropperOption.img"
                                        :outputSize="cropperOption.size"
                                    ></vue-cropper>
                                    <q-btn
                                        class="mt-2 mr-2"
                                        color="primary"
                                        label="左旋轉"
                                        @click="() => { cropperRef!.rotateLeft() }"
                                    />
                                    <q-btn
                                        class="mt-2 mr-2"
                                        color="primary"
                                        label="右旋轉"
                                        @click="() => { cropperRef!.rotateRight() }"
                                    />
                                    <q-btn
                                        class="mt-2 mr-2"
                                        color="primary"
                                        label="剪裁模式"
                                        @click="() => { cropperRef!.goAutoCrop() }"
                                    />
                                </div>

                                <q-card-actions align="right">
                                    <q-btn
                                        @click="showEditDialog = false"
                                        flat
                                        label="取消"
                                        color="primary"
                                    />
                                    <q-btn
                                        @click="setImg()"
                                        flat
                                        label="確定"
                                        color="primary"
                                    />
                                </q-card-actions>
                            </q-card>
                        </q-dialog>

                    </template>



                </div>

            </div>


        </div>


    </div>

    <div v-else>

        <q-input
            filled
            v-model="props.setting.name"
            label="區塊名稱"
        />
        <q-input
            class="mt-1"
            filled
            v-model="props.setting.key"
            label="鍵值"
        />





    </div>



</template>

<script lang="ts">

export default {
    name: 'EImageUploader',
    defaultSetting: {
        name: "未命名圖片上傳器",
        key: 'noKeyImageUploader',
        value: '',
    }
}
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { QInputProps } from 'quasar'
import { VueCropper } from 'vue-cropper/next'; 
</script>


<script setup lang="ts">

interface Props {
    mode?: string;
    modelValue: string;
    setting: {
        key: string,
        value: string,
        name: string,
    }
}
const props = withDefaults(defineProps<Props>(), {
    mode: 'view',
    modelValue: '',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: QInputProps['modelValue']): void;
}>();

//   雙向value
const mvalue = computed({
    get: () => props.modelValue
    ,
    set: (val) => {
        emit("update:modelValue", val);
    }
})
const convertFile = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => { resolve((reader.result) as string) }
        reader.onerror = () => { reject(reader.error) }
        reader.readAsDataURL(file)
    })
}
const model = ref<File | null>(null)
watch(() => model.value, async (file: Blob | null) => {
    console.log(file);
    if (file) { mvalue.value = await convertFile(file) }
})


const objMarkerLabel = (val: number) => `${(Math.round(val * 100))}%`
const cropperRef = ref<typeof VueCropper | null>(null)
const showEditDialog = ref(false);
watch(() => showEditDialog.value, () => {
    cropperOption.value.img = mvalue.value
})
const cropperOption = ref({
    img: '',
    size: 1,
})
const setImg = () => {
    cropperRef.value!.getCropData((data: any) => {
        mvalue.value = data;
        showEditDialog.value = false
        cropperOption.value.size = 1
    })

}










</script>

<style scoped lang="sass">
</style>
