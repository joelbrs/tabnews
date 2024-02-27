<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <Separator class="w-[64%] mb-8" />

    <footer class="flex flex-col justify-center gap-5 text-sm text-center px-10">
      <div class="flex flex-wrap justify-center items-center gap-10">
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Contato</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">FAQ</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">GitHub</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Museu</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">RSS</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Sobre</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Status</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Termos de Uso</RouterLink>
      </div>

      <div class="flex items-center justify-center gap-2 text-gray-500">
        <img src="../assets/logo.svg" />
        ©
        {{ new Date().getFullYear() }} TabNews
      </div>
    </footer>
  </div>
</template>
