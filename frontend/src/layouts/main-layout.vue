<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderLogin from '@/components/header-login.vue'
import FooterApp from '@/components/footer-app.vue'
import { useUserStore } from '@/stores/user'
import HeaderMain from '@/components/header-main.vue'
import { verifyThemeSystem } from '@/plugins/theme-provider'
import { computed, onMounted } from 'vue'

const $userStore = useUserStore()

const user = computed(() => $userStore)

onMounted(() => {
  verifyThemeSystem()
})
</script>

<template>
  <HeaderLogin v-if="!user.isLogged" />
  <HeaderMain v-else />
  <RouterView />
  <FooterApp />
</template>
