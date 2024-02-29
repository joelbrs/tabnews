import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../../application/services/user-service";

export default class UserController {
  constructor(private readonly _userService: UserService) {}

  async getLoggedUser(request: FastifyRequest, reply: FastifyReply) {
    const user = await this._userService.getLoggedUser(request);
    return reply.status(200).send(user);
  }

  async findByUsername(request: FastifyRequest, reply: FastifyReply) {
    const user = await this._userService.findByUsername(request);
    return reply.status(200).send(user);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    await this._userService.create(request);
    return reply.status(201).send();
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const user = await this._userService.update(request);
    return reply.status(200).send(user);
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    await this._userService.authenticate(request, reply);
    return reply.status(204).send();
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    await this._userService.logout(request, reply);
    return reply.status(204).send();
  }
}
