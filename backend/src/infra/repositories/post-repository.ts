import { Post, Prisma } from "@prisma/client";
import {
  PaginationInputModel,
  PaginationModel,
} from "../../domain/models/pagination-model";
import PostModel from "../../domain/models/post";

export default interface PostRepository {
  getAll(params: PaginationInputModel): Promise<PaginationModel<PostModel>>;
  findById(id: string): Promise<Post | null>;
  updateTabCoins(id: string, tabcoins: number): Promise<void>;
  getPostsByUser(
    creator_id: string,
    params: PaginationInputModel
  ): Promise<PaginationModel<PostModel>>;
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
}
