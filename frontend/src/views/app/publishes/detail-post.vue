<script setup lang="ts">
import type { PostDTOOut } from '@/@types'
import { useNotify } from '@/plugins/toast-notify'
import { PostApi } from '@/services'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'
import InputQuillEditor from '@/components/input-quill-editor.vue'

const $route = useRoute()
const $notify = useNotify()

const key = ref(0)

const post = ref<any>({})

const getPost = async () => {
  const { post: id } = $route.params

  const { data, error } = await PostApi.findPostById(id as string)

  if (error) return $notify.error(error)

  post.value = data as PostDTOOut
}

onMounted(async () => {
  await getPost()

  key.value++
})
</script>

<template>
  <div class="flex flex-col items-center justify-center pl-2 pt-5">
    <div>
      <span>joelbrs</span>
      <span>{{ post.created_at }}</span>
    </div>
    <div class="flex items-start justify-center">
      <div class="flex py-2 flex-col items-center">
        <ChevronUp class="w-4 h-4 text-[#6e7681]" />
        <span class="text-blue-600 text-xs font-bold">{{ post.tabcoins }}</span>
        <ChevronDown class="w-4 h-4 text-[#6e7681]" />
      </div>
      <div class="w-full lg:py-2 md:w-[45%]">
        <h1 class="text-3xl font-medium pl-3">{{ post.title }}</h1>

        <div class="flex flex-col gap-2">
          <InputQuillEditor class="border-none" :key="key" v-model="post.description" disabled />
        </div>
      </div>
    </div>
  </div>
</template>
