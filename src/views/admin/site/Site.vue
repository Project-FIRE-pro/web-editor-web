<template>
    <div class="p-5">
        <div class="flex gap-3 justify-between items-center">
            <q-breadcrumbs>
                <q-breadcrumbs-el :label="siteStore.siteData?.showName" />
                <q-breadcrumbs-el label="站點資料" />
            </q-breadcrumbs>
            <edit-site after-edit-auto-hide />
        </div>

    </div>
</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import EditSite from '@/components/admin/site/EditSite.vue';
import { useSiteStore } from '@/stores/site.store';
import { SiteType } from '@/type';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const siteStore = useSiteStore()
const route = useRoute()
const router = useRouter()
const SiteDB = db().collection('Sites').doc(route.params.site_id as string);
const siteData = ref<SiteType>(useFirestore(SiteDB) as any)
watchEffect(() => {
    if (siteData.value) {
        siteStore.siteData = siteData.value
    } else if (siteData.value === null) {
        router.push({ name: 'ListSite' })

    }
})

</script>

<style scoped>
</style>