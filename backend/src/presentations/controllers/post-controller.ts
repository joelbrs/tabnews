import { FastifyReply, FastifyRequest } from "fastify";
import PostService from "../../application/services/post-service";

export default class PostController {
  constructor(private readonly _postService: PostService) {}

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const posts = await this._postService.getAll(request);
    return reply.status(200).send(posts);
  }

  async getPostsByUser(request: FastifyRequest, reply: FastifyReply) {
    const posts = await this._postService.getPostsByUser(request);
    return reply.status(200).send(posts);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const post = await this._postService.findById(request);
    return reply.status(200).send(post);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const post = await this._postService.create(request);
    return reply.status(201).send(post);
  }

  async incrementTabCoins(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    await this._postService.incrementTabCoins(request);
    return reply.status(204).send();
  }

  async decrementTabCoins(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    await this._postService.decrementTabCoins(request);
    return reply.status(204).send();
  }
}
