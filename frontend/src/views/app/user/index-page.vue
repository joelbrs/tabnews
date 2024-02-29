<script setup lang="ts">
import { computed, inject, onMounted, provide, ref } from 'vue'
import { Settings } from 'lucide-vue-next'
import MenuActions from '@/components/menu-actions.vue'
import Tabs, { type Tab } from '@/components/tabs-field.vue'
import HeaderProfileTab from './tabs/header-profile-tab.vue'
import ContentProfileTab from './tabs/content-profile-tab.vue'
import ContentCommentsTab from './tabs/content-comment-tab.vue'
import ContentPublishesTab from './tabs/content-publishes-tab.vue'
import { useRoute } from 'vue-router'
import type { User } from '@/@types'
import { UsersApi } from '@/services'
import { useNotify } from '@/plugins/toast-notify'
import { useUserStore } from '@/stores/user'

const $route = useRoute()
const $notify = useNotify()

const $userStore = useUserStore()

const key = ref(0)
const tab = ref('profile')

const tabs = ref<Tab[]>([
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
])

const user = ref<User>()

const sameUser = computed(() => user.value?.id === $userStore.user?.id)

const getUser = async (username: string) => {
  const { data, error } = await UsersApi.getByUsername(username)

  if (error) return $notify.error(error)

  user.value = data as User
}

onMounted(async () => {
  const [_, username, page] = $route.path.split('/')
  tab.value = page || 'profile'

  await getUser(username)
  key.value++
})
</script>

<template>
  <div class="flex flex-col items-center pt-14 pb-3.5">
    <div class="flex justify-between items-center md:w-[40%] w-[90vw]">
      <h1 class="text-2xl font-bold mb-2">{{ user?.username }}</h1>

      <MenuActions v-if="tab === 'profile' && sameUser">
        <div @click="$router.push({ name: 'profile' })" class="flex items-center gap-1">
          <Settings class="w-4 h-4" />
          Editar Perfil
        </div>
      </MenuActions>
    </div>

    <Tabs :key="key" v-model:model-value="tab" :tabs="tabs">
      <template #header-profile>
        <HeaderProfileTab :user="user" />
      </template>

      <template #content-profile>
        <ContentProfileTab :user="user" />
      </template>

      <template #content-publishes>
        <ContentPublishesTab :user="user" @publishs-count="tabs[1].badge = $event" />
      </template>

      <template #content-comments>
        <ContentCommentsTab />
      </template>
    </Tabs>
  </div>
</template>
