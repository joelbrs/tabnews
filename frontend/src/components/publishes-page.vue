<script setup lang="ts">
import { $dayjs } from '@/lib/dayjs'
import { onMounted, ref } from 'vue'
import { PostApi } from '@/services'
import type { PostDTOOut, User } from '@/@types'
import { useNotify } from '@/plugins/toast-notify'
import { Pagination } from '@/@types/generics/pagination'
import PublishesPageSkeleton from './publishes-page-skeleton.vue'
import PaginationField from '@/components/pagination-field.vue'

interface Props {
  type: 'all' | 'user'
  user?: User
}

const $emits = defineEmits<{
  (e: 'publishs-count', value: number): void
}>()

const props = defineProps<Props>()

const $notify = useNotify()

const loading = ref(false)
const pagination = ref(new Pagination())

const totalPublishs = ref(0)
const publishs = ref<PostDTOOut[]>()

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
    $emits('publishs-count', totalPublishs.value)
  }
}

const getAllPublishes = async () => {
  loading.value = true
  const { data, error } = await PostApi.listPosts({
    size: 30,
    page: pagination.value.page
  })
  loading.value = false

  if (error) return $notify.error(error)

  if (data) {
    publishs.value = data?.content
    pagination.value.totalPages = data?.totalPages
    totalPublishs.value = data.totalElements
  }
}

const getUserPublishes = async () => {
  loading.value = true
  const { data, error } = await PostApi.listUserPosts(props.user?.id as string, {
    size: 5,
    page: pagination.value.page
  })
  loading.value = false

  if (error) return $notify.error(error)

  if (data) {
    publishs.value = data?.content
    pagination.value.totalPages = data?.totalPages
    totalPublishs.value = data.totalElements
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
    <div
      v-if="publishs && publishs.length"
      class="flex flex-col items-center justify-center py-4 md:py-7"
    >
      <div>
        <div
          v-for="(item, i) in publishs"
          :key="item.id"
          class="flex items-start justify-start gap-2 pb-5 md:pb-3.5 md:pr-14"
        >
          <span class="font-medium">{{ i + 1 }}.</span>
          <div class="flex flex-wrap md:max-w-[55vw] flex-col">
            <RouterLink to="/" class="font-medium hover:underline">{{ item.title }}</RouterLink>

            <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{{ item.tabcoins }}</span>
              <span>tabcoins</span>
              <span> · </span>
              <span>0</span>
              <span>comentário</span>
              <span> · </span>
              <span>
                <RouterLink
                  class="hover:underline"
                  :to="{ name: 'user-general-profile', params: { username: item.creator_name } }"
                >
                  {{ item?.creator_name }}
                </RouterLink>
              </span>
              <span> · </span>
              <span :title="$dayjs(item.created_at).format('LLL')">
                {{ $dayjs(item.created_at).fromNow() }} atrás
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
