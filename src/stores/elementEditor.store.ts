import { get, isArray, omit, has, chain } from 'lodash'
import { defineStore } from 'pinia'

const formatData2User = (data: Array<any> | any): (Array<any> | any) => {
    if (isArray(data)) {
        return chain(data.map((item: any) => (formatData2User(item))))
            .keyBy('key')
            .mapValues(o => {
                if (has(o, 'isLoop')) {
                    return omit(o, 'key').value
                }
                return o.value
            })
            .value();
    }
    if (get(data, 'elementName') == 'EBlock') {
        const isLoop = get(data, 'setting.isLoop')

        return {
            key: get(data, 'setting.key'),
            value: isLoop ? [formatData2User(get(data, 'setting.value'))] : formatData2User(get(data, 'setting.value')),
        }


    }
    return {
        key: get(data, 'setting.key'),
        value: get(data, 'setting.value'),
    }

}

const formatData2Editor = (data: Array<any> | any): (Array<any> | any) => {
    if (isArray(data)) {
        return data.map((item: any) => (formatData2Editor(item)))
    }
    if (get(data, 'elementName') == 'EBlock') {
        const isLoop = get(data, 'setting.isLoop')

        return isLoop
            ? {
                isLoop: isLoop,
                elementName: get(data, 'elementName'),
                key: get(data, 'setting.key'),
                default: formatData2Editor(get(data, 'setting.value')),
                value: [],
            }
            : {
                isLoop: isLoop,
                elementName: get(data, 'elementName'),
                key: get(data, 'setting.key'),
                value: formatData2Editor(get(data, 'setting.value')),
            }

    }
    return {
        elementName: get(data, 'elementName'),
        key: get(data, 'setting.key'),
        value: get(data, 'setting.value'),
        propsSet: get(data, 'setting.propsSet'),
    }

}

export const useElementEditor = defineStore('elementEditor', {
    state: () => ({
        editingElement: <{ elementName: string, setting: any } | null>null,
        elements: <Array<{ elementName: string, setting: any }>>[]
    }),
    getters: {
        data(): string {
            return formatData2User(this.elements)
        },

    },
})