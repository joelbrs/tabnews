import { Prisma, PrismaClient } from "@prisma/client";
import PostRepository from "../post-repository";

export default class PrismaPostRepository implements PostRepository {
  constructor(private readonly _client: PrismaClient) {}

  async create(data: Prisma.PostUncheckedCreateInput) {
    return await this._client.post.create({ data });
  }
}
