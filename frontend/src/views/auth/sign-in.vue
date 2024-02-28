<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import InputPassword from '@/components/input-password.vue'

const $router = useRouter()
const $userStore = useUserStore()

const loading = ref(false)
const form = ref({
  email: '',
  password: ''
})

const signIn = async () => {
  loading.value = true
  $userStore
    .signIn(form.value)
    .then(async () => await $router.push({ name: 'relevants' }))
    .finally(() => (loading.value = false))
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-9 py-14">
    <form class="w-full p-2 md:w-[30%]" @submit.prevent.stop="signIn">
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
        class="w-full mt-3 bg-green-700 hover:bg-green-800 text-white"
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
  </div>
</template>
