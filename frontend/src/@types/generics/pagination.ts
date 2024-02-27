export interface PaginationInputModel {
  page: number
  size: number
}

export interface PaginationResponseModel<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}
