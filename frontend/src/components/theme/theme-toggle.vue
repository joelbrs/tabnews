<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

type Props = {
  type?: 1 | 2
}

withDefaults(defineProps<Props>(), {
  type: 1
})
</script>

<template>
  <div class="hover:cursor-pointer" v-if="type === 1">
    <!-- <Moon class="w-4 h-4" /> -->
    <Sun class="w-4 h-4 sun" />
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
