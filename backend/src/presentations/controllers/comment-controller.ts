import { FastifyReply, FastifyRequest } from "fastify";
import CommentService from "../../application/services/comment-service";

export default class CommentController {
  constructor(private readonly _commentService: CommentService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const comment = await this._commentService.create(request);
    return reply.status(201).send(comment);
  }

  async createSubComment(request: FastifyRequest, reply: FastifyReply) {
    const subcomment = await this._commentService.createSubComment(request);
    return reply.status(201).send(subcomment);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    await this._commentService.delete(request);
    return reply.status(204).send();
  }
}
