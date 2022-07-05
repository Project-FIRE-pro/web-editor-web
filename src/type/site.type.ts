export type SiteType = {
    id?: string;
    showName: string;
    domains: Array<string>;
    note: string;
}
export type PageType = {
    id?: string;
    hasPrerender?: boolean;
    renderingHtml?: string;
    domsData?: Array<PageDomData>;
    showName: string;
    url: string;
    description?: string;
    note?: string;
    useCommonHeader?:boolean;
    useCommonFooter?:boolean;
}

export type PageDomData={
    id:string;
    data:any;
    elements?:Array<any>
}