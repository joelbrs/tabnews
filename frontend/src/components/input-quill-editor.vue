<script setup lang="ts">
import { ref, watch } from 'vue'

const $emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

defineProps<{
  disabled?: boolean
}>()

const quill = ref('')

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
      class="min-h-56 border"
      content-type="html"
      v-model:content="quill"
      theme="snow"
      toolbar="essential"
    />
  </div>
</template>
