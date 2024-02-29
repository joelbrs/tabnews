<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface Tab {
  id: string
  label: string
  title?: string
  badge?: number | string
  description?: string
  to?: string
  header?: boolean
}

const $emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

defineProps<{
  tabs: Tab[]
}>()

const currentTab = ref('')

watch(
  () => currentTab.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', newValue)
    }
  }
)
</script>

<template>
  <Tabs v-model:model-value="currentTab" :default-value="tabs[0].id" class="md:w-[40%] w-[90vw]">
    <TabsList class="grid w-full grid-cols-3">
      <TabsTrigger
        class="flex gap-2 items-center"
        @click="$router.push({ name: tab.to })"
        v-for="tab in tabs"
        :key="tab.id"
        :value="tab.id"
      >
        {{ tab.label }}
        <div
          v-if="tab.badge !== undefined && currentTab === tab.id"
          style="background-color: rgba(110, 118, 129, 0.4)"
          class="px-2 rounded-full text-xs text-center"
        >
          {{ tab.badge }}
        </div>
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="tab in tabs" :key="tab.id" :value="tab.id">
      <Card>
        <CardHeader v-if="tab.header">
          <slot :name="`header-${tab.id}`" />
        </CardHeader>
        <CardContent>
          <slot :name="`content-${tab.id}`" />
        </CardContent>

        <div class="flex items-center justify-center w-full">
          <slot :name="`footer-${tab.id}`" />
        </div>
      </Card>
    </TabsContent>
  </Tabs>
</template>
