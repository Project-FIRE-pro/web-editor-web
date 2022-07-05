<template>
    <section>
        <!-- 設計從這邊開始 -->
        <footer class="text-gray-600 body-font">
            <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <img :src="(findByKey(props.data, ['FooterLogoBlock', 'WebLogo']) as string)"  class="w-10 h-10 text-white p-2 rounded-full"/>
                    <span class="ml-3 text-xl"> {{ findByKey(props.data, ['FooterLogoBlock', 'WebName']) }}</span>
                </a>
                <p
                    v-html="findByKey(props.data, ['FooterLogoBlock', 'WebCopyright'])"
                    class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4"
                ></p>
                <span class="inline-flex gap-3 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <template v-for="item in (findByKey(props.data, ['FooterMediaBlock']) as any )">

                        <a
                            :href="(findByKey(item, ['MediaImageLink']) as string)"
                            class="text-gray-500"
                        >
                            <img
                                class="w-5 h-5"
                                :src="(findByKey(item, ['MediaImage']) as string)"
                            >
                        </a>

                    </template>


                </span>
            </div>
        </footer>
        <!-- 設計從這邊結束 -->
    </section>
    <!-- 資料預覽從這邊開始(解開註解就可以看) -->
    <!-- <div>
        {{ props.data }}
    </div> -->
    <!-- 資料預覽從這邊結束 -->

</template>
<script  lang="ts">
const componentId = 'MDiuyrQ0oWxKtQBuUsVC'
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
                "key": "FooterLogoBlock",
                "value": [
                    {
                        "key": "WebLogo",
                        "value": ""
                    },
                    {
                        "key": "WebName",
                        "value": ""
                    },
                    {
                        "key": "WebCopyright",
                        "value": ""
                    }
                ]
            },
            {
                "isLoop": true,
                "key": "FooterMediaBlock",
                "value": [
                    [
                        {
                            "key": "MediaImage",
                            "value": ""
                        },
                        {
                            "key": "MediaImageLink",
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