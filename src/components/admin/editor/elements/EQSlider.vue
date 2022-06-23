<template>

    <div v-if="props.mode == 'view'">
        <div class="mt-3 text-2xl font-bold">{{ props.setting.name }}</div>
        <div class="px-5">
            <q-slider
                v-model="mvalue"
                v-bind="componentProps"
            />
        </div>

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
                v-for="set in  props.setting.propsSet"
                class="border-b p-5 mx-3 m-2"
            >

                <div v-if="set.value[set.chooseType] != undefined">
                    <template v-if="set.chooseType == 'string'">

                        <q-input
                            v-model="set.value[set.chooseType]"
                            :label="`${set.key}`"
                        />

                    </template>
                    <template v-else-if="set.chooseType == 'number'">
                        <q-input
                            v-model.number="set.value[set.chooseType]"
                            :label="`${set.key}`"
                            type="number"
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
    name: 'EditorQSlider',
    defaultSetting: {
        name: "未命名滑軌",
        key: 'noKeyQSlider',
        value: '',
        propsSet: [
            {
                key: 'min',
                value: {
                    'number': 0
                },
                Types: ['number'],
                chooseType: 'number',
                Description: "Minimum value of the model; Set track's minimum value",
            },
            {
                key: 'max',
                value: {
                    'number': 100
                },
                Types: ['number'],
                chooseType: 'number',
                Description: "Maximum value of the model; Set track's maximum value",
            }, {
                key: 'step',
                value: {
                    'number': 10
                },
                Types: ['number'],
                chooseType: 'number',
                Description: "Specify step amount between valid values (> 0.0); When step equals to 0 it defines infinite granularity",
            },
            {
                key: 'snap',
                value: {
                    'boolean': true
                },
                Types: ['boolean',],
                chooseType: 'boolean',
                Description: "Snap on valid values, rather than sliding freely; Suggestion: use with 'step' prop",
            },
            {
                key: 'reverse',
                value: {
                    'boolean': false
                },
                Types: ['boolean',],
                chooseType: 'boolean',
                Description: "Work in reverse (changes direction)",
            },
            {
                key: 'vertical',
                value: {
                    'boolean': false
                },
                Types: ['boolean',],
                chooseType: 'boolean',
                Description: "Display in vertical direction",
            },
            {
                key: 'label-always',
                value: {
                    'boolean': false
                },
                Types: ['boolean',],
                chooseType: 'boolean',
                Description: "Always display the label",
            },
            {
                key: 'label',
                value: {
                    'boolean': true
                },
                Types: ['boolean',],
                chooseType: 'boolean',
                Description: "Popup a label when user clicks/taps on the slider thumb and moves it",
            },
            {
                key: 'markers',
                value: {
                    'boolean': false,
                    'number': 10
                },
                Types: ['boolean', 'number'],
                chooseType: 'number',
                Description: "Display markers on the track, one for each possible value for the model or using a custom step (when specifying a Number)",
            },

            {
                key: 'dense',
                value: {
                    'boolean': false,
                },
                Types: ['boolean'],
                chooseType: 'boolean',
                Description: "迷你模式",
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
    get: () => Number(props.modelValue) ?? 0
    ,
    set: (val) => {
        emit("update:modelValue", val.toString());
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

onMounted(() => {
    if (props.modelValue === '') {
        mvalue.value = componentProps.value.min
    }

})

</script>

<style scoped lang="sass">
</style>
