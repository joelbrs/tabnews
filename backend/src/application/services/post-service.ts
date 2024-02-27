import { FastifyRequest } from "fastify";
import PostRepository from "../../infra/repositories/post-repository";
import { z } from "zod";

export default class PostService {
  constructor(private readonly _postRepository: PostRepository) {}

  async create(request: FastifyRequest) {
    const bodySchema = z.object({
      title: z.string().max(255),
      description: z.string().max(500),
      font: z.string().url().nullable(),
    });

    const data = bodySchema.parse(request.body);
    const { sub: creator_id }: { sub: string } = await request.jwtVerify();

    return await this._postRepository.create({ ...data, creator_id });
  }
}
