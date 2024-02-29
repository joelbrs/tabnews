<script setup lang="ts">
import { User, Menu, Plus, Settings, LogOut, List } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import ThemeToggle from './theme/theme-toggle.vue'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const $router = useRouter()
const $userStore = useUserStore()

const user = computed(() => {
  return $userStore.user
})

const logout = async () => {
  $userStore.logout().then(async () => await $router.push({ name: 'relevants' }))
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Menu class="w-7 h-7 hover:cursor-pointer" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48 rounded-xl md:relative md:right-3">
      <DropdownMenuItem>
        <div
          @click="
            $router.push({ name: 'user-general-profile', params: { username: user?.username } })
          "
          class="flex items-center justify-start gap-1 px-3"
        >
          <User class="mr-2 h-4 w-4 text-gray-500" />
          <span class="text-sm">{{ user?.username }}</span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem @click="$router.push({ name: 'publish' })" class="hover:cursor-pointer">
          <Plus class="w-4 h-4 mr-1 text-gray-500" />
          <span>Novo conteúdo</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="$router.push({ name: 'user-contents', params: { username: user?.username } })"
          class="hover:cursor-pointer"
        >
          <List class="w-4 h-4 mr-1 text-gray-500" />
          <span>Meus conteúdos</span>
        </DropdownMenuItem>
        <DropdownMenuItem @click="$router.push({ name: 'profile' })" class="hover:cursor-pointer">
          <Settings class="w-4 h-4 mr-1 text-gray-500" />
          <span>Editar perfil</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="data-[highlighted]:bg-transparent">
          <ThemeToggle :type="2" />
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup class="p-2">
        <DropdownMenuItem
          @click="logout"
          class="text-red-600 data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-950 data-[highlighted]:text-red-600 hover:cursor-pointer"
        >
          <LogOut class="w-4 h-4 mr-2" />
          Deslogar
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
