<script setup lang="ts">
import type { User } from '@/@types'
import { $dayjs } from '@/lib/dayjs'

defineProps<{
  user?: User
}>()
</script>

<template>
  <div class="flex items-start flex-wrap md:justify-start text-xs md:text-sm gap-5">
    <div class="flex items-center gap-1 text-md">
      <div style="border-radius: 2px" title="TabCoins" class="bg-blue-700 w-2 h-2"></div>
      <span>{{ user?.tabcoins }}</span>
      <span>TabCoins</span>
    </div>
    <div class="flex items-center gap-1 text-md">
      <div style="border-radius: 2px" title="TabCash" class="bg-green-700 w-2 h-2"></div>
      <span>0</span>
      <span>TabCash</span>
    </div>
    <span :title="$dayjs(user?.createdAt).format('LLL')">
      Membro há {{ $dayjs(user?.createdAt).fromNow() }}
    </span>
  </div>
</template>
