import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import UserRepository from "../../infra/repositories/user-repository";
import { generateHash } from "../../infra/utils/hashs/generate-hash";
import { compare } from "../../infra/utils/hashs/compare-hash";
import { Prisma } from "@prisma/client";

interface LoggedUser {
  id: string;
  username: string;
  email: string;
  description: string | null;
  createdAt: Date;
}

export default class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async getLoggedUser(request: FastifyRequest): Promise<LoggedUser> {
    const { sub: id }: { sub: string } = await request.jwtVerify();

    if (!id) {
      throw new Error("User does'n exists.");
    }
    const data = await this._userRepository.findById(id);

    if (!data) {
      throw new Error("User does'n exists.");
    }

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      description: data.description,
      createdAt: data.created_at,
    };
  }

  async create(request: FastifyRequest) {
    const dataValidSchema = z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(6).max(10),
      notify: z.boolean(),
      type: z.enum(["ADMIN", "MEMBER"]).default("MEMBER"),
    });

    const data = dataValidSchema.parse(request.body);
    return await this._userRepository.create({
      ...data,
      password: generateHash(data.password),
    });
  }

  async update(request: FastifyRequest) {
    const dataValidSchema = z.object({
      username: z.string(),
      description: z.string(),
      notify: z.boolean(),
    });

    const { sub: id }: { sub: string } = await request.jwtVerify();

    const data = dataValidSchema.parse(request.body);

    const { username, description } = await this._userRepository.update(
      id,
      data
    );

    return { username, description };
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
        sameSite: true,
      });
    } catch (err) {
      throw err;
    }
  }
}
