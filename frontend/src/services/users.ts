import { HttpFactory } from '@/factories/http-factory'

const base = 'users'
const httpClient = HttpFactory(base)

export function signIn(params: Object) {
  return httpClient.post('auth', params)
}

export function signUp(params: Object) {
  return httpClient.post('', params)
}
