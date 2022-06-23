
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
                    <span class="ml-3 text-xl">Tailblocks</span>
                </a>
                <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <template v-for="item in props.data.MenuBlock">
                        <a
                            :href="item.Link"
                            class="mr-5 hover:text-gray-900"
                        >{{ item.Text }}</a>
                    </template>

                </nav>
                <template v-for="item in props.data.FuncBlock">
                    <a :href="item.Link">
                        <button
                            class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                        >{{ item.Text }}
                            <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                class="w-4 h-4 ml-1"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </a>

                </template>

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
const componentId = 'WC-V1StGXR8_Z5jdHedf6B-myT'
export default { componentId }
import { ref } from 'vue';
</script>

<script setup lang="ts">
interface Props {
    data?: {
        "LogoBlock": {
            "LogoImagePc": string,
            "LogoImagePhone": string
        },
        "MenuBlock": [
            {
                "Text": string,
                "Link": string
            }
        ],
        "FuncBlock": [
            {
                "Text": string,
                "Link": string
            }
        ]
    }

}
const props = withDefaults(defineProps<Props>(), {
    data: () => ({
        "LogoBlock": {
            "LogoImagePc": "",
            "LogoImagePhone": ""
        },
        "MenuBlock": [
            {
                "Text": "",
                "Link": ""
            }
        ],
        "FuncBlock": [
            {
                "Text": "",
                "Link": ""
            }
        ]
    })

})

</script>

<style scoped lang="sass">
</style>
