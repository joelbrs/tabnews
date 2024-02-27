<script setup lang="ts">
import PaginationField from '@/components/pagination-field.vue'
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div>
    <div class="pt-7">
      <div v-for="(_, i) in 5" :key="i" class="flex items-start justify-start gap-2 py-1">
        <span><Skeleton class="w-6 h-6" /></span>
        <div class="flex flex-col gap-2 w-full">
          <span class="font-medium hover:underline"><Skeleton class="h-3" /></span>

          <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span><Skeleton class="w-10 h-2" /></span>
            <span> · </span>
            <span><Skeleton class="w-10 h-2" /></span>
            <span> · </span>
            <span><Skeleton class="w-10 h-2" /></span>
            <span> · </span>
            <span><Skeleton class="w-10 h-2" /></span>
          </div>
        </div>
      </div>
      <PaginationField />
    </div>
  </div>
</template>
