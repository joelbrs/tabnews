import type { ResponseModel } from '@/@types'

export default interface HttpClient {
  post<T>(url: string, body: Object): Promise<ResponseModel<T>>
  update<T>(url: string, body: Object): Promise<ResponseModel<T>>
}
