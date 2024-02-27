<script setup lang="ts">
import { User, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col items-center justify-center pb-10">
    <User class="w-10 h-10" />
    <h3 class="text-xl font-medium">Nenhuma publicação encontrada</h3>
    <span>Você ainda não fez nenhuma publicação.</span>

    <Button @click.prevent.stop="$router.push({ name: 'publish' })" class="h-8 mt-2">
      <Plus class="w-4 h-4 mr-1" />
      Publicar Conteúdo
    </Button>
  </div>
</template>
