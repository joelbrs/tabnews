export class Pagination implements PaginationInputModel {
  page: number
  size: number
  totalPages: number

  constructor(page?: number, size?: number, totalPages?: number) {
    this.page = page ?? 0
    this.size = size ?? 30
    this.totalPages = totalPages ?? 10
  }
}

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
