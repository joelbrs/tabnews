import type { PostDTOOut } from '@/@types'
import type { PaginationResponseModel } from '@/@types/generics/pagination'
import { HttpFactory } from '@/factories/http-factory'

const base = 'posts'
const httpClient = HttpFactory(base)

export function listUserPosts(id: string, params: Object) {
  return httpClient.get<PaginationResponseModel<PostDTOOut>>(`user/${id}`, params)
}

export function createPost(params: Object) {
  return httpClient.post<PostDTOOut>('', params)
}

export function listPosts(params: Object) {
  return httpClient.get<PaginationResponseModel<PostDTOOut>>('', params)
}

export function incrementPostTabCoins(id: string) {
  return httpClient.patch<void>(`increment/${id}`)
}

export function decrementPostTabCoins(id: string) {
  return httpClient.patch<void>(`decrement/${id}`)
}
