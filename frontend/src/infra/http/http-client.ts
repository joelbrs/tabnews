import type { ResponseModel } from '@/@types'

export default interface HttpClient {
  get<T>(url: string, params?: Object): Promise<ResponseModel<T>>
  post<T>(url: string, body: Object): Promise<ResponseModel<T>>
  update<T>(url: string, body: Object): Promise<ResponseModel<T>>
}
