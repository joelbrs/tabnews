import $axios from '@/lib/axios'
import type { AxiosError, AxiosInstance } from 'axios'
import type HttpClient from '../http-client'
import { setDataResponse, setErrorResponse } from '@/infra/utils/response-handler'

export default class AxiosAdapter implements HttpClient {
  private _client: AxiosInstance = $axios

  constructor(private readonly _baseUrl?: string) {}

  async get<T>(url: string, params?: Object) {
    try {
      const { data } = await this._client.get<T>(this.constructUrl(url), { params })
      return setDataResponse<T>(data)
    } catch (error) {
      return setErrorResponse(error as AxiosError)
    }
  }

  async post<T>(url: string, body: Object) {
    try {
      const { data } = await this._client.post<T>(this.constructUrl(url), body)
      return setDataResponse<T>(data)
    } catch (error) {
      return setErrorResponse(error as AxiosError)
    }
  }

  async put<T>(url: string, body: Object) {
    try {
      const { data } = await this._client.put<T>(this.constructUrl(url), body)
      return setDataResponse<T>(data)
    } catch (error) {
      return setErrorResponse(error as AxiosError)
    }
  }

  async patch<T>(url: string, body: Object) {
    try {
      const { data } = await this._client.patch<T>(this.constructUrl(url), body)
      return setDataResponse<T>(data)
    } catch (error) {
      return setErrorResponse(error as AxiosError)
    }
  }

  constructUrl(url: string) {
    if (url) {
      return `${this._baseUrl}/${url}`
    }
    return this._baseUrl || ''
  }
}
