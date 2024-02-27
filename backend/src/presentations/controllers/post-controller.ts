import { FastifyReply, FastifyRequest } from "fastify";
import PostService from "../../application/services/post-service";

export default class PostController {
  constructor(private readonly _postService: PostService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const post = await this._postService.create(request);
    return reply.status(201).send(post);
  }
}
