import { DomType, PageType, SiteType } from '@/type'
import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', {
  state: () => ({
    siteData: <SiteType | null>null,
    pageData: <PageType | null>null,
    domsData: <Array<DomType>>[]
  })
})