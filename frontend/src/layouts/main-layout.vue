<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderLogin from '@/components/header-login.vue'
import FooterApp from '@/components/footer-app.vue'
import { useUserStore } from '@/stores/user'
import HeaderMain from '@/components/header-main.vue'

const $userStore = useUserStore()
</script>

<template>
  <HeaderLogin v-if="!$userStore.isLogged" />
  <HeaderMain v-else />
  <RouterView />
  <FooterApp />
</template>
