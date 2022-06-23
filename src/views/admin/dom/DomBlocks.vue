<template>
    <gui-mode
        ref="tabEl"
        :style="{ height: tabHeight }"
    />
</template>

<script  lang="ts">
import { ref } from 'vue';
import { useElementBounding, watchOnce } from '@vueuse/core'

import GuiMode from '@/components/admin/editor/domBlock/GUIMode.vue';
import JsonMode from '@/components/admin/editor/domBlock/JsonMode.vue';
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