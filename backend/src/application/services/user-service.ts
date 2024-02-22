import { z } from "zod";
import { FastifyRequest } from "fastify";
import UserRepository from "../../infra/repositories/user-repository";

export default class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async create(request: FastifyRequest) {
    const dataValidSchema = z.object({
      username: z.string(),
      email: z.string().email(),
      type: z.enum(["ADMIN", "NORMAL"]).default("NORMAL"),
    });

    const { email, username } = dataValidSchema.parse(request.body);
    return await this._userRepository.create({ email, username });
  }
}
