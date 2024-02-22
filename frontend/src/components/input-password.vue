<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-vue-next'

const $emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

defineProps<{
  id?: string
  required?: boolean
}>()

const password = ref('')
const showPass = ref(false)

const type = computed(() => (showPass.value ? 'text' : 'password'))

watch(
  () => password.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', newValue)
    }
  }
)
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full">
      <Input :required="required" :type="type" :id="id" v-model:model-value="password" />
    </div>
    <div class="relative right-8 w-0 hover:cursor-pointer">
      <Eye class="w-5 h-5" @click.prevent.stop="showPass = true" v-if="!showPass" />
      <EyeOff class="w-5 h-5" @click.prevent.stop="showPass = false" v-else />
    </div>
  </div>
</template>
