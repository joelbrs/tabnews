import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../../application/services/user-service";

export default class UserController {
  constructor(private readonly _userService: UserService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    await this._userService.create(request);
    return reply.status(201).send();
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    await this._userService.authenticate(request, reply);
    return reply.send(200).send();
  }
}
