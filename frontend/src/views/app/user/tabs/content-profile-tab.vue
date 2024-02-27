<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { User } from '@/@types'
import { useUserStore } from '@/stores/user'
import { Button } from '@/components/ui/button'
import InputQuillEditor from '@/components/input-quill-editor.vue'

const $userStore = useUserStore()

const key = ref(0)
const loading = ref(false)
const showQuill = ref(false)

const profile = computed({
  get(): User {
    return $userStore.user || ({} as User)
  },
  set() {}
})

const saveChanges = async () => {
  loading.value = true
  await $userStore.updateProfile(profile.value)
  loading.value = false

  showQuill.value = false
}

const cancelChanges = async () => {
  await $userStore.getLoggedUser()
  showQuill.value = false
}

watch(
  () => showQuill.value,
  () => key.value++
)
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <form
      v-if="profile?.description || showQuill"
      @submit.prevent.stop="saveChanges"
      class="w-full"
    >
      <div class="flex items-center justify-between pb-2">
        <Label class="text-sm font-medium" for="description">Descrição</Label>
        <span
          @click.prevent.stop="showQuill = true"
          class="text-blue-700 text-sm font-medium hover:cursor-pointer"
          >Editar Descrição</span
        >
      </div>
      <InputQuillEditor
        v-model="profile.description"
        id="description"
        :key="key"
        :disabled="!showQuill"
      />

      <div v-if="showQuill" class="flex items-center gap-2 justify-end pt-2">
        <Button @click.prevent.stop="cancelChanges" variant="ghost"> Cancelar </Button>
        <Button type="submit" class="h-8 bg-green-700 hover:bg-green-800 text-white">
          Salvar
        </Button>
      </div>
    </form>

    <div v-if="!profile.description">
      <Button @click.prevent.stop="showQuill = true" class="h-8"> Criar Descrição </Button>
    </div>
  </div>
</template>
