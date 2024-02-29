<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import InputSearch from './input-search.vue'
import MenuUser from './menu-user.vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const $userStore = useUserStore()

const user = computed(() => $userStore.user)
</script>

<template>
  <header style="background-color: #161b22" class="p-3.5 text-white font-medium text-sm">
    <div class="flex justify-between items-center">
      <nav class="flex items-center gap-5">
        <div class="flex items-center gap-2 hover:cursor-pointer hover:text-zinc-400">
          <img class="w-9 h-9" src="../assets/logo-white.svg" />
          <div class="flex items-center gap-5">
            <h3 class="hidden md:flex">TabNews</h3>
            <RouterLink
              :class="$route.name === 'relevants' ? 'underline underline-offset-4' : ''"
              :to="{ name: 'relevants' }"
            >
              Relevantes
            </RouterLink>
          </div>
        </div>

        <RouterLink
          :class="$route.name === 'recents' ? 'underline underline-offset-4' : ''"
          :to="{ name: 'recents' }"
        >
          Recentes
        </RouterLink>
      </nav>
      <div class="flex items-center gap-3 md:gap-5">
        <InputSearch label="Pesquisar" />

        <div
          @click="$router.push({ name: 'publish' })"
          class="hidden md:flex"
          title="Publicar novo conteúdo"
        >
          <Plus class="w-5 h-5 hover:cursor-pointer" />
        </div>

        <div class="flex items-center gap-1 text-xs font-medium">
          <div style="border-radius: 2px" title="TabCoins" class="bg-blue-700 w-2 h-2"></div>
          {{ user?.tabcoins }}
        </div>
        <div class="flex items-center gap-1 text-xs font-medium">
          <div style="border-radius: 2px" title="TabCash" class="bg-green-700 w-2 h-2"></div>
          0
        </div>

        <MenuUser />
      </div>
    </div>
  </header>
</template>
