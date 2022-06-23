<template>
    <div v-if="props.mode == 'view'">
        <div class="mt-3 text-2xl font-bold">{{ props.setting.name }}</div>
        <q-editor
            :id="QEditId"
            v-model="mvalue"
            :definitions="definitions"
            :toolbar="toolbar"
            :fonts="fonts"
        />
        <br>
        <input
            class="hidden"
            type="file"
            :id="`${QEditId}-file-uploader`"
            data-target="file-uploader"
            accept="image/*"
        />

        <!-- 圖片MENU  -->
        <q-menu
            v-if="showImgMenu"
            @show="clickImg"
            touch-position
            :target="imgTarget"
        >
            <q-list>
                <q-item
                    v-close-popup
                    clickable
                >
                    <q-item-section @click="showEditDialog = true">
                        編輯圖片
                    </q-item-section>

                </q-item>
                <q-item
                    v-close-popup
                    clickable
                >
                    <q-item-section @click="showCssEditDialog = true">
                        編輯圖片樣式(CSS)
                    </q-item-section>

                </q-item>
                <q-item
                    v-close-popup
                    clickable
                >
                    <q-item-section @click="handleImgDelete()">
                        刪除圖片
                    </q-item-section>
                </q-item>
            </q-list>
        </q-menu>

        <!-- CSS 編輯器 -->
        <q-dialog v-model="showCssEditDialog">
            <q-card class="p-5">
                <q-card-section>
                    <div class="text-h6">CSS 編輯器</div>
                </q-card-section>

                <q-input
                    v-model="styleEditText"
                    type="textarea"
                    autogrow
                    hint="輸入css語法"
                />


                <q-card-actions align="right">
                    <q-btn
                        @click="setStyle()"
                        flat
                        label="OK"
                        color="primary"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>


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

                <div class="h-[60vh] w-full flex">

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
                        label="OK"
                        color="primary"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>

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
    name: 'EditorQEditor',
    defaultSetting: {
        name: "未命名富文本",
        key: 'noKeyQEditor',
        value: '',
    }
}
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { QEditor, QEditorProps, QInputProps, useQuasar } from 'quasar'
import { useNotify } from '@/composables/notify';
import { nanoid } from 'nanoid'
import { useDialog } from '@/composables/dialog';
import 'vue-cropper/next/dist/index.css'
import { VueCropper } from 'vue-cropper/next';



</script>


<script setup lang="ts">

const $q = useQuasar()
const Notify = useNotify()

const Dialog = useDialog()

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








// 圖片MENU
const showImgMenu = ref(false)
const imgTarget = ref<HTMLElement>()
const handleImgMenu = async () => {
    console.log('handleImgMenu');
    await nextTick()
    document.querySelectorAll(`div#${QEditId.value}`).forEach(element => {
        if (element.getAttribute('listener') !== 'true') {
            element.setAttribute('listener', 'true');
            element.addEventListener('click', function (e) {
                showImgMenu.value = false;

                const elementClicked = e.target as HTMLInputElement;
                // console.log('click', elementClicked.tagName, elementClicked.className, elementClicked);
                if (elementClicked.tagName == 'IMG' && elementClicked.className == 'QE') {
                    imgTarget.value = elementClicked
                    showImgMenu.value = true;
                }
            });
        }
    })
}
const clickImg = async () => {
    await nextTick()
    const id = imgTarget.value?.id;
    // console.log(id);
    const element = document.querySelector(`#${QEditId.value} #${id}`) as HTMLElement
    // console.log(`#${QEditId.value} #${id}`, element);

    styleEditText.value = element.style.cssText
}
// MENU 中的 CSS 編輯器
const showCssEditDialog = ref(false)
const styleEditText = ref('')

const setStyle = () => {
    const id = imgTarget.value?.id;
    const element = document.querySelector(`#${QEditId.value} #${id}`) as HTMLElement
    element.style.cssText = styleEditText.value
    mvalue.value = (document.querySelector(`#${QEditId.value} .q-editor__content`) as Element)!.innerHTML
    showCssEditDialog.value = false

}
// MENU 中的 刪除圖片
const handleImgDelete = () => {
    (Dialog.create({
        title: '刪除確認',
        message: '是否要刪除此圖片?',
        cancel: true,
        persistent: true
    })).onOk(() => {
        const id = imgTarget.value?.id;
        const element = document.querySelector(`#${QEditId.value} #${id}`) as HTMLElement
        element.remove()
        mvalue.value = (document.querySelector(`#${QEditId.value} .q-editor__content`) as Element)!.innerHTML
        Notify.handleSuccess("刪除成功")
    })

}

