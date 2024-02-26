<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <MoreHorizontal class="w-4 h-4 hover:cursor-pointer text-white" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="relative left-20 w-48 rounded-xl">
      <DropdownMenuItem class="hover:cursor-pointer">
        <slot />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
