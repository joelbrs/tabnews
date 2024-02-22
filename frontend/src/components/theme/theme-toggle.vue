<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { toggleTheme } from '@/plugins/theme-provider'
import { computed } from 'vue'

type Props = {
  type?: 1 | 2
}

withDefaults(defineProps<Props>(), {
  type: 1
})
</script>

<template>
  <div v-if="type === 1" class="hover:cursor-pointer">
    <Moon @click="toggleTheme('toggle')" class="w-4 h-4" />
  </div>
</template>

<style scoped>
.sun {
  color: #ecdc0f99;
}

.sun:hover {
  color: #ffef08dc;
}
</style>
