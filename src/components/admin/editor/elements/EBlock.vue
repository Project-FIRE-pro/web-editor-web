<template>
    <div v-if="props.mode == 'show'">
        <div class="flex gap-3 items-center">
            <div class="mt-5 text-2xl font-bold">{{ props.setting.name }}</div>
            <q-btn
                v-if="props.setting.isLoop"
                @click="handleAdd(props.setting.value, props.setting.default)"
                class="w-3 h-3"
                icon="add"
                round
                dense
            >
                <q-tooltip>新增</q-tooltip>
            </q-btn>
        </div>
        <div
            v-if="!props.setting.isLoop"
            class=" border min-h-[50px] p-3"
        >
            <template v-for="e in props.setting.value">
                <component
                    :mode="e.elementName == 'EBlock' ? 'show' : 'view'"
                    :is='editorElementsObjWithComponents[e.elementName].component'
                    :setting="e.setting"
                    v-model="e.setting.value"
                />
            </template>
        </div>
        <div
            v-else
            class=" border min-h-[50px] p-3"
        >
            <q-scroll-area
                ref="scrollArea"
                :style="{ height: scrollAreaHeight }"
                class=" max-w-[100vw]"
            >


                <draggable
                    v-model="props.setting.value"
                    item-key="id"
                    handle=".handle"
                    class="flex gap-3 ml-3 flex-nowrap"
                >
                    <template #item="{ element, index }">
                        <div class="relative mt-1 border rounded p-3 shadow ">
                            <q-btn
                                class="handle absolute -left-[3px] -top-[1px] bg-white"
                                size="xs"
                                icon="drag_handle"
                                round
                            >
                                <q-tooltip>拖曳移動</q-tooltip>
                            </q-btn>
                            <q-btn
                                @click="handleRemove(props.setting.value, index)"
                                class="absolute right-0 -top-[1px]"
                                color="red"
                                size="xs"
                                icon="close"
                                round
                            >
                                <q-tooltip>刪除第{{ index + 1 }}項</q-tooltip>
                            </q-btn>

                            <template v-for="e in element">
                                <div class="min-w-[40vw]">
                                    <component
                                        :mode="e.elementName == 'EBlock' ? 'show' : 'view'"
                                        :is='editorElementsObjWithComponents[e.elementName].component'
                                        :setting="e.setting"
                                        v-model="e.setting.value"
                                    />
                                </div>

                            </template>


                        </div>
                    </template>


                </draggable>



            </q-scroll-area>

        </div>
    </div>
    <div v-else-if="props.mode == 'view'">
        <div class="mt-5 text-2xl font-bold">{{ props.setting.name }}</div>
        <div class=" border min-h-[50px] p-3">
            <template v-for="e in props.setting.value">
                <component
                    :is='editorElementsObjWithComponents[e.elementName].component'
                    :setting="e.setting"
                    v-model="e.setting.value"
                />
            </template>
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

        <q-toggle
            v-model="props.setting.isLoop"
            label="重複"
        />


    </div>
</template>

<script lang="ts">
import { useDialog } from '@/composables/dialog';
import { useNotify } from '@/composables/notify';
import { cloneDeep } from 'lodash';
import { computed, ref, watchEffect } from 'vue';
import { editorElementsObjWithComponents } from '../elements';
import draggable from 'vuedraggable'

export default {
    name: 'EBlock',
    defaultSetting: {
        isLoop: false,
        name: "未命名",
        key: 'noKeyBlock',
        value: [],
    }
}

</script>


<script setup lang="ts">

const Dialog = useDialog()
const Notify = useNotify()


interface Props {
    mode?: string;
    setting: {
        default?: any
        key: string,
        name: string,
        isLoop: boolean,
        value: Array<any>
    }

}
const props = withDefaults(defineProps<Props>(), {
    mode: 'view',
});


const handleAdd = (data: Array<any>, datum: any) => {
    data.push(cloneDeep(datum));
    setTimeout(() => {
        scrollAreaHeightLock.value = false
    }, 500);
}
const handleRemove = async (data: Array<any>, index: number) => {
    Dialog.create({
        title: '刪除確認',
        message: '是否要刪除?',
        cancel: true,
        persistent: true
    }).onOk(() => {
        data.splice(index, 1)
    })

}


const scrollArea = ref<any>(null)
const scrollAreaHeightLock = ref(false)
const scrollAreaHeight = ref("30px")
watchEffect(() => {
    if (!scrollAreaHeightLock.value) {
        if (scrollArea.value && scrollArea.value.getScroll().verticalSize > 0) {
            console.log(scrollArea.value.getScroll().verticalSize);
            scrollAreaHeightLock.value = true
            scrollAreaHeight.value = `${Number(scrollArea.value.getScroll().verticalSize) + 5}px`
        }
    }
})


</script>

<style scoped lang="sass">
</style>