//  MENU 中的 編輯圖片
const objMarkerLabel = (val: number) => `${(Math.round(val * 100))}%`
const cropperRef = ref<typeof VueCropper | null>(null)
const showEditDialog = ref(false);
watch(() => showEditDialog.value, () => {
    const id = imgTarget.value?.id;
    const element = document.querySelector(`#${QEditId.value} #${id}`) as HTMLImageElement
    cropperOption.value.img = element.src
})
const cropperOption = ref({
    img: '',
    size: 1,
})
const setImg = () => {
    const id = imgTarget.value?.id;
    const element = document.querySelector(`#${QEditId.value} #${id}`) as HTMLImageElement
    cropperRef.value!.getCropData((data: any) => {
        element.src = data;
        mvalue.value = (document.querySelector(`#${QEditId.value} .q-editor__content`) as Element)!.innerHTML
        showEditDialog.value = false

        cropperOption.value.size = 1
    })

}


// QEditor 設定
const QEditId = ref(`QEDIT${nanoid()}`)
function convertFile(file: Blob) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => { resolve(reader.result) }
        reader.onerror = () => { reject(reader.error) }
        reader.readAsDataURL(file)
    })
}
const uploadIt = () => {
    const fileUploader = document.querySelector(`#${QEditId.value}-file-uploader`)! as HTMLElement
    fileUploader.click()
    if (fileUploader.getAttribute('listener') !== 'true') {
        fileUploader.setAttribute('listener', 'true');
        fileUploader.addEventListener('change', async (e) => {
            showImgMenu.value = false
            const file = (e.target! as HTMLInputElement).files![0]
            const base64 = await convertFile(file)
            // console.log(base64);
            mvalue.value += ` <img class="QE" src="${base64}" id="PIC${nanoid()}" alt="">`
            showImgMenu.value = true;
            (fileUploader as HTMLInputElement).value = "";
        });
    }
}

const uploadYoutube = () => {
    Dialog.create({
        title: '嵌入影片',
        message: '選擇一個 Youtube 影片，點擊「分享」→「嵌入」，複製右方程式碼',
        prompt: {
            model: '',
            type: 'textarea' // optional
        },
        cancel: true,
        persistent: true
    }).onOk(data => {
        mvalue.value += data
        Notify.handleSuccess("嵌入成功")

    })
}

const definitions = ref<any>({
    upload: {
        tip: '上傳圖片',
        icon: 'file_upload',
        label: '上傳圖片',
        handler: uploadIt
    },
    uploadYoutube: {
        tip: '嵌入影片',
        icon: 'movie',
        label: '嵌入影片',
        handler: uploadYoutube
    }

})
const toolbar = ref([
    ['viewsource'],

    [
        {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
        }
    ],
    ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
    ['token', 'hr', 'link', 'custom_btn'],
    ['print', 'fullscreen'],
    [
        {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
                'p',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'code'
            ]
        },
        {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7'
            ]
        },
        {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana'
            ]
        },
        'removeFormat'
    ],
    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

    ['undo', 'redo'],
    ['upload', 'uploadYoutube'],
])

const fonts = ref({
    arial: 'Arial',
    arial_black: 'Arial Black',
    comic_sans: 'Comic Sans MS',
    courier_new: 'Courier New',
    impact: 'Impact',
    lucida_grande: 'Lucida Grande',
    times_new_roman: 'Times New Roman',
    verdana: 'Verdana'
})




onMounted(() => {
    handleImgMenu()
})

</script>

<style scoped >
:deep() ul {
    list-style-type: disc;
    padding: revert;
}

:deep() ol {
    list-style-type: decimal;
    padding: revert;
}

:deep() blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
}

:deep() blockquote:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
}


:deep() h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;
}

:deep() h2 {
    font-size: 1.875rem;
    line-height: 2.25rem;

}

:deep() h3 {
    font-size: 1.5rem;
    line-height: 2rem;
}

:deep() h4 {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

:deep() h5 {
    font-size: 0.875rem;
    line-height: 1.25rem;
}

:deep() h6 {
    font-size: 0.75rem;
    line-height: 1rem;
}

:deep() pre {
    overflow: auto;
}

:deep() pre>code {
    display: block;
    padding: 1rem;
    word-wrap: normal;
}
</style>
