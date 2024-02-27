<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { PostApi } from '@/services'
import type { PostDTOOut } from '@/@types'
import { User, Plus, Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useNotify } from '@/plugins/toast-notify'
import { useUserStore } from '@/stores/user'

const $notify = useNotify()
const $userStore = useUserStore()

const loading = ref(false)

const publishs = ref<PostDTOOut[]>()

const user = computed(() => $userStore.user)

const getUserPublishs = async () => {
  loading.value = true
  const { data, error } = await PostApi.listUserPosts({})
  loading.value = false

  if (error) return $notify.error(error)

  publishs.value = data?.content
}

onMounted(async () => {
  await getUserPublishs()
})
</script>

<template>
  <div v-if="loading" class="flex items-center justify-center w-full h-[10vh] pt-5">
    <Loader2 class="w-8 h-8 animate-spin" />
  </div>
  <div v-else>
    <div class="pt-5" v-if="publishs && publishs.length">
      <div
        v-for="(item, i) in publishs"
        :key="item.id"
        class="flex items-start justify-start gap-2 py-1"
      >
        <span>{{ i + 1 }}.</span>
        <div class="flex flex-col">
          <RouterLink to="/" class="font-medium">{{ item.title }}</RouterLink>

          <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>0 tabcoin</span>
            <span> · </span>
            <span>0 comentário</span>
            <span> · </span>
            <span>{{ user?.username }}</span>
            <span> · </span>
            <span>há 24 segundos</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center pt-5 pb-10">
      <User class="w-10 h-10" />
      <h3 class="text-xl font-medium">Nenhuma publicação encontrada</h3>
      <span>Você ainda não fez nenhuma publicação.</span>

      <Button @click.prevent.stop="$router.push({ name: 'publish' })" class="h-8 mt-2">
        <Plus class="w-4 h-4 mr-1" />
        Publicar Conteúdo
      </Button>
    </div>
  </div>
</template>
