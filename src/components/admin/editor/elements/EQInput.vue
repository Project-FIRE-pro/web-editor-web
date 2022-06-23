<template>
    <div v-if="props.mode == 'view'">
        <div class="mt-3 text-2xl font-bold">{{ props.setting.name }}</div>
        <q-input
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
    name: 'EditorQInput',
    defaultSetting: {
        name: "未命名文字輸入框",
        key: 'noKeyQInput',
        value: '',
        propsSet: [
            {
                key: 'filled',
                value: {
                    'boolean': true,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "Use 'filled' design for the field",
            },
            {
                key: 'mask',
                value: {
                    'string': ''
                },
                Types: ['string'],
                chooseType: 'string',
                Description: 'Custom mask or one of the predefined mask names',
            },
            {
                key: 'fill-mask',
                value: {
                    'string': '',
                    'boolean': false,
                },
                Types: ['string', 'boolean'],
                chooseType: 'string',
                Description: "Fills string with specified characters (or underscore if value is not string) to fill mask's lengt ",
            },
            {
                key: 'label',
                value: {
                    'string': ''
                },
                Types: ['string'],
                chooseType: 'string',
                Description: "A text label that will “float” up above the input field, once the field gets focus",
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
                    'boolean': true
                },
                Types: ['boolean',],
                chooseType: 'boolean',
                Description: "Hide the helper (hint) text when field doesn't have focus",
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
                key: 'shadow-text',
                value: {
                    'string': '',
                },
                Types: ['string'],
                chooseType: 'string',
                Description: "Text to be displayed as shadow at the end of the text in the control; Does NOT applies to type=file",
            },
            {
                key: 'autogrow',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "Make field autogrow along with its content (uses a textarea)",
            },

            {
                key: 'type',
                value: {
                    'option': 'text',
                },
                Types: ['option'],
                chooseType: 'option',
                Description: "",
                Options: ['text', 'password', 'textarea', 'email', 'search', 'tel', 'file', 'number', 'url', 'time', 'date']
            },


        ]
    }
}
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { QInputProps } from 'quasar'
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
    // (event: 'update:componentProps', value: LooseObject): void
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



// const componentSets = ref<Array<LooseObject>>([])

// if (!(Object.keys(props.componentProps).length === 0)) {
//     componentSets.value.forEach((set: LooseObject) => {
//         set.value[set.chooseType] = props.componentProps[set.key]
//     });
// }
const componentProps = computed(() => {
    const ans: LooseObject = {}
    props.setting.propsSet.forEach((set: LooseObject) => {
        ans[set.key] = set.value[set.chooseType]
    });
    // emit("update:componentProps", ans);
    return ans
})
</script>

<style scoped lang="sass">
</style>
