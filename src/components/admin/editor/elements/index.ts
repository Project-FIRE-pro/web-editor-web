import EditorQInput from './EQInput.vue'
import EQEditor from './EQEditor.vue'
import EQColor from './EQColor.vue'
import EQSelect from './EQSelect.vue'
import EQToggle from './EQToggle.vue'
import EQSlider from './EQSlider.vue'
import EQTime from './EQTime.vue'
import EQDate from './EQDate.vue'
import EImageUploader from './EImageUploader.vue'
import EBlock from './EBlock.vue'

export const editorElementsListWithComponents = [
    { label: '區塊', component: EBlock },
    { label: '文字輸入框', component: EditorQInput },
    { label: '富文本', component: EQEditor },
    { label: '顏色選擇器', component: EQColor },
    { label: '選擇器', component: EQSelect },
    { label: '是非選擇器', component: EQToggle },
    { label: '滑軌', component: EQSlider },
    { label: '時間選擇器', component: EQTime },
    { label: '日期選擇器', component: EQDate },
    { label: '圖片上傳器', component: EImageUploader },
    // { label: '選單', value: QSelect.name },
]

export const editorElementsObjWithComponents: { [key: string]: any } = {}
editorElementsListWithComponents.forEach(item => {
    editorElementsObjWithComponents
    [item.component.name] = { label: item.label, component: item.component }
})

export const editorElementsArray = editorElementsListWithComponents.map((item) => (
    { label: item.label, componentName: item.component.name }
))