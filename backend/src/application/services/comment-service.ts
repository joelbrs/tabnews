import { FastifyRequest } from "fastify";
import CommentRepository from "../../infra/repositories/comment-repository";
import { z } from "zod";

export default class CommentService {
  constructor(private readonly _repository: CommentRepository) {}

  async findById(id: string) {
    const comment = await this._repository.findById(id);

    if (!comment) {
      throw new Error("Comment not found!");
    }
    return comment;
  }

  async create(request: FastifyRequest) {
    const bodySchema = z.object({
      description: z.string().max(500),
    });

    const { description } = bodySchema.parse(request.body);

    const { post_id } = request.params as { post_id: string };
    const { sub: user_id }: { sub: string } = await request.jwtVerify();

    return await this._repository.create({ description, user_id, post_id });
  }

  async createSubComment(request: FastifyRequest) {
    const bodySchema = z.object({
      description: z.string().max(500),
    });

    const { description } = bodySchema.parse(request.body);

    const { comment_id } = request.params as { comment_id: string };
    const { id: post_id } = await this.findById(comment_id);

    const { sub: user_id }: { sub: string } = await request.jwtVerify();

    return await this._repository.createSubComment(comment_id, {
      user_id,
      post_id,
      description,
    });
  }

  async delete(request: FastifyRequest) {
    const { id } = request.params as { id: string };
    try {
      await this._repository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
