import type { User } from '@/@types'
import { HttpFactory } from '@/factories/http-factory'

const base = 'users'
const httpClient = HttpFactory(base)

export function getLoggedUser() {
  return httpClient.get<User>('logged')
}

export function signIn(params: Object) {
  return httpClient.post<void>('auth', params)
}

export function signUp(params: Object) {
  return httpClient.post<void>('', params)
}

export function logout() {
  return httpClient.post<void>('logout')
}

export function updateUser(params: Object) {
  return httpClient.update<void>('', params)
}
