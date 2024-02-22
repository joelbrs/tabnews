import AxiosAdapter from '@/infra/http/adapters/axios-adapter'
import type HttpClient from '@/infra/http/http-client'

export const HttpFactory = (baseUrl?: string): HttpClient => {
  return new AxiosAdapter(baseUrl)
}
