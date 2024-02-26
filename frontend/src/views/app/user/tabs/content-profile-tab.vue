<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { User } from '@/@types'
import { useUserStore } from '@/stores/user'
import { Button } from '@/components/ui/button'
import InputQuillEditor from '@/components/input-quill-editor.vue'

const $userStore = useUserStore()

const profile = ref<User>({
  username: '',
  createdAt: new Date(),
  email: '',
  id: '',
  description: ''
})

const showQuill = ref(false)

onMounted(() => {
  const { user } = $userStore

  if (user) {
    profile.value = { ...profile.value, ...user }
  }
})
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <div class="w-full" v-if="profile?.description || showQuill">
      <Label for="description">Descrição</Label>
      <InputQuillEditor id="description" readonly v-model="profile.description" />

      <div v-if="!profile.description" class="flex items-center gap-2 justify-end pt-2">
        <Button @click.prevent.stop="showQuill = false" variant="ghost"> Cancelar </Button>
        <Button class="h-8 bg-green-700 hover:bg-green-800 text-white"> Salvar </Button>
      </div>
    </div>

    <div v-else>
      <Button @click.prevent.stop="showQuill = true" class="h-8" variant="secondary">
        Criar Descrição
      </Button>
    </div>
  </div>
</template>
