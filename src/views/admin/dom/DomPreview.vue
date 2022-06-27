<template>
    <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
    >
        <q-step
            :name="1"
            title="新增元件"
            icon="settings"
            :done="step > 1"
        >
            <pre class="prettyprint !p-3"><code class="language-html">{{ demoCodeTemp }}</code></pre>


            <q-stepper-navigation>
                <q-btn
                    @click="step = 2"
                    color="primary"
                    label="下一步"
                />
            </q-stepper-navigation>
        </q-step>

        <q-step
            :name="2"
            title="匯入Data"
            icon="create_new_folder"
            :done="step > 2"
        >
            <div>


                <pre class="prettyprint !p-3"><code class="language-basic" v-html='hightLightKeyWord(elementEditor.data,`"key"`)'/></pre>

            </div>

            <q-stepper-navigation>
                <q-btn
                    @click="step = 3"
                    color="primary"
                    label="下一步"
                />
                <q-btn
                    flat
                    @click="step = 1"
                    color="primary"
                    label="返回"
                    class="q-ml-sm"
                />
            </q-stepper-navigation>
        </q-step>

        <q-step
            :name="3"
            title="預覽"
            icon="assignment"
            :done="step > 3"
        >
            <div
                v-if="component_data"
                class="border"
            >
                <component
                    :is='component_data'
                    :data="elementEditor.data"
                />
            </div>
            <div v-else>
                需先建立元件後才能預覽。
            </div>
            <q-stepper-navigation>
                <q-btn
                    flat
                    @click="step = 2"
                    color="primary"
                    label="返回"
                    class="q-ml-sm"
                />
            </q-stepper-navigation>
        </q-step>


    </q-stepper>

</template>

<script setup lang="ts">
import { useElementEditor } from '@/stores/elementEditor.store';
import { ref } from 'vue';
import { useScriptTag } from '@vueuse/core';
import { designComponentsObj } from '@/components/design/autoRegisterDesignComponents'
import { useRoute } from 'vue-router';
import { isString } from 'lodash';
const elementEditor = useElementEditor()
useScriptTag('https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js',)
const step = ref(1)
const route = useRoute()
const webComponentId = ref<string>(route.params.id as string)
const demoCodeTemp = `<template>
    <section>
        <!-- 設計從這邊開始 -->
        DEMO HIHI
        <!-- 設計從這邊結束 -->
    </section>
    <!-- 資料預覽從這邊開始(解開註解就可以看) -->
    <!-- <div>
        {{ props.data }}
    </div> -->
    <!-- 資料預覽從這邊結束 -->

</template>
<1script1  lang="ts">
const componentId = 'ComponentIdISHere'
export default { componentId }
import { cloneDeep, find, isArray, isString } from 'lodash';
import { ref } from 'vue';
</1script1>

<1script1 setup lang="ts">
type DatumType = {
    isLoop?: boolean,
    key: string,
    value: string | Array<DatumType> | Array<Array<DatumType>>
}
interface Props {
    data?: Array<DatumType>
}
const props = withDefaults(defineProps<Props>(), {
    data: () =>
    // 將Data匯入這裡 - 開始
    // 將Data匯入這裡 - 結束
})
const findByKey = (data: Array<DatumType> | string, keys: Array<string>) => {
    if (isString(data)) return data;
    let _data = cloneDeep(data)
    let lastdata = cloneDeep(data)
    while (keys.length > 0 && _data != void 0) {
        lastdata = cloneDeep(_data)
        const key = keys.shift()
        _data = find(_data, ['key', key])?.value as any
        console.log(_data);
    }
    if (_data != void 0) {
        lastdata = _data
    }
    if (isArray(lastdata)) {
        return lastdata as unknown as Array<Array<DatumType>>
    } else {
        return lastdata as string
    }

}
// 元件script - 開始

</1script1>

<style scoped>
</style>
`.replaceAll('1script1', 'script').replaceAll('ComponentIdISHere', webComponentId.value)
const component_data = designComponentsObj[webComponentId.value]

const hightLightKeyWord = (org_text: any, keyword: string) => {
    if(!isString(org_text)){
        org_text = JSON.stringify(org_text, null, '\t')
    }
    return org_text.replaceAll(keyword, `<span style="background-color: #ffeb3b;color: #2f2c2c;font-size: larger;font-weight: bold;">${keyword}</span>`)
}

</script>

<style scoped>
</style>