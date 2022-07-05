<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                    {{ findByKey(props.data, ['TextBlock', 'Title']) }}
                </h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                    {{ findByKey(props.data, ['TextBlock', 'Description']) }}
                </p>
            </div>

            <div class="flex flex-wrap -m-4">
                <template v-for="item in (findByKey(props.data, ['CardBlock']) as any) ">
                    <div class="lg:w-1/3 sm:w-1/2 p-4">
                        <div class="flex relative">
                            <img
                                v-if="findByKey(item, ['Image'])"
                                alt="gallery"
                                class="absolute inset-0 w-full h-full object-cover object-center"
                                :src="((findByKey(item, ['Image'])) as string)"
                            />
                            <a
                                v-if="findByKey(item, ['Link'])"
                                :href="(findByKey(item, ['Link']) as string)"
                            >
                                <div
                                    class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                    <h2
                                        class="tracking-widest text-sm title-font font-medium mb-1"
                                        :style="{ color: findByKey(item, ['SubTitleColor']) as string }"
                                    >
                                        {{ findByKey(item, ['SubTitle']) }}
                                    </h2>
                                    <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                                        {{ findByKey(item, ['Title']) }}
                                    </h1>
                                    <p class="leading-relaxed">{{ findByKey(item, ['Content']) }}</p>
                                </div>
                            </a>
                            <div
                                v-else
                                class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100"
                            >
                                <h2
                                    class="tracking-widest text-sm title-font font-medium mb-1"
                                    :style="{ color: findByKey(item, ['SubTitleColor']) as string }"
                                >
                                    {{ findByKey(item, ['SubTitle']) }}
                                </h2>
                                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                                    {{ findByKey(item, ['Title']) }}
                                </h1>
                                <p class="leading-relaxed">{{ findByKey(item, ['Content']) }}</p>
                            </div>
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
const componentId = 'mbMNrJz7XV6x1whJFA1p'
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
                        "value": ""
                    },
                    {
                        "key": "Description",
                        "value": ""
                    }
                ]
            },
            {
                "isLoop": true,
                "key": "CardBlock",
                "value": [
                    [
                        {
                            "key": "Link",
                            "value": ""
                        },
                        {
                            "key": "Image",
                            "value": ""
                        },
                        {
                            "key": "Title",
                            "value": ""
                        },
                        {
                            "key": "SubTitle",
                            "value": ""
                        },
                        {
                            "key": "SubTitleColor",
                            "value": "#6366f1"
                        },
                        {
                            "key": "Content",
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