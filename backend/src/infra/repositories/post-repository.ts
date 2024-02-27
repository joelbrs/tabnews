import { Post, Prisma } from "@prisma/client";
import {
  PaginationInputModel,
  PaginationModel,
} from "../../domain/models/pagination-model";

export default interface PostRepository {
  getAll(params: PaginationInputModel): Promise<PaginationModel<Post>>;
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
}
