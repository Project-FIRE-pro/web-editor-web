<template>
    <div v-if="props.mode == 'view'">
        <div class="mt-5 text-2xl font-bold">{{ props.setting.name }}</div>
        <div class=" border min-h-[50px] p-3">
            <template v-for="e in props.setting.value">
                <component
                    :is='editorElementsObjWithComponents[e.elementName].component'
                    :setting="e.setting"
                    v-model="e.setting.value"
                />
            </template>
        </div>
    </div>

    <div v-else>
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

        <q-toggle
            v-model="props.setting.isLoop"
            label="重複"
        />


    </div>
</template>

<script lang="ts">
import { editorElementsObjWithComponents } from '../elements';

export default {
    name: 'EBlock',
    defaultSetting: {
        isLoop: false,
        name: "未命名",
        key: 'noKeyBlock',
        value: [],
    }
}

</script>


<script setup lang="ts">



interface Props {
    mode?: string;
    setting: {
        key: string,
        name: string,
        isLoop: boolean,
        value: Array<any>
    }

}
const props = withDefaults(defineProps<Props>(), {
    mode: 'view',
});




</script>

<style scoped lang="sass">
</style>
