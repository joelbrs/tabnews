<script setup lang="ts">
import InputSearch from './input-search.vue'
import ThemeToggle from './theme/theme-toggle.vue'
</script>

<template>
  <header style="background-color: #161b22" class="p-3.5 text-white font-medium text-sm">
    <div class="flex justify-between items-center">
      <nav class="flex items-center gap-5">
        <div class="flex items-center gap-2 hover:cursor-pointer hover:text-zinc-400">
          <img class="w-9 h-9" src="../assets/logo-white.svg" />
          <div class="flex items-center gap-5">
            <h3 class="hidden md:flex">TabNews</h3>
            <div>Relevantes</div>
          </div>
        </div>

        <div>Recentes</div>
      </nav>
      <div class="flex items-center gap-5">
        <InputSearch label="Pesquisar" />

        <ThemeToggle />

        <div class="md:hidden">
          <RouterLink :to="{ name: 'sign-in' }">Entrar</RouterLink>
        </div>

        <div class="hidden md:flex">
          <RouterLink :to="{ name: 'sign-in' }">Login</RouterLink>
        </div>
        <div class="hidden md:flex">
          <RouterLink :to="{ name: 'sign-up' }">Cadastrar</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
