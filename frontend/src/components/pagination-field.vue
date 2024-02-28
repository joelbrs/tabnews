<script setup lang="ts">
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  pagination?: any
}

const props = defineProps<Props>()

const disabled = computed(() => ({
  previous: !props.pagination || props.pagination.page === 0,
  next: !props.pagination || props.pagination.page + 1 === props.pagination.totalPages
}))
</script>

<template>
  <div class="flex items-center pt-5 justify-center gap-2">
    <Button
      variant="ghost"
      @click.prevent.stop="$emit('handle-pagination', pagination.page - 1)"
      :class="`flex items-center hover:bg-transparent ${!disabled.previous ? 'text-blue-700 hover:text-blue-700 hover:underline' : ''}`"
      :disabled="disabled.previous"
    >
      <ChevronLeft class="w-4 h-4" />
      Anterior
    </Button>

    <Button
      variant="ghost"
      @click.prevent.stop="$emit('handle-pagination', pagination.page + 1)"
      :class="`flex items-center hover:bg-transparent ${!disabled.next ? 'text-blue-700 hover:text-blue-700 hover:underline' : ''}`"
      :disabled="disabled.next"
    >
      Próximo
      <ChevronRight class="w-4 h-4" />
    </Button>
  </div>
</template>
