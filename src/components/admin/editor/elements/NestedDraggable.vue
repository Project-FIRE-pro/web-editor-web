<template>
  <draggable
    class="min-h-[10px]"
    tag="ul"
    :list="props.elements"
    :group="{ name: 'g1' }"
    item-key="name"
    handle=".handle"
  >
    <template #item="{ element, index }">
      <li>
        <p>
          <q-btn
            class="handle"
            size="xs"
            icon="drag_handle"
            round
            flat
          />
          {{ element.elementName }}/{{ element.setting.name }}/{{ element.setting.key }}
          <q-btn
            @click="elementEditor.editingElement = element"
            size="xs"
            icon="mode_edit"
            round
            flat
          />
          <q-btn
            @click="deleteElement(index)"
            size="xs"
            icon="delete"
            round
            flat
          />
        </p>

        <nested-draggable
          class="border ml-3"
          v-if="element.elementName == 'EBlock'"
          :elements="element.setting.value"
        />
      </li>
    </template>
  </draggable>
</template>

<script lang="ts">
import { useDialog } from '@/composables/dialog';
import { useNotify } from '@/composables/notify';
import { useElementEditor } from '@/stores/elementEditor.store';
import draggable from 'vuedraggable'
export default {
  name: 'nested-draggable',
}
</script>
<script setup lang="ts">
const Notify = useNotify()
const Dialog = useDialog()
const elementEditor = useElementEditor()
interface Props {
  elements: Array<{ elementName: string, setting: any }>;
}
const props = defineProps<Props>()

const deleteElement = (index: number) => {
  console.log(index);
  Dialog.create(
    {
      title: '刪除確認',
      message: `是否要刪除「${props.elements[index].setting.name}」`
    }
  ).onOk(() => {
    props.elements.splice(index, 1)

    Notify.handleSuccess("刪除成功")

  })

}
</script>

<style scoped>
</style>