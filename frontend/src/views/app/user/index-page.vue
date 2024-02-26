<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { Settings } from 'lucide-vue-next'
import MenuActions from '@/components/menu-actions.vue'
import Tabs, { type Tab } from '@/components/tabs-field.vue'
import HeaderProfileTab from './tabs/header-profile-tab.vue'
import ContentProfileTab from './tabs/content-profile-tab.vue'
import ContentCommentsTab from './tabs/content-comment-tab.vue'
import ContentPublishesTab from './tabs/content-publishes-tab.vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
const $userStore = useUserStore()

const tab = ref('profile')

const tabs: Tab[] = [
  {
    id: 'profile',
    label: 'Perfil'
  },
  {
    id: 'publishes',
    label: 'Publicações'
  },
  {
    id: 'comments',
    label: 'Comentários'
  }
]

const user = computed(() => $userStore.user)

onMounted(async () => {
  const [_, __, param] = $route.path.split('/')
  tab.value = param || 'profile'

  await nextTick()
})
</script>

<template>
  <div class="flex flex-col items-center pt-14 pb-3.5">
    <div class="flex justify-between items-center w-[44%]">
      <h1 class="text-2xl font-bold mb-2">{{ user?.username }}</h1>

      <MenuActions>
        <div @click="$router.push({ name: 'publish' })" class="flex items-center gap-1">
          <Settings class="w-4 h-4" />
          Editar Perfil
        </div>
      </MenuActions>
    </div>

    <Tabs v-model:model-value="tab" :tabs="tabs">
      <template #header-profile>
        <HeaderProfileTab />
      </template>

      <template #content-profile>
        <ContentProfileTab />
      </template>

      <template #content-publishes>
        <ContentPublishesTab />
      </template>

      <template #content-comments>
        <ContentCommentsTab />
      </template>
    </Tabs>
  </div>
</template>
