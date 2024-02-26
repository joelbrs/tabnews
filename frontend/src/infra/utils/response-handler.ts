import type { ResponseModel } from '@/@types'
import type { AxiosError } from 'axios'

export function setDataResponse<T>(data: T): ResponseModel<T> {
  return { data, error: null }
}

export function setErrorResponse(error: AxiosError) {
  return { error, data: null }
}
