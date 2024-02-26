<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { toggleTheme, verifyThemeSystem, type Theme } from '@/plugins/theme-provider'

type Props = {
  type?: 1 | 2
}

const theme = ref<Theme>('auto')

withDefaults(defineProps<Props>(), {
  type: 1
})

onMounted(() => {
  theme.value = verifyThemeSystem()
})
</script>

<template>
  <div v-if="type === 1" class="hover:cursor-pointer">
    <Moon v-if="theme !== 'dark'" @click="theme = toggleTheme('dark')" class="w-4 h-4" />
    <Sun v-else @click="theme = toggleTheme('light')" class="w-4 h-4 sun" />
  </div>
  <div class="w-full flex items-center justify-center" v-else>
    <Tabs v-model:model-value="theme" default-value="auto">
      <TabsList class="h-8">
        <TabsTrigger @click="toggleTheme('dark')" value="dark">
          <Moon class="w-4 h-4 hover:cursor-pointer" />
        </TabsTrigger>
        <TabsTrigger @click="toggleTheme('auto')" value="auto"> Auto </TabsTrigger>
        <TabsTrigger value="light">
          <Sun @click="toggleTheme('light')" class="w-4 h-4 hover:cursor-pointer" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
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
