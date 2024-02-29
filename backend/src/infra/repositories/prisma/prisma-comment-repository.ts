import { Prisma, PrismaClient } from "@prisma/client";
import CommentRepository from "../comment-repository";

export default class PrismaCommentRepository implements CommentRepository {
  constructor(private readonly _client: PrismaClient) {}

  async create(data: Prisma.CommentUncheckedCreateInput) {
    return await this._client.comment.create({ data });
  }

  async createSubComment(id: string, data: Prisma.CommentUncheckedCreateInput) {
    return await this._client.comment.create({
      data: { ...data, comment_id: id },
    });
  }

  async findById(id: string) {
    return await this._client.comment.findUnique({ where: { id } });
  }

  async delete(id: string) {
    await this._client.comment.delete({ where: { id } });
  }
}
