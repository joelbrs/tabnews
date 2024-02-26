<script setup lang="ts">
import { ref } from 'vue'
import { UsersApi } from '@/services'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RouterLink, useRouter } from 'vue-router'
import { useNotify } from '@/plugins/toast-notify'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import InputPassword from '@/components/input-password.vue'

const $router = useRouter()
const $notify = useNotify()

const loading = ref(false)
const form = ref({
  username: '',
  email: '',
  password: '',
  accept: false
})

const signUp = async () => {
  loading.value = true
  const { error } = await UsersApi.signUp(form.value)
  loading.value = false

  if (error) return $notify.error(error)

  $notify.ok()
  await $router.push({ name: 'sign-in' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-10 pt-14">
    <form class="w-[30%]" @submit.prevent.stop="signUp">
      <h1 class="text-3xl font-bold mb-5">Cadastro</h1>

      <div>
        <Label for="username">Nome de usuário</Label>
        <Input id="username" v-model:model-value="form.username" required />
      </div>

      <div>
        <Label for="email">E-mail</Label>
        <Input id="email" v-model:model-value="form.email" required type="email" />
      </div>

      <div>
        <Label for="password">Senha</Label>
        <InputPassword id="password" v-model:model-value="form.password" required />
      </div>

      <div class="flex items-center gap-2 mt-5 mb-2">
        <Checkbox v-model:checked="form.accept" />
        <Label
          >Li e estou de acordo com os
          <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }"
            >Termos de Uso.</RouterLink
          ></Label
        >
      </div>
      <Button
        type="submit"
        class="w-full mt-3 bg-green-700 hover:bg-green-800 text-white"
        :loading="loading"
        :disabled="!form.accept || loading"
      >
        Criar cadastro
      </Button>
    </form>
  </div>
</template>
