<template>
    <div v-if="props.mode == 'view'">
        <div class="mt-3 text-2xl font-bold">{{ props.setting.name }}</div>
        <q-time
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
                    <template v-else-if="set.chooseType == 'array'">

                        <q-select
                            v-model="set.value[set.chooseType]"
                            :options="set.Options"
                            label="輸入預設選項"
                            use-input
                            use-chips
                            multiple
                            hide-dropdown-icon
                            input-debounce="0"
                            new-value-mode="add-unique"
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
    name: 'EditorQTime',
    defaultSetting: {
        name: "未命名時間選擇器",
        key: 'noKeyQTime',
        value: '',
        propsSet: [

            {
                key: 'landscape',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "橫向模式",
            },
            {
                key: 'format24h',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "24小時制模式",
            },

            {
                key: 'with-seconds',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "包含秒針",
            },
            {
                key: 'now-btn',
                value: {
                    'boolean': true,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "開啟現在時間的按鈕",
            },



            {
                key: 'hour-options',
                value: {
                    'array': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 24]
                },
                Types: ['array'],
                chooseType: 'array',
                Description: '允許選擇的「小時」',
                Options: []

            },
            {
                key: 'minute-options',
                value: {
                    'array': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
                        46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
                },
                Types: ['array'],
                chooseType: 'array',
                Description: '允許選擇的「分鐘」',
                Options: []

            },
            {
                key: 'second-options',
                value: {
                    'array': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
                        46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
                },
                Types: ['array'],
                chooseType: 'array',
                Description: '允許選擇的「秒」',
                Options: []

            },

            {
                key: 'dark',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "黑暗模式",
            },
        ]
    }
}
import { computed, nextTick, onMounted, ref, watch } from 'vue';
</script>


<script setup lang="ts">


const strArr2NumArr = (arrOfStr: Array<string>): Array<number> => {
    return arrOfStr.map(str => {
        return Number(str);
    });

}



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
        if (set.key == 'hour-options' || set.key == 'second-options' || set.key == 'minute-options') {
            ans[set.key] = strArr2NumArr(set.value[set.chooseType])
        } else {
            ans[set.key] = set.value[set.chooseType]
        }
    });
    return ans
})


</script>

<style scoped >
:deep() .q-time__now-button {
    background-color: var(--q-primary);;
}
</style>
