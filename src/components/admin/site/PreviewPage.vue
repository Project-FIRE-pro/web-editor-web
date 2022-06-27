<template>

    <slot :handleShow="() => { showDialog = true }">
        <q-btn
            label="預覽頁面"
            color="primary"
            @click="showDialog = true"
        />
    </slot>



    <q-dialog
        v-model="showDialog"
        maximized
        persistent
    >
        <q-card>
            <q-bar>
                <q-space />



                <q-btn
                    dense
                    flat
                    icon="close"
                    v-close-popup
                >
                    <q-tooltip >結束預覽</q-tooltip>
                </q-btn>
            </q-bar>
            <template v-for="item in siteStore.pageData?.domsData">

                <div
                    v-if="designComponentsObj[item.id]"
                    class="border"
                >
                    <component
                        :is='designComponentsObj[item.id]'
                        :data="formatData2Preview(item.data)"
                    />
                </div>

            </template>

        </q-card>






    </q-dialog>


</template>

<script lang="ts">
import { ref } from 'vue';

import { get, isArray } from 'lodash';
import { useSiteStore } from '@/stores/site.store';
import { designComponentsObj } from '@/components/design/autoRegisterDesignComponents'

</script>

<script setup lang="ts">

const siteStore = useSiteStore()


const showDialog = ref(false)
const formatData2Preview = (data: Array<any> | any): (Array<any> | any) => {
    if (isArray(data)) {
        return data.map((item: any) => (formatData2Preview(item)))
    }
    if (get(data, 'elementName') == 'EBlock') {
        const isLoop = get(data, 'setting.isLoop')

        return isLoop
            ? {
                isLoop: isLoop,
                // elementName: get(data, 'elementName'),
                key: get(data, 'setting.key'),
                value: formatData2Preview(Object.values(get(data, 'setting.value'))),
            }
            : {
                isLoop: isLoop,
                // elementName: get(data, 'elementName'),
                key: get(data, 'setting.key'),
                value: formatData2Preview(get(data, 'setting.value')),
            }

    }
    return {
        // elementName: get(data, 'elementName'),
        key: get(data, 'setting.key'),
        value: get(data, 'setting.value'),
        // propsSet: get(data, 'setting.propsSet'),
    }

}



</script>

<style scoped>
</style>