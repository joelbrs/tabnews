import { PaginationInputModel } from "../../../domain/models/pagination-model";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "../constants/pagination";

interface Params<T> extends PaginationInputModel {
  data: T;
  count: number;
}

export default function generatePaginatedResponse<T>(params: Params<T>) {
  const { data, page, size, count } = params;

  const totalPages = Math.ceil(count / (page ?? DEFAULT_PAGE));

  return {
    content: data,
    page: Number(page) ?? DEFAULT_PAGE,
    size: Number(size) ?? DEFAULT_SIZE,
    totalElements: +count,
    totalPages: totalPages !== Infinity ? totalPages : 1,
  };
}
