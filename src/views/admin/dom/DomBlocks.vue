<template>
    <gui-mode
        ref="tabEl"
        :style="{ height: tabHeight }"
    />
</template>

<script  lang="ts">
import { ref, watchEffect } from 'vue';
import { useElementBounding, watchOnce } from '@vueuse/core'

import GuiMode from '@/components/admin/editor/domBlock/GUIMode.vue';
import JsonMode from '@/components/admin/editor/domBlock/JsonMode.vue';
import { useRoute } from 'vue-router';
import { db } from '@/common/firebase';
import { useElementEditor } from '@/stores/elementEditor.store';
</script>
<script setup lang="ts">

// 處理Tab的畫面
const tabEl = ref(null)
const tabBounding = useElementBounding(tabEl)
const tabHeight = ref('100vh');
watchOnce(() => tabBounding.height.value, () => {
    tabHeight.value = `calc(100vh - ${tabBounding.top.value}px)`
})


// const

</script>

<style scoped>
</style>