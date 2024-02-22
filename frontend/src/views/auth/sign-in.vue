<script setup lang="ts">
import { ref } from 'vue'
import { UsersApi } from '@/services'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RouterLink, useRouter } from 'vue-router'
import { useNotify } from '@/plugins/toast-notify'
import { Separator } from '@/components/ui/separator'
import InputPassword from '@/components/input-password.vue'

const $router = useRouter()
const $notify = useNotify()

const loading = ref(false)
const form = ref({
  email: '',
  password: ''
})

const signIn = async () => {
  loading.value = true
  const { error } = await UsersApi.signIn(form.value)
  loading.value = false

  if (error) return $notify.error(error)

  $notify.ok()
  await $router.push({ name: 'sign-in' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-9 h-screen">
    <form class="w-[30%]" @submit.prevent.stop="signIn">
      <h1 class="text-3xl font-bold mb-5">Login</h1>

      <div>
        <Label for="email">E-mail</Label>
        <Input id="email" v-model:model-value="form.email" required type="email" />
      </div>

      <div>
        <Label for="password">Senha</Label>
        <InputPassword id="password" v-model:model-value="form.password" required />
      </div>
      <Button
        type="submit"
        class="w-full mt-3 bg-green-700 hover:bg-green-800"
        :loading="loading"
        :disabled="loading"
      >
        Login
      </Button>
    </form>

    <div class="text-center text-sm">
      <p>
        Novo no TabNews?
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }"
          >Crie sua conta aqui.</RouterLink
        >
      </p>
      <p>
        Esqueceu sua senha?
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Clique aqui.</RouterLink>
      </p>
    </div>

    <Separator class="w-[30%]" />

    <footer class="flex flex-col gap-5 text-sm text-center w-[25%]">
      <div class="flex flex-wrap justify-center items-center gap-5 px-5">
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Contato</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">FAQ</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">GitHub</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Museu</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">RSS</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Sobre</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Status</RouterLink>
        <RouterLink class="text-blue-600" :to="{ name: 'sign-in' }">Termos de Uso</RouterLink>
      </div>

      <div class="flex items-center justify-center gap-2 text-gray-500">
        <img src="../../assets/logo.svg" />
        ©
        {{ new Date().getFullYear() }} TabNews
      </div>
    </footer>
  </div>
</template>
