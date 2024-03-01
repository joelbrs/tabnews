<script setup lang="ts">
import type { PostDTOOut } from '@/@types'
import { useNotify } from '@/plugins/toast-notify'
import { PostApi } from '@/services'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'
import InputQuillEditor from '@/components/input-quill-editor.vue'
import { $dayjs } from '@/lib/dayjs'

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
    <div class="flex gap-2 text-xs md:text-sm self-start md:self-center ml-7">
      <div class="rounded-sm bg-[rgba(56,139,253,0.1)] px-2 text-center">
        <span class="text-blue-600">joelbrs</span>
      </div>
      <div>
        <span class="text-[#848d97]">{{ $dayjs(post.created_at).fromNow() }} atrás</span>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="flex flex-col items-center gap-4 md:gap-2 md:h-[50vh] lg:h-72 h-[55vh]">
        <ChevronUp class="w-5 h-5 text-[#6e7681]" />
        <span class="text-blue-600 text-xs font-bold">{{ post.tabcoins }}</span>
        <ChevronDown class="w-5 h-5 text-[#6e7681]" />
        <div class="outline-dashed text-[#6e7681] outline-1 flex-grow"></div>
      </div>
      <div class="w-full md:py-2 md:w-[45%] flex flex-col">
        <h1 class="text-3xl md:text-4xl font-medium pl-3">{{ post.title }}</h1>
        <div class="flex flex-col gap-2">
          <InputQuillEditor class="border-none" :key="key" v-model="post.description" disabled />
        </div>
      </div>
    </div>
  </div>
</template>
