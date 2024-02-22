export interface ResponseModel<T> {
  data: T | null
  error: Error | null
}
