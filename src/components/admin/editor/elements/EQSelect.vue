<template>
    <div v-if="props.mode == 'view'">
        <div class="mt-3 text-2xl font-bold">{{ props.setting.name }}</div>
        <q-select
            v-model="mvalue"
            class="shadow p-5 pb-10"
            v-bind="componentProps"
        />
    </div>


    <div v-else>
        <q-toggle
            v-model="showSettings"
            label="進階設定"
        />


        <q-scroll-area
            class="shadow transition-all duration-300	"
            :style="`height:${ComponentRefHeight}`"
        >



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
    name: 'EditorQSelect',
    defaultSetting: {
        name: "未命名選擇器",
        key: 'noKeyQSelect',
        value: '',
        propsSet: [
            {
                key: 'label',
                value: {
                    'string': '請選擇'
                },
                Types: ['string'],
                chooseType: 'string',
                Description: "A text label that will “float” up above the input field, once the field gets focus",
            },
            {
                key: 'options',
                value: {
                    'array': []
                },
                Types: ['array'],
                chooseType: 'array',
                Description: 'Available options that the user can select from. For best performance freeze the list of options.',
                Options: []

            },
            {
                key: 'prefix',
                value: {
                    'string': '',
                },
                Types: ['string'],
                chooseType: 'string',
                Description: "前綴",
            },
            {
                key: 'suffix',
                value: {
                    'string': '',
                },
                Types: ['string'],
                chooseType: 'string',
                Description: "後綴",
            },


            {
                key: 'stack-label',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "Label will be always shown above the field regardless of field content (if any)",
            },

            {
                key: 'hint',
                value: {
                    'string': ''
                },
                Types: ['string'],
                chooseType: 'string',
                Description: "Helper (hint) text which gets placed below your wrapped form component",
            },
            {
                key: 'hide-hint',
                value: {
                    'boolean': false
                },
                Types: ['boolean',],
                chooseType: 'boolean',
                Description: "Hide the helper (hint) text when field doesn't have focus",
            },

            {
                key: 'clearable',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null",
            },

            {
                key: 'clear-icon',
                value: {
                    'string': 'close',
                },
                Types: ['string'],
                chooseType: 'string',
                Description: "Custom icon to use for the clear button when using along with 'clearable' prop",
            },
            {
                key: 'counter',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "Show an automatic counter on bottom right",
            },

            {
                key: 'virtual-scroll-horizontal',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "開啟水平模式",
            },
            {
                key: 'hide-dropdown-icon',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "隱藏打開的icon",
            },
            {
                key: 'dropdown-icon',
                value: {
                    'string': 'expand_more',
                },
                Types: ['string'],
                chooseType: 'string',
                Description: "打開的icon",
            },
            {
                key: 'transition-show',
                value: {
                    'option': 'fade',
                },
                Types: ['option'],
                chooseType: 'option',
                Description: "選單打開時的動畫",
                Options: ['slide-right', 'slide-left', 'slide-up', 'slide-down', 'fade', 'scale', 'rotate', 'flip-right', 'flip-left', 'flip-up', 'flip-down', 'jump-right', 'jump-left', 'jump-up', 'jump-down']
            },
            {
                key: 'transition-hide',
                value: {
                    'option': 'fade',
                },
                Types: ['option'],
                chooseType: 'option',
                Description: "選單關閉時的動畫",
                Options: ['slide-right', 'slide-left', 'slide-up', 'slide-down', 'fade', 'scale', 'rotate', 'flip-right', 'flip-left', 'flip-up', 'flip-down', 'jump-right', 'jump-left', 'jump-up', 'jump-down']
            },
            {
                key: 'transition-duration',
                value: {
                    'string': '300',
                },
                Types: ['string'],
                chooseType: 'string',
                Description: "動畫持續多少毫秒",
            },
            {
                key: 'behavior',
                value: {
                    'option': 'default',
                },
                Types: ['option'],
                chooseType: 'option',
                Description: "選單樣式",
                Options: ['default', 'menu', 'dialog']
            },

            {
                key: 'options-dense',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "迷你模式",
            },

            {
                key: 'options-dark',
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
import { QInputProps, QSelectProps } from 'quasar'
</script>


<script setup lang="ts">

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

const showSettings = ref(true)

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
