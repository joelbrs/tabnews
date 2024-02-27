export interface PaginationInputModel {
  page: number | null;
  size: number | null;
}

export interface PaginationModel<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
