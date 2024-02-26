<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from './ui/label'
import { Search } from 'lucide-vue-next'

const $emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()

defineProps<{
  id?: string
  required?: boolean
  label: string
}>()

const search = ref('')

watch(
  () => search.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', newValue)
    }
  }
)
</script>

<template>
  <div class="flex items-center justify-center">
    <Search class="w-4 h-4 lg:hidden" />
    <div class="lg:flex relative left-24 gap-2 items-center text-zinc-400 hidden">
      <Search class="w-4 h-4" />
      <Label>{{ label }}</Label>
    </div>
    <div class="w-full hidden lg:flex">
      <Input
        @click.prevent.stop="$emit('search')"
        :id="id"
        :required="required"
        class="h-8"
        style="background-color: #24292f"
        v-model:model-value="search"
      />
    </div>
  </div>
</template>
