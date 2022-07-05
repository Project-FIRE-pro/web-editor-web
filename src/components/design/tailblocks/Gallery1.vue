<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
            <div class="flex w-full mb-20 flex-wrap">
                <h1
                    v-if="findByKey(props.data, ['TextBlock', 'Title'])"
                    class="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4"
                >
                    {{ findByKey(props.data, ['TextBlock', 'Title']) }}
                </h1>
                <p
                    v-if="findByKey(props.data, ['TextBlock', 'SubTitle'])"
                    class="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base"
                >
                    {{ findByKey(props.data, ['TextBlock', 'SubTitle']) }}
                </p>
            </div>
            <div class="flex flex-wrap md:-m-2 -m-1">
                <template v-for="item, index in (findByKey(props.data, ['ImageBlock']) as any) ">

                    <div
                        v-if="index % 2 == 0"
                        class="flex flex-wrap w-1/2"
                    >
                        <div
                            v-if="findByKey(item, ['SmallImage1'])"
                            class="md:p-2 p-1 w-1/2"
                        >
                            <a
                                v-if="findByKey(item, ['SmallImage1Link'])"
                                :href="(findByKey(item, ['SmallImage1Link']) as string)"
                            >
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['SmallImage1']) as string)"
                                >
                            </a>
                            <template v-else>
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['SmallImage1']) as string)"
                                >

                            </template>

                        </div>
                        <div
                            v-if="findByKey(item, ['SmallImage2'])"
                            class="md:p-2 p-1 w-1/2"
                        >

                            <a
                                v-if="findByKey(item, ['SmallImage2Link'])"
                                :href="(findByKey(item, ['SmallImage2Link']) as string)"
                            >
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['SmallImage2']) as string)"
                                >
                            </a>
                            <template v-else>
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['SmallImage2']) as string)"
                                >

                            </template>

                        </div>
                        <div
                            v-if="findByKey(item, ['BigImage'])"
                            class="md:p-2 p-1 w-full"
                        >
                            <a
                                v-if="findByKey(item, ['BigImageLink'])"
                                :href="(findByKey(item, ['BigImageLink']) as string)"
                            >
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['BigImage']) as string)"
                                >
                            </a>
                            <template v-else>
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['BigImage']) as string)"
                                >

                            </template>
                        </div>
                    </div>
                    <div
                        v-else
                        class="flex flex-wrap w-1/2"
                    >
                        <div
                            v-if="findByKey(item, ['BigImage'])"
                            class="md:p-2 p-1 w-full"
                        >
                            <a
                                v-if="findByKey(item, ['BigImageLink'])"
                                :href="(findByKey(item, ['BigImageLink']) as string)"
                            >
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['BigImage']) as string)"
                                >
                            </a>
                            <template v-else>
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['BigImage']) as string)"
                                >

                            </template>
                        </div>
                        <div
                            v-if="findByKey(item, ['SmallImage1'])"
                            class="md:p-2 p-1 w-1/2"
                        >
                            <a
                                v-if="findByKey(item, ['SmallImage1Link'])"
                                :href="(findByKey(item, ['SmallImage1Link']) as string)"
                            >
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['SmallImage1']) as string)"
                                >
                            </a>
                            <template v-else>
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['SmallImage1']) as string)"
                                >

                            </template>

                        </div>
                        <div
                            v-if="findByKey(item, ['SmallImage2'])"
                            class="md:p-2 p-1 w-1/2"
                        >
                            <a
                                v-if="findByKey(item, ['SmallImage2Link'])"
                                :href="(findByKey(item, ['SmallImage2Link']) as string)"
                            >
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['SmallImage2']) as string)"
                                >
                            </a>
                            <template v-else>
                                <img
                                    class="w-full object-cover h-full object-center block"
                                    :src="(findByKey(item, ['SmallImage2']) as string)"
                                >

                            </template>

                        </div>
                    </div>
                </template>

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
const componentId = 'pPUxEYANl8Rgr3EkRfZ1'
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
                "key": "TextBlock",
                "value": [
                    {
                        "key": "Title",
                        "value": "Title"
                    },
                    {
                        "key": "SubTitle",
                        "value": "SubTitle"
                    }
                ]
            },
            {
                "isLoop": true,
                "key": "ImageBlock",
                "value": [
                    [
                        {
                            "key": "SmallImage1Link",
                            "value": ""
                        },
                        {
                            "key": "SmallImage1",
                            "value": ""
                        },
                        {
                            "key": "SmallImage2Link ",
                            "value": ""
                        },
                        {
                            "key": "SmallImage2",
                            "value": ""
                        },
                        {
                            "key": "BigImageLink ",
                            "value": ""
                        },
                        {
                            "key": "BigImage",
                            "value": ""
                        }
                    ]
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