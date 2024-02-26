<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputQuillEditor from '@/components/input-quill-editor.vue'

const loading = ref(false)

const form = ref({
  title: '',
  content: '',
  font: ''
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-9 pt-5">
    <form class="w-full lg:py-2 p-2 md:w-[60%]" @submit.prevent.stop="">
      <h1 class="text-3xl font-bold mb-5">Publicar Novo Conteúdo</h1>

      <div class="flex flex-col gap-2">
        <div>
          <Label for="title">Título *</Label>
          <Input
            id="title"
            placeholder="e.g. 5 livros fundamentais para desenvolvedores"
            v-model:model-value="form.title"
            required
          />
        </div>

        <div>
          <Label for="content">Corpo da Publicação *</Label>
          <InputQuillEditor id="content" v-model:model-value="form.content" required />
        </div>

        <div>
          <Label for="font">Fonte</Label>
          <Input
            id="font"
            v-model:model-value="form.font"
            placeholder="https://origem.site/noticia"
          />
        </div>
      </div>

      <div class="text-start text-sm pt-4 pb-3">
        Os campos marcados com um asterisco (*) são obrigatórios.
      </div>

      <div class="flex items-center justify-end gap-2 w-full">
        <Button variant="ghost"> Cancelar</Button>
        <Button
          type="submit"
          class="bg-green-700 hover:bg-green-800 text-white"
          :loading="loading"
          :disabled="loading"
        >
          Salvar
        </Button>
      </div>
    </form>

    <div class="text-center text-sm"></div>
  </div>
</template>
