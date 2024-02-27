import { Post, Prisma, PrismaClient } from "@prisma/client";
import PostRepository from "../post-repository";
import { PaginationInputModel } from "../../../domain/models/pagination-model";
import getSkipParam from "../../utils/pagination/generate-skip-param";
import generatePaginatedResponse from "../../utils/pagination/generate-response";

export default class PrismaPostRepository implements PostRepository {
  constructor(private readonly _client: PrismaClient) {}

  async getAll(params: PaginationInputModel) {
    const { page, size } = params;

    const [count, data] = await this._client.$transaction([
      this._client.post.count(),
      this._client.post.findMany({
        take: Number(size),
        skip: getSkipParam({ page, size }),
      }),
    ]);

    return generatePaginatedResponse<Post[]>({ count, page, data, size });
  }

  async create(data: Prisma.PostUncheckedCreateInput) {
    return await this._client.post.create({ data });
  }
}
