<template>


    <div v-if="props.mode == 'view'">
        <div class="mt-3 text-2xl font-bold">{{ props.setting.name }}</div>
        <q-color
            v-model="mvalue"
            v-bind="componentProps"
        />
    </div>
    <div v-else>

        <q-scroll-area
            class="shadow transition-all duration-300	"
            :style="`height:${ComponentRefHeight}`"
        >

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

            <div
                v-for="set in props.setting.propsSet"
                class="border-b p-5 mx-3 m-2"
            >
                <div>
                    說明：
                    {{ set.Description }}
                </div>


                <div v-if="set.value[set.chooseType] != undefined">
                    <template v-if="set.chooseType == 'string'">

                        <q-input
                            v-model="set.value[set.chooseType]"
                            :label="`${set.key}`"
                        />

                    </template>

                    <template v-else-if="set.chooseType == 'boolean'">

                        <q-toggle
                            v-model="set.value[set.chooseType]"
                            :label="set.key"
                        />

                    </template>

                    <template v-else-if="set.chooseType == 'option'">

                        <q-select
                            v-model="set.value[set.chooseType]"
                            :options="set.Options"
                            label="Standard"
                        />


                    </template>
                </div>


                <div>
                    <template v-if="set.Types.length > 1">

                        <q-radio
                            v-for="(type) in set.Types"
                            v-model="set.chooseType"
                            :val="type"
                            :label="type"
                        />

                    </template>
                </div>


            </div>

        </q-scroll-area>

    </div>







</template>

<script lang="ts">

export default {
    name: 'EditorQColor',
    defaultSetting: {
        name: "未命名顏色選擇器",
        key: 'noKeyQColor',
        value: '',
        propsSet: [

            {
                key: 'default-view',
                value: {
                    'option': 'spectrum',
                },
                Types: ['option'],
                chooseType: 'option',
                Description: "選擇初始化樣式",
                Options: ['spectrum', 'tune', 'palette'],
            },

            {
                key: 'no-header',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "不要頁首",
            },
            {
                key: 'no-header-tabs',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "不要頁首的切換器，只要輸入框",
            },
            {
                key: 'no-footer',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "不要頁腳",
            },

            {
                key: 'square',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "方正外觀",
            },

            {
                key: 'flat',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "關閉陰影",
            },

            {
                key: 'bordered',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "開啟外框",
            },

            {
                key: 'dark',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "黑色版本",
            },
        ]
    }
}
import { computed, nextTick, onMounted, ref, watch } from 'vue';
</script>


<script setup lang="ts">;


interface Props {
    mode?: string;
    modelValue: string;
    setting: {
        key: string,
        value: string,
        name: string,
        propsSet: Array<LooseObject>
    }
}
const props = withDefaults(defineProps<Props>(), {
    mode: 'view',
    modelValue: '',
});

const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()

//   雙向value
const mvalue = computed({
    get: () => props.modelValue
    ,
    set: (val) => {
        emit("update:modelValue", val);
    }
})


interface LooseObject {
    [key: string]: any
}

const ComponentRefHeight = ref('500px')


const componentProps = computed(() => {

    const ans: LooseObject = {}
    props.setting.propsSet.forEach((set: LooseObject) => {
        ans[set.key] = set.value[set.chooseType]
    });
    return ans
})
</script>

<style scoped lang="sass">
</style>
