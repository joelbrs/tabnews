import type { ResponseModel } from '@/@types'

export function setDataResponse<T>(data: T): ResponseModel<T> {
  return { data, error: null }
}

export function setErrorResponse(error: Error) {
  return { error, data: null }
}
