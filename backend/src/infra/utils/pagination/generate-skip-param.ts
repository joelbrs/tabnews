import { PaginationInputModel } from "../../../domain/models/pagination-model";

export default function getSkipParam({ page, size }: PaginationInputModel) {
  if (Number(page) > 0 && Number(size) > 0) {
    return Number(page) * Number(size);
  }
  return 0;
}
