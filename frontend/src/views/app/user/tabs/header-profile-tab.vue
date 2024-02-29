<script setup lang="ts">
import { $dayjs } from '@/lib/dayjs'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const $userStore = useUserStore()

const profile = computed(() => $userStore.user)
</script>
<template>
  <div class="flex items-start justify-center md:justify-start text-xs md:text-sm gap-5">
    <div class="flex items-center gap-1 text-md">
      <div style="border-radius: 2px" title="TabCoins" class="bg-blue-700 w-2 h-2"></div>
      <span>{{ profile?.tabcoins }}</span>
      <span>TabCoins</span>
    </div>
    <div class="flex items-center gap-1 text-md">
      <div style="border-radius: 2px" title="TabCash" class="bg-green-700 w-2 h-2"></div>
      <span>0</span>
      <span>TabCash</span>
    </div>
    <span :title="$dayjs(profile?.createdAt).format('LLL')">
      Membro {{ $dayjs(profile?.createdAt).fromNow() }}
    </span>
  </div>
</template>
