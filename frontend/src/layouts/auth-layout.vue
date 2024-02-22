<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderLogin from '@/components/header-login.vue'
import FooterApp from '@/components/footer-app.vue'
</script>

<template>
  <HeaderLogin />
  <RouterView />
  <FooterApp />
</template>
