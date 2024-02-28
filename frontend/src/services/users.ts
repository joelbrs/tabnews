import type { User } from '@/@types'
import { HttpFactory } from '@/factories/http-factory'

const base = 'users'
const httpClient = HttpFactory(base)

export function getLoggedUser() {
  return httpClient.get<User>('logged')
}

export function signIn(params: Object) {
  return httpClient.post('auth', params)
}

export function signUp(params: Object) {
  return httpClient.post('', params)
}

export function updateUser(params: Object) {
  return httpClient.update('', params)
}
