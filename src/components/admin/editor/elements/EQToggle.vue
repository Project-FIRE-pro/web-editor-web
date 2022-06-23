<template>

    <div v-if="props.mode == 'view'">
        <div class="mt-3 text-2xl font-bold">{{ props.setting.name }}</div>
        <q-toggle
            class="shadow p-5 pb- w-full"
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
    name: 'EditorQToggle',
    defaultSetting: {
        name: "未命名是非選擇器",
        key: 'noKeyQToggle',
        value: '',
        propsSet: [

    {
        key: 'label',
        value: {
            'string': '同意以上條約'
        },
        Types: ['string'],
        chooseType: 'string',
        Description: "Label to display along the component (or use the default slot instead of this prop)",
    },







    {
        key: 'icon',
        value: {
            'string': '',
        },
        Types: ['string'],
        chooseType: 'string',
        Description: "icon",
    },



    {
        key: 'left-label',
        value: {
            'boolean': false,
        },
        Types: ['boolean'],
        chooseType: 'boolean',
        Description: "文字是否在左邊",
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
    get: () => props.modelValue == 'TRUE'
    ,
    set: (val) => {
        emit("update:modelValue", val.toString().toUpperCase());
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
        mvalue.value = false
    }
})

</script>

<style scoped lang="sass">
</style>
