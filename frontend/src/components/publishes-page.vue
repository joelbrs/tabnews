<script setup lang="ts">
import { PostApi } from '@/services'
import type { PostDTOOut } from '@/@types'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useNotify } from '@/plugins/toast-notify'
import { Pagination } from '@/@types/generics/pagination'
import PublishesPageSkeleton from './publishes-page-skeleton.vue'
import PaginationField from '@/components/pagination-field.vue'
import { $dayjs } from '@/lib/dayjs'

interface Props {
  type: 'all' | 'user'
}

const props = defineProps<Props>()

const $notify = useNotify()
const $userStore = useUserStore()

const loading = ref(false)
const pagination = ref(new Pagination())

const publishs = ref<PostDTOOut[]>()

const user = computed(() => $userStore.user)

const handlePagination = async ($event: number) => {
  pagination.value.page = $event

  await getPublishes()
}

const getPublishes = async () => {
  const routes = {
    all: getAllPublishes,
    user: getUserPublishes
  }

  if (props.type in routes) {
    await routes[props.type]()
  }
}

const getAllPublishes = async () => {
  loading.value = true
  const { data, error } = await PostApi.listUserPosts({
    size: 30,
    page: pagination.value.page
  })
  loading.value = false

  if (error) return $notify.error(error)

  if (data) {
    publishs.value = data?.content
    pagination.value.totalPages = data?.totalPages
  }
}

const getUserPublishes = async () => {
  loading.value = true
  const { data, error } = await PostApi.listUserPosts({
    size: 5,
    page: pagination.value.page
  })
  loading.value = false

  if (error) return $notify.error(error)

  if (data) {
    publishs.value = data?.content
    pagination.value.totalPages = data?.totalPages
  }
}

onMounted(async () => {
  await getPublishes()
})
</script>

<template>
  <div v-if="loading">
    <PublishesPageSkeleton :type="type" />
  </div>
  <div v-else>
    <div class="flex flex-col md:items-center py-4 md:py-7" v-if="publishs && publishs.length">
      <div>
        <div
          v-for="(item, i) in publishs"
          :key="item.id"
          class="flex items-start justify-start gap-2 pb-5 md:pb-3.5 pl-2.5"
        >
          <span class="font-medium">{{ i + 1 }}.</span>
          <div class="flex flex-wrap md:max-w-[65vw] flex-col">
            <RouterLink to="/" class="font-medium hover:underline">{{ item.title }}</RouterLink>

            <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>0</span>
              <span>tabcoin</span>
              <span> · </span>
              <span>0</span>
              <span>comentário</span>
              <span> · </span>
              <span>{{ user?.username }}</span>
              <span> · </span>
              <span :title="$dayjs(item.created_at).format('LLL')">
                {{ $dayjs(item.created_at).fromNow() }}
              </span>
            </div>
          </div>
        </div>
        <PaginationField @handle-pagination="handlePagination($event)" :pagination="pagination" />
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center pt-5 pb-10">
      <slot name="not-found" />
    </div>
  </div>
</template>
