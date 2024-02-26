<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/user'
import { Checkbox } from '@/components/ui/checkbox'
import type { User } from '@/@types'
import { RouterLink } from 'vue-router'
import InputQuillEditor from '@/components/input-quill-editor.vue'

const $userStore = useUserStore()
const loading = ref(false)

const form = ref<User>({
  createdAt: new Date(),
  description: '',
  email: '',
  id: '',
  username: ''
})

onMounted(async () => {
  const { user } = $userStore

  if (user) {
    form.value = { ...form.value, ...user }
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-9 pt-5">
    <form class="w-full lg:py-2 p-2 md:w-[45%]" @submit.prevent.stop="">
      <h1 class="text-3xl font-bold mb-5">Editar Perfil</h1>

      <div class="flex flex-col gap-2">
        <div>
          <Label for="username">Nome de Usuário *</Label>
          <Input id="username" v-model:model-value="form.username" required />
        </div>

        <div>
          <Label for="email">E-mail *</Label>
          <Input id="email" v-model:model-value="form.email" required />
        </div>

        <div>
          <Label>Descrição</Label>
          <InputQuillEditor v-model:model-value="form.description" />
        </div>
      </div>

      <div class="flex items-center gap-1 py-5">
        <Checkbox />
        <Label>Receber notificações por email</Label>
      </div>

      <div class="flex flex-col gap-2">
        <span class="font-bold text-sm">Senha</span>
        <RouterLink class="text-xs text-blue-700" :to="{ name: 'sign-in' }"
          >Utilize o fluxo de recuperação de senha →</RouterLink
        >
      </div>

      <div class="text-start text-sm pt-4 pb-3">
        Os campos marcados com um asterisco (*) são obrigatórios.
      </div>

      <Button
        type="submit"
        class="w-full bg-green-700 hover:bg-green-800 text-white"
        :loading="loading"
        :disabled="loading"
      >
        Salvar
      </Button>
    </form>

    <div class="text-center text-sm"></div>
  </div>
</template>
