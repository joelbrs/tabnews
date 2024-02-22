import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import UserRepository from "../../infra/repositories/user-repository";
import { generateHash } from "../../infra/utils/hashs/generate-hash";
import { compare } from "../../infra/utils/hashs/compare-hash";

export default class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async create(request: FastifyRequest) {
    const dataValidSchema = z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(6).max(10),
      type: z.enum(["ADMIN", "MEMBER"]).default("MEMBER"),
    });

    const data = dataValidSchema.parse(request.body);
    return await this._userRepository.create({
      ...data,
      password: generateHash(data.password),
    });
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6).max(10),
    });

    const { email, password } = authBodySchema.parse(request.body);
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User does not exists!");
    }

    const passMatches = compare(user.password, generateHash(password));

    if (!passMatches) {
      throw new Error("Invalid credentials.");
    }

    try {
      const token = await reply.jwtSign(
        {
          role: user.type,
        },
        {
          sign: {
            sub: user.id,
          },
        }
      );

      reply.setCookie("token", token, {
        httpOnly: true,
        maxAge: 86400 * 7,
        path: "/",
      });
    } catch (err) {
      throw err;
    }
  }
}
