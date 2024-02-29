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

const props = defineProps<{
  user?: User
}>()

const loggedUser = computed({
  get(): User {
    return $userStore.user || ({} as User)
  },
  set() {}
})

const sameUser = computed(() => props.user?.id === loggedUser.value.id)

const saveChanges = async () => {
  loading.value = true
  await $userStore.updateProfile(loggedUser.value)
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
  <div class="flex flex-col items-center justify-center w-full">
    <form v-if="user?.description || showQuill" @submit.prevent.stop="saveChanges" class="w-full">
      <div class="flex items-center justify-between pb-2">
        <Label class="text-sm font-medium" for="description">Descrição</Label>
        <span
          v-if="sameUser"
          @click.prevent.stop="showQuill = true"
          class="text-blue-700 text-sm font-medium hover:cursor-pointer"
          >Editar Descrição</span
        >
      </div>
      <InputQuillEditor
        v-model="loggedUser.description"
        id="description"
        :key="key"
        :disabled="!showQuill"
      />

      <div v-if="showQuill" class="flex items-center gap-2 justify-end pt-2">
        <Button @click.prevent.stop="cancelChanges" variant="ghost"> Cancelar </Button>
        <Button
          :loading="loading"
          :disabled="loading"
          type="submit"
          class="h-8 bg-green-700 hover:bg-green-800 text-white"
        >
          Salvar
        </Button>
      </div>
    </form>
    <div v-if="!loggedUser.description && sameUser && !showQuill">
      <Button @click.prevent.stop="showQuill = true" class="h-8"> Criar Descrição </Button>
    </div>
  </div>
</template>
