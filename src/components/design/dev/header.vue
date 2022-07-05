
<template>
    <section>
        <!-- 設計從這邊開始 -->
        <header class="text-gray-600 body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span class="ml-3 text-xl"> {{ findByKey(props.data, [ 'LogoBlock', 'Name']) }}</span>

                </a>
                <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <template v-for="item in (findByKey(props.data, [ 'MenuBlock']) as any)">

                        <a
                            :href="(findByKey(item, ['Link']) as string)"
                            class="mr-5 hover:text-gray-900"
                        >{{ (findByKey(item, ['Text']) as string) }}</a>
                    </template>

                </nav>


            </div>
        </header>
        <!-- 設計從這邊結束 -->
    </section>
    <!-- 資料預覽從這邊開始(解開註解就可以看) -->
    <!-- <div>
        {{ data }}
    </div> -->
    <!-- 資料預覽從這邊結束 -->

</template>
<script  lang="ts">
const componentId = 'whm2ClIpPVnU09EI9OaR'
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
		"key": "LogoBlock",
		"value": [
			{
				"key": "Name",
				"value": "TESTWEB"
			}
		]
	},
	{
		"isLoop": true,
		"key": "MenuBlock",
		"value": [
			[
				{
					"key": "Link",
					"value": "https://www.google.com.tw"
				},
				{
					"key": "Text",
					"value": "Google"
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
