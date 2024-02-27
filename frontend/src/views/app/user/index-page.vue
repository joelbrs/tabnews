<script setup lang="ts">
import { computed, watch, onMounted, ref } from 'vue'
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

const key = ref(0)
const tab = ref('profile')

const tabs: Tab[] = [
  {
    id: 'profile',
    label: 'Perfil',
    header: true,
    to: 'user-general-profile'
  },
  {
    id: 'publishes',
    label: 'Publicações',
    to: 'user-contents'
  },
  {
    id: 'comments',
    header: true,
    label: 'Comentários',
    to: 'user-comments'
  }
]

const user = computed(() => $userStore.user)

onMounted(async () => {
  const [_, __, param] = $route.path.split('/')
  tab.value = param || 'profile'

  key.value++
})
</script>

<template>
  <div class="flex flex-col items-center pt-14 pb-3.5">
    <div class="flex justify-between items-center w-[40%]">
      <h1 class="text-2xl font-bold mb-2">{{ user?.username }}</h1>

      <MenuActions v-if="tab === 'profile'">
        <div @click="$router.push({ name: 'profile' })" class="flex items-center gap-1">
          <Settings class="w-4 h-4" />
          Editar Perfil
        </div>
      </MenuActions>
    </div>

    <Tabs class="w-[30%]" :key="key" v-model:model-value="tab" :tabs="tabs">
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
