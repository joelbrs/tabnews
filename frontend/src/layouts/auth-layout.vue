<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderMain from '@/components/header-main.vue'
import FooterApp from '@/components/footer-app.vue'
</script>

<template>
  <HeaderMain />
  <RouterView />
  <FooterApp />
</template>
