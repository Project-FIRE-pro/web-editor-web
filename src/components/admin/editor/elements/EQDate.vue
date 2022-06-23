<template>

            <div v-if="props.mode == 'view'">
        <div class="mt-3 text-2xl font-bold">{{ props.setting.name }}</div>
        <q-date
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
    name: 'EditorQDate',
        defaultSetting: {
        name: "未命名日期選擇器",
        key: 'noKeyQDate',
        value: '',
        propsSet: [

    {
        key: 'title',
        value: {
            'string': '主標題'
        },
        Types: ['string'],
        chooseType: 'string',
        Description: "A text label that will “float” up above the input field, once the field gets focus",
    },
    {
        key: 'subtitle',
        value: {
            'string': '次標題'
        },
        Types: ['string'],
        chooseType: 'string',
        Description: "A text label that will “float” up above the input field, once the field gets focus",
    },
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
        key: 'today-btn',
        value: {
            'boolean': true
        },
        Types: ['boolean',],
        chooseType: 'boolean',
        Description: "今天按鈕",
    },
    {
        key: 'minimal',
        value: {
            'boolean': false
        },
        Types: ['boolean',],
        chooseType: 'boolean',
        Description: "迷你模式",
    },


]
        }
}
import { computed, nextTick, onMounted, ref, watch } from 'vue';
</script>


<script setup lang="ts">


interface LooseObject {
    [key: string]: any
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
