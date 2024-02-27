<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { User } from '@/@types'
import { useUserStore } from '@/stores/user'
import { Button } from '@/components/ui/button'
import InputQuillEditor from '@/components/input-quill-editor.vue'
import { $dayjs } from '@/lib/dayjs'

const $userStore = useUserStore()

const profile = computed({
  get(): User {
    return $userStore.user || ({} as User)
  },
  set() {}
})

const showQuill = ref(false)
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <div class="w-full" v-if="profile?.description || showQuill">
      <Label for="description">Descrição</Label>
      <InputQuillEditor id="description" disabled v-model="profile.description" />

      <div v-if="!profile.description" class="flex items-center gap-2 justify-end pt-2">
        <Button @click.prevent.stop="showQuill = false" variant="ghost"> Cancelar </Button>
        <Button class="h-8 bg-green-700 hover:bg-green-800 text-white"> Salvar </Button>
      </div>
    </div>

    <div v-else>
      <Button @click.prevent.stop="showQuill = true" class="h-8"> Criar Descrição </Button>
    </div>
  </div>
</template>
