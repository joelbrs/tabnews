import type { PostDTOOut } from '@/@types'
import type { PaginationResponseModel } from '@/@types/generics/pagination'
import { HttpFactory } from '@/factories/http-factory'

const base = 'posts'
const httpClient = HttpFactory(base)

export function createPost(params: Object) {
  return httpClient.post<PostDTOOut>('', params)
}

export function listPosts(params: Object) {
  return httpClient.get<PaginationResponseModel<PostDTOOut>>('', params)
}
