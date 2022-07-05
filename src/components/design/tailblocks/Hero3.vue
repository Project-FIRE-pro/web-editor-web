<template>
    <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                <img
                    v-if="findByKey(props.data, ['Block', 'MainImage'])"
                    class="object-cover object-center rounded"
                    alt="hero"
                    :src="(findByKey(props.data, ['Block', 'MainImage']) as string)"
                />
            </div>
            <div
                class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    {{ findByKey(props.data, ['Block', 'Title']) }}
                </h1>
                <p class="mb-8 leading-relaxed"> {{ findByKey(props.data, ['Block', 'Description']) }}</p>
                <div class="flex justify-center">
                    <template v-if="findByKey(props.data, ['Block', 'Btn1Text'])">

                        <a
                            href=""
                            v-if="findByKey(props.data, ['Block', 'Btn1Link'])"
                        >
                            <button
                                :style="{ backgroundColor: findByKey(props.data, ['Block', 'Btn1Color']) as string }"
                                class="inline-flex text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                            > {{ findByKey(props.data, ['Block', 'Btn1Text']) }}</button>
                        </a>
                        <button
                            v-else
                            :style="{ backgroundColor: findByKey(props.data, ['Block', 'Btn1Color']) as string }"
                            class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        > {{ findByKey(props.data, ['Block', 'Btn1Text']) }}</button>


                    </template>
                    <template v-if="findByKey(props.data, ['Block', 'Btn2Text'])">

                        <a
                            href=""
                            v-if="findByKey(props.data, ['Block', 'Btn2Link'])"
                        >
                            <button
                                class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                            > {{ findByKey(props.data, ['Block', 'Btn2Text']) }}</button>
                        </a>
                        <button
                            v-else
                            class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                        > {{ findByKey(props.data, ['Block', 'Btn2Text']) }}</button>


                    </template>


                </div>
            </div>
        </div>
    </section>
    <!-- 資料預覽從這邊開始(解開註解就可以看) -->
    <!-- <div>
        {{ props.data }}
    </div> -->
    <!-- 資料預覽從這邊結束 -->

</template>
<script  lang="ts">
const componentId = 'nFVl8EjPf2SCyunsI7DL'
export default { componentId }
import { cloneDeep, find, isArray, isString } from 'lodash';
import { ref } from 'vue';
</script>

<script setup lang="ts">
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
        [
            {
                "isLoop": false,
                "key": "Block",
                "value": [
                    {
                        "key": "MainImage",
                        "value": ""
                    },
                    {
                        "key": "Title",
                        "value": ""
                    },
                    {
                        "key": "Description",
                        "value": ""
                    },
                    {
                        "key": "Btn1Text",
                        "value": ""
                    },
                    {
                        "key": "Btn1Link",
                        "value": ""
                    },
                    {
                        "key": "Btn1Color",
                        "value": "#6366f1"
                    },
                    {
                        "key": "Btn2Text",
                        "value": ""
                    },
                    {
                        "key": "Btn2Link",
                        "value": ""
                    }
                ]
            }
        ]
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

</script>

<style scoped>
</style>