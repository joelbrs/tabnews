<script setup lang="ts">
import PublishesPage from '@/components/publishes-page.vue'
import { User, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { User as IUser } from '@/@types'

defineProps<{
  user?: IUser
}>()
</script>

<template>
  <PublishesPage :user="user" @publishs-count="$emit('publishs-count', $event)" type="user">
    <template #not-found>
      <User class="w-10 h-10" />
      <h3 class="text-xl font-medium">Nenhuma publicação encontrada</h3>
      <span>Você ainda não fez nenhuma publicação.</span>

      <Button @click.prevent.stop="$router.push({ name: 'publish' })" class="h-8 mt-2">
        <Plus class="w-4 h-4 mr-1" />
        Publicar Conteúdo
      </Button>
    </template>
  </PublishesPage>
</template>
