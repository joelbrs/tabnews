<script setup lang="ts">
import { ref, watch } from 'vue'

const $emits = defineEmits<{
  (e: 'update:modelValue', value?: string): void
}>()

const props = defineProps<{
  disabled?: boolean
  modelValue?: string
}>()

const quill = ref(props.modelValue)

watch(
  () => quill.value,
  (newValue) => {
    $emits('update:modelValue', newValue)
  }
)
</script>

<template>
  <div>
    <QuillEditor
      v-bind="$attrs"
      :class="`min-h-56 border ${disabled ? 'rounded-md' : ''}`"
      content-type="html"
      v-model:content="quill"
      :theme="!disabled ? 'snow' : 'bubble'"
      :readOnly="disabled"
      :toolbar="!disabled ? 'essential' : ['clean']"
    />
  </div>
</template>
