<template>
    <div class="overflow-hidden px-3 border-t">

        <q-splitter
            v-model="mainSplitterModel"
            class="w-full h-full"
        >
            <template v-slot:before>
                <div class=" pr-3 flex flex-col h-full">
                    <q-scroll-area class=" h-14 mt-2 ">
                        <div class="flex gap-2 mb-3 flex-nowrap mx-1">
                            <template v-for="editorElement in editorElements">
                                <q-btn
                                    class="whitespace-nowrap"
                                    :label="'新增' + editorElement.label"
                                    @click="addElement(editorElement.componentName)"
                                />

                            </template>
                        </div>
                    </q-scroll-area>

                    <q-scroll-area class="h-24 flex-1 mb-2">
                        <template v-for="e in elements">
                            <component
                                :is='editorElementsObjWithComponents[e.elementName].component'
                                :setting="e.setting"
                                v-model="e.setting.value"
                            />
                        </template>
                        <div class="mt-10 w-full h-32 text-gray-400 text-center">
                            到底了
                        </div>

                    </q-scroll-area>


                </div>

            </template>

            <template v-slot:after>

                <q-splitter
                    v-model="splitterModel"
                    horizontal
                    class=" h-full"
                >

                    <template v-slot:before>
                        <div class="mb-5 ">
                            <div class="mt-3 w-full text-gray-400 text-center">元件列表</div>
                            <nested-draggable :elements="elements" />
                        </div>
                    </template>

                    <template v-slot:after>
                        <div>

                            <div class="mt-3 w-full text-gray-400 text-center">元件設定</div>
                            <template v-if="elementEditor.editingElement && elements.length > 0">
                                <component
                                    :is='editorElementsObjWithComponents[elementEditor.editingElement.elementName].component'
                                    :setting="elementEditor.editingElement.setting"
                                    mode="edit"
                                />
                            </template>
                        </div>

                    </template>

                </q-splitter>



            </template>

        </q-splitter>



    </div>
</template>

<script lang="ts">
import { useElementEditor } from '@/stores/elementEditor.store';
import { cloneDeep, last } from 'lodash';
import { onMounted, ref, watchEffect } from 'vue';
import { editorElementsArray, editorElementsObjWithComponents } from '../elements';
import NestedDraggable from '../elements/NestedDraggable.vue';
</script>

<script setup lang="ts">
const elementEditor = useElementEditor()

const editorElements = editorElementsArray
const elements = ref<Array<{ elementName: string, setting: any }>>([])
onMounted(() => {
    if(elementEditor.elements.length>0){
        console.log(1);
        elements.value = elementEditor.elements
    }
})
watchEffect(() => {
        if(elementEditor.elements.length>0 && elements.value.length==0){
        console.log(1);
        elements.value = elementEditor.elements
    }else{
        elementEditor.elements = elements.value
    }
})
const splitterModel = ref(20)
const mainSplitterModel = ref(80)
const addElement = (elementName: string) => {

    elements.value.push({ elementName, setting: cloneDeep(editorElementsObjWithComponents[elementName].component.defaultSetting) })
    elementEditor.editingElement = last(elements.value) ?? null
}
</script>

<style scoped>
</style>