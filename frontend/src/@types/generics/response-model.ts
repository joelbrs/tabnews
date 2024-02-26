import type { AxiosError } from 'axios'

export interface ResponseModel<T> {
  data: T | null
  error: AxiosError | null
}
