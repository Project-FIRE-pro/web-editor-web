import { createApp } from 'vue'


export const designComponents = import.meta.globEager('@/components/design/**/*.vue')

export const designComponentsObj: {
    [componentName: string]: { [key: string]: any }
} = {}

Object.entries(designComponents).forEach(([path, definition]) => {
    console.log(designComponents, designComponents, path, definition);

    let componentName = ''
    if (definition.default.componentId ?? false) {
        componentName = definition.default.componentId
    } else {
        componentName = path.split('/')!.pop()!.replace(/\.\w+$/, '')
    }
    if (componentName === '') return;
    designComponentsObj[componentName] = definition.default

})